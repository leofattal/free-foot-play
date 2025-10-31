# Email Setup Guide - Free Foot Play

This guide covers how to set up and customize email sending in your Free Foot Play application using Supabase.

## Table of Contents

1. [Supabase Auth Emails (Built-in)](#supabase-auth-emails-built-in)
2. [Custom Transactional Emails](#custom-transactional-emails)
3. [Email Templates](#email-templates)
4. [Production Email Setup](#production-email-setup)

---

## Supabase Auth Emails (Built-in)

Supabase automatically handles authentication-related emails. These are **FREE** and require no additional setup!

### Available Auth Emails

1. **Confirm Signup** - Sent when a user creates an account
2. **Magic Link** - Passwordless login via email link
3. **Change Email Address** - Confirm new email address
4. **Reset Password** - Password recovery email

### Customize Email Templates

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** > **Email Templates**
3. Choose which template to customize
4. Edit the email content using the template variables

**Available Variables:**
- `{{ .ConfirmationURL }}` - Confirmation/action link
- `{{ .Token }}` - One-time token
- `{{ .TokenHash }}` - Hashed token
- `{{ .SiteURL }}` - Your site URL (from Supabase settings)
- `{{ .Email }}` - User's email address

**Example: Customize Signup Confirmation**

```html
<h2>Welcome to Free Foot Play!</h2>
<p>Hi there,</p>
<p>Thanks for signing up! Click the link below to confirm your email address and start registering your kids for soccer matches.</p>
<p><a href="{{ .ConfirmationURL }}">Confirm your email</a></p>
<p>If you didn't create an account, you can safely ignore this email.</p>
<p>See you on the field!<br>
The Free Foot Play Team</p>
```

### Configure Email Settings

1. Go to **Settings** > **Authentication**
2. **Email Auth Settings**:
   - **Enable Email Confirmations**: Toggle ON (recommended for production)
   - **Enable Email Change Confirmations**: Toggle ON
   - **Secure Email Change**: Toggle ON (requires both old and new email confirmation)

3. **Email Rate Limits** (to prevent spam):
   - Default: 4 emails per hour per user
   - Adjust if needed for your use case

---

## Custom Transactional Emails

For emails beyond authentication (match reminders, registrations, cancellations), you have two main options:

### Option A: Supabase Edge Functions + Resend (Recommended)

**Why Resend?**
- Free tier: 3,000 emails/month
- Modern API, easy to use
- Great deliverability
- Built specifically for transactional emails

#### Step 1: Sign Up for Resend

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your domain (or use their test domain for development)
4. Go to **API Keys** and create a new key
5. Copy your API key (starts with `re_...`)

#### Step 2: Add Resend API Key to Supabase

1. In Supabase dashboard, go to **Settings** > **Edge Functions**
2. Scroll to **Secrets** section
3. Add a new secret:
   - Name: `RESEND_API_KEY`
   - Value: Your Resend API key
4. Click **Add Secret**

#### Step 3: Create Edge Function for Sending Emails

Create a new Edge Function:

```bash
# Install Supabase CLI if you haven't
npm install -g supabase

# Initialize Supabase locally (if not done)
supabase init

# Create a new Edge Function
supabase functions new send-email
```

This creates `supabase/functions/send-email/index.ts`

**Edit the file:**

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  try {
    const { to, subject, html, from = "noreply@freefootplay.com" } = await req.json()

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from,
        to,
        subject,
        html,
      }),
    })

    const data = await res.json()

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
})
```

#### Step 4: Deploy the Edge Function

```bash
supabase functions deploy send-email
```

#### Step 5: Use the Function in Your App

Create a helper function in your app:

**File: `lib/emails/send-email.ts`**

```typescript
import { createClient } from '@/lib/supabase/server'

interface SendEmailParams {
  to: string
  subject: string
  html: string
  from?: string
}

export async function sendEmail({ to, subject, html, from }: SendEmailParams) {
  const supabase = await createClient()

  const { data, error } = await supabase.functions.invoke('send-email', {
    body: { to, subject, html, from },
  })

  if (error) throw error
  return data
}
```

#### Step 6: Create Email Templates

**File: `lib/emails/templates/match-reminder.ts`**

```typescript
interface MatchReminderData {
  parentName: string
  childName: string
  matchDate: string
  matchTime: string
  ageGroup: string
  fieldLocation: string
}

