# 🚀 Simple Deployment Guide for Beginners

This guide will help you deploy your IT Consulting website to the cloud in just a few steps!

## 📋 What You'll Need

Before we start, make sure you have:
- A GitHub account
- An Azure account (free tier is fine)
- Basic computer skills

## 🎯 Step 1: Prepare Your Code

### 1.1 Update Your Website Information

First, let's make this website yours by updating a few files:

**Update your domain name:**
- Open `k8s/ingress.yaml`
- Find line 14: `- it-consulting.yourdomain.com`
- Replace `it-consulting.yourdomain.com` with your actual domain (like `mycompany.com`)

**Update your contact information:**
- Open `components/Contact.tsx`
- Update the phone number, email, and address with your business details

### 1.2 Create Environment File
- Copy `env.example` to `.env`
- Fill in any custom settings you need (most can stay as default)

## 🎯 Step 2: Set Up Azure (Your Cloud Provider)

### 2.1 Create Azure Account
1. Go to [portal.azure.com](https://portal.azure.com)
2. Sign up for a free account
3. You'll get $200 in free credits!

### 2.2 Create Your Cloud Resources

**Option A: Use Azure Portal (Easiest)**
1. In Azure Portal, click "Create a resource"
2. Search for "Container Registry" → Create
3. Search for "Kubernetes Service" → Create
4. Make sure both are in the same "Resource Group"

**Option B: Use Command Line (Advanced)**
```bash
# Login to Azure
az login

# Create resource group
az group create --name "my-website-rg" --location "East US"

# Create container registry
az acr create --resource-group "my-website-rg" --name "mywebsiteacr" --sku Basic

# Create Kubernetes cluster
az aks create \
  --resource-group "my-website-rg" \
  --name "my-website-aks" \
  --node-count 2 \
  --node-vm-size "Standard_B2s" \
  --attach-acr "mywebsiteacr" \
  --generate-ssh-keys
```

## 🎯 Step 3: Set Up GitHub Secrets

### 3.1 Get Your Azure Information
After creating your Azure resources, you need to get some information:

**Get Azure Credentials:**
1. In Azure Portal, go to "Azure Active Directory"
2. Click "App registrations" → "New registration"
3. Name it "my-website-app"
4. Click "Register"
5. Go to "Certificates & secrets" → "New client secret"
6. Copy the secret value
7. Go to "Overview" and copy:
   - Application (client) ID
   - Directory (tenant) ID
   - Your Azure subscription ID

### 3.2 Add Secrets to GitHub
1. Go to your GitHub repository
2. Click "Settings" → "Secrets and variables" → "Actions"
3. Click "New repository secret" and add these:

| Secret Name | What to Put | Example |
|-------------|-------------|---------|
| `AZURE_CREDENTIALS` | JSON with your Azure info | `{"clientId":"123...","clientSecret":"abc...","subscriptionId":"456...","tenantId":"789..."}` |
| `AZURE_RG` | Your resource group name | `my-website-rg` |
| `AKS_CLUSTER_NAME` | Your AKS cluster name | `my-website-aks` |
| `ACR_NAME` | Your container registry name | `mywebsiteacr` |
| `ACR_USERNAME` | Same as ACR name | `mywebsiteacr` |
| `ACR_PASSWORD` | ACR admin password (get from Azure Portal) | `your-password` |

## 🎯 Step 4: Deploy Your Website

### 4.1 Push Your Code
1. Save all your changes
2. In your terminal, run:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 4.2 Watch the Magic Happen!
1. Go to your GitHub repository
2. Click the "Actions" tab
3. You'll see a workflow running called "Build and Deploy to Azure AKS"
4. Wait for it to complete (takes about 5-10 minutes)
5. When it's done, you'll see a green checkmark ✅

## 🎯 Step 5: Access Your Website

### 5.1 Get Your Website URL
1. In Azure Portal, go to your AKS cluster
2. Click "Connect" → "Run the following command"
3. Copy and run the command in your terminal
4. Run: `kubectl get services -n it-consulting-app`
5. Look for the "EXTERNAL-IP" - that's your website URL!

### 5.2 Set Up Your Domain (Optional)
If you have a custom domain:
1. Point your domain to the EXTERNAL-IP you found
2. Update `k8s/ingress.yaml` with your domain
3. Push the changes to GitHub
4. The workflow will automatically update your website

## 🎯 Step 6: Make Changes to Your Website

### 6.1 Update Your Website
1. Edit any files in your code
2. Save the changes
3. Run:
```bash
git add .
git commit -m "Updated website"
git push origin main
```
4. GitHub Actions will automatically rebuild and deploy your changes!

## 🛠️ Troubleshooting

### My Website Isn't Working!
1. **Check the Actions tab** - Look for any red X marks
2. **Check your secrets** - Make sure all GitHub secrets are correct
3. **Check Azure resources** - Make sure your AKS cluster is running

### Common Issues:

**"Image pull failed"**
- Check your ACR credentials in GitHub secrets

**"No external IP"**
- Wait a few minutes for Azure to assign an IP
- Check if your AKS cluster is running

**"Website not loading"**
- Check if your pods are running: `kubectl get pods -n it-consulting-app`
- Check logs: `kubectl logs -f deployment/it-consulting-webapp -n it-consulting-app`

### Useful Commands:
```bash
# Check if everything is running
kubectl get all -n it-consulting-app

# View website logs
kubectl logs -f deployment/it-consulting-webapp -n it-consulting-app

# Restart your website
kubectl rollout restart deployment/it-consulting-webapp -n it-consulting-app
```

## 💰 Cost Management

### Free Tier Limits:
- Azure gives you $200 free credits
- AKS cluster costs about $30-50/month
- Container Registry costs about $5/month
- **Total estimated cost: $35-55/month**

### To Save Money:
1. **Stop your cluster when not using it:**
   ```bash
   az aks stop --name my-website-aks --resource-group my-website-rg
   ```

2. **Start it when you need it:**
   ```bash
   az aks start --name my-website-aks --resource-group my-website-rg
   ```

## 🎉 Congratulations!

You've successfully deployed your website to the cloud! Your website is now:
- ✅ Running on professional cloud infrastructure
- ✅ Automatically updating when you make changes
- ✅ Scalable and reliable
- ✅ Accessible from anywhere in the world

## 📞 Need Help?

If you get stuck:
1. Check the GitHub Actions logs for error messages
2. Look at the troubleshooting section above
3. Make sure all your Azure resources are running
4. Verify your GitHub secrets are correct

## 🔄 Next Steps

Once your website is running:
1. **Customize it** - Update the content, colors, and images
2. **Add features** - Contact forms, analytics, etc.
3. **Set up monitoring** - Track your website's performance
4. **Backup regularly** - Keep your code safe

---

**Remember:** This is your website now! Make it yours by updating the content, colors, and features to match your business.

**Happy Deploying! 🚀**
