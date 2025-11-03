import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  // Will fail gracefully in dev if env not configured
  console.warn(
    "Supabase environment variables are not set. Please copy .env.example to .env.local and fill values."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
