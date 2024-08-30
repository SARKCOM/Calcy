function calculateEMI() {
    // Retrieve input values
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const annualInterestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTenure = parseFloat(document.getElementById('loanTenure').value);

    // Validate input values
    if (isNaN(loanAmount) || isNaN(annualInterestRate) || isNaN(loanTenure) || loanAmount <= 0 || annualInterestRate <= 0 || loanTenure <= 0) {
        document.getElementById('result').innerHTML = 'Please enter valid values.';
        return;
    }

    // Convert annual interest rate to monthly and tenure to months
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const totalMonths = loanTenure * 12;

    // EMI calculation formula
    const emi = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) /
                (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);

    // Display EMI result
    document.getElementById('result').innerHTML = `Your EMI is ₹${emi.toFixed(2)}`;

    // Display EMI schedule in a table
    const emiTable = document.getElementById('emiTable');
    const emiTableBody = document.getElementById('emiTableBody');
    emiTableBody.innerHTML = '';

    const startDate = new Date();
    for (let i = 0; i < totalMonths; i++) {
        const paymentDate = new Date(startDate.getFullYear(), startDate.getMonth() + i, 1);
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + i + 1, 0);
        
        const row = emiTableBody.insertRow();
        row.insertCell(0).textContent = paymentDate.toLocaleDateString();
        row.insertCell(1).textContent = endDate.toLocaleDateString();
        row.insertCell(2).textContent = `₹${emi.toFixed(2)}`;
    }

    emiTable.style.display = 'table';
}
