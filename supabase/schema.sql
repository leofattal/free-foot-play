-- Free Foot Play Database Schema
-- This file contains all the SQL commands to set up the database for the youth soccer match registration platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone_number TEXT,
  emergency_contact_name TEXT,
  emergency_contact_phone TEXT,
  role TEXT NOT NULL DEFAULT 'parent' CHECK (role IN ('parent', 'admin', 'coach')),
  email_verified BOOLEAN DEFAULT false,
  notification_preferences JSONB DEFAULT '{"email": true, "sms": false}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Children table
CREATE TABLE IF NOT EXISTS public.children (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  parent_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  age_group TEXT NOT NULL CHECK (age_group IN ('U6', 'U8', 'U10', 'U12', 'U14', 'U16')),
  photo_url TEXT,
  medical_notes TEXT, -- Consider encrypting this field
  emergency_contact_name TEXT NOT NULL,
  emergency_contact_phone TEXT NOT NULL,
  tshirt_size TEXT CHECK (tshirt_size IN ('XS', 'S', 'M', 'L', 'XL')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;

-- Policies for children
CREATE POLICY "Parents can view their own children"
  ON public.children FOR SELECT
  USING (auth.uid() = parent_id);

CREATE POLICY "Admins can view all children"
  ON public.children FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'coach')
    )
  );

CREATE POLICY "Parents can insert their own children"
  ON public.children FOR INSERT
  WITH CHECK (auth.uid() = parent_id);

CREATE POLICY "Parents can update their own children"
  ON public.children FOR UPDATE
  USING (auth.uid() = parent_id);

CREATE POLICY "Parents can delete their own children"
  ON public.children FOR DELETE
  USING (auth.uid() = parent_id);

-- Matches table
CREATE TABLE IF NOT EXISTS public.matches (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  age_group TEXT NOT NULL CHECK (age_group IN ('U6', 'U8', 'U10', 'U12', 'U14', 'U16')),
  max_capacity INTEGER NOT NULL DEFAULT 16,
  current_enrollment INTEGER NOT NULL DEFAULT 0,
  field_location TEXT NOT NULL DEFAULT 'Main Field',
  coach_name TEXT,
  coach_id UUID REFERENCES public.profiles(id),
  description TEXT,
  registration_deadline TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'full', 'cancelled', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;

-- Policies for matches
CREATE POLICY "Everyone can view open matches"
  ON public.matches FOR SELECT
  USING (true);

CREATE POLICY "Only admins can insert matches"
  ON public.matches FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'coach')
    )
  );

CREATE POLICY "Only admins can update matches"
  ON public.matches FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'coach')
    )
  );

CREATE POLICY "Only admins can delete matches"
  ON public.matches FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Registrations table
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  match_id UUID REFERENCES public.matches(id) ON DELETE CASCADE NOT NULL,
  child_id UUID REFERENCES public.children(id) ON DELETE CASCADE NOT NULL,
  parent_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  registration_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'waitlist')),
  cancellation_date TIMESTAMP WITH TIME ZONE,
  attended BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(match_id, child_id) -- Prevent duplicate registrations
);

ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Policies for registrations
CREATE POLICY "Parents can view their own registrations"
  ON public.registrations FOR SELECT
  USING (auth.uid() = parent_id);

CREATE POLICY "Admins can view all registrations"
  ON public.registrations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role IN ('admin', 'coach')
    )
  );

CREATE POLICY "Parents can insert their own registrations"
  ON public.registrations FOR INSERT
  WITH CHECK (auth.uid() = parent_id);

CREATE POLICY "Parents can update their own registrations"
  ON public.registrations FOR UPDATE
  USING (auth.uid() = parent_id);

CREATE POLICY "Parents can delete their own registrations"
  ON public.registrations FOR DELETE
  USING (auth.uid() = parent_id);

-- Field Information table
CREATE TABLE IF NOT EXISTS public.field_information (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Main Soccer Field',
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  parking_info TEXT,
  rules TEXT,
  amenities TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

ALTER TABLE public.field_information ENABLE ROW LEVEL SECURITY;

-- Policies for field_information
CREATE POLICY "Everyone can view field information"
  ON public.field_information FOR SELECT
  USING (true);

CREATE POLICY "Only admins can update field information"
  ON public.field_information FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('email', 'sms')),
  subject TEXT,
  message TEXT NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Policies for notifications
CREATE POLICY "Users can view their own notifications"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all notifications"
  ON public.notifications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Functions

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_children_updated_at BEFORE UPDATE ON public.children
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_matches_updated_at BEFORE UPDATE ON public.matches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_registrations_updated_at BEFORE UPDATE ON public.registrations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update match enrollment count
CREATE OR REPLACE FUNCTION update_match_enrollment()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status = 'confirmed' THEN
    UPDATE public.matches
    SET current_enrollment = current_enrollment + 1,
        status = CASE WHEN current_enrollment + 1 >= max_capacity THEN 'full' ELSE status END
    WHERE id = NEW.match_id;
  ELSIF TG_OP = 'UPDATE' AND OLD.status = 'confirmed' AND NEW.status != 'confirmed' THEN
    UPDATE public.matches
    SET current_enrollment = current_enrollment - 1,
        status = CASE WHEN current_enrollment - 1 < max_capacity THEN 'open' ELSE status END
    WHERE id = NEW.match_id;
  ELSIF TG_OP = 'UPDATE' AND OLD.status != 'confirmed' AND NEW.status = 'confirmed' THEN
    UPDATE public.matches
    SET current_enrollment = current_enrollment + 1,
        status = CASE WHEN current_enrollment + 1 >= max_capacity THEN 'full' ELSE status END
    WHERE id = NEW.match_id;
  ELSIF TG_OP = 'DELETE' AND OLD.status = 'confirmed' THEN
    UPDATE public.matches
    SET current_enrollment = current_enrollment - 1,
        status = CASE WHEN current_enrollment - 1 < max_capacity THEN 'open' ELSE status END
    WHERE id = OLD.match_id;
  END IF;

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ language 'plpgsql';

-- Trigger to update match enrollment
CREATE TRIGGER update_match_enrollment_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.registrations
  FOR EACH ROW EXECUTE FUNCTION update_match_enrollment();

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email_verified)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email_confirmed_at IS NOT NULL
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert default field information
INSERT INTO public.field_information (name, address, latitude, longitude, parking_info, rules, amenities)
VALUES (
  'Main Soccer Field',
  '123 Soccer Lane, Sports City, SC 12345',
  34.0522,
  -118.2437,
  'Free parking available in the lot adjacent to the field. Additional street parking on Main Street.',
  'Please arrive 15 minutes before match time. All players must wear shin guards. No cleats with metal studs. Respect the field and clean up after yourselves.',
  'Restrooms available near the parking lot. Water fountains on site. Shaded seating area for spectators. First aid kit available with field coordinator.'
)
ON CONFLICT DO NOTHING;

-- Indexes for better performance
CREATE INDEX idx_children_parent_id ON public.children(parent_id);
CREATE INDEX idx_matches_date ON public.matches(date);
CREATE INDEX idx_matches_age_group ON public.matches(age_group);
CREATE INDEX idx_matches_status ON public.matches(status);
CREATE INDEX idx_registrations_match_id ON public.registrations(match_id);
CREATE INDEX idx_registrations_child_id ON public.registrations(child_id);
CREATE INDEX idx_registrations_parent_id ON public.registrations(parent_id);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
