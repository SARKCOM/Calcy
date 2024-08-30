function calculateEMI() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const annualInterestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTenure = parseFloat(document.getElementById('loanTenure').value);

    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const totalMonths = loanTenure * 12;

    const emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) /
                (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

    document.getElementById('result').innerHTML = `Your EMI is ₹${emi.toFixed(2)}`;

    // Calculate start date, end date, and fill the table
    const emiTable = document.getElementById('emiTable');
    const emiTableBody = document.getElementById('emiTableBody');
    emiTableBody.innerHTML = '';

    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + totalMonths, 0);

    for (let i = 0; i < totalMonths; i++) {
        const paymentDate = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
        const row = emiTableBody.insertRow();
        row.insertCell(0).textContent = paymentDate.toLocaleDateString();
        row.insertCell(1).textContent = new Date(paymentDate.getFullYear(), paymentDate.getMonth() + 1, 0).toLocaleDateString();
        row.insertCell(2).textContent = `₹${emi.toFixed(2)}`;
    }

    emiTable.style.display = 'table';
}
