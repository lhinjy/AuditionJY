import { createClient } from "@supabase/supabase-js";

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;
export const supabase = createClient(apiUrl, apiKey);
