<#
Provision Azure App Service for TrustNet-AI (API + Frontend)

Usage:
  1) Fill the variables in the PARAMS section
  2) Run from PowerShell:  ./provision.ps1

Requirements:
  - Azure CLI logged in (az login)
  - Contributor rights on target subscription
#>

param()

# =====================
# PARAMS (EDIT THESE)
# =====================
$SubscriptionId = "<SUBSCRIPTION-ID>"
$ResourceGroup  = "rg-trustnet-prod"
$Location       = "eastus"
$PlanName       = "asp-trustnet-prod"
$ApiAppName     = "trustnet-api-prod"
$WebAppName     = "trustnet-web-prod"

# Azure OpenAI (Required for backend)
$OpenAIKey        = "<OPENAI_API_KEY>"
$OpenAIEndpoint   = "https://YOUR-RESOURCE.openai.azure.com"
$OpenAIDeployment = "<DEPLOYMENT-NAME>"
$OpenAIAPIVer     = "2024-02-01"

# Optional: add your custom frontend domain to CORS (comma-separated if multiple)
$CustomFrontendDomains = @() # e.g. @("https://trustnet.example.com")

# Optional: set Node version for App Service runtime
$NodeVersion = "~22"

# Whether to download publish profiles locally for GitHub Secrets setup
$DownloadPublishProfiles = $false
$PublishProfilesOutput   = Join-Path $HOME "Downloads\trustnet-publish-profiles"

# =====================
# Script starts here
# =====================
Write-Host "Setting subscription..." -ForegroundColor Cyan
az account set --subscription $SubscriptionId

Write-Host "Creating resource group $ResourceGroup in $Location..." -ForegroundColor Cyan
az group create -n $ResourceGroup -l $Location | Out-Null

Write-Host "Creating Linux App Service plan $PlanName..." -ForegroundColor Cyan
az appservice plan create -n $PlanName -g $ResourceGroup --sku B1 --is-linux | Out-Null

Write-Host "Creating backend web app $ApiAppName..." -ForegroundColor Cyan
az webapp create -g $ResourceGroup -p $PlanName -n $ApiAppName --runtime "NODE:18-lts" | Out-Null

Write-Host "Creating frontend web app $WebAppName..." -ForegroundColor Cyan
az webapp create -g $ResourceGroup -p $PlanName -n $WebAppName --runtime "NODE:18-lts" | Out-Null

Write-Host "Creating Application Insights for backend..." -ForegroundColor Cyan
az monitor app-insights component create -g $ResourceGroup -l $Location -a "appi-$($ApiAppName)" | Out-Null
$AppInsightsConn = az monitor app-insights component show -g $ResourceGroup -a "appi-$($ApiAppName)" --query connectionString -o tsv

# Compose CORS origins
$FrontendOrigins = @("https://$WebAppName.azurewebsites.net") + $CustomFrontendDomains
$AllowedOrigins = ($FrontendOrigins -join ",")

Write-Host "Configuring backend app settings..." -ForegroundColor Cyan
az webapp config appsettings set -g $ResourceGroup -n $ApiAppName --settings \
  PORT=5000 \
  NODE_ENV=production \
  WEBSITE_NODE_DEFAULT_VERSION=$NodeVersion \
  APPLICATIONINSIGHTS_CONNECTION_STRING="$AppInsightsConn" \
  OPENAI_API_KEY="$OpenAIKey" \
  AZURE_OPENAI_ENDPOINT="$OpenAIEndpoint" \
  AZURE_OPENAI_DEPLOYMENT="$OpenAIDeployment" \
  AZURE_OPENAI_API_VERSION="$OpenAIAPIVer" \
  ALLOWED_ORIGINS="$AllowedOrigins" | Out-Null

Write-Host "Configuring frontend app settings..." -ForegroundColor Cyan
$ApiUrl = "https://$ApiAppName.azurewebsites.net/api"
az webapp config appsettings set -g $ResourceGroup -n $WebAppName --settings \
  WEBSITE_NODE_DEFAULT_VERSION=$NodeVersion \
  VITE_API_URL="$ApiUrl" | Out-Null

Write-Host "Backend URL:  https://$ApiAppName.azurewebsites.net" -ForegroundColor Green
Write-Host "Health check: https://$ApiAppName.azurewebsites.net/api/health" -ForegroundColor Green
Write-Host "Frontend URL: https://$WebAppName.azurewebsites.net" -ForegroundColor Green

if ($DownloadPublishProfiles) {
  Write-Host "Downloading publish profiles to $PublishProfilesOutput ..." -ForegroundColor Yellow
  New-Item -ItemType Directory -Force -Path $PublishProfilesOutput | Out-Null
  az webapp deployment list-publishing-profiles -g $ResourceGroup -n $ApiAppName --xml > (Join-Path $PublishProfilesOutput "${ApiAppName}-publish-profile.xml")
  az webapp deployment list-publishing-profiles -g $ResourceGroup -n $WebAppName --xml > (Join-Path $PublishProfilesOutput "${WebAppName}-publish-profile.xml")
  Write-Host "Publish profiles saved. Do NOT commit these files to source control." -ForegroundColor Yellow
}

Write-Host "Provisioning complete. Next steps:" -ForegroundColor Green
Write-Host "  1) Set GitHub secrets with publish profiles: AZURE_WEBAPP_PUBLISH_PROFILE_BACKEND and AZURE_WEBAPP_PUBLISH_PROFILE_FRONTEND"
Write-Host "  2) Update workflow AZURE_WEBAPP_NAME envs if you changed names"
Write-Host "  3) Push to main to trigger deployments"
