#!/bin/bash

# Stop on error
set -e

echo "🚀 Starting Deployment Repair..."

# Install firebase-tools locally to ensure we have the command
echo "📦 Installing firebase-tools..."
npm install --save-dev firebase-tools

# Force login check
echo "🔑 Checking Login..."
npx firebase login

# Deploy targeting the specific project
echo "🚀 Deploying to trauma-care-saalfelden..."
npx firebase deploy --only hosting --project trauma-care-saalfelden

echo "✅ DONE! Please check the URL again."
