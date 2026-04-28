# denhoed.coffee

Zakelijke baristatrainingen voor een betere eerste indruk en een blij team.

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- Vercel (hosting + serverless functions)
- Resend (email delivery)

## Development

```bash
npm install
npm run dev
```

## Deployment

Deployed via Vercel. The contact form uses a serverless function at `/api/contact` with [Resend](https://resend.com) for email delivery.

### Environment Variables (Vercel)

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) |
