# ibheelz - Under Construction Page with Visitor Tracking

## Project Overview

**ibheelz** is a modern, elegant "Under Construction" landing page with real-time visitor tracking and analytics. Visitors are automatically tracked and notified via Discord webhook with detailed geolocation, referral source, and device information.

## Features

### ✨ Design & UI
- **Modern Black & White Aesthetic** - Clean, minimalist design with Apple-inspired typography
- **Jost Font** - Modern, geometric typeface
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Responsive Layout** - Works perfectly on desktop, tablet, and mobile
- **Favicon** - Custom ibheelz logo favicon

### 📊 Visitor Tracking
- **Real-time Discord Notifications** - Instant alerts when someone visits
- **Visit Count** - Tracks total visits from each browser/device using localStorage
- **Last Visit Timestamp** - Records when the visitor last visited
- **Single Notification Per Session** - Uses sessionStorage to prevent duplicate notifications

### 🌍 Geolocation & Network Info
- **Robust Fallback System** - 4 geolocation APIs with automatic fallback
  1. `ip-api.com` - Most detailed data
  2. `ipapi.co` - Good CORS support
  3. `geojs.io` - Lightweight backup
  4. `geolocation-db.com` - Last resort fallback
- **City & Country** - Visitor's location
- **Coordinates** - Latitude & longitude
- **IP Address** - Public IP of the visitor
- **ISP** - Internet Service Provider
- **Organization** - Network organization
- **Timezone** - Visitor's timezone

### 🔗 Referral Source Detection
Automatically detects traffic source:
- **Social Media**: Twitter/X, Instagram, Facebook, TikTok, LinkedIn, Reddit
- **Video**: YouTube
- **Search Engines**: Google, Bing, DuckDuckGo
- **Communication**: Discord, Telegram, WhatsApp
- **Developer**: GitHub
- **Direct Visit** - Direct navigation or unknown source

### 📱 Browser Information
- Full user agent string
- Device type detection (from browser info)
- OS details

## Project Structure

```
ibheelz/
├── index.html          # Main page (HTML + CSS + JavaScript)
├── images/
│   ├── ibheelz.png    # Logo/favicon
│   └── bg.png         # Unused background image
├── claude.md          # This documentation
└── .git/              # Git repository
```

## File Breakdown

### index.html

**HTML Structure:**
- Semantic HTML5 with proper meta tags
- Responsive viewport configuration
- Favicon link pointing to ibheelz.png

**CSS (via Tailwind):**
- Black background with white text
- Centered layout with max-width container
- Responsive typography (h1 changes size on mobile)
- Custom floating animation keyframes

**JavaScript (Visitor Tracking):**
- Runs on page load with 500ms delay
- Tracks geolocation and visitor data
- Sends Discord webhook notification
- Stores visit history in localStorage

## How It Works

### 1. Page Load (Client-Side)
```
User visits website
     ↓
Script detects referrer source
     ↓
Gets user's geolocation (tries 4 APIs)
     ↓
Tracks visit count in localStorage
     ↓
Sends Discord webhook notification
```

### 2. Geolocation Fallback System
```
Try API 1 (ip-api.com)
  ├─ Success? → Use data, send notification
  └─ Fail? → Try API 2

Try API 2 (ipapi.co)
  ├─ Success? → Use data, send notification
  └─ Fail? → Try API 3

Try API 3 (geojs.io)
  ├─ Success? → Use data, send notification
  └─ Fail? → Try API 4

Try API 4 (geolocation-db.com)
  ├─ Success? → Use data, send notification
  └─ Fail? → Use "Unknown" defaults
```

### 3. Discord Notification Format

**Discord Embed Fields:**
- ⏰ Time - Exact timestamp
- 📊 Visit Count - Total visits from this browser
- 🕐 Last Visit - Previous visit timestamp
- 🌍 Location - City, Region, Country
- 📍 Coordinates - Latitude, Longitude
- 🔗 Source - Referral platform (Twitter, Instagram, Direct, etc.)
- 🌐 IP Address - Public IP
- 🏢 ISP - Internet Service Provider
- 🏭 Organization - Network organization
- ⏱️ Timezone - Visitor's timezone
- 📱 Browser - User agent info

### 4. Visit Tracking (localStorage)
```javascript
{
  "count": 3,
  "lastVisit": "17/01/2026, 20:23:16"
}
```

## Setup Instructions

### Prerequisites
- A Discord server with webhook access
- Git for version control
- A web server or hosting platform (GitHub Pages, Vercel, Netlify, etc.)

### Step 1: Create Discord Webhook

1. Open your Discord server
2. Right-click a channel → **Edit Channel**
3. Go to **Integrations** → **Webhooks**
4. Click **New Webhook**
5. Name it "ibheelz Visitor Notifications"
6. Copy the webhook URL

### Step 2: Update Webhook URL

In `index.html`, find line 60:
```javascript
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/YOUR_WEBHOOK_URL';
```

Replace with your actual webhook URL:
```javascript
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1234567890/abcdefg...';
```

### Step 3: Deploy

**Option A: GitHub Pages**
```bash
git add .
git commit -m "Deploy ibheelz"
git push origin main
```

**Option B: Vercel/Netlify**
- Connect your GitHub repo
- Auto-deploys on push

