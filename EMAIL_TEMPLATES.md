# Complete Email Templates for Supabase

Copy and paste these templates into your Supabase dashboard under **Authentication → Email Templates**.

---

## 1. Confirm Signup

**Where to use:** Authentication → Email Templates → Confirm signup

```html
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
  <div style="background: linear-gradient(135deg, #2E7D32 0%, #43A047 100%); color: white; padding: 40px 20px; text-align: center;">
    <div style="font-size: 48px; margin-bottom: 10px;">⚽</div>
    <h1 style="margin: 0; font-size: 28px; font-weight: 700;">Welcome to Free Foot Play!</h1>
    <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Confirm your email to get started</p>
  </div>

  <div style="padding: 40px 30px;">
    <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 20px 0;">Hi there,</p>

    <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 20px 0;">
      Thanks for signing up with Free Foot Play! We're excited to help you get your kids on the field and playing soccer.
    </p>

    <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 30px 0;">
      Click the button below to confirm your email address:
    </p>

    <div style="text-align: center; margin: 35px 0;">
      <a href="{{ .ConfirmationURL }}"
         style="background-color: #FF9800; color: white; padding: 16px 48px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        Confirm Your Email
      </a>
    </div>

    <div style="background-color: #E3F2FD; border-left: 4px solid #1976D2; padding: 20px; margin: 30px 0; border-radius: 4px;">
      <p style="margin: 0 0 12px 0; font-weight: 600; color: #1976D2; font-size: 15px;">✨ What's Next?</p>
      <ol style="margin: 0; padding-left: 20px; color: #333; line-height: 1.8; font-size: 15px;">
        <li>Confirm your email (click the button above)</li>
        <li>Add your children's profiles</li>
        <li>Browse upcoming match schedule</li>
        <li>Register for your first game!</li>
      </ol>
    </div>

    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin: 25px 0;">
      <p style="margin: 0 0 8px 0; font-size: 13px; color: #666; font-weight: 600;">Button not working?</p>
      <p style="margin: 0; word-break: break-all; font-size: 12px; color: #1976D2; font-family: monospace;">{{ .ConfirmationURL }}</p>
    </div>

    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
      <p style="font-size: 13px; color: #999; line-height: 1.6; margin: 0 0 8px 0;">
        <strong>Note:</strong> This link expires in 24 hours.
      </p>
      <p style="font-size: 13px; color: #999; line-height: 1.6; margin: 0;">
        If you didn't create an account, you can safely ignore this email.
      </p>
    </div>
  </div>

  <div style="background-color: #f5f5f5; padding: 30px 20px; text-align: center; border-top: 1px solid #e0e0e0;">
    <p style="margin: 0 0 8px 0; font-weight: 600; color: #333; font-size: 15px;">⚽ Free Foot Play</p>
    <p style="margin: 0 0 15px 0; color: #666; font-size: 13px;">Youth Soccer Match Registration</p>
    <p style="margin: 15px 0 0 0; color: #999; font-size: 11px;">You received this email because you signed up at freefootplay.com</p>
  </div>
</div>
```

---

## 2. Reset Password

**Where to use:** Authentication → Email Templates → Reset password

```html
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
  <div style="background: linear-gradient(135deg, #2E7D32 0%, #43A047 100%); color: white; padding: 40px 20px; text-align: center;">
    <div style="font-size: 48px; margin-bottom: 10px;">🔑</div>
    <h1 style="margin: 0; font-size: 28px; font-weight: 700;">Reset Your Password</h1>
    <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Secure password reset request</p>
  </div>

  <div style="padding: 40px 30px;">
    <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 20px 0;">Hi there,</p>

    <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 20px 0;">
      We received a request to reset the password for your Free Foot Play account.
    </p>

    <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 30px 0;">
      Click the button below to create a new password:
    </p>

    <div style="text-align: center; margin: 35px 0;">
      <a href="{{ .ConfirmationURL }}"
         style="background-color: #FF9800; color: white; padding: 16px 48px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        Reset My Password
      </a>
    </div>

    <div style="background-color: #FFF3E0; border-left: 4px solid #FF9800; padding: 20px; margin: 30px 0; border-radius: 4px;">
      <p style="margin: 0 0 8px 0; font-weight: 600; color: #F57C00; font-size: 15px;">⚠️ Security Notice</p>
      <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6;">
        This password reset link will expire in <strong>60 minutes</strong> for security reasons.
      </p>
    </div>

    <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 20px 0;">
      If you didn't request a password reset, please ignore this email or contact our support team if you have concerns.
    </p>

    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin: 25px 0;">
      <p style="margin: 0 0 8px 0; font-size: 13px; color: #666; font-weight: 600;">Button not working?</p>
      <p style="margin: 0; word-break: break-all; font-size: 12px; color: #1976D2; font-family: monospace;">{{ .ConfirmationURL }}</p>
    </div>
  </div>

  <div style="background-color: #f5f5f5; padding: 30px 20px; text-align: center; border-top: 1px solid #e0e0e0;">
    <p style="margin: 0 0 8px 0; font-weight: 600; color: #333; font-size: 15px;">⚽ Free Foot Play</p>
    <p style="margin: 0 0 15px 0; color: #666; font-size: 13px;">Youth Soccer Match Registration</p>
    <p style="margin: 15px 0 0 0; color: #999; font-size: 11px;">This is an automated security email from freefootplay.com</p>
  </div>
</div>
```

