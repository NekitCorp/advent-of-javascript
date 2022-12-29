// @ts-check

/**
 * @typedef {Object} Expense
 * @property {string} title
 * @property {number} amount
 */

/** @type {Expense[]} */
let expenses = [];

const incomeInput = /** @type {HTMLInputElement} */ (
    document.getElementById("income")
);
const expenseNameInput = /** @type {HTMLInputElement} */ (
    document.getElementById("expense-name")
);
const expenseAmountInput = /** @type {HTMLInputElement} */ (
    document.getElementById("expense-amount")
);
const addExpenseButton = /** @type {HTMLButtonElement} */ (
    document.getElementById("add-expense-button")
);
const summaryIncome = /** @type {HTMLDivElement} */ (
    document.getElementById("summary-income")
);
const summaryExpanses = /** @type {HTMLDivElement} */ (
    document.getElementById("summary-expanses")
);
const summaryBalance = /** @type {HTMLDivElement} */ (
    document.getElementById("summary-balance")
);
const expenseTable = /** @type {HTMLDivElement} */ (
    document.querySelector(".expense-table")
);

incomeInput.addEventListener("change", recalculate);
addExpenseButton.addEventListener("click", () => {
    if (expenseNameInput.value && expenseAmountInput.value) {
        const index = expenses.push({
            title: expenseNameInput.value,
            amount: parseFloat(expenseAmountInput.value) || 0,
        });
        createExpenseRow(expenses[index - 1]);
        expenseNameInput.value = "";
        expenseAmountInput.value = "";
        recalculate();
    }
});

/**
 * @param {Expense} expense
 */
function createExpenseRow(expense) {
    const title = document.createElement("div");
    title.textContent = expense.title;

    const amount = document.createElement("div");
    amount.textContent = "$" + expense.amount.toFixed(2);

    const deleteWrapper = document.createElement("div");
    const button = document.createElement("button");
    button.name = "delete-expense";
    button.className = "delete-expense";
    deleteWrapper.appendChild(button);
    const img = document.createElement("img");
    img.src = "./images/trash.svg";
    img.alt = "Trash";
    button.appendChild(img);

    button.addEventListener("click", () => {
        const index = expenses.findIndex((e) => e === expense);

        if (index >= 0) {
            expenses = expenses.filter((e) => e !== expense);
            [...expenseTable.children]
                .slice(index * 3, (index + 1) * 3)
                .forEach((el) => el.remove());
            recalculate();
        }
    });

    expenseTable.append(title, amount, deleteWrapper);
}

function recalculate() {
    const income = parseFloat(incomeInput.value) || 0;
    const expense = expenses.reduce((acc, val) => acc + val.amount, 0);
    const balance = income - expense;

    summaryIncome.textContent = "$" + income.toFixed(2);
    summaryExpanses.textContent = "$" + expense.toFixed(2);
    summaryBalance.textContent = "$" + balance.toFixed(2);

    summaryBalance.className = `summary-amount${
        balance === 0 ? "" : balance > 0 ? " positive" : " negative"
    }`;
}
