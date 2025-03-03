/*
  # Create credentials table

  1. New Tables
    - `credentials`
      - `id` (uuid, primary key)
      - `student_id` (uuid, references profiles.id)
      - `institution_id` (uuid, references profiles.id)
      - `credential_type` (text)
      - `issue_date` (date)
      - `expiry_date` (date)
      - `description` (text)
      - `image_url` (text)
      - `verified` (boolean)
      - `token_id` (text)
      - `transaction_hash` (text)
      - `grade` (text)
      - `skills` (text[])
      - `achievements` (text[])
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `credentials` table
    - Add policy for students to read their own credentials
    - Add policy for institutions to read credentials they issued
    - Add policy for institutions to create credentials
*/

CREATE TABLE IF NOT EXISTS credentials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id),
  institution_id uuid REFERENCES profiles(id),
  credential_type text NOT NULL,
  issue_date date NOT NULL,
  expiry_date date,
  description text,
  image_url text,
  verified boolean DEFAULT false,
  token_id text,
  transaction_hash text,
  grade text,
  skills text[],
  achievements text[],
  created_at timestamptz DEFAULT now()
);

ALTER TABLE credentials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can read their own credentials"
  ON credentials
  FOR SELECT
  TO authenticated
  USING (auth.uid() = student_id);

CREATE POLICY "Institutions can read credentials they issued"
  ON credentials
  FOR SELECT
  TO authenticated
  USING (auth.uid() = institution_id);

CREATE POLICY "Institutions can create credentials"
  ON credentials
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'institution'
    )
  );

CREATE POLICY "Institutions can update credentials they issued"
  ON credentials
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = institution_id);

CREATE POLICY "Public credentials are viewable by everyone"
  ON credentials
  FOR SELECT
  TO anon
  USING (verified = true);