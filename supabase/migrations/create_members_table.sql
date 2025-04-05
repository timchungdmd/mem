/*
      # Create members table

      This migration creates the `members` table to store member profiles.

      1. New Tables
        - `members`
          - `id` (uuid, primary key, default: gen_random_uuid())
          - `created_at` (timestamp with time zone, default: now())
          - `name` (text, not null)
          - `email` (text, unique, not null)
          - `membership_level` (text, not null, default: 'Basic')
          - `join_date` (timestamp with time zone, default: now())

      2. Security
        - Enable Row Level Security (RLS) on `members` table.
        - Create policy to allow authenticated users to:
          - `insert` new members (admin role or public signup - to be defined later)
          - `select` members (for member list and profiles - policies to be refined)
          - `update` members (admin or member self-update - to be defined later)
          - `delete` members (admin only - to be defined later)

      3. Notes
        - `membership_level` is initially text-based ('Basic', 'Premium', 'VIP'). This can be linked to a separate `tiers` table later for more dynamic tier management.
        - Join date defaults to `now()`, but can be adjusted during member creation.
    */

    CREATE TABLE IF NOT EXISTS members (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      created_at TIMESTAMPTZ DEFAULT now(),
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      membership_level TEXT NOT NULL DEFAULT 'Basic',
      join_date TIMESTAMPTZ DEFAULT now()
    );

    ALTER TABLE members ENABLE ROW LEVEL SECURITY;

    -- Example RLS policy (adjust as needed for your access control requirements)
    CREATE POLICY "Members are publicly accessible"
      ON members FOR SELECT
      USING (TRUE); -- Adjust this policy for more restrictive access later

    CREATE POLICY "Enable insert for authenticated users"
      ON members FOR INSERT
      TO authenticated
      WITH CHECK (TRUE); -- Adjust this policy for more restrictive access later

    CREATE POLICY "Enable update for authenticated users"
      ON members FOR UPDATE
      TO authenticated
      USING (TRUE)
      WITH CHECK (TRUE); -- Adjust this policy for more restrictive access later

    CREATE POLICY "Enable delete for authenticated users"
      ON members FOR DELETE
      TO authenticated
      USING (FALSE); -- Initially disable delete for non-admins, adjust policy later
