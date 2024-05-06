import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient('https://nrhduozvejvryiwnksik.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yaGR1b3p2ZWp2cnlpd25rc2lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ2MDkyNzEsImV4cCI6MjAzMDE4NTI3MX0.VbcNM5ZkQYAH2wTjICL1wo5bdfleD78RACrGq4wwvwQ');

const submitButton = document.querySelector('button');
submitButton.addEventListener('click', fetchData);

async function fetchData() {
    const driverName = document.getElementById('driver_name').value.trim(); 
    const licenseNumber = document.getElementById('license_number').value.trim();

    try {
        let query = supabase.from('People').select();

        if (driverName) {
            query = query.eq('Name', driverName);
        }

    
        if (licenseNumber) {
            query = query.eq('LicenseNumber', licenseNumber);
        }

        const { data: peopleData, error: peopleError } = await query;

        if (peopleError) {
            throw new Error(peopleError.message);
        }

        displayData(peopleData);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

function displayData(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; 

    if (data.length === 0) {
        resultsContainer.textContent = 'No results found';
        return;
    }

    data.forEach(person => {
        const personInfo = document.createElement('div');
        personInfo.innerHTML = `
            <p>Driver Name: ${person.Name}</p>
            <p>Address: ${person.Address}<p>
            <p>DOB: ${person.DOB}<p>
            <p>License Number: ${person.LicenseNumber}</p>
            <p>ExpiryDate: ${person.ExpiryDate}<p>
            <!-- Add more fields as needed -->
        `;
        resultsContainer.appendChild(personInfo);
    });
}
