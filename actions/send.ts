import { NextResponse } from "next/server";
import { transporter } from "@/lib/mail";

const domain = process.env.NEXT_PUBLIC_APP_URL;

interface MailOptionsProps {
  from: string | undefined;
  to: string;
  subject: string;
  html: string;
}

const send = async (mailOptions: MailOptionsProps) => {
  try {
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

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const mailOptions = {
    from: process.env.EMAIL_SERVER_USER,
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: ${token}</p>`,
  };

  await send(mailOptions);
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_SERVER_USER,
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  };

  await send(mailOptions);
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_SERVER_USER,
    to: email,
    subject: "Verification Your Email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  };
  await send(mailOptions);
};
