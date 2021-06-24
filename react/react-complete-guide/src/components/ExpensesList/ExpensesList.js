import React from "react";
import ExpenseItem from "../ExpenseItem/ExpenseItem";
import "./ExpensesList.css";

const ExpensesList = (props) => {
  const items = props.items;

  if (items.length === 0) {
    return <h2 className="expenses-list__fallback">OMG! Found no expenses.</h2>;
  }

  let expensesToRender = items.map((expense) => (
    <ExpenseItem key={expense.id} expense={expense} />
  ));

  //   return expensesToRender;
  return (
    <ul className="expenses-list">
        {expensesToRender}
    </ul>
  );
};

export default ExpensesList;
