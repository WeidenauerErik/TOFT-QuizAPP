/*
  # Create Quiz Results Table

  1. New Tables
    - `quiz_results`
      - `id` (uuid, primary key) - Unique identifier for each quiz result
      - `user_id` (uuid) - UUID of the user who completed the quiz
      - `user_name` (text) - Name of the user
      - `quiz_id` (text) - Identifier for the specific quiz
      - `quiz_tag` (text) - Tag/category of the quiz
      - `score` (integer) - Score achieved (0-5 points)
      - `created_at` (timestamptz) - Timestamp when quiz was completed

  2. Security
    - Enable RLS on `quiz_results` table
    - Add policy for anyone to insert their quiz results
    - Add policy for anyone to read quiz results (for leaderboards/stats)

  3. Notes
    - This table stores quiz completion data with user UUID and name
    - Users can submit multiple quiz results
    - Frontend will check localStorage to prevent duplicate submissions per quiz
*/

CREATE TABLE IF NOT EXISTS quiz_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  user_name text NOT NULL,
  quiz_id text NOT NULL,
  quiz_tag text NOT NULL,
  score integer NOT NULL CHECK (score >= 0 AND score <= 5),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert quiz results"
  ON quiz_results
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read quiz results"
  ON quiz_results
  FOR SELECT
  TO anon
  USING (true);

CREATE INDEX IF NOT EXISTS idx_quiz_results_user_id ON quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_quiz_id ON quiz_results(quiz_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_created_at ON quiz_results(created_at DESC);
