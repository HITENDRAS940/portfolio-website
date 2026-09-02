# Hitendra Singh Shaktawat - Portfolio

Animated software engineering portfolio built with React, TypeScript, and Vite.

## Local development

```bash
npm install
npm run dev
```

To test the Vercel API route locally, use Vercel's dev server and provide a
Gemini key:

```bash
cp .env.example .env.local
vercel dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deploy on Vercel

1. Import this GitHub repository into Vercel.
2. Keep the detected framework as `Vite`.
3. Add `GEMINI_API_KEY` under the Vercel project's Environment Variables.
4. Deploy. The build command and output directory are already configured in `vercel.json`.
5. Add the custom domain under the Vercel project's Domains settings, then copy Vercel's DNS records into the Hostinger DNS editor.

The portfolio AI command uses `ask <question>` and calls `/api/ask` from the
frontend. The Gemini key is read only inside the Vercel serverless function.

Abuse protection is intentionally lightweight: the API validates input, caps
questions at 500 characters, limits Gemini output, and does not send chat
history. Reliable distributed rate limiting on Vercel would require shared
storage such as Redis or a database, which this project does not add.
