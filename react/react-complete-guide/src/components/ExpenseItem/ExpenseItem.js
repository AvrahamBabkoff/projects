import React from "react";

import ExpenseDate from "../ExpenseDate/ExpenseDate";
import Card from "../Card/Card";
import "./ExpenseItem.css";

const ExpenseItem = (props) => {
  const expenseTitle = props.expense.title;

  const expenseAmount = props.expense.amount;
  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={props.expense.date} />
        <div className="expense-item__description">
          <h2>{expenseTitle}</h2>
          <div className="expense-item__price">{`$${expenseAmount}`}</div>
        </div>
      </Card>
    </li>
  );
};

export default ExpenseItem;
