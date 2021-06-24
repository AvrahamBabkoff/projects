import React, { useState } from "react";
import ExpensesList from "../ExpensesList/ExpensesList";
import ExpensesFilter from "../ExpensesFilter/ExpensesFilter";
import Card from "../Card/Card";
import ExpensesChart from "../ExpensesChart/ExpensesChart";
import "./Expenses.css";

const Expenses = (props) => {
  const [currentYear, setCurrentYear] = useState('2019');

  console.log("current year is: " + currentYear);
  const items = props.items;

  const yearSelected = (year) => {
    // console.log("in Expenses");
    // console.log(year);
    setCurrentYear(year);
  };
  
  const filteredExpenses = items.
              filter(expense => expense.date.getFullYear().toString() === currentYear);




  // let expensesToRender = items.
  // filter(expense => expense.date.getFullYear().toString() === currentYear).
  // map(expense => <ExpenseItem key={expense.id} expense={expense}/>);

  // if (expensesToRender.length === 0) {
  //   expensesToRender = <p>No expenses found.</p>
  // }
  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter onSelectYear={yearSelected} default={currentYear} />
        <ExpensesChart expenses={filteredExpenses}/>
        <ExpensesList items={filteredExpenses}/>
      </Card>
    </div>
  );
};

export default Expenses;
