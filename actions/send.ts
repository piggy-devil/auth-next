import { NextResponse } from "next/server";
import { transporter } from "@/lib/mail";

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  try {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL_SERVER_USER,
      to: email,
      subject: "Verification Your Email",
      html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email Sent Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Send Email" },
      { status: 500 }
    );
  }
};
