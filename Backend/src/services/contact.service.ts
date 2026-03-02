import { getMailTransporter } from "../config/mailer";
import { env } from "../config/env";
import { logger } from "../utils/logger";
import type { ContactInput } from "../schemas/contact.schema";

export async function sendContactEmail(data: ContactInput): Promise<void> {
  const transporter = getMailTransporter();

  const htmlBody = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #14b8a6, #22d3ee); padding: 24px 32px; border-radius: 12px 12px 0 0;">
        <h1 style="margin: 0; color: #fff; font-size: 22px;">📬 New Contact Form Submission</h1>
      </div>
      <div style="background: #f8fafc; padding: 28px 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-weight: 600; width: 100px;">Name</td>
            <td style="padding: 10px 0; color: #1e293b;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Email</td>
            <td style="padding: 10px 0; color: #1e293b;">
              <a href="mailto:${data.email}" style="color: #14b8a6; text-decoration: none;">${data.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b; font-weight: 600;">Subject</td>
            <td style="padding: 10px 0; color: #1e293b;">${data.subject}</td>
          </tr>
        </table>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
        <div style="color: #64748b; font-weight: 600; margin-bottom: 8px;">Message</div>
        <div style="background: #fff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; color: #334155; line-height: 1.6; white-space: pre-wrap;">${data.message}</div>
        <p style="margin-top: 20px; font-size: 12px; color: #94a3b8;">Sent from Almigo Contact Form</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Almigo Contact" <${env.SMTP_USER}>`,
    to: env.CONTACT_TO_EMAIL,
    replyTo: data.email,
    subject: `[Almigo Contact] ${data.subject}`,
    html: htmlBody,
  });

  logger.info(`Contact email sent from ${data.email} — subject: "${data.subject}"`);
}
