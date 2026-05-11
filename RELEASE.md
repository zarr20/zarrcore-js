# Release Guide

## Current Version: 2.2.0

## Option 1: Publish via GitHub Actions (Recommended)

### Step 1: Create a GitHub Release
1. Go to GitHub repository → Releases → "Create a new release"
2. Tag version: `v2.2.0`
3. Release title: `v2.2.0 - Security & CI Updates`
4. Describe changes:
   ```
   ## Changes
   - Added comprehensive CI/CD workflows
   - Added security scanning (CodeQL, Semgrep, Scorecard)
   - Added dependency review
   - Added unit tests with Vitest
   - Updated README with all features
   - Added .gitignore
   ```
5. Click "Publish release"

The workflow will automatically publish to NPM.

### Step 2: Trigger Manual (Alternative)
1. Go to GitHub → Actions → "Publish to NPM"
2. Click "Run workflow" → "Run workflow"

## Option 2: Publish Locally

### Prerequisites
- Login to NPM: `npm login`
- Must have 2FA enabled on NPM account

### Steps
1. **Update version** (if not already done):
   ```bash
   npm version patch  # or minor, major
   ```

2. **Run tests**:
   ```bash
   npm test
   ```

3. **Dry run** (check what will be published):
   ```bash
   npm run publish:dry
   ```

4. **Publish**:
   ```bash
   npm publish --access public
   ```

5. **Create git tag**:
   ```bash
   git tag v2.2.0
   git push origin v2.2.0
   ```

## NPM Token Setup (for GitHub Actions)

1. Go to https://www.npmjs.com/ → Access Tokens → Generate New Token
2. Token type: "Automation"
3. Copy the token
4. Go to GitHub repo → Settings → Secrets and variables → Actions
5. Click "New repository secret"
6. Name: `NPM_TOKEN`
7. Value: paste your token
8. Click "Add secret"

## Version Commands

```bash
npm run version:patch  # 2.2.0 → 2.2.1
npm run version:minor  # 2.2.0 → 2.3.0
npm run version:major  # 2.2.0 → 3.0.0
```

## Check Published Package

```bash
npm view zarrcore-js
npm install zarrcore-js@latest
```
