function calculateSimplifiedEMI() {
    // Retrieve input values
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const annualInterestRate = parseFloat(document.getElementById('interestRate').value);
    const loanTenure = parseInt(document.getElementById('loanTenure').value, 10);
    const startDate = new Date(document.getElementById('startDate').value);

    // Validate input values
    if (isNaN(loanAmount) || isNaN(annualInterestRate) || isNaN(loanTenure) || loanAmount <= 0 || annualInterestRate <= 0 || loanTenure <= 0 || isNaN(startDate)) {
        document.getElementById('result').innerHTML = 'Please enter valid values.';
        return;
    }

    // Calculate total interest
    const annualInterest = (loanAmount * annualInterestRate) / 100;
    const totalInterest = annualInterest * (loanTenure / 12);

    // Calculate total repayment amount
    const totalRepaymentAmount = loanAmount + totalInterest;

    // Calculate monthly EMI
    const monthlyEMI = totalRepaymentAmount / loanTenure;

    // Display EMI result
    document.getElementById('result').innerHTML = `Your EMI is ₹${monthlyEMI.toFixed(2)}`;

    // Display EMI schedule in a table
    const emiTable = document.getElementById('emiTable');
    const emiTableBody = document.getElementById('emiTableBody');
    emiTableBody.innerHTML = '';

    let paymentDate = startDate;
    for (let i = 0; i < loanTenure; i++) {
        const row = emiTableBody.insertRow();
        row.insertCell(0).textContent = paymentDate.toLocaleDateString();
        row.insertCell(1).textContent = `₹${monthlyEMI.toFixed(2)}`;

        // Increment the payment date by one month
        paymentDate = new Date(paymentDate.setMonth(paymentDate.getMonth() + 1));
    }

    emiTable.style.display = 'table';
}
