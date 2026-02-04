#!/bin/bash
echo "🚀 Preparing clean deployment..."

# Create a clean public folder
rm -rf public
mkdir public

# Copy website files into public
echo "📂 Copying files to public/..."
cp index.html public/
cp kontakt.html public/
cp impressum.html public/
cp styles.css public/
cp -r assets public/
cp -r js public/  # <--- Added this line to copy JavaScript files!

# Deploy strictly from public folder
echo "🚀 Deploying 'public' folder..."
npx firebase deploy --only hosting --project trauma-care-saalfelden

echo "✅ DONE. Check URL now."
