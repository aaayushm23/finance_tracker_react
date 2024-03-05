import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import './App.css';

const App = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/expenses')
      .then(response => response.json())
      .then(data => setExpenses(data));
  }, []);

  const addExpense = (expense) => {
    fetch('http://127.0.0.1:5000/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expense),
    })
    .then(response => response.json())
    .then(newExpense => setExpenses([...expenses, newExpense]));
  };

  const deleteExpense = (id) => {
    fetch(`http://127.0.0.1:5000/expenses/${id}`, {
      method: 'DELETE',
    })
    .then(() => setExpenses(expenses.filter(expense => expense.id !== id)));
  };

  return (
    <div className="app">
      <h1>Personal Finance Tracker</h1>
      <ExpenseForm addExpense={addExpense} />
      <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
      <ExpenseSummary expenses={expenses} />
    </div>
  );
};

export default App;
