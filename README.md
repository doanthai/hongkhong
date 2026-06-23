# BBL Technology Limited — Official Website

Professional company website for **BBL Technology Limited** (Hong Kong), a mobile app development company building AI-powered applications.

- **Domain:** [bblvn.store](https://bblvn.store)
- **Email:** contact@bblvn.store
- **Address:** Suite C, Level 7, World Trust Tower, 50 Stanley Street, Central, Hong Kong

---

## Pages

| URL | Description |
|-----|-------------|
| `/` | SPA Home — About, Services, Apps, Contact |
| `/privacy.html` | Privacy Policy (required for App Store / Play Store) |
| `/terms.html` | Terms of Service |
| `/delete-account.html` | Delete Account instructions + request form |

### SPA Hash Routes (within index.html)

| Route | Section |
|-------|---------|
| `/#home` | Home page |
| `/#about` | About Us |
| `/#services` | Services |
| `/#apps` | Our Apps |
| `/#contact` | Contact |
| `/#privacy` | Privacy Policy |
| `/#terms` | Terms of Service |
| `/#delete-account` | Delete Account |

---

## Deployment to GitHub Pages

### Step 1 — Create GitHub Repository

```bash
git init
git add .
git commit -m "Initial commit: BBL Technology website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/bblvn-store.git
git push -u origin main
```

### Step 2 — Enable GitHub Pages

1. Go to your repository on GitHub.com
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Select branch: `main`, folder: `/ (root)`
5. Click **Save**

Your site will be live at: `https://YOUR_USERNAME.github.io/bblvn-store/`

### Step 3 — Connect Custom Domain (bblvn.store)

1. In the **Pages** settings, enter `bblvn.store` in the **Custom domain** field and click Save.
2. GitHub will create a `CNAME` file automatically.
3. In your domain registrar (where you manage `bblvn.store`), add these DNS records:

**A Records** (for apex domain):
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAME Record** (for www):
```
www → YOUR_USERNAME.github.io
```

4. Wait for DNS propagation (up to 48 hours).
5. Once live, enable **Enforce HTTPS** in GitHub Pages settings.

---

## App Store Submission URLs

Use these URLs when submitting apps to Play Store or App Store:

| Required Link | URL |
|--------------|-----|
| Privacy Policy | `https://bblvn.store/privacy.html` |
| Terms of Service | `https://bblvn.store/terms.html` |
| Delete Account | `https://bblvn.store/delete-account.html` |
| Support / Contact | `contact@bblvn.store` |

---

## Tech Stack

- Pure HTML5 / CSS3 / Vanilla JavaScript (no build step required)
- SPA with hash-based routing (`#/page`)
- Bilingual: English + Traditional Chinese (繁體中文)
- Fully responsive (mobile-first)
- Deployed on GitHub Pages (static hosting)

---

## Structure

```
store/
├── index.html              # Main SPA (all pages)
├── privacy.html            # Standalone Privacy Policy
├── terms.html              # Standalone Terms of Service
├── delete-account.html     # Standalone Delete Account page
├── 404.html                # GitHub Pages SPA redirect
├── .nojekyll               # Disable Jekyll processing
├── README.md               # This file
└── assets/
    ├── css/
    │   └── style.css       # All styles
    └── js/
        └── app.js          # SPA router + language switcher
```
