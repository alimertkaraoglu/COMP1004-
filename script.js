import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabase = createClient('https://nrhduozvejvryiwnksik.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yaGR1b3p2ZWp2cnlpd25rc2lrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ2MDkyNzEsImV4cCI6MjAzMDE4NTI3MX0.VbcNM5ZkQYAH2wTjICL1wo5bdfleD78RACrGq4wwvwQ');

const submitButton = document.querySelector('button');
submitButton.addEventListener('click', fetchData);

async function fetchData() {
    const driverName = document.getElementById('driver_name').value.trim(); 
    const licenseNumber = document.getElementById('license_number').value.trim();

    try {
        let personQuery = supabase.from('People').select();

        if (driverName) {
            personQuery = personQuery.ilike('Name', `%${driverName}%`);
        }

        
        console.log('driver name:' + driverName);
        if (licenseNumber) {
            personQuery = personQuery.eq('LicenseNumber', licenseNumber);
        }

        const { data: peopleData, error: peopleError } = await personQuery;

        if (peopleError) {
            throw new Error(peopleError.message);
        }
        
        if (peopleData.length === 0) {
            displayData([], []);
            return;
        }

        
        const personID = peopleData[0].PersonID;

        
        const vehicleQuery = supabase.from('Vehicles').select().eq('OwnerID', personID);
        const { data: vehiclesData, error: vehiclesError } = await vehicleQuery;

        // if (vehiclesError) {
        //     throw new Error(vehiclesError.message);
        // }

        console.log("hello");  
        displayData(peopleData, vehiclesData);
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

function displayData(peopleData, vehiclesData) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
    console.log("people" + peopleData.length)
    for (let i = 0; i < peopleData.length; i++) {
        console.log(i);
        if (peopleData.length > 0) {
            console.log(vehiclesData[i]);
            const personInfo = document.createElement('div');
            if (vehiclesData[i]) {
                personInfo.innerHTML = `
            <h2>Person Details:</h2>
            <p>Driver Name: ${peopleData[i].Name}</p>
            <p>Address: ${peopleData[i].Address}</p>
            <p>DOB: ${peopleData[i].DOB}</p>
            <p>License Number: ${peopleData[i].LicenseNumber}</p>
            <p>Expiry Date: ${peopleData[i].ExpiryDate}</p>
            <h2>Vehicle Details:</h2>
            <p>Vehicle ID: ${vehiclesData[i].VehicleID}</p>
            <!-- Add more vehicle fields as needed -->
        `;
            } else {
                personInfo.innerHTML = `
            <h2>Person Details:</h2>
            <p>Driver Name: ${peopleData[i].Name}</p>
            <p>Address: ${peopleData[i].Address}</p>
            <p>DOB: ${peopleData[i].DOB}</p>
            <p>License Number: ${peopleData[i].LicenseNumber}</p>
            <p>Expiry Date: ${peopleData[i].ExpiryDate}</p>
            <h2>Vehicle Details:</h2>
            <p>Vehicle ID:</p>
            <!-- Add more vehicle fields as needed -->
        `;
            }
            resultsContainer.appendChild(personInfo);
        } else {
            resultsContainer.innerHTML = '<p>No results found</p>';
        }
    }
}
