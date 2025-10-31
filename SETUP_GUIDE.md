# Setup Guide - Free Foot Play

This guide will walk you through setting up the Free Foot Play application from scratch.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Supabase Setup](#supabase-setup)
4. [Running the Application](#running-the-application)
5. [Testing](#testing)
6. [Deployment](#deployment)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and npm ([Download](https://nodejs.org/))
- **Git** ([Download](https://git-scm.com/))
- A **Supabase account** ([Sign up for free](https://supabase.com))
- A code editor (VS Code recommended)

---

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/leofattal/free-foot-play.git
cd free-foot-play
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase Client

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

You'll fill in the actual values after setting up Supabase in the next section.

---

## Supabase Setup

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Fill in your project details:
   - **Name**: Free Foot Play (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the region closest to your users
   - **Pricing Plan**: Free tier works great for development
4. Click **"Create new project"**
5. Wait 2-3 minutes for your project to be provisioned

### Step 2: Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** > **API**
2. You'll see two important values:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **Anon/Public Key** (a long string starting with `eyJ...`)

3. Copy these values to your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 3: Set Up the Database Schema

1. In your Supabase project dashboard, click on the **SQL Editor** tab (left sidebar)
2. Click **"New query"**
3. Open the file `supabase/schema.sql` in your code editor
4. Copy the **entire contents** of the file
5. Paste it into the Supabase SQL Editor
6. Click **"Run"** (or press Cmd/Ctrl + Enter)

You should see a success message. This creates:
- All database tables (profiles, children, matches, registrations, etc.)
- Row Level Security (RLS) policies
- Database functions and triggers
- Indexes for performance

### Step 4: Configure Google OAuth (Optional but Recommended)

To enable "Sign in with Google":

1. **Create Google OAuth Credentials**:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select an existing one
   - Go to **APIs & Services** > **Credentials**
   - Click **Create Credentials** > **OAuth client ID**
   - Choose **Web application**
   - Add authorized redirect URIs:
     - `https://your-project-id.supabase.co/auth/v1/callback` (replace with your Supabase project URL)
     - For local testing: `http://localhost:54321/auth/v1/callback`
   - Copy your **Client ID** and **Client Secret**

2. **Configure in Supabase**:
   - Go to **Authentication** > **Providers** in your Supabase dashboard
   - Find **Google** and enable it
   - Paste your Google **Client ID** and **Client Secret**
   - Click **Save**

3. **Test Google Auth**:
   - Go to your login page
   - Click "Continue with Google"
   - You should be redirected to Google's consent screen
   - After authorization, you'll be redirected back to your app

### Step 5: Configure Email Settings (Optional but Recommended)

For user signup confirmations and password resets:

1. Go to **Authentication** > **Email Templates** in Supabase
2. Customize the email templates if desired
3. For production, configure a custom SMTP provider in **Settings** > **Authentication**

---

## Running the Application

### Start the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### What to Expect

You should see:
- ✅ The homepage with hero section
- ✅ Navigation bar with links
- ✅ Footer with contact info
- ✅ Signup/Login pages working

### Initial Test

**Option 1: Test with Google Sign-In (if configured)**
1. Open [http://localhost:3000](http://localhost:3000)
2. Click **"Sign Up"** in the navigation
3. Click **"Sign up with Google"**
4. Authorize the app with your Google account
5. You should be redirected to the dashboard!

**Option 2: Test with Email/Password**
1. Open [http://localhost:3000](http://localhost:3000)
2. Click **"Sign Up"** in the navigation
3. Create a test account with:
   - Full Name: Test Parent
   - Email: test@example.com
   - Password: TestPassword123
4. Check your email for a confirmation link (if email confirmation is enabled)
5. Log in with your credentials
6. You should see the dashboard!

---

## Testing

### Manual Testing Checklist

- [ ] Homepage loads correctly
- [ ] Sign up creates a new user
- [ ] Login works with valid credentials
- [ ] Dashboard shows after login
- [ ] Navbar updates when logged in
- [ ] Can add a child to profile
- [ ] Can view match schedule
- [ ] Can register for a match

### Create Test Data

To populate your database with sample matches for testing:

1. Go to Supabase **SQL Editor**
2. Run this query to insert sample matches:

```sql
INSERT INTO public.matches (date, start_time, end_time, age_group, max_capacity, field_location, description, registration_deadline, status)
VALUES
  ('2025-11-05', '10:00:00', '11:30:00', 'U8', 16, 'Main Field', 'Fun scrimmage for U8 players', '2025-11-04 18:00:00', 'open'),
  ('2025-11-05', '14:00:00', '15:30:00', 'U10', 16, 'Main Field', 'Competitive match for U10', '2025-11-04 18:00:00', 'open'),
  ('2025-11-06', '10:00:00', '11:30:00', 'U12', 16, 'Main Field', 'U12 tournament prep', '2025-11-05 18:00:00', 'open'),
  ('2025-11-07', '09:00:00', '10:30:00', 'U6', 12, 'Main Field', 'Intro to soccer for U6', '2025-11-06 18:00:00', 'open'),
  ('2025-11-08', '15:00:00', '16:30:00', 'U14', 18, 'Main Field', 'Advanced U14 match', '2025-11-07 18:00:00', 'open');
```

### Verify Database Setup

Check that tables were created correctly:

```sql
-- Check profiles table
SELECT * FROM public.profiles LIMIT 5;

-- Check matches table
SELECT * FROM public.matches LIMIT 5;

-- Check children table
SELECT * FROM public.children LIMIT 5;

-- Check field information
SELECT * FROM public.field_information;
```

---

## Deployment

### Deploy to Vercel (Recommended)

1. **Push your code to GitHub**

```bash
git add .
git commit -m "Initial setup"
git push origin main
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click **"New Project"**
   - Import your `free-foot-play` repository

3. **Configure Environment Variables**
   - In the Vercel project settings, add:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Use the same values from your `.env.local`

4. **Deploy**
   - Click **"Deploy"**
   - Wait for deployment to complete
   - Your site will be live at `https://your-project.vercel.app`

### Configure Custom Domain (Optional)

1. In Vercel, go to **Settings** > **Domains**
2. Add your custom domain
3. Update your DNS settings as instructed
4. Update Supabase redirect URLs:
   - Go to Supabase **Authentication** > **URL Configuration**
   - Add your production URL to **Redirect URLs**

---

## Troubleshooting

### Common Issues

#### 1. "Invalid API key" Error

**Problem**: Environment variables not loaded correctly

**Solution**:
- Make sure `.env.local` exists in the root directory
- Restart your development server (`npm run dev`)
- Verify the values match your Supabase project

#### 2. "Cannot connect to Supabase" Error

**Problem**: Incorrect Supabase URL or network issues

**Solution**:
- Check that your `NEXT_PUBLIC_SUPABASE_URL` is correct
- Verify your internet connection
- Check Supabase status at [status.supabase.com](https://status.supabase.com)

#### 3. "Row Level Security Policy Violation"

**Problem**: RLS policies preventing data access

**Solution**:
- Verify the SQL schema was run completely in Supabase
- Check that the user is authenticated
- Review RLS policies in Supabase **Database** > **Policies**

#### 4. Email Confirmation Not Received

**Problem**: Email delivery issues

**Solution**:
- Check spam/junk folder
- For development, disable email confirmation:
  - Go to Supabase **Authentication** > **Settings**
  - Turn off "Enable email confirmations"
- For production, set up a custom SMTP provider

#### 5. Build Errors

**Problem**: TypeScript or dependency issues

**Solution**:
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Getting Help

If you encounter issues not covered here:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Check the [Supabase documentation](https://supabase.com/docs)
3. Search existing [GitHub Issues](https://github.com/leofattal/free-foot-play/issues)
4. Create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Error messages (if any)
   - Your environment (OS, Node version, etc.)

---

## Next Steps

Once your setup is complete:

1. **Customize the application**:
   - Update field information in the database
   - Customize colors in `tailwind.config.ts`
   - Add your logo/branding

2. **Add features**:
   - Implement child profile management
   - Create match registration flow
   - Add email notifications
   - Build admin dashboard

3. **Improve security**:
   - Review RLS policies
   - Add rate limiting
   - Implement CAPTCHA for signup
   - Enable 2FA (future enhancement)

4. **Monitor and optimize**:
   - Set up error tracking (Sentry)
   - Add analytics (Google Analytics, Plausible)
   - Monitor performance (Vercel Analytics)
   - Regular database backups

---

## Resources

- [Project PRD](./PRD.md) - Full product requirements
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Happy coding! ⚽**

If you have questions or need help, feel free to reach out or create an issue on GitHub.
