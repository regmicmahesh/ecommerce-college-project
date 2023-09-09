import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    "https://mllvyyhfrytrctscstaq.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sbHZ5eWhmcnl0cmN0c2NzdGFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQyNDgyNjgsImV4cCI6MjAwOTgyNDI2OH0.k3rOKqYDrw5QmRQZ8bkEzozBGsK7xIcS8-oI5jCoqUw"
);
export default supabase;
