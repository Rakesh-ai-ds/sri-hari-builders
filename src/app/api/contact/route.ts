import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key_for_build');

export async function POST(req: Request) {
  try {
    const { name, email, phone, service, message } = await req.json();

    const data = await resend.emails.send({
      from: 'Sri Hari Builder <onboarding@resend.dev>',
      to: [process.env.CONTACT_DESTINATION_EMAIL || 'sriharibuilder7@gmail.com'],
      subject: `New Concept Inquiry: ${name} | ${service}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;700&display=swap');
              
              body {
                font-family: 'Inter', sans-serif;
                background-color: #0F0F0F;
                color: #F8F8F8;
                margin: 0;
                padding: 0;
              }
              .container {
                max-width: 600px;
                margin: 40px auto;
                background: #1A1A1A;
                border: 1px solid rgba(212, 175, 55, 0.1);
                border-radius: 40px;
                overflow: hidden;
                box-shadow: 0 20px 50px rgba(0,0,0,0.5);
              }
              .header {
                background: linear-gradient(135deg, #D4AF37 0%, #B5942D 100%);
                padding: 60px 40px;
                text-align: center;
              }
              .header h1 {
                font-family: 'Crimson Pro', serif;
                font-size: 32px;
                margin: 0;
                color: #0F0F0F;
                letter-spacing: 0.1em;
                text-transform: uppercase;
              }
              .content {
                padding: 60px 40px;
              }
              .badge {
                display: inline-block;
                padding: 6px 12px;
                background: rgba(212, 175, 55, 0.1);
                border: 1px solid rgba(212, 175, 55, 0.3);
                border-radius: 100px;
                color: #D4AF37;
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: 0.2em;
                font-weight: bold;
                margin-bottom: 24px;
              }
              .field-group {
                margin-bottom: 40px;
                border-bottom: 1px solid rgba(255,255,255,0.05);
                padding-bottom: 20px;
              }
              .label {
                font-size: 10px;
                text-transform: uppercase;
                letter-spacing: 0.3em;
                color: rgba(255,255,255,0.4);
                margin-bottom: 8px;
                display: block;
              }
              .value {
                font-family: 'Crimson Pro', serif;
                font-size: 24px;
                color: #FFFFFF;
              }
              .message-box {
                background: rgba(255,255,255,0.02);
                padding: 30px;
                border-radius: 20px;
                border: 1px solid rgba(255,255,255,0.05);
                margin-top: 40px;
              }
              .message-text {
                font-style: italic;
                line-height: 1.8;
                color: rgba(255,255,255,0.8);
                font-size: 18px;
                font-family: 'Crimson Pro', serif;
              }
              .footer {
                padding: 40px;
                text-align: center;
                background: #141414;
                border-top: 1px solid rgba(255,255,255,0.05);
              }
              .footer p {
                font-size: 10px;
                color: rgba(255,255,255,0.3);
                letter-spacing: 0.2em;
                text-transform: uppercase;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Sri Hari Builder</h1>
              </div>
              <div class="content">
                <div class="badge">Inquiry Received</div>
                
                <div class="field-group">
                  <span class="label">Consultation For</span>
                  <div class="value">${service}</div>
                </div>

                <div class="field-group">
                  <span class="label">Client Name</span>
                  <div class="value">${name}</div>
                </div>

                <div class="field-group">
                  <span class="label">Direct Line</span>
                  <div class="value">${phone}</div>
                </div>

                <div class="field-group">
                  <span class="label">Email Address</span>
                  <div class="value">${email}</div>
                </div>

                <div class="message-box">
                  <span class="label" style="margin-bottom: 20px;">The Vision</span>
                  <div class="message-text">"${message}"</div>
                </div>
              </div>
              <div class="footer">
                <p>Engineering Excellence • Since 2008</p>
                <p style="margin-top: 10px;">Sri Hari Builder & Promoters | Coimbatore</p>
              </div>
            </div>
          </body>
        </html>
      `
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Email Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send vision inquiry' }, { status: 500 });
  }
}
