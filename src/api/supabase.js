import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "Supabase URL나 Anon Key가 환경 변수에 설정되어 있지 않습니다.",
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
