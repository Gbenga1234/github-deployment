# IT Consulting Web Application

A modern, responsive web application for IT consulting services built with Next.js, TypeScript, and Tailwind CSS. This application is designed to be deployed on Azure Kubernetes Service (AKS) using GitHub Actions for CI/CD.

## 🚀 Features

- **Modern UI/UX**: Clean, professional design with responsive layout
- **Service Showcase**: Comprehensive display of IT consulting services
- **Contact Integration**: Interactive contact form and business information
- **Performance Optimized**: Built with Next.js for optimal performance
- **Container Ready**: Dockerized for easy deployment
- **Kubernetes Native**: Complete K8s deployment configurations
- **CI/CD Pipeline**: Automated deployment with GitHub Actions

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **Cloud**: Azure Kubernetes Service (AKS)
- **CI/CD**: GitHub Actions

## 📋 Prerequisites

- Node.js 18+
- Docker
- Kubernetes cluster (AKS recommended)
- Azure CLI
- kubectl

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd it-consulting-webapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Docker Build

1. **Build the Docker image**
   ```bash
   docker build -t it-consulting-webapp .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 it-consulting-webapp
   ```

## ☸️ Kubernetes Deployment

### Prerequisites for AKS Deployment

1. **Azure Resources**
   - Azure Container Registry (ACR)
   - Azure Kubernetes Service (AKS) cluster
   - Resource Group

2. **GitHub Secrets**
   Configure the following secrets in your GitHub repository:
   ```
   AZURE_CREDENTIALS - Azure service principal credentials
   AZURE_RG - Azure resource group name
   AKS_CLUSTER_NAME - AKS cluster name
   ```

### Manual Deployment

1. **Create namespace**
   ```bash
   kubectl apply -f k8s/namespace.yaml
   ```

2. **Deploy application**
   ```bash
   kubectl apply -f k8s/deployment.yaml
   kubectl apply -f k8s/service.yaml
   kubectl apply -f k8s/ingress.yaml
   kubectl apply -f k8s/hpa.yaml
   ```

3. **Check deployment status**
   ```bash
   kubectl get pods -n it-consulting-app
   kubectl get services -n it-consulting-app
   kubectl get ingress -n it-consulting-app
   ```

### Automated Deployment

The GitHub Actions workflow will automatically:
- Build and test the application
- Build and push Docker image to GitHub Container Registry
- Deploy to AKS cluster
- Configure ingress and load balancing

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Hero section
│   ├── Services.tsx       # Services showcase
│   ├── About.tsx          # About section
│   ├── Contact.tsx        # Contact form
│   └── Footer.tsx         # Footer
├── k8s/                   # Kubernetes manifests
│   ├── namespace.yaml     # Namespace configuration
│   ├── deployment.yaml    # Application deployment
│   ├── service.yaml       # Service configuration
│   ├── ingress.yaml       # Ingress configuration
│   └── hpa.yaml          # Horizontal Pod Autoscaler
├── .github/workflows/     # GitHub Actions
│   └── deploy.yml         # CI/CD pipeline
├── Dockerfile             # Docker configuration
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json           # Dependencies and scripts
```

## 🔧 Configuration

### Environment Variables

The application uses the following environment variables:

- `NODE_ENV`: Environment (production/development)
- `PORT`: Server port (default: 3000)

### Kubernetes Configuration

- **Replicas**: 3 (configurable via HPA)
- **Resources**: 256Mi-512Mi memory, 250m-500m CPU
- **Health Checks**: Liveness and readiness probes
- **Auto-scaling**: 2-10 replicas based on CPU/memory usage

## 📊 Monitoring and Scaling

The deployment includes:

- **Health Checks**: Automatic pod health monitoring
- **Auto-scaling**: Horizontal Pod Autoscaler (HPA)
- **Load Balancing**: Kubernetes service with LoadBalancer type
- **Ingress**: External access with SSL/TLS support

## 🔒 Security Considerations

- **Image Security**: Multi-stage Docker build
- **Resource Limits**: CPU and memory constraints
- **Network Policies**: Kubernetes network isolation
- **SSL/TLS**: Automatic certificate management with cert-manager

## 🚀 Production Deployment

1. **Update domain**: Modify `k8s/ingress.yaml` with your domain
2. **Configure SSL**: Set up cert-manager for automatic SSL certificates
3. **Monitor**: Set up monitoring and logging
4. **Backup**: Configure persistent storage if needed

## 📝 Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact: contact@techconsultpro.com
- Documentation: [Project Wiki](link-to-wiki)

---

**Built with ❤️ for modern IT consulting services**

