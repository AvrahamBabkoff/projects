import React, { useState } from "react";

import ExpenseForm from "../ExpenseForm/ExpenseForm";

import "./NewExpense.css";

const NewExpense = (props) => {
  const [showForm, setShowForm] = useState(false);

  const onAddExpense = () => {
    //console.log('go the event from ExpenseAdd');
    setShowForm(true);
  }
  const onCloseForm = () => {
    //console.log('go the event from ExpenseAdd');
    setShowForm(false);
  }

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString()
    };
    props.onAddExpense(expenseData);
    setShowForm(false);
  };
  return (
    <div className="new-expense">
      {showForm?<ExpenseForm onSaveExpenseData={saveExpenseDataHandler} onCloseForm={onCloseForm}/> : <button onClick={onAddExpense}>Add Expense</button>}
      {/* {showForm?<ExpenseForm onSaveExpenseData={saveExpenseDataHandler} onCloseForm={onCloseForm}/>: <ExpenseAdd onAddExpense={onAddExpense}/>} */}
      {/* <ExpenseAdd onAddExpense={onAddExpense}/> */}
      {/* <ExpenseForm onSaveExpenseData={saveExpenseDataHandler} /> */}
    </div>
  );
};

export default NewExpense;
