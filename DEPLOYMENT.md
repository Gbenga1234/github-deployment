# 🚀 Deployment Guide - IT Consulting Web App

This guide provides comprehensive instructions for deploying the IT Consulting Web App to Azure Kubernetes Service (AKS) using GitHub Actions.

## 📋 Prerequisites

### Azure Resources Required
- **Azure Subscription** with appropriate permissions
- **Azure Container Registry (ACR)** for storing Docker images
- **Azure Kubernetes Service (AKS)** cluster
- **Resource Group** containing all resources

### Required Tools
- Azure CLI
- kubectl
- Docker (for local testing)
- Git

## 🔧 Azure Setup

### 1. Create Azure Resources

```bash
# Login to Azure
az login

# Set subscription
az account set --subscription "your-subscription-id"

# Create resource group
az group create --name "it-consulting-rg" --location "East US"

# Create Azure Container Registry
az acr create --resource-group "it-consulting-rg" --name "itconsultingacr" --sku Basic

# Create AKS cluster
az aks create \
  --resource-group "it-consulting-rg" \
  --name "it-consulting-aks" \
  --node-count 3 \
  --node-vm-size "Standard_B2s" \
  --attach-acr "itconsultingacr" \
  --generate-ssh-keys
```

### 2. Get AKS Credentials

```bash
az aks get-credentials --resource-group "it-consulting-rg" --name "it-consulting-aks"
```

## 🔐 GitHub Secrets Configuration

Configure the following secrets in your GitHub repository:

### Required Secrets

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `AZURE_CREDENTIALS` | Azure service principal JSON | `{"clientId":"...","clientSecret":"...","subscriptionId":"...","tenantId":"..."}` |
| `AZURE_RG` | Azure resource group name | `it-consulting-rg` |
| `AKS_CLUSTER_NAME` | AKS cluster name | `it-consulting-aks` |
| `ACR_NAME` | Azure Container Registry name | `itconsultingacr` |
| `ACR_USERNAME` | ACR username | `itconsultingacr` |
| `ACR_PASSWORD` | ACR password | `[ACR admin password]` |

### Creating Azure Service Principal

```bash
# Create service principal
az ad sp create-for-rbac --name "it-consulting-sp" --role contributor --scopes /subscriptions/{subscription-id}/resourceGroups/it-consulting-rg --sdk-auth
```

## 🚀 Deployment Methods

### Method 1: Automated Deployment (Recommended)

1. **Push to main branch** - The GitHub Actions workflow will automatically:
   - Build and test the application
   - Build Docker image
   - Push to Azure Container Registry
   - Deploy to AKS cluster

2. **Monitor deployment** in GitHub Actions tab

### Method 2: Manual Deployment

#### Using Deployment Scripts

**Linux/macOS:**
```bash
# Make script executable
chmod +x scripts/deploy.sh

# Deploy with latest image
./scripts/deploy.sh

# Deploy with specific tag
./scripts/deploy.sh v1.0.0
```

**Windows PowerShell:**
```powershell
# Deploy with latest image
.\scripts\deploy.ps1

# Deploy with specific tag
.\scripts\deploy.ps1 -ImageTag "v1.0.0"
```

#### Using kubectl directly

```bash
# Apply all configurations
kubectl apply -f k8s/complete-deployment.yaml

# Or apply individually
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
kubectl apply -f k8s/hpa.yaml
```

## 🔍 Verification

### Check Deployment Status

```bash
# Check pods
kubectl get pods -n it-consulting-app

# Check services
kubectl get services -n it-consulting-app

# Check ingress
kubectl get ingress -n it-consulting-app

# Check HPA
kubectl get hpa -n it-consulting-app
```

### View Application Logs

```bash
# View pod logs
kubectl logs -f deployment/it-consulting-webapp -n it-consulting-app

# View logs from specific pod
kubectl logs -f <pod-name> -n it-consulting-app
```

### Get External IP

```bash
# Get LoadBalancer external IP
kubectl get service it-consulting-webapp-service -n it-consulting-app

# Get ingress external IP
kubectl get ingress it-consulting-webapp-ingress -n it-consulting-app
```

## 🌐 Accessing the Application

### LoadBalancer Service
- External IP will be assigned automatically
- Access via: `http://<external-ip>`

### Ingress (Recommended for Production)
1. **Configure DNS**: Point your domain to the ingress external IP
2. **Update ingress.yaml**: Replace `it-consulting.yourdomain.com` with your domain
3. **SSL Certificate**: Configure cert-manager for automatic SSL

## 📊 Monitoring and Scaling

### Horizontal Pod Autoscaler
- **Min replicas**: 2
- **Max replicas**: 10
- **CPU threshold**: 70%
- **Memory threshold**: 80%

### Manual Scaling

```bash
# Scale deployment
kubectl scale deployment it-consulting-webapp --replicas=5 -n it-consulting-app

# Check scaling status
kubectl get hpa it-consulting-webapp-hpa -n it-consulting-app
```

## 🔧 Configuration Updates

### Update Application

1. **Modify code** and push to repository
2. **GitHub Actions** will automatically rebuild and deploy
3. **Manual update**:
   ```bash
   kubectl set image deployment/it-consulting-webapp it-consulting-webapp=itconsultingacr.azurecr.io/it-consulting-webapp:new-tag -n it-consulting-app
   ```

### Environment Variables

Update deployment.yaml to add environment variables:

```yaml
env:
- name: NODE_ENV
  value: "production"
- name: PORT
  value: "3000"
- name: CUSTOM_VAR
  value: "custom-value"
```

## 🛠️ Troubleshooting

### Common Issues

1. **Pod not starting**
   ```bash
   kubectl describe pod <pod-name> -n it-consulting-app
   kubectl logs <pod-name> -n it-consulting-app
   ```

2. **Service not accessible**
   ```bash
   kubectl get endpoints it-consulting-webapp-service -n it-consulting-app
   ```

3. **Image pull errors**
   ```bash
   # Check ACR access
   az acr login --name itconsultingacr
   ```

### Useful Commands

```bash
# Delete and recreate deployment
kubectl delete deployment it-consulting-webapp -n it-consulting-app
kubectl apply -f k8s/deployment.yaml

# Port forward for local testing
kubectl port-forward service/it-consulting-webapp-service 3000:80 -n it-consulting-app

# View all resources
kubectl get all -n it-consulting-app
```

## 🧹 Cleanup

### Remove Application

```bash
# Delete all resources
kubectl delete namespace it-consulting-app

# Or delete individually
kubectl delete -f k8s/complete-deployment.yaml
```

### Remove Azure Resources

```bash
# Delete resource group (removes all resources)
az group delete --name "it-consulting-rg" --yes --no-wait
```

## 📈 Production Considerations

### Security
- Enable RBAC
- Use network policies
- Implement pod security policies
- Regular security updates

### Monitoring
- Set up Azure Monitor
- Configure log analytics
- Implement health checks
- Set up alerting

### Backup
- Regular ACR image backups
- Kubernetes configuration backups
- Database backups (if applicable)

## 🆘 Support

For issues and questions:
- Check GitHub Issues
- Review Kubernetes documentation
- Azure AKS documentation
- Contact: support@techconsultpro.com

---

**Happy Deploying! 🚀**
