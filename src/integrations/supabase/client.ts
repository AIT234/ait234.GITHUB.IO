import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const SUPABASE_URL = "https://ufvevoyzamcxqkonmbye.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVmdmV2b3l6YW1jeHFrb25tYnllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ0OTQwMjUsImV4cCI6MjEwMDA3MDAyNX0.Nzn4DRTTLGDOHwG_Hhy4x2XPC9ty2m5Z7kcs5GUFhCc";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
