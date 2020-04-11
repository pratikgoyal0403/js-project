// delete item not implemented
const budget = document.querySelector(".budget__value");
const income = document.querySelector(".budget__income--value");
const expense = document.querySelector(".budget__expenses--value");
const totalExpensePercentage = document.querySelector(
  ".budget__expenses--percentage"
);
const type = document.querySelector(".add__type");
const description = document.querySelector(".add__description");
const value = document.querySelector(".add__value");
const checkBtn = document.querySelector(".add__btn");
const incomeContainer = document.querySelector(".income__list");
const expenseContainer = document.querySelector(".expenses__list");
const allExpenses = [],
  allIncome = [];
let total = 0;

//getting and setting values after filtering
const retrieveValues = () => {
  let totalIncomeValue, totalExpenseValue;
  const entry = {
    type: type.options[type.selectedIndex].value,
    description: description.value,
    value: parseInt(value.value),
  };
  description.value = "";
  value.value = "";
  if (entry.type === "inc") {
    allIncome.push(entry);
    totalIncomeValue = renderIncomeToDom();
  } else if (entry.type === "exp") {
    allExpenses.push(entry);
    totalExpenseValue = renderExpenseToDom();
  }
  totalBudget(entry);
};
//displaying total budget
const totalBudget = (entry) => {
  if (entry.type === "inc") {
    console.log(budget);
    total += entry.value;
  } else {
    total -= entry.value;
  }
  let sign = total > 0 ? "+ " + total : total;
  console.log(sign);
  budget.innerText = sign;
};
//rendering income to DOM
const renderIncomeToDom = () => {
  const total = allIncome.reduce((prevValue, currValue) => {
    return prevValue + currValue.value;
  }, 0);
  income.innerText = `+ ${total}`;
  renderIncomeDetail();
  return total;
};
const renderIncomeDetail = () => {
  incomeContainer.innerHTML = "";
  allIncome.map((entry, index) => {
    const el = document.createElement("div");
    el.className = "item clearfix";
    el.setAttribute("id", `income-${index}`);
    el.innerHTML = `<div class="item__description">${entry.description}</div>
        <div class="right clearfix">
            <div class="item__value">+ ${entry.value}</div>
            <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
            </div>
        </div>`;
    incomeContainer.appendChild(el);
  });
};
//rendering expense to DOM
const renderExpenseToDom = () => {
  //getting total expense
  const total = allExpenses.reduce((prevValue, currValue) => {
    return prevValue + currValue.value;
  }, 0);
  expense.innerText = `- ${total}`;
  //getting total percentage spent
  let lastIndex = allExpenses.length - 1;
  allExpenses[lastIndex].percentage =
    (allExpenses[lastIndex].value / parseInt(income.innerText.split(" ")[1])) *
    100;
  //rendering total percentage spent
  const totalPercentage = allExpenses.reduce((prevValue, currValue) => {
    return prevValue + currValue.percentage;
  }, 0);
  totalExpensePercentage.innerText = totalPercentage + "%";
  renderExpenseDetail();
  return total;
};
const renderExpenseDetail = () => {
  expenseContainer.innerHTML = "";
  allExpenses.map((entry, index) => {
    const el = document.createElement("div");
    el.className = "item clearfix";
    el.setAttribute("id", `expense-${index}`);
    el.innerHTML = `<div class="item__description">A${entry.description}</div>
        <div class="right clearfix">
            <div class="item__value">- ${entry.value}</div>
            <div class="item__percentage">${entry.percentage} %</div>
            <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
            </div>
        </div>
    </div>`;
    expenseContainer.appendChild(el);
  });
};

value.addEventListener("keydown", (event) => {
  if (event.keyCode == 13) {
    retrieveValues();
  }
});
checkBtn.addEventListener("click", retrieveValues);
