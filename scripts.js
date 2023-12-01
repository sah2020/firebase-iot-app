const firebaseConfig = {
    apiKey: "AIzaSyCSYLu7i_iBWP_mTBE0Ncyu4eejZ22ckyE",
    authDomain: "iot-smart-parking-6f0cd.firebaseapp.com",
    databaseURL: "https://iot-smart-parking-6f0cd-default-rtdb.firebaseio.com",
    projectId: "iot-smart-parking-6f0cd",
    storageBucket: "iot-smart-parking-6f0cd.appspot.com",
    messagingSenderId: "893449352981",
    appId: "1:893449352981:web:2374737875b8bfeb5cdb1c"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();
let isGateOpen = false;

// Get references to HTML elements
const parkingSpotFreeElement = document.getElementById('parkingSpotFree');
const lcdTextElement = document.getElementById('lcdText');
const servoAngleElement = document.getElementById('servoAngle');
const rotateServoButton = document.getElementById('rotateServo');
const parkingChartElement = document.getElementById('parkingChart').getContext('2d');

// Initialize Chart
const parkingChart = new Chart(parkingChartElement, {
    type: 'bar',
    data: {
        labels: ['Occupied', 'Free'],
        datasets: [{
            label: 'Parking Status',
            data: [0, 1],
            backgroundColor: ['#FF6347', '#7CFC00']
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 4
            }
        }
    }
});

// Firebase event listeners
database.ref('parking-spot-free').on('value', snapshot => {
    const isParkingSpotFree = snapshot.val() === 'yes';
    parkingSpotFreeElement.textContent = isParkingSpotFree ? 'Yes' : 'No';

    // Update chart data
    parkingChart.data.datasets[0].data = [isParkingSpotFree ? 2 : 3, isParkingSpotFree ? 3 : 2];
    parkingChart.update();
});

database.ref('lcd-text').on('value', snapshot => {
    lcdTextElement.textContent = snapshot.val();
});

const toggleGateButton = document.getElementById('toggleGateButton');
toggleGateButton.addEventListener('click', () => {
    isGateOpen = !isGateOpen;
    const newServoAngle = isGateOpen ? 90 : 0;
    database.ref('servo-angle').set(newServoAngle);

    // Move the handle to simulate the switch toggle
    const switchHandle = toggleGateButton.querySelector('.switch-handle');
    switchHandle.style.transform = isGateOpen ? 'translateX(24px)' : 'translateX(0)';
});