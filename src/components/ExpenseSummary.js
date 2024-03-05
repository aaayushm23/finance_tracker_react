import React from 'react';
import './ExpenseSummary.css';

const ExpenseSummary = ({ expenses }) => {
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

  const categoryTotals = expenses.reduce((totals, expense) => {
    if (!totals[expense.category]) {
      totals[expense.category] = 0;
    }
    totals[expense.category] += expense.amount;
    return totals;
  }, {});

  return (
    <div className="expense-summary">
      <h2>Summary</h2>
      <div>Total Expenses: ${totalExpenses.toFixed(2)}</div>
      <div>Expenses by Category:</div>
      {Object.keys(categoryTotals).map((category) => (
        <div key={category}>
          {category}: ${categoryTotals[category].toFixed(2)}
        </div>
      ))}
    </div>
  );
};

export default ExpenseSummary;
