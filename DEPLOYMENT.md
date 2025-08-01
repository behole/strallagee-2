# 🚀 Deploying to Vercel

## Quick Deployment Steps

### 1. Create GitHub Repository
1. Go to [GitHub](https://github.com/new)
2. Repository name: `horoscope-generator-poc`
3. Description: "Proof of concept for data-driven horoscope generation using Claude AI"
4. Make it **Public** (for free Vercel hosting)
5. ✅ Initialize with README
6. Click "Create repository"

### 2. Upload Files to GitHub

**Option A: GitHub Web Interface**
1. Click "uploading an existing file" on your new repo
2. Drag and drop all the files from this folder (except `.env` - that stays local!)
3. Commit the files

**Option B: Git Commands**
```bash
git init
git add .
git commit -m "Initial horoscope generator POC"
git remote add origin https://github.com/YOUR_USERNAME/horoscope-generator-poc.git
git push -u origin main
```

### 3. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your `horoscope-generator-poc` repository
5. **Important**: Configure environment variables:
   - Variable name: `CLAUDE_API_KEY`
   - Value: Your actual Claude API key from console.anthropic.com
6. Click "Deploy"

### 4. Environment Variables in Vercel

In your Vercel project dashboard:
1. Go to "Settings" → "Environment Variables"
2. Add:
   ```
   Name: CLAUDE_API_KEY
   Value: sk-ant-api03-... (your actual key)
   Environment: Production
   ```
3. Save and redeploy if needed

## 🎯 Expected Result

After deployment, you'll get a URL like:
`https://horoscope-generator-poc-yourname.vercel.app`

Test it by:
1. Filling out the form with minimal data (just birth date)
2. Filling out with maximum data
3. Comparing the quality difference

## 🐛 Troubleshooting

### "Build Failed"
- Check that all files are in the correct structure
- Ensure `package.json` is in the root directory

### "API Error 401"
- Verify `CLAUDE_API_KEY` is set correctly in Vercel settings
- Check the key works at console.anthropic.com

### "Function Timeout"
- Claude API can take 10-30 seconds for complex readings
- This is normal for the free tier

### "Module Not Found"
- Ensure `package.json` includes all dependencies
- Redeploy after any package.json changes

## 💰 Cost Expectations

- **Vercel**: Free for personal projects
- **Claude API**: ~$0.01-0.03 per horoscope generation
- **GitHub**: Free for public repositories

Perfect for testing and small-scale usage!

## 🔄 Making Updates

After initial deployment:
1. Edit files locally or on GitHub
2. Push changes to main branch
3. Vercel automatically redeploys
4. Changes live in ~30 seconds

---

**Next Step**: Once deployed, test the core hypothesis by generating horoscopes at different data richness levels!