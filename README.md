# Free Foot Play - Youth Soccer Match Registration Platform

A modern web application for parents to easily register their children for youth soccer matches. Built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- User authentication and account management
- Easy match registration for children
- Real-time match schedule and availability
- Field information with location and directions
- Email notifications for upcoming matches
- Responsive design for mobile and desktop
- Admin dashboard for match management

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account ([sign up for free](https://supabase.com))

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/leofattal/free-foot-play.git
cd free-foot-play
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up Supabase**

   a. Create a new project at [supabase.com](https://supabase.com)

   b. In your Supabase project dashboard, go to **Settings > API** and copy:
      - Project URL
      - Anon/Public key

   c. Go to **SQL Editor** in your Supabase dashboard

   d. Copy the contents of `supabase/schema.sql` and run it in the SQL Editor

4. **Configure environment variables**

   Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

   Edit `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

5. **Run the development server**

```bash
npm run dev
```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
free-foot-play/
├── app/                      # Next.js app router pages
│   ├── api/                 # API routes
│   ├── auth/                # Authentication pages (login, signup)
│   ├── dashboard/           # User dashboard
│   ├── matches/             # Match listing and registration
│   ├── field-info/          # Field information page
│   ├── contact/             # Contact form
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # Reusable UI components
│   ├── layout/              # Layout components (Navbar, Footer)
│   ├── auth/                # Authentication components
│   └── matches/             # Match-related components
├── lib/                     # Utility functions and libraries
│   └── supabase/            # Supabase client configuration
├── supabase/                # Supabase schema and migrations
│   └── schema.sql           # Database schema
├── public/                  # Static assets
└── utils/                   # Helper functions
```

## Database Schema

The application uses the following main tables:

- **profiles**: User information (extends Supabase auth.users)
- **children**: Child profiles linked to parent accounts
- **matches**: Soccer match schedules
- **registrations**: Match registrations linking children to matches
- **field_information**: Field location and details
- **notifications**: Email/SMS notification queue

See `supabase/schema.sql` for the complete schema.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add your environment variables in Vercel project settings
4. Deploy!

### Environment Variables for Production

Make sure to set these in your deployment platform:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Development Roadmap

### Phase 1 (Current)
- [x] Project setup
- [x] Homepage with hero and features
- [x] Basic layout components
- [ ] Authentication (signup/login)
- [ ] Match listing page
- [ ] Match registration flow
- [ ] Parent dashboard
- [ ] Field information page

### Phase 2 (Future)
- [ ] Payment integration
- [ ] Team assignments
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Match management

### Phase 3 (Future)
- [ ] SMS notifications
- [ ] Photo gallery
- [ ] Player development tracking
- [ ] Mobile app

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the ISC License.

## Support

For questions or issues, please:
- Open an issue on GitHub
- Contact: info@freefootplay.com

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database and auth by [Supabase](https://supabase.com)
- Styled with [Tailwind CSS](https://tailwindcss.com)
