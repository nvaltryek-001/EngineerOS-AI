-- Users table
CREATE TABLE users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Placements table
CREATE TABLE placements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  status TEXT NOT NULL,
  application_date DATE NOT NULL,
  logo TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Notes table
CREATE TABLE notes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  folder TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- RLS Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE placements ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile." ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile." ON users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view their own placements." ON placements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own placements." ON placements FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own placements." ON placements FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own placements." ON placements FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own notes." ON notes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own notes." ON notes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own notes." ON notes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own notes." ON notes FOR DELETE USING (auth.uid() = user_id);
