# HOUSE OF MOJARI - Quick Start (run in PowerShell)
Set-Location $PSScriptRoot

if (-not (Test-Path "node_modules\next\dist\bin\next")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install --ignore-scripts
}

Write-Host "Starting server at http://localhost:3000" -ForegroundColor Green
node node_modules/next/dist/bin/next dev
