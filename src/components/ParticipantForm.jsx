import React from "react";

function ParticipantForm({ participants, onChange, onAdd }) {
  return (
    <div>
      {participants.map(({ id, name, amount, description }, i) => (
        <div key={id} style={{ marginBottom: 10 }}>
          <input
            type="text"
            placeholder={`Participant #${i + 1} Name`}
            value={name}
            onChange={(e) => onChange(id, "name", e.target.value)}
            style={{ width: "40%", padding: 6, marginRight: 10 }}
          />
          <input
            type="number"
            placeholder="Amount Paid"
            value={amount}
            min="0"
            onChange={(e) => onChange(id, "amount", e.target.value)}
            style={{ width: "20%", padding: 6, marginRight: 10 }}
          />
          <input
            type="text"
            placeholder="Expense Description"
            value={description || ""}
            onChange={(e) => onChange(id, "description", e.target.value)}
            style={{ width: "30%", padding: 6 }}
          />
        </div>
      ))}

      <button onClick={onAdd} style={{ padding: "8px 12px", marginTop: 10 }}>
        + Add Participant
      </button>
    </div>
  );
}

export default ParticipantForm;
