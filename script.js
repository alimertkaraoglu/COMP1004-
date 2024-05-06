import {createClient } from
'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient('https://nrhduozvejvryiwnksik.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yaGR1b3p2ZWp2cnlpd25rc2lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ2MDkyNzEsImV4cCI6MjAzMDE4NTI3MX0.VbcNM5ZkQYAH2wTjICL1wo5bdfleD78RACrGq4wwvwQ')
async function fetchData() {
    const { data, error
} = await supabase.from('People').select();
}
fetchData();
