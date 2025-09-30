# IT Consulting Web App - PowerShell Deployment Script
# This script automates the deployment process to AKS

param(
    [string]$ImageTag = "latest"
)

# Configuration
$NAMESPACE = "it-consulting-app"
$APP_NAME = "it-consulting-webapp"

Write-Host "🚀 Starting deployment of IT Consulting Web App" -ForegroundColor Blue
Write-Host "Image tag: $ImageTag" -ForegroundColor Blue

# Function to print status
function Print-Status {
    param([string]$Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Print-Warning {
    param([string]$Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

function Print-Error {
    param([string]$Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

# Check if kubectl is available
try {
    kubectl version --client | Out-Null
    Print-Status "kubectl is available"
} catch {
    Print-Error "kubectl is not installed or not in PATH"
    exit 1
}

# Check if connected to cluster
try {
    kubectl cluster-info | Out-Null
    Print-Status "Connected to Kubernetes cluster"
} catch {
    Print-Error "Not connected to a Kubernetes cluster"
    exit 1
}

# Create namespace if it doesn't exist
Write-Host "📦 Creating namespace..." -ForegroundColor Blue
kubectl apply -f k8s/namespace.yaml
Print-Status "Namespace created/updated"

# Update image tag in deployment
Write-Host "🔄 Updating deployment with image tag: $ImageTag" -ForegroundColor Blue
$deploymentContent = Get-Content k8s/deployment.yaml -Raw
$deploymentContent = $deploymentContent -replace "it-consulting-webapp:latest", "it-consulting-webapp:$ImageTag"
Set-Content k8s/deployment.yaml $deploymentContent

# Apply Kubernetes manifests
Write-Host "📋 Applying Kubernetes manifests..." -ForegroundColor Blue

# Deploy application
kubectl apply -f k8s/deployment.yaml
Print-Status "Deployment applied"

# Deploy service
kubectl apply -f k8s/service.yaml
Print-Status "Service applied"

# Deploy ingress
kubectl apply -f k8s/ingress.yaml
Print-Status "Ingress applied"

# Deploy HPA
kubectl apply -f k8s/hpa.yaml
Print-Status "HPA applied"

# Wait for deployment to be ready
Write-Host "⏳ Waiting for deployment to be ready..." -ForegroundColor Blue
kubectl rollout status deployment/$APP_NAME -n $NAMESPACE --timeout=300s
Print-Status "Deployment is ready"

# Get service information
Write-Host "📊 Deployment Information:" -ForegroundColor Blue
Write-Host "Namespace: $NAMESPACE" -ForegroundColor Yellow
Write-Host "Pods:" -ForegroundColor Yellow
kubectl get pods -n $NAMESPACE -l app=$APP_NAME

Write-Host "Services:" -ForegroundColor Yellow
kubectl get services -n $NAMESPACE

Write-Host "Ingress:" -ForegroundColor Yellow
kubectl get ingress -n $NAMESPACE

# Get external IP if available
$externalIP = kubectl get service "$APP_NAME-service" -n $NAMESPACE -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 2>$null
if ($externalIP -and $externalIP -ne "Pending") {
    Write-Host "🌐 Application is accessible at: http://$externalIP" -ForegroundColor Green
} else {
    Write-Host "⏳ External IP is pending. Check with: kubectl get services -n $NAMESPACE" -ForegroundColor Yellow
}

# Restore original deployment file
git checkout k8s/deployment.yaml 2>$null

Print-Status "Deployment completed successfully! 🎉"

Write-Host "📝 Useful commands:" -ForegroundColor Blue
Write-Host "  View pods: kubectl get pods -n $NAMESPACE"
Write-Host "  View logs: kubectl logs -f deployment/$APP_NAME -n $NAMESPACE"
Write-Host "  Scale app: kubectl scale deployment $APP_NAME --replicas=5 -n $NAMESPACE"
Write-Host "  Delete app: kubectl delete namespace $NAMESPACE"
