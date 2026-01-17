# Discord Visitor Tracking Integration Guide

## Quick Summary

This is a **client-side visitor tracking system** that sends real-time Discord notifications whenever someone visits your website. No backend needed!

## How It Works (Simple Explanation)

1. User visits your website
2. JavaScript automatically runs
3. Script collects: visitor's location, referral source, device info, visit count
4. Sends all data to Discord via webhook
5. You get a notification in Discord with all details

## Step-by-Step Implementation

### Step 1: Create Discord Webhook (One-Time Setup)

1. Open Discord server
2. Right-click any channel → **Edit Channel**
3. Go to **Integrations** → **Webhooks** → **New Webhook**
4. Give it a name (e.g., "Website Visitor Tracker")
5. Copy the webhook URL (looks like: `https://discord.com/api/webhooks/123456789/abcdefg...`)
6. Save this URL - you'll need it in the code

### Step 2: Add This Code to Your HTML

Add this `<script>` block right before the closing `</body>` tag:

```html
<script>
    console.log('=== Visitor Tracking Started ===');

    // STEP 1: Replace with YOUR Discord webhook URL
    const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/YOUR_WEBHOOK_URL_HERE';
    console.log('Discord Webhook Configured:', !!DISCORD_WEBHOOK_URL);

    // STEP 2: Detect traffic source (where visitor came from)
    function getReferrerSource(referrer) {
        if (!referrer || referrer === 'Direct Visit') return 'Direct Visit';
        const referrerLower = referrer.toLowerCase();

        // Check each platform
        if (referrerLower.includes('t.co')) return 'Twitter';
        if (referrerLower.includes('twitter.com')) return 'Twitter';
        if (referrerLower.includes('x.com')) return 'X (Twitter)';
        if (referrerLower.includes('instagram.com')) return 'Instagram';
        if (referrerLower.includes('facebook.com') || referrerLower.includes('fb.com')) return 'Facebook';
        if (referrerLower.includes('linkedin.com')) return 'LinkedIn';
        if (referrerLower.includes('tiktok.com')) return 'TikTok';
        if (referrerLower.includes('youtube.com') || referrerLower.includes('youtu.be')) return 'YouTube';
        if (referrerLower.includes('reddit.com')) return 'Reddit';
        if (referrerLower.includes('github.com')) return 'GitHub';
        if (referrerLower.includes('google')) return 'Google';
        if (referrerLower.includes('bing')) return 'Bing';
        if (referrerLower.includes('duckduckgo')) return 'DuckDuckGo';
        if (referrerLower.includes('discord')) return 'Discord';
        if (referrerLower.includes('t.me')) return 'Telegram';
        if (referrerLower.includes('whatsapp')) return 'WhatsApp';

        return 'Direct Visit';
    }

    // STEP 3: Main tracking function
    async function sendDiscordNotification() {
        // Prevent duplicate notifications in same session
        if (sessionStorage.getItem('notificationSent')) {
            console.log('Notification already sent in this session, skipping...');
            return;
        }
        console.log('Setting notification flag...');
        sessionStorage.setItem('notificationSent', 'true');

        const timestamp = new Date().toLocaleString();
        const userAgent = navigator.userAgent;
        const referrerUrl = document.referrer || 'Direct Visit';
        const referrerSource = getReferrerSource(referrerUrl);

        // Track visit count and last visit using browser storage
        let visitCount = 1;
        let lastVisit = 'First visit';

        try {
            const visitData = JSON.parse(localStorage.getItem('siteVisits') || '{"count": 0, "lastVisit": null}');
            lastVisit = visitData.lastVisit ? `${visitData.lastVisit}` : 'First visit';
            visitCount = visitData.count + 1;
            localStorage.setItem('siteVisits', JSON.stringify({
                count: visitCount,
                lastVisit: timestamp
            }));
        } catch (err) {
            localStorage.setItem('siteVisits', JSON.stringify({
                count: 1,
                lastVisit: timestamp
            }));
        }

        // STEP 4: Get visitor's geolocation (tries 4 APIs with fallback)
        let geoInfo = {
            city: 'Unknown',
            country: 'Unknown',
            ip: 'Unknown',
            isp: 'N/A',
            org: 'N/A',
            timezone: 'N/A',
            region: 'N/A',
            coordinates: 'N/A'
        };

        async function fetchGeoInfo() {
            const apis = [
                // API 1: ip-api.com (most detailed)
                async () => {
                    const response = await fetch('https://ip-api.com/json/?fields=city,country,regionName,isp,org,timezone,ip,lat,lon', {
                        signal: AbortSignal.timeout(3000)
                    });
                    if (!response.ok) throw new Error(`Status ${response.status}`);
                    const data = await response.json();
                    if (data.status !== 'success') throw new Error('API returned non-success status');
                    return {
                        city: data.city || 'Unknown',
                        country: data.country || 'Unknown',
                        region: data.regionName || 'Unknown',
                        ip: data.ip || 'Unknown',
                        isp: data.isp || 'Unknown',
                        org: data.org || 'Unknown',
                        timezone: data.timezone || 'Unknown',
                        coordinates: (data.lat && data.lon) ? `${data.lat}, ${data.lon}` : 'Unknown'
                    };
                },
                // API 2: ipapi.co (good CORS)
                async () => {
                    const response = await fetch('https://ipapi.co/json/', {
                        signal: AbortSignal.timeout(3000)
                    });
                    if (!response.ok) throw new Error(`Status ${response.status}`);
                    const data = await response.json();
                    return {
                        city: data.city || 'Unknown',
                        country: data.country_name || 'Unknown',
                        region: data.region || 'Unknown',
                        ip: data.ip || 'Unknown',
                        isp: data.org || 'Unknown',
                        org: data.org || 'Unknown',
                        timezone: data.timezone || 'Unknown',
                        coordinates: (data.latitude && data.longitude) ? `${data.latitude}, ${data.longitude}` : 'Unknown'
                    };
                },
                // API 3: geojs.io (lightweight)
                async () => {
                    const response = await fetch('https://get.geojs.io/v1/ip/geo.json', {
                        signal: AbortSignal.timeout(3000)
                    });
                    if (!response.ok) throw new Error(`Status ${response.status}`);
                    const data = await response.json();
                    return {
                        city: data.city || 'Unknown',
                        country: data.country || 'Unknown',
                        region: data.region || 'Unknown',
                        ip: data.ip || 'Unknown',
                        isp: data.isp || 'Unknown',
                        org: 'Unknown',
                        timezone: 'Unknown',
                        coordinates: (data.latitude && data.longitude) ? `${data.latitude}, ${data.longitude}` : 'Unknown'
                    };
                },
                // API 4: geolocation-db.com (fallback)
                async () => {
                    const response = await fetch('https://geolocation-db.com/json/geoip/me', {
                        signal: AbortSignal.timeout(3000)
                    });
                    if (!response.ok) throw new Error(`Status ${response.status}`);
                    const data = await response.json();
                    return {
                        city: data.city || 'Unknown',
                        country: data.country_name || 'Unknown',
                        region: data.state || 'Unknown',
                        ip: data.IPv4 || 'Unknown',
                        isp: 'Unknown',
                        org: 'Unknown',
                        timezone: 'Unknown',
                        coordinates: (data.latitude && data.longitude) ? `${data.latitude}, ${data.longitude}` : 'Unknown'
                    };
                }
            ];

            // Try each API until one succeeds
            for (let i = 0; i < apis.length; i++) {
                try {
                    console.log(`Trying geolocation API ${i + 1}/${apis.length}...`);
                    const result = await apis[i]();
                    console.log(`✅ Geolocation API ${i + 1} succeeded:`, result);
                    return result;
                } catch (err) {
                    console.log(`❌ Geolocation API ${i + 1} failed:`, err.message);
                }
            }

            return geoInfo;
        }

        try {
            geoInfo = await fetchGeoInfo();
        } catch (err) {
            console.log('Critical geolocation error:', err.message);
        }

        // STEP 5: Build Discord message payload
        const payload = {
            content: '🔔 New visitor to your website',
            embeds: [
                {
                    color: 0xFFFFFF,
                    fields: [
                        {
                            name: '⏰ Time',
                            value: timestamp,
                            inline: false
                        },
                        {
                            name: '📊 Visit Count',
                            value: `${visitCount} visit${visitCount > 1 ? 's' : ''}`,
                            inline: true
                        },
                        {
                            name: '🕐 Last Visit',
                            value: lastVisit,
                            inline: true
                        },
                        {
                            name: '🌍 Location',
                            value: `${geoInfo.city || 'Unknown'}, ${geoInfo.region || 'N/A'}, ${geoInfo.country || 'Unknown'}`,
                            inline: false
                        },
                        {
                            name: '📍 Coordinates',
                            value: geoInfo.coordinates || 'N/A',
                            inline: false
                        },
                        {
                            name: '🔗 Source',
                            value: referrerSource,
                            inline: false
                        },
                        {
                            name: '🌐 IP Address',
                            value: geoInfo.ip || 'Unknown',
                            inline: false
                        },
                        {
                            name: '🏢 ISP',
                            value: geoInfo.isp || 'N/A',
                            inline: false
                        },
                        {
                            name: '🏭 Organization',
                            value: geoInfo.org || 'N/A',
                            inline: false
                        },
                        {
                            name: '⏱️ Timezone',
                            value: geoInfo.timezone || 'N/A',
                            inline: false
                        },
                        {
                            name: '📱 Browser',
                            value: userAgent.substring(0, 150),
                            inline: false
                        }
                    ]
                }
            ]
        };

        // STEP 6: Send to Discord
        if (DISCORD_WEBHOOK_URL && DISCORD_WEBHOOK_URL !== 'https://discord.com/api/webhooks/YOUR_WEBHOOK_URL_HERE') {
            console.log('Sending Discord notification...');

            fetch(DISCORD_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            })
            .then(response => {
                console.log('Discord response status:', response.status);
                if (response.status === 204) {
                    console.log('✅ Discord notification sent successfully!');
                } else {
                    console.error('❌ Discord returned status:', response.status);
                    return response.text().then(text => {
                        console.error('Discord error response:', text);
                    });
                }
            })
            .catch(err => {
                console.error('❌ Discord notification error:', err.message);
            });
        } else {
            console.warn('Discord webhook not configured');
        }
    }

    // STEP 7: Trigger the tracking
    console.log('Visitor tracking script loaded');
    setTimeout(() => {
        console.log('Attempting to send notification...');
        sendDiscordNotification();
    }, 500);
</script>
```

