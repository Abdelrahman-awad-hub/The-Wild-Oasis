import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://kkgwhezjmqtpxlhmwggr.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrZ3doZXpqbXF0cHhsaG13Z2dyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ0NTY1NDEsImV4cCI6MjAyMDAzMjU0MX0.qd5SD8nfXyDQ06UAi98LcZT_sdGTRpfSE2BqrlBHk6w";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
