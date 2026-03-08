import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

// Email transport configuration
const createTransporter = () => {
  // Using Gmail with App Password (recommended approach)
  // You can also use other SMTP services
  return nodemailer.createTransport({
    service: process.env.SMTP_SERVICE || "gmail",
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

// Email template for owner notification
const ownerEmailTemplate = (
  name: string,
  email: string,
  eventDate: string,
  serviceType: string,
  vision: string,
) => {
  const serviceTypeLabels: Record<string, string> = {
    "custom-wedding-cake": "Custom Wedding Cake",
    "event-styling": "Event Styling & Decor",
    "corporate-catering": "Corporate Catering",
    "private-celebration": "Private Celebration",
  };

  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2 style="color: #0066cc;">New Inquiry from Perfect White Bakery Website</h2>
      
      <p>You have received a new inquiry from a potential client:</p>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Client Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Event Date:</strong> ${eventDate}</p>
        <p><strong>Service Type:</strong> ${serviceTypeLabels[serviceType] || serviceType}</p>
        <p><strong>Vision/Requirements:</strong></p>
        <p style="white-space: pre-wrap; background-color: white; padding: 10px; border-left: 4px solid #0066cc;">
          ${vision}
        </p>
      </div>
      
      <p>Please contact the client at your earliest convenience to discuss their event.</p>
      
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
      <p style="font-size: 12px; color: #999;">
        This is an automated email from your Perfect White Bakery website contact form.
      </p>
    </div>
  `;
};

// Email template for client confirmation
const clientEmailTemplate = (name: string, serviceType: string) => {
  const serviceTypeLabels: Record<string, string> = {
    "custom-wedding-cake": "Custom Wedding Cake",
    "event-styling": "Event Styling & Decor",
    "corporate-catering": "Corporate Catering",
    "private-celebration": "Private Celebration",
  };

  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2 style="color: #0066cc;">Thank You for Your Inquiry!</h2>
      
      <p>Dear ${name},</p>
      
      <p>We have received your inquiry for <strong>${serviceTypeLabels[serviceType] || serviceType}</strong> services at Perfect White Bakery.</p>
      
      <p>Our specialist team will review your request and contact you within 24-48 hours to discuss your event in detail.</p>
      
      <div style="background-color: #f0f7ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0066cc;">
        <p style="margin: 0;"><strong>Our Contact Details:</strong></p>
        <p style="margin: 5px 0;">📞 Phone: +234 802 7815 383</p>
        <p style="margin: 5px 0;">📧 Email: oyegokemojisola@gmail.com</p>
        <p style="margin: 5px 0;">📍 Location: Ikorodu, Lagos, Nigeria</p>
      </div>
      
      <p>If you have any urgent questions in the meantime, feel free to contact us directly using the details above.</p>
      
      <p>Best regards,<br />
      <strong>Perfect White Bakery Team</strong></p>
      
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
      <p style="font-size: 12px; color: #999;">
        This is an automated confirmation email. Please do not reply to this email.
      </p>
    </div>
  `;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    const { name, email, eventDate, serviceType, vision } = body;

    if (!name || !email || !eventDate || !serviceType || !vision) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Check if SMTP credentials are configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error("SMTP credentials not configured");
      return NextResponse.json(
        {
          error:
            "Email service is not properly configured. Please contact the website administrator.",
        },
        { status: 500 },
      );
    }

    const transporter = createTransporter();

    // Send email to owner
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.OWNER_EMAIL || "oyegokemojisola@gmail.com",
      subject: `New Inquiry from ${name} - Perfect White Bakery`,
      html: ownerEmailTemplate(name, email, eventDate, serviceType, vision),
      replyTo: email,
    });

    // Send confirmation email to client
    await transporter.sendMail({
      to: process.env.SMTP_USER,
      from: email,
      subject: "Thank You for Your Inquiry - Perfect White Bakery",
      html: clientEmailTemplate(name, serviceType),
    });

    return NextResponse.json(
      { success: true, message: "Inquiry sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send inquiry. Please try again later." },
      { status: 500 },
    );
  }
}
