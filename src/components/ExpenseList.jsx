import React from "react";

function ExpenseList({ results }) {
  if (!results) return null;

  return (
    <div style={{ marginTop: 30, background: "#f0f0f0", padding: 20, borderRadius: 8 }}>
      <h2>Results</h2>
      <p>Total Expense: ${results.total}</p>
      <p>Each Share: ${results.share}</p>
      <ul>
        {results.balances.map(({ name, balance }) => (
          <li key={name}>
            {name} {balance > 0 ? "should get" : "owes"} ${Math.abs(balance)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;
