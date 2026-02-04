#!/bin/bash
echo "🚀 Starting Debug Deployment..."
echo "Current directory: $(pwd)"
echo "Listing files:"
ls -la

echo "--------------------------------"
echo "Check firebase version:"
npx firebase --version

echo "--------------------------------"
echo "Check login status:"
npx firebase login

echo "--------------------------------"
echo "Deploying..."
npx firebase deploy --only hosting --project trauma-care-saalfelden --debug

echo "--------------------------------"
echo "DONE. Please copy the output above if it failed."