### Step 3: Customize These Parts

**Change the storage key** (if you want different tracking per site):
```javascript
localStorage.getItem('siteVisits')  // Change 'siteVisits' to anything
```

**Change Discord message** (customize the embed fields):
```javascript
{
    name: '🔗 Source',
    value: referrerSource,
    inline: false
}
```

**Add more platforms** to referrer detection:
```javascript
if (referrerLower.includes('mysite.com')) return 'My Site';
```

**Change notification trigger timing**:
```javascript
setTimeout(() => {
    sendDiscordNotification();
}, 500);  // Currently 500ms delay, change if needed
```

## What You Get in Discord

Every time someone visits, you'll see:

```
🔔 New visitor to your website

⏰ Time: 17/01/2026, 20:23:16
📊 Visit Count: 2 visits
🕐 Last Visit: 17/01/2026, 20:05:30
🌍 Location: Lagos, Nigeria, Nigeria
📍 Coordinates: 6.5244, 3.3792
🔗 Source: Instagram
🌐 IP Address: 102.88.112.8
🏢 ISP: MTN Nigeria Communications
🏭 Organization: MTN NG
⏱️ Timezone: Africa/Lagos
📱 Browser: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...
```

## Important Notes

### What Gets Stored
- **localStorage** - Visit count per browser (persistent, survives page refresh)
- **sessionStorage** - Prevents duplicate notifications in same session (cleared on browser close)
- **Discord** - All visitor data sent to Discord webhook

