import React from "react";

function Summary({ results }) {
  if (!results) return null;

  return (
    <div style={{ marginTop: 30, padding: 20, backgroundColor: "#e0f7fa", borderRadius: 8 }}>
      <h2>Summary</h2>
      <p><strong>Total Expense:</strong> ${results.total}</p>
      <p><strong>Each Share:</strong> ${results.share}</p>
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

export default Summary;
