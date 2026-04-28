import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, company, email, date, message } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Naam en e-mailadres zijn verplicht.' });
  }

  try {
    await resend.emails.send({
      from: 'denhoed.coffee <noreply@denhoed.coffee>',
      to: 'rimmer@denhoed.coffee',
      replyTo: email,
      subject: `Nieuwe training aanvraag van ${name}${company ? ` (${company})` : ''}`,
      html: `
        <h2>Nieuwe aanvraag via denhoed.coffee</h2>
        <p><strong>Naam:</strong> ${name}</p>
        ${company ? `<p><strong>Bedrijf:</strong> ${company}</p>` : ''}
        <p><strong>E-mail:</strong> ${email}</p>
        ${date ? `<p><strong>Gewenste datum:</strong> ${date}</p>` : ''}
        ${message ? `<p><strong>Opmerkingen:</strong><br/>${message}</p>` : ''}
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Er ging iets mis bij het versturen.' });
  }
}
