import { NextResponse } from 'next/server';
import { Resend } from 'resend';

function sanitize(str: string): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // 1. Mandatory presence check
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'missing required fields' }, { status: 400 });
    }

    // 2. Length restrictions (prevents buffer/memory exhaustion and spam flooding)
    if (name.length > 80 || email.length > 120 || message.length > 2500) {
      return NextResponse.json({ error: 'content length limit exceeded' }, { status: 400 });
    }

    // 3. Email format regex verification
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'invalid email address format' }, { status: 400 });
    }

    // 4. Sanitize inputs to escape HTML/script payloads
    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanMessage = sanitize(message);

    if (!process.env.RESEND_API_KEY) {
      console.log('--- Development Mock Email ---');
      console.log(`From: website@adityabhatia.dev`);
      console.log(`To: adi@paxus.in`);
      console.log(`Reply-To: ${cleanEmail}`);
      console.log(`Subject: adityabhatia.dev - message from ${cleanName}`);
      console.log(`Message:\n${cleanMessage}`);
      console.log('------------------------------');
      return NextResponse.json({ success: true, mock: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: 'website@adityabhatia.dev',
      to: 'adi@paxus.in',
      replyTo: cleanEmail,
      subject: `adityabhatia.dev - message from ${cleanName}`,
      text: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\nMessage:\n${cleanMessage}`,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