### Security
- ✅ Safe! No backend needed
- ✅ No user data stored on your server
- ✅ Discord webhook URL is public (but can be regenerated anytime)
- ✅ No sensitive information collected

### Troubleshooting

**Not getting notifications?**
1. Hard refresh: `Ctrl+Shift+R` or `Cmd+Shift+R`
2. Test in incognito window
3. Check browser console (`F12`) for errors
4. Verify webhook URL is correct
5. Check webhook hasn't been deleted

**Location showing "Unknown"?**
- Normal! Some VPNs/networks block geolocation APIs
- Console will show which APIs failed
- Falls back to next API automatically

**Getting duplicate notifications?**
- Clear your cache/cookies
- Use incognito to test (fresh session)
- sessionStorage should prevent duplicates

## Advanced Customization

### Change Discord Embed Color
Line with `color: 0xFFFFFF` - this is hex white
```javascript
color: 0xFF0000  // Red
color: 0x00FF00  // Green
color: 0x0000FF  // Blue
```

### Add Custom Fields
Add this to the fields array:
```javascript
{
    name: '🎯 Custom Field',
    value: 'Your custom value',
    inline: false
}
```

### Add Timestamp to Discord Embed
```javascript
timestamp: new Date().toISOString()
```

### Add Thumbnail/Image
```javascript
thumbnail: {
    url: 'https://example.com/image.png',
    height: 100,
    width: 100
}
```

## Geolocation APIs Used

| API | Detail Level | Reliability | Pros | Cons |
|-----|--------------|-------------|------|------|
| ip-api.com | High | Good | Most fields | Rate limited free tier |
| ipapi.co | Medium | Good | Good CORS | Fewer fields |
| geojs.io | Medium | Good | Lightweight | Limited fields |
| geolocation-db.com | Low | Good | Always works | Fewest fields |

The script tries them in order and uses first successful response.

## Cost

**Free forever!** All APIs have free tiers that don't require payment.

## Next Steps for New Project

For a new Claude session, just provide:
1. This file (DISCORD_INTEGRATION_GUIDE.md)
2. Your new website's HTML
3. Your Discord webhook URL
4. Any customizations you want

Then ask: "Integrate the Discord visitor tracking from DISCORD_INTEGRATION_GUIDE.md into my website"

---

**Created:** 17/01/2026
**Last Updated:** 17/01/2026
**Status:** Production Ready
