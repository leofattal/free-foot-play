# Google OAuth Setup Guide

This guide will walk you through configuring Google OAuth for your Free Foot Play application.

## Prerequisites

- A Google account
- Your Supabase project set up and running
- Access to [Google Cloud Console](https://console.cloud.google.com)

## Step-by-Step Setup

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click the project dropdown at the top and select **New Project**
3. Enter project details:
   - **Project name**: Free Foot Play (or your preferred name)
   - **Organization**: (optional)
4. Click **Create**

### 2. Configure OAuth Consent Screen

1. In the Google Cloud Console, go to **APIs & Services** > **OAuth consent screen**
2. Choose user type:
   - **Internal**: For testing only (requires Google Workspace)
   - **External**: For public use (recommended)
3. Click **Create**
4. Fill in the required information:
   - **App name**: Free Foot Play
   - **User support email**: Your email address
   - **Developer contact information**: Your email address
   - **App logo** (optional): Upload your logo
5. Click **Save and Continue**
6. **Scopes**: Click **Add or Remove Scopes**
   - Add: `userinfo.email`
   - Add: `userinfo.profile`
   - Click **Update** then **Save and Continue**
7. **Test users** (for External apps in testing mode):
   - Add your email and any test user emails
   - Click **Save and Continue**
8. Review and click **Back to Dashboard**

### 3. Create OAuth Credentials

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **OAuth client ID**
3. Choose **Application type**: Web application
4. Enter a **Name**: Free Foot Play Web Client
5. **Authorized JavaScript origins**:
   - Add: `http://localhost:3000` (for local development)
   - Add: `https://your-domain.com` (for production, when deployed)
6. **Authorized redirect URIs**:
   - Add: `https://your-project-id.supabase.co/auth/v1/callback`
     - Replace `your-project-id` with your actual Supabase project ID
     - Find this in Supabase **Settings** > **API** > **Project URL**
   - For local development, you may also add: `http://localhost:54321/auth/v1/callback`
7. Click **Create**
8. **Important**: Copy and save these values:
   - **Client ID**: Starts with something like `123456789-abc...apps.googleusercontent.com`
   - **Client Secret**: A random string

### 4. Configure Supabase

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** > **Providers** (in the left sidebar)
3. Scroll down and find **Google**
4. Toggle **Enable Sign in with Google** to ON
5. Paste your credentials:
   - **Client ID**: Paste the Client ID from Google Cloud Console
   - **Client Secret**: Paste the Client Secret
6. (Optional) **Skip nonce check**: Leave unchecked for better security
7. Click **Save**

### 5. Update Authorized Redirect URIs for Production

When you deploy to production (e.g., Vercel):

1. Go back to Google Cloud Console > **Credentials**
2. Click on your OAuth client ID
3. Add your production redirect URI:
   - Example: `https://your-app.vercel.app` (to Authorized JavaScript origins)
   - The callback URI remains the same (uses Supabase URL, not your domain)
4. Click **Save**

## Testing

### Local Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to [http://localhost:3000/auth/login](http://localhost:3000/auth/login)

3. Click **"Continue with Google"**

4. You should see:
   - Google's consent screen
   - A list of permissions being requested (email, profile)
   - Your app name and logo

5. Click **Continue** or **Allow**

6. You should be redirected back to your app and logged in!

### Troubleshooting

#### Error: "redirect_uri_mismatch"

**Problem**: The redirect URI doesn't match what's configured in Google Cloud Console

**Solution**:
- Check that your Supabase callback URL is correctly added to Google OAuth settings
- Format should be: `https://[your-project-id].supabase.co/auth/v1/callback`
- Make sure there are no trailing slashes or typos

#### Error: "Access blocked: This app's request is invalid"

**Problem**: OAuth consent screen not properly configured

**Solution**:
- Go to Google Cloud Console > **OAuth consent screen**
- Make sure all required fields are filled
- Add required scopes (`userinfo.email`, `userinfo.profile`)
- If app is in testing mode, add your email to test users

#### Error: "The OAuth client was not found"

**Problem**: Wrong Client ID or it hasn't propagated yet

**Solution**:
- Double-check the Client ID in Supabase matches Google Cloud Console
- Wait a few minutes for changes to propagate
- Try regenerating the credentials

#### Users Can Sign Up But Profile Not Created

**Problem**: The database trigger isn't working

**Solution**:
- Check that you ran the full SQL schema from `supabase/schema.sql`
- Verify the trigger exists:
  ```sql
  SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
  ```
- If missing, re-run the schema file

## Security Best Practices

1. **Never commit credentials**: Keep Client ID and Client Secret secure
2. **Use environment variables**: Store in `.env.local` if needed (though Supabase handles this)
3. **Limit redirect URIs**: Only add URIs you actually use
4. **Monitor usage**: Check Google Cloud Console for unusual activity
5. **Rotate credentials**: If compromised, revoke and create new ones

## Production Checklist

Before launching to production:

- [ ] OAuth consent screen is published (not in testing mode)
- [ ] Privacy policy URL is added to consent screen
- [ ] Terms of service URL is added to consent screen
- [ ] Production redirect URIs are added
- [ ] Test the OAuth flow in production environment
- [ ] Verify user profile data is correctly saved to database

## Additional Resources

- [Supabase Google OAuth Docs](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Google Cloud Console](https://console.cloud.google.com)

## Support

If you encounter issues:

1. Check the browser console for error messages
2. Check Supabase logs (Dashboard > Logs > Auth Logs)
3. Verify all steps were completed correctly
4. Review the troubleshooting section above

---

**Setup Complete!** 🎉

Users can now sign up and log in using their Google accounts!
