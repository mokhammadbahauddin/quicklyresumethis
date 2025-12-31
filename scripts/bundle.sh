#!/bin/bash
echo "📦 Bundling SaaS Kit for Sale..."

# Clean build artifacts to save space
echo "Cleaning node_modules and build files..."
rm -rf node_modules .next dist out

# Create Zip
echo "Zipping..."
zip -r resume-saas-kit.zip . -x ".git/*" -x "node_modules/*" -x ".next/*" -x "*.log" -x "*.DS_Store" -x "verification/*"

echo "✅ Done! 'resume-saas-kit.zip' is ready to upload to Gumroad."
