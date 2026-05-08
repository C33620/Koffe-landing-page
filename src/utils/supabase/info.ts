// src/utils/supabase/info.ts

export const projectId = import.meta.env.VITE_SUPABASE_URL.replace(
  "https://",
  "",
).replace(".supabase.co", "");

export const publicAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
