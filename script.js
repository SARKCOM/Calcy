function calculateSimplifiedEMI() {
    calculateEMIForScheme('1', 15);  // Scheme 1 with 15% interest rate
    calculateEMIForScheme('2', 12);  // Scheme 2 with 12% interest rate
}

function calculateEMIForScheme(schemeNumber, fixedInterestRate) {
    const loanAmount = parseFloat(document.getElementById('loanAmount' + schemeNumber).value);
    const loanTenure = parseInt(document.getElementById('loanTenure' + schemeNumber).value, 10);
    const startDate = new Date(document.getElementById('startDate' + schemeNumber).value);

    // Validate input values
    if (isNaN(loanAmount) || isNaN(loanTenure) || loanAmount <= 0 || loanTenure <= 0 || isNaN(startDate)) {
        document.getElementById('result' + schemeNumber).innerHTML = 'Please enter valid values.';
        return;
    }

    // Calculate total interest
    const annualInterest = (loanAmount * fixedInterestRate) / 100;
    const totalInterest = annualInterest * (loanTenure / 12);

    // Calculate total repayment amount
    const totalRepaymentAmount = loanAmount + totalInterest;

    // Calculate monthly EMI
    const monthlyEMI = totalRepaymentAmount / loanTenure;

    // Display EMI result
    document.getElementById('result' + schemeNumber).innerHTML = `Your EMI for Scheme ${schemeNumber} is ₹${monthlyEMI.toFixed(2)}`;

    // Display EMI schedule in a table
    const emiTable = document.getElementById('emiTable' + schemeNumber);
    const emiTableBody = document.getElementById('emiTableBody' + schemeNumber);
    emiTableBody.innerHTML = '';

    let paymentDate = new Date(startDate.getTime()); // Clone date to prevent mutation
    for (let i = 0; i < loanTenure; i++) {
        const row = emiTableBody.insertRow();
        row.insertCell(0).textContent = formatDate(paymentDate);
        row.insertCell(1).textContent = `₹${monthlyEMI.toFixed(2)}`;

        // Increment the payment date by one month
        paymentDate.setMonth(paymentDate.getMonth() + 1);
    }

    emiTable.style.display = 'table';
}

function formatDate(date) {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}
