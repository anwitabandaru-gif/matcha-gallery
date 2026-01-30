// Supabase Configuration
// Replace these with your actual Supabase project credentials
const SUPABASE_URL = 'https://trwuhopggezdtzjtgyyv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyd3Vob3BnZ2V6ZHR6anRneXl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3MzM3MDUsImV4cCI6MjA4NTMwOTcwNX0.uKUVRRRPpGsXayYg46KQVGmjsDCp5gygHGJPgGSvOG0';

// Initialize Supabase client (will be loaded from CDN)
let supabase = null;

function initSupabase() {
    if (typeof supabase === 'undefined' || supabase === null) {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return supabase;
}