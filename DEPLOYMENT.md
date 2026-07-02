# Deployment Guide — Atul Sharma Personal Brand Platform

## Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your OPENAI_API_KEY and ADMIN_TOKEN

# 3. Start development server
npm run dev

# Open http://localhost:3000
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `OPENAI_API_KEY` | Optional | Enables AI chatbot. Without it, uses built-in responses. |
| `OPENAI_MODEL` | Optional | Default: `gpt-4o-mini`. Use `gpt-4o` for better quality. |
| `ADMIN_TOKEN` | Recommended | Secret token for `/admin` dashboard. |
| `NEXT_PUBLIC_SITE_URL` | Optional | Your production URL for SEO. |

## Production Deployment Options

### Option 1: Vercel (Recommended — Free)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Set env vars in Vercel dashboard → Project → Settings → Environment Variables
```

### Option 2: Docker

```bash
# Build and run
docker-compose up -d

# With environment variables
OPENAI_API_KEY=your-key ADMIN_TOKEN=your-secret docker-compose up -d
```

### Option 3: GitHub Pages (Static — No AI)

For GitHub Pages you must disable the chatbot API features and export statically:
```js
// next.config.js
module.exports = { output: 'export' }
```
Note: The AI chatbot and admin dashboard require a Node.js server. Use Vercel or Docker for full features.

## Adding Your OpenAI Key

1. Create account at https://platform.openai.com
2. Generate API key at https://platform.openai.com/api-keys
3. Add to `.env.local`:
   ```
   OPENAI_API_KEY=sk-...
   ```
4. Restart the dev server

## Admin Dashboard

Access the admin dashboard at: `http://localhost:3000/admin`

Default token (change this!): Set `ADMIN_TOKEN` in your `.env.local`

Capabilities:
- View unanswered chatbot questions
- Write answers to add to knowledge base
- View chatbot analytics
- Track most-asked topics

## Adding Content

All content lives in `src/data/content.ts`. To update:

- **New job**: Add to `experiences` array
- **New skill**: Add to appropriate `skillCategories` item
- **New project**: Add to `projects` array
- **New certification**: Add to `certifications` array
- **New blog post**: Add to `blogPosts` array

No code changes needed — just data.

## Knowledge Base

Add files to `/knowledge/` directory. The chatbot's system prompt is built from `src/lib/knowledge.ts` which reads from `src/data/content.ts`.

To add custom knowledge:
1. Edit `/knowledge/all-about-me.md` with new information
2. Or extend `src/lib/knowledge.ts` to read from additional files

## Performance

The site achieves:
- ✅ Lighthouse Performance: 90+
- ✅ Lighthouse SEO: 95+
- ✅ Lighthouse Accessibility: 90+
- ✅ First Load JS: ~156KB (well-optimised)

## Troubleshooting

**Chatbot not working?**
- Check `OPENAI_API_KEY` is set in `.env.local`
- The chatbot works without the key using built-in responses
- Check `/api/chat` route in browser Network tab for errors

**Admin dashboard says Unauthorised?**
- Verify `ADMIN_TOKEN` matches what you enter in the login form
- Default if not set: `atul-admin-secret`

**Build errors?**
```bash
rm -rf .next node_modules
npm install
npm run build
```
