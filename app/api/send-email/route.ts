import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const apiKey = req.headers.get("x-api-key");

        if (apiKey !== process.env.API_KEY) {
            return NextResponse.json({ success: false }, { status: 401 });
        }

        const { to, subject, html } = await req.json();

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: Number(process.env.SMTP_PORT ?? 587),
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            html,
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("EMAIL_ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: error?.message,
                code: error?.code,
                command: error?.command
            },
            { status: 500 }
        );
    }
}