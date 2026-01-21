let salary = 0;
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let exchangeRate = 1; 
let currentCurrency = 'INR';

const chartCtx = document.getElementById('expenseChart').getContext('2d');
let myChart;

// Initialize App
window.onload = () => {
    const savedSalary = localStorage.getItem('salary');
    if (savedSalary) {
        document.getElementById('salary-input').value = savedSalary;
        salary = parseFloat(savedSalary);
    }
    updateUI();
};

async function handleCurrencyChange() {
    const newCurrency = document.getElementById('currency-select').value;
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/INR`);
        const data = await response.json();
        exchangeRate = newCurrency === 'USD' ? data.rates.USD : 1;
        currentCurrency = newCurrency;
        updateUI();
    } catch (error) {
        alert("Error fetching exchange rate.");
    }
}

function addExpense() {
    const name = document.getElementById('exp-name').value;
    const amount = parseFloat(document.getElementById('exp-amount').value);
    salary = parseFloat(document.getElementById('salary-input').value) || 0;

    if (!name || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid expense name and amount.");
        return;
    }

    expenses.push({ id: Date.now(), name, amount });
    saveAndRender();
    
    // Clear inputs
    document.getElementById('exp-name').value = '';
    document.getElementById('exp-amount').value = '';
}

function deleteExpense(id) {
    expenses = expenses.filter(exp => exp.id !== id);
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('salary', salary);
    updateUI();
}

function updateUI() {
    const list = document.getElementById('expense-list');
    list.innerHTML = '';
    
    let totalExp = 0;
    expenses.forEach(exp => {
        totalExp += exp.amount;
        list.innerHTML += `
            <div class="expense-item">
                <span>${exp.name}</span>
                <span>
                    ${(exp.amount * exchangeRate).toFixed(2)} ${currentCurrency}
                    <button class="trash-btn" onclick="deleteExpense(${exp.id})"><i class="fas fa-trash"></i></button>
                </span>
            </div>
        `;
    });

    const balance = salary - totalExp;
    const balanceEl = document.getElementById('balance-amount');
    const warningText = document.getElementById('warning-text');
    
    balanceEl.innerText = (balance * exchangeRate).toFixed(2);
    document.querySelectorAll('.currency-label').forEach(el => el.innerText = currentCurrency);

    //  Budget Alert
    if (salary > 0 && balance < (salary * 0.1)) {
        balanceEl.classList.add('low-budget');
        warningText.style.display = 'block';
    } else {
        balanceEl.classList.remove('low-budget');
        warningText.style.display = 'none';
    }

    updateChart(totalExp, balance > 0 ? balance : 0);
}

//  Visualization
function updateChart(totalExp, balance) {
    if (myChart) myChart.destroy();
    myChart = new Chart(chartCtx, {
        type: 'pie',
        data: {
            labels: ['Expenses', 'Remaining'],
            datasets: [{
                data: [totalExp, balance],
                backgroundColor: ['#e74c3c', '#2ecc71']
            }]
        }
    });
}

//  PDF Export
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text("Financial Status Report", 10, 20);
    
    doc.setFontSize(12);
    doc.text(`Total Salary: ${salary} INR`, 10, 40);
    
    let yPos = 50;
    doc.text("Expenses:", 10, yPos);
    expenses.forEach((ex, i) => {
        yPos += 10;
        doc.text(`${i+1}. ${ex.name}: ${ex.amount} INR`, 15, yPos);
    });

    const total = expenses.reduce((s, i) => s + i.amount, 0);
    doc.text(`-------------------------`, 10, yPos + 10);
    doc.text(`Remaining Balance: ${salary - total} INR`, 10, yPos + 20);
    
    doc.save("CashFlow_Report.pdf");
}
