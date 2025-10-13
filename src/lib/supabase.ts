import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://csewutvnxjztsngiifvp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzZXd1dHZueGp6dHNuZ2lpZnZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzMDAyMDUsImV4cCI6MjA3NTg3NjIwNX0.h_J1JrLFMWY4vLs2c2CND7TvBIo4VY_qrk5NqcSJTEk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
