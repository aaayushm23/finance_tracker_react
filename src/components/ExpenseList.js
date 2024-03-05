import React from 'react';
import './ExpenseList.css';

const ExpenseList = ({ expenses, deleteExpense }) => {
  return (
    <div className="expense-list">
      <h2>Expenses</h2>
      {expenses.map((expense) => (
        <div key={expense.id} className="expense-item">
          <span>{expense.category}</span>
          <span>${expense.amount.toFixed(2)}</span>
          <span>{expense.description}</span>
          <button onClick={() => deleteExpense(expense.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
