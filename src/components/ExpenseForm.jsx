import React from "react";

function ExpenseForm({ participants, onAdd, onRemove, onChange }) {
  return (
    <div>
      {participants.map(({ id, name, amount, description }, i) => (
        <div
          key={id}
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder={`Participant #${i + 1} Name`}
            value={name}
            onChange={(e) => onChange(id, "name", e.target.value)}
            style={{ flex: 3, padding: 6 }}
          />
          <input
            type="number"
            placeholder="Amount Paid"
            value={amount}
            min="0"
            onChange={(e) => onChange(id, "amount", e.target.value)}
            style={{ flex: 1.5, padding: 6 }}
          />
          <input
            type="text"
            placeholder="Expense Description"
            value={description || ""}
            onChange={(e) => onChange(id, "description", e.target.value)}
            style={{ flex: 3, padding: 6 }}
          />
          {participants.length > 1 && (
            <button onClick={() => onRemove(id)} style={{ padding: "5px 10px" }}>
              ✕
            </button>
          )}
        </div>
      ))}

      <button onClick={onAdd} style={{ marginTop: 10, padding: "8px 12px" }}>
        + Add Participant
      </button>
    </div>
  );
}

export default ExpenseForm;