export function matchReminderEmail(data: MatchReminderData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #2E7D32; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .match-details { background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
          .button { background-color: #FF9800; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>⚽ Match Reminder</h1>
          </div>
          <div class="content">
            <p>Hi ${data.parentName},</p>
            <p>This is a friendly reminder that <strong>${data.childName}</strong> has a soccer match coming up tomorrow!</p>

            <div class="match-details">
              <h3>Match Details</h3>
              <p><strong>Date:</strong> ${data.matchDate}</p>
              <p><strong>Time:</strong> ${data.matchTime}</p>
              <p><strong>Age Group:</strong> ${data.ageGroup}</p>
              <p><strong>Location:</strong> ${data.fieldLocation}</p>
            </div>

            <p><strong>Important Reminders:</strong></p>
            <ul>
              <li>Arrive 15 minutes early</li>
              <li>Bring water and shin guards</li>
              <li>Check weather conditions before leaving</li>
            </ul>

            <p style="text-align: center;">
              <a href="https://freefootplay.com/dashboard" class="button">View Dashboard</a>
            </p>
          </div>
          <div class="footer">
            <p>Free Foot Play - Youth Soccer Registration</p>
            <p>You received this email because you have a registered child for this match.</p>
          </div>
        </div>
      </body>
    </html>
  `
}
```

#### Step 7: Use in Your Application

**Example: Send match reminder 24 hours before**

```typescript
import { sendEmail } from '@/lib/emails/send-email'
import { matchReminderEmail } from '@/lib/emails/templates/match-reminder'

// In your server action or API route
async function sendMatchReminder(registrationId: string) {
  // Fetch registration details from database
  const { data: registration } = await supabase
    .from('registrations')
    .select(`
      *,
      children (first_name, last_name),
      matches (date, start_time, age_group, field_location),
      profiles (full_name, email)
    `)
    .eq('id', registrationId)
    .single()

  if (!registration) return

  const emailHtml = matchReminderEmail({
    parentName: registration.profiles.full_name,
    childName: `${registration.children.first_name} ${registration.children.last_name}`,
    matchDate: new Date(registration.matches.date).toLocaleDateString(),
    matchTime: registration.matches.start_time,
    ageGroup: registration.matches.age_group,
    fieldLocation: registration.matches.field_location,
  })

  await sendEmail({
    to: registration.profiles.email,
    subject: `⚽ Match Reminder: ${registration.children.first_name}'s Game Tomorrow`,
    html: emailHtml,
  })
}
```

---

### Option B: Direct Integration with SendGrid

If you prefer SendGrid over Resend:

#### Step 1: Sign Up for SendGrid

1. Go to [sendgrid.com](https://sendgrid.com)
2. Sign up for free (100 emails/day)
3. Create an API key
4. Verify sender identity

#### Step 2: Install SendGrid Package

```bash
npm install @sendgrid/mail
```

#### Step 3: Create Email Helper

**File: `lib/emails/sendgrid.ts`**

```typescript
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

interface EmailData {
  to: string
  subject: string
  html: string
  from?: string
}

