#!/bin/bash

# IT Consulting Web App - Deployment Script
# This script automates the deployment process to AKS

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
NAMESPACE="it-consulting-app"
APP_NAME="it-consulting-webapp"
IMAGE_TAG=${1:-latest}

echo -e "${BLUE}🚀 Starting deployment of IT Consulting Web App${NC}"
echo -e "${BLUE}Image tag: ${IMAGE_TAG}${NC}"

# Function to print status
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if kubectl is available
if ! command -v kubectl &> /dev/null; then
    print_error "kubectl is not installed or not in PATH"
    exit 1
fi

# Check if connected to cluster
if ! kubectl cluster-info &> /dev/null; then
    print_error "Not connected to a Kubernetes cluster"
    exit 1
fi

print_status "Connected to Kubernetes cluster"

# Create namespace if it doesn't exist
echo -e "${BLUE}📦 Creating namespace...${NC}"
kubectl apply -f k8s/namespace.yaml
print_status "Namespace created/updated"

# Update image tag in deployment
echo -e "${BLUE}🔄 Updating deployment with image tag: ${IMAGE_TAG}${NC}"
sed -i.bak "s|it-consulting-webapp:latest|it-consulting-webapp:${IMAGE_TAG}|g" k8s/deployment.yaml

# Apply Kubernetes manifests
echo -e "${BLUE}📋 Applying Kubernetes manifests...${NC}"

# Deploy application
kubectl apply -f k8s/deployment.yaml
print_status "Deployment applied"

# Deploy service
kubectl apply -f k8s/service.yaml
print_status "Service applied"

# Deploy ingress (optional - comment out if not using ingress)
kubectl apply -f k8s/ingress.yaml
print_status "Ingress applied"

# Deploy HPA
kubectl apply -f k8s/hpa.yaml
print_status "HPA applied"

# Wait for deployment to be ready
echo -e "${BLUE}⏳ Waiting for deployment to be ready...${NC}"
kubectl rollout status deployment/${APP_NAME} -n ${NAMESPACE} --timeout=300s
print_status "Deployment is ready"

# Get service information
echo -e "${BLUE}📊 Deployment Information:${NC}"
echo -e "${YELLOW}Namespace:${NC} ${NAMESPACE}"
echo -e "${YELLOW}Pods:${NC}"
kubectl get pods -n ${NAMESPACE} -l app=${APP_NAME}

echo -e "${YELLOW}Services:${NC}"
kubectl get services -n ${NAMESPACE}

echo -e "${YELLOW}Ingress:${NC}"
kubectl get ingress -n ${NAMESPACE}

# Get external IP if available
EXTERNAL_IP=$(kubectl get service ${APP_NAME}-service -n ${NAMESPACE} -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 2>/dev/null || echo "Pending")
if [ "$EXTERNAL_IP" != "Pending" ] && [ "$EXTERNAL_IP" != "" ]; then
    echo -e "${GREEN}🌐 Application is accessible at: http://${EXTERNAL_IP}${NC}"
else
    echo -e "${YELLOW}⏳ External IP is pending. Check with: kubectl get services -n ${NAMESPACE}${NC}"
fi

# Restore original deployment file
mv k8s/deployment.yaml.bak k8s/deployment.yaml 2>/dev/null || true

print_status "Deployment completed successfully! 🎉"

echo -e "${BLUE}📝 Useful commands:${NC}"
echo -e "  View pods: kubectl get pods -n ${NAMESPACE}"
echo -e "  View logs: kubectl logs -f deployment/${APP_NAME} -n ${NAMESPACE}"
echo -e "  Scale app: kubectl scale deployment ${APP_NAME} --replicas=5 -n ${NAMESPACE}"
echo -e "  Delete app: kubectl delete namespace ${NAMESPACE}"
