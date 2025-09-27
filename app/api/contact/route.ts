import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Resend configuration
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
	try {
		const { name, email, message } = await request.json()

		// Validate input
		if (!name || !email || !message) {
			return NextResponse.json(
				{ error: 'All fields are required' },
				{ status: 400 }
			)
		}

		// Email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(email)) {
			return NextResponse.json(
				{ error: 'Invalid email format' },
				{ status: 400 }
			)
		}

		// Email to company
		const mailOptions = {
			from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
			to: process.env.EMAIL_TO || 'contact@artifexgroup.com',
			subject: `New Contact Form Message from ${name}`,
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
					<h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
						New Contact Form Submission
					</h2>
					
					<div style="margin: 20px 0;">
						<h3 style="color: #555; margin-bottom: 5px;">Contact Details:</h3>
						<p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
						<p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
					</div>
					
					<div style="margin: 20px 0;">
						<h3 style="color: #555; margin-bottom: 10px;">Message:</h3>
						<div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
							${message.replace(/\n/g, '<br>')}
						</div>
					</div>
					
					<div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #888; font-size: 12px;">
						<p>This message was sent from your website contact form.</p>
						<p>Reply directly to this email to respond to ${name}.</p>
					</div>
				</div>
			`,
			replyTo: email,
		}

		// Auto-reply to sender
		const autoReplyOptions = {
			from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
			to: email,
			subject: 'Thank you for contacting Artifex Group',
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
					<h2 style="color: #333; border-bottom: 2px solid #eee; padding-bottom: 10px;">
						Thank You for Your Message
					</h2>
					
					<p>Dear ${name},</p>
					
					<p>Thank you for reaching out to Artifex Group. We have received your message and will get back to you as soon as possible.</p>
					
					<div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
						<h3 style="color: #555; margin-bottom: 10px;">Your message:</h3>
						<p style="margin: 0;">${message.replace(/\n/g, '<br>')}</p>
					</div>
					
					<p>We typically respond within 24-48 hours during business days.</p>
					
					<p>Best regards,<br>
					<strong>Artifex Group Team</strong></p>
					
					<div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #888; font-size: 12px;">
						<p>This is an automated response. Please do not reply to this email.</p>
					</div>
				</div>
			`,
		}

		// Send emails
		await transporter.sendMail(mailOptions)
		await transporter.sendMail(autoReplyOptions)

		return NextResponse.json(
			{ message: 'Message sent successfully' },
			{ status: 200 }
		)
	} catch (error) {
		console.error('Error sending email:', error)
		return NextResponse.json(
			{ error: 'Failed to send message' },
			{ status: 500 }
		)
	}
}
