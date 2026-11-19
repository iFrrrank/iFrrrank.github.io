#!/bin/bash
set -e

git config --global user.name "github-actions[bot]"
git config --global user.email "github-actions[bot]@users.noreply.github.com"

echo "📥 1. Cloning official NotionNext repository..."
git clone --depth=1 https://github.com/notionnext-org/NotionNext.git /tmp/notionnext
rm -rf /tmp/notionnext/.git

echo "🧹 2. Cleaning old VuePress files (preserving .git and .github)..."
find . -maxdepth 1 ! -name '.git' ! -name '.github' ! -name '.' -exec rm -rf {} +

echo "📦 3. Copying NotionNext codebase..."
shopt -s dotglob
for item in /tmp/notionnext/*; do
  base=$(basename "$item")
  if [ "$base" != ".git" ] && [ "$base" != ".github" ]; then
    cp -r "$item" .
  fi
done

echo "🧹 4. Removing setup script and setup workflow..."
rm -f .github/workflows/setup-notionnext.yml
rm -rf .github/scripts

echo "🚀 5. Committing and pushing NotionNext to refactor-blog..."
git add -A
git commit -m "chore: migrate blog to NotionNext for GitHub Pages"
git push origin refactor-blog
echo "✅ Initialization successfully finished!"