export async function sendEmailWithSendGrid({ to, subject, html, from = 'noreply@freefootplay.com' }: EmailData) {
  const msg = {
    to,
    from,
    subject,
    html,
  }

  try {
    await sgMail.send(msg)
    return { success: true }
  } catch (error) {
    console.error('SendGrid error:', error)
    throw error
  }
}
```

#### Step 4: Add API Key to Environment

Add to `.env.local`:

```env
SENDGRID_API_KEY=SG.your-api-key-here
```

---

## Email Templates Library

Here are common email templates you'll need:

### 1. Registration Confirmation

```typescript
export function registrationConfirmationEmail(data: {
  parentName: string
  childName: string
  matchDate: string
  matchTime: string
  ageGroup: string
}) {
  return `
    <h2>Registration Confirmed! ⚽</h2>
    <p>Hi ${data.parentName},</p>
    <p>Great news! ${data.childName} is registered for the upcoming match.</p>
    <h3>Match Details:</h3>
    <ul>
      <li><strong>Date:</strong> ${data.matchDate}</li>
      <li><strong>Time:</strong> ${data.matchTime}</li>
      <li><strong>Age Group:</strong> ${data.ageGroup}</li>
    </ul>
    <p>We'll send you a reminder 24 hours before the match.</p>
    <p>See you on the field!</p>
  `
}
```

### 2. Match Cancellation

```typescript
export function matchCancellationEmail(data: {
  parentName: string
  childName: string
  matchDate: string
  reason?: string
}) {
  return `
    <h2>Match Cancelled</h2>
    <p>Hi ${data.parentName},</p>
    <p>We regret to inform you that ${data.childName}'s match on ${data.matchDate} has been cancelled.</p>
    ${data.reason ? `<p><strong>Reason:</strong> ${data.reason}</p>` : ''}
    <p>We'll notify you of any rescheduled dates.</p>
    <p>Thank you for your understanding.</p>
  `
}
```

### 3. Waitlist Spot Available

```typescript
export function waitlistAvailableEmail(data: {
  parentName: string
  matchDate: string
  matchTime: string
  ageGroup: string
}) {
  return `
    <h2>A Spot Opened Up! 🎉</h2>
    <p>Hi ${data.parentName},</p>
    <p>Good news! A spot has opened up for the match you were waiting for.</p>
    <h3>Match Details:</h3>
    <ul>
      <li><strong>Date:</strong> ${data.matchDate}</li>
      <li><strong>Time:</strong> ${data.matchTime}</li>
      <li><strong>Age Group:</strong> ${data.ageGroup}</li>
    </ul>
    <p><a href="https://freefootplay.com/matches">Register Now</a></p>
    <p>Spots fill up fast, so don't wait!</p>
  `
}
```

---

## Production Email Setup

### Custom Domain Setup (Recommended)

For better deliverability and professional emails:

#### With Resend:

1. Go to Resend dashboard > **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `freefootplay.com`)
4. Add DNS records to your domain provider:
   - SPF record
   - DKIM record
   - DMARC record (optional but recommended)
5. Verify domain
6. Now you can send from `noreply@freefootplay.com`

#### With SendGrid:

1. Go to Settings > **Sender Authentication**
2. Follow **Domain Authentication** wizard
3. Add DNS records provided
4. Verify domain

### Email Best Practices

1. **Always provide unsubscribe link** (for non-critical emails)
2. **Use clear subject lines** ("Match Tomorrow" not "Important Update")
3. **Keep content concise** and mobile-friendly
4. **Test emails** before sending to users
5. **Monitor deliverability** - check spam scores
6. **Respect rate limits** - don't send too many at once
7. **Handle bounces** - remove invalid email addresses

### Monitoring and Logging

Track email status in your database:

```sql
-- Add to your schema
CREATE TABLE email_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  email_type TEXT NOT NULL,
  recipient TEXT NOT NULL,
  subject TEXT NOT NULL,
  status TEXT NOT NULL, -- 'sent', 'failed', 'bounced'
  error_message TEXT,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## Testing Emails Locally

### Use MailTrap for Development

1. Sign up at [mailtrap.io](https://mailtrap.io) (free)
2. Get SMTP credentials
3. Configure in Resend/SendGrid for development
4. All emails are caught and viewable in MailTrap inbox
5. No emails sent to real users during development

---

## Summary

**For Authentication Emails:**
- Use Supabase built-in (free, already working)
- Customize templates in Supabase dashboard

**For Transactional Emails:**
- **Recommended**: Supabase Edge Functions + Resend
- **Alternative**: Direct SendGrid integration
- Free tier available for both

**Next Steps:**
1. Choose your email provider (Resend or SendGrid)
2. Set up Edge Function or direct integration
3. Create email templates for match reminders, confirmations, etc.
4. Add email logging to track deliveries
5. Test thoroughly before production

Need help implementing any of these? Let me know which option you'd like to go with!