---

## 3. Magic Link (Passwordless Login)

**Where to use:** Authentication → Email Templates → Magic Link

```html
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
  <div style="background: linear-gradient(135deg, #2E7D32 0%, #43A047 100%); color: white; padding: 40px 20px; text-align: center;">
    <div style="font-size: 48px; margin-bottom: 10px;">✉️</div>
    <h1 style="margin: 0; font-size: 28px; font-weight: 700;">Your Magic Link</h1>
    <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Click to log in instantly</p>
  </div>

  <div style="padding: 40px 30px;">
    <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 20px 0;">Hi there,</p>

    <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 30px 0;">
      Click the button below to log in to your Free Foot Play account. No password needed!
    </p>

    <div style="text-align: center; margin: 35px 0;">
      <a href="{{ .ConfirmationURL }}"
         style="background-color: #FF9800; color: white; padding: 16px 48px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        Log In to Free Foot Play
      </a>
    </div>

    <div style="background-color: #FFF3E0; border-left: 4px solid #FF9800; padding: 20px; margin: 30px 0; border-radius: 4px;">
      <p style="margin: 0 0 8px 0; font-weight: 600; color: #F57C00; font-size: 15px;">⚠️ Security Notice</p>
      <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6;">
        This magic link will expire in <strong>60 minutes</strong>. If you didn't request this login link, please ignore this email.
      </p>
    </div>

    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin: 25px 0;">
      <p style="margin: 0 0 8px 0; font-size: 13px; color: #666; font-weight: 600;">Button not working?</p>
      <p style="margin: 0; word-break: break-all; font-size: 12px; color: #1976D2; font-family: monospace;">{{ .ConfirmationURL }}</p>
    </div>
  </div>

  <div style="background-color: #f5f5f5; padding: 30px 20px; text-align: center; border-top: 1px solid #e0e0e0;">
    <p style="margin: 0 0 8px 0; font-weight: 600; color: #333; font-size: 15px;">⚽ Free Foot Play</p>
    <p style="margin: 0 0 15px 0; color: #666; font-size: 13px;">Youth Soccer Match Registration</p>
    <p style="margin: 15px 0 0 0; color: #999; font-size: 11px;">You requested a magic link at freefootplay.com</p>
  </div>
</div>
```

---

## 4. Change Email Address

**Where to use:** Authentication → Email Templates → Change Email Address

```html
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
  <div style="background: linear-gradient(135deg, #2E7D32 0%, #43A047 100%); color: white; padding: 40px 20px; text-align: center;">
    <div style="font-size: 48px; margin-bottom: 10px;">📧</div>
    <h1 style="margin: 0; font-size: 28px; font-weight: 700;">Confirm Email Change</h1>
    <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Verify your new email address</p>
  </div>

  <div style="padding: 40px 30px;">
    <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 20px 0;">Hi there,</p>

    <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 20px 0;">
      We received a request to change the email address for your Free Foot Play account.
    </p>

    <div style="background-color: #E3F2FD; padding: 15px; border-radius: 6px; margin: 20px 0;">
      <p style="margin: 0; font-size: 15px; color: #333;">
        <strong>New email address:</strong><br>
        <span style="color: #1976D2; font-family: monospace;">{{ .Email }}</span>
      </p>
    </div>

    <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 30px 0;">
      Click the button below to confirm this change:
    </p>

    <div style="text-align: center; margin: 35px 0;">
      <a href="{{ .ConfirmationURL }}"
         style="background-color: #FF9800; color: white; padding: 16px 48px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        Confirm Email Change
      </a>
    </div>

    <div style="background-color: #FFEBEE; border-left: 4px solid #F44336; padding: 20px; margin: 30px 0; border-radius: 4px;">
      <p style="margin: 0 0 8px 0; font-weight: 600; color: #D32F2F; font-size: 15px;">🛡️ Security Alert</p>
      <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6;">
        If you didn't request this email change, please contact support immediately.
      </p>
    </div>

    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin: 25px 0;">
      <p style="margin: 0 0 8px 0; font-size: 13px; color: #666; font-weight: 600;">Button not working?</p>
      <p style="margin: 0; word-break: break-all; font-size: 12px; color: #1976D2; font-family: monospace;">{{ .ConfirmationURL }}</p>
    </div>
  </div>

  <div style="background-color: #f5f5f5; padding: 30px 20px; text-align: center; border-top: 1px solid #e0e0e0;">
    <p style="margin: 0 0 8px 0; font-weight: 600; color: #333; font-size: 15px;">⚽ Free Foot Play</p>
    <p style="margin: 0 0 15px 0; color: #666; font-size: 13px;">Youth Soccer Match Registration</p>
    <p style="margin: 15px 0 0 0; color: #999; font-size: 11px;">This is an automated security email</p>
  </div>
</div>
```

