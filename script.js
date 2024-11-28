// Initialize or Load Records
let dataRecords = JSON.parse(localStorage.getItem('dataRecords')) || [];

// Update Date and Time
function updateDateTime() {
    const dateTime = new Date().toLocaleString();
    document.getElementById('dateTime').textContent = `Current Date and Time: ${dateTime}`;
}
setInterval(updateDateTime, 1000);

// Switch Sections
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    if (sectionId === 'dashboard') updateDashboard();
    if (sectionId === 'reports') updateReports();
}

// Add Data
document.getElementById('dataForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const record = {
        date: new Date().toLocaleDateString(),
        temperature: document.getElementById('temperature').value,
        salinity: document.getElementById('salinity').value,
        ph: document.getElementById('ph').value,
        dissolvedOxygen: document.getElementById('dissolvedOxygen').value,
        boxNumber: document.getElementById('boxNumber').value,
        species: document.getElementById('species').value,
        weight: document.getElementById('weight').value,
        deaths: document.getElementById('deaths').value || 0,
        diseases: document.getElementById('diseases').value || 'None',
        buyingDate: document.getElementById('buyingDate').value,
        buyingWeight: document.getElementById('buyingWeight').value,
        buyingPrice: document.getElementById('buyingPrice').value,
        sellingDate: document.getElementById('sellingDate').value || 'N/A',
        sellingWeight: document.getElementById('sellingWeight').value || 'N/A',
        sellingPrice: document.getElementById('sellingPrice').value || 'N/A',
    };

    dataRecords.push(record);
    localStorage.setItem('dataRecords', JSON.stringify(dataRecords));
    alert('Data Added Successfully!');
    this.reset();
});

// Update Dashboard
function updateDashboard() {
    const today = new Date().toLocaleDateString();
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toLocaleDateString();

    const currentData = dataRecords.filter(record => record.date === today);
    const previousData = dataRecords.filter(record => record.date === yesterday);

    const currentDayHTML = currentData.map(record => `
        <p>Box ${record.boxNumber}: Temp ${record.temperature}°C, Salinity ${record.salinity}ppt, Weight ${record.weight}g</p>
    `).join('');

    const previousDayHTML = previousData.map(record => `
        <p>Box ${record.boxNumber}: Temp ${record.temperature}°C, Salinity ${record.salinity}ppt, Weight ${record.weight}g</p>
    `).join('');

    document.getElementById('currentDayData').innerHTML = currentDayHTML || '<p>No data available for today.</p>';
    document.getElementById('previousDayData').innerHTML = previousDayHTML || '<p>No data available for yesterday.</p>';
}

// Update Reports Section
function updateReports() {
    const totalProfit = dataRecords.reduce((total, record) => {
        const profit =
            record.sellingPrice !== 'N/A' && record.buyingPrice
                ? parseFloat(record.sellingPrice) - parseFloat(record.buyingPrice)
                : 0;
        return total + profit;
    }, 0);

    document.getElementById('profitSummary').textContent = `Total Profit: $${totalProfit.toFixed(2)}`;
}

// Chart.js Placeholder (for advanced analytics, you can implement charting here)