**Option C: Any Static Host**
- Upload `index.html` and `images/` folder
- No backend required

### Step 4: Test

1. Open your website
2. Check Discord channel for notification
3. Refresh the page in an **incognito window** to test (new session = new notification)

## Customization Guide

### Change Page Text
In `index.html`, find lines 43-46:
```html
<h1 class="text-5xl md:text-6xl font-bold mb-5 tracking-tight">Under Construction</h1>
<p class="text-lg text-gray-300 mb-10 leading-relaxed">We're building something amazing. Check back soon for updates.</p>
```

### Change Logo
Replace `images/ibheelz.png` with your logo, or update the src:
```html
<img src="images/your-logo.png" alt="logo" class="w-48 h-48 object-contain" />
```

### Change Colors
- **Black background**: Line 34, change `bg-black` to another Tailwind color
- **White text**: Change `text-white` on the same line
- **Gray text**: Line 46, change `text-gray-300` to lighter/darker gray

### Change Footer
Line 51:
```html
<p>© 2026 ibheelz. All rights reserved.</p>
```

### Change Font
Line 8, modify Google Fonts import:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

## Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (ES6+)** - Visitor tracking logic
- **Google Fonts (Jost)** - Typography

### APIs
- **ip-api.com** - Geolocation API #1
- **ipapi.co** - Geolocation API #2
- **geojs.io** - Geolocation API #3
- **geolocation-db.com** - Geolocation API #4
- **Discord Webhooks** - Real-time notifications

### Storage
- **localStorage** - Persistent visit tracking (per browser)
- **sessionStorage** - Duplicate notification prevention (per session)

### Hosting
- **GitHub Pages** - Current hosting
- Git - Version control

## Debugging

### Check Console Logs

Open DevTools (`F12`) and look for these messages:

**Success indicators:**
```
=== ibheelz Visitor Tracking Started ===
Discord Webhook Configured: true
Attempting to send notification...
✅ Geolocation API 1 succeeded: {city: "Lagos", ...}
✅ Discord notification sent successfully!
```

**Error indicators:**
```
❌ Geolocation API 1 failed: Status 403
✅ Geolocation API 2 succeeded: {...}  // Falls back to next API

❌ Discord returned status: 400
Discord error response: {"embeds": ["0"]}  // Invalid payload
```

### Common Issues

**No Discord notification received:**
1. Hard refresh page: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Test in incognito window (new session)
3. Check webhook URL is correct and not expired
4. Check browser console for errors
5. Verify Discord webhook is still valid (regenerate if needed)

**Location showing as "Unknown":**
- Normal! This means all geolocation APIs timed out or failed
- Check browser console for which APIs failed
- Some networks/VPNs block geolocation APIs

**Duplicate notifications:**
- Clear browser cache/cookies
- Use incognito window to test
- sessionStorage should prevent duplicates in same tab

**Webhook returning 400 error:**
- Check payload in console
- Ensure all Discord embed fields have values
- Verify webhook hasn't been deleted

## Performance

### Page Load
- Lightweight: Single HTML file, no external CSS file
- Tailwind CDN: ~15KB
- Total size: ~50KB unminified

### API Calls
- Geolocation: 3 second timeout per API
- Discord: Fire and forget (doesn't block page)
- No impact on user experience

### Storage
- localStorage: < 1KB per visitor
- sessionStorage: < 1KB per session

## Security Considerations

### What's Safe
- ✅ Discord webhook is listed publicly (by design)
- ✅ No sensitive user data is collected
- ✅ No server-side code to compromise
- ✅ Static site - no SQL injection, no XSS vulnerabilities

### What to Be Aware Of
- ⚠️ Discord webhook URL is public (anyone seeing source could spam it)
- **Mitigation**: Discord webhooks can be easily regenerated
- ⚠️ Visit count is per-browser, not per-IP (can be cleared with cache)
- **Mitigation**: Good enough for casual tracking; use analytics service for strict tracking

## Analytics Example

**From Discord notifications, you can track:**
- How many visitors per day/week/month
- Which traffic sources drive the most visits
- Geographic distribution of visitors
- Browser/device breakdown
- Repeat visitors (via visit count)
- Time patterns (when do people visit)

## Future Enhancements

### Possible Features
- [ ] Google Analytics integration
- [ ] Email notification option (Mailgun/SendGrid)
- [ ] Visitor IP blocklist/whitelist
- [ ] Daily stats digest
- [ ] Geographic heatmap
- [ ] Add a mailing list signup
- [ ] Dark mode toggle (already dark, but could add light mode)

### Code Improvements
- [ ] Extract configuration to separate file
- [ ] Add service worker for offline support
- [ ] Minify/bundle code for production
- [ ] Add error tracking (Sentry)
- [ ] Add A/B testing capability

## License

This project is part of ibheelz. All rights reserved © 2026.

## Git Commits

Key commits in this project:
- Initial setup with background image
- Converted to Apple-inspired black & white theme
- Added Tailwind CSS
- Added Discord webhook integration
- Added geolocation tracking
- Added visit count tracking
- Fixed Discord payload validation
- Implemented 4-API fallback system
- Added favicon
- Added comprehensive documentation

---

**Last Updated:** 17/01/2026
**Current Version:** 1.0
**Status:** Production Ready