---

## 5. Confirm Reauthentication (Verification Code)

**Where to use:** Authentication → Email Templates → Confirm reauthentication

```html
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
  <div style="background: linear-gradient(135deg, #2E7D32 0%, #43A047 100%); color: white; padding: 40px 20px; text-align: center;">
    <div style="font-size: 48px; margin-bottom: 10px;">🔐</div>
    <h1 style="margin: 0; font-size: 28px; font-weight: 700;">Verify It's You</h1>
    <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Enter this code to continue</p>
  </div>

  <div style="padding: 40px 30px;">
    <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 20px 0;">Hi there,</p>

    <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 30px 0;">
      For your security, please enter this verification code on the website:
    </p>

    <div style="background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%); padding: 30px; border-radius: 8px; text-align: center; margin: 30px 0; border: 2px dashed #1976D2;">
      <p style="margin: 0 0 10px 0; font-size: 13px; color: #666; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Your Verification Code</p>
      <p style="margin: 0; font-size: 36px; font-weight: 700; color: #1976D2; letter-spacing: 4px; font-family: 'Courier New', monospace;">{{ .Token }}</p>
    </div>

    <div style="background-color: #E3F2FD; border-left: 4px solid #1976D2; padding: 20px; margin: 30px 0; border-radius: 4px;">
      <p style="margin: 0 0 12px 0; font-weight: 600; color: #1976D2; font-size: 15px;">📋 How to use this code:</p>
      <ol style="margin: 0; padding-left: 20px; color: #333; line-height: 1.8; font-size: 14px;">
        <li>Go back to the Free Foot Play website</li>
        <li>Enter the code exactly as shown above</li>
        <li>Click "Verify" to continue</li>
      </ol>
    </div>

    <div style="background-color: #FFF3E0; border-left: 4px solid #FF9800; padding: 20px; margin: 30px 0; border-radius: 4px;">
      <p style="margin: 0 0 8px 0; font-weight: 600; color: #F57C00; font-size: 15px;">⚠️ Security Notice</p>
      <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.6;">
        This code expires in <strong>10 minutes</strong>. Never share this code with anyone.
      </p>
    </div>

    <p style="font-size: 14px; color: #666; line-height: 1.6; margin: 20px 0 0 0;">
      If you didn't request this code, please ignore this email.
    </p>
  </div>

  <div style="background-color: #f5f5f5; padding: 30px 20px; text-align: center; border-top: 1px solid #e0e0e0;">
    <p style="margin: 0 0 8px 0; font-weight: 600; color: #333; font-size: 15px;">⚽ Free Foot Play</p>
    <p style="margin: 0 0 15px 0; color: #666; font-size: 13px;">Youth Soccer Match Registration</p>
    <p style="margin: 15px 0 0 0; color: #999; font-size: 11px;">This is an automated security email</p>
  </div>
</div>
```

---

## How to Apply These Templates

1. Log in to your Supabase dashboard
2. Go to **Authentication** → **Email Templates**
3. Click on each template type
4. Delete the default HTML
5. Copy and paste the corresponding template from above
6. Click **Save**

## Templates Overview:

- ✅ **Confirm signup** - New user email verification
- ✅ **Reset password** - Password reset request
- ✅ **Magic Link** - Passwordless login
- ✅ **Change Email** - Email address change confirmation
- ✅ **Confirm reauthentication** - Verification code display

All templates feature:
- Free Foot Play branding (green/orange colors)
- Soccer ball emoji
- Mobile-responsive design
- Security notices
- Alternative text links for accessibility

---

**Ready to paste!** Just copy each template into the corresponding section in Supabase. 🎉
