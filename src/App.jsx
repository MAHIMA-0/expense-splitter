import { useState } from "react";
import './App.css';

function App() {
  const [participants, setParticipants] = useState([
    { id: 1, name: "", amount: 0, description: "" },
  ]);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const addParticipant = () => {
    setParticipants([
      ...participants,
      { id: Date.now(), name: "", amount: 0, description: "" },
    ]);
  };

  const removeParticipant = (id) => {
    setParticipants(participants.filter((p) => p.id !== id));
  };

  const handleChange = (id, field, value) => {
    setParticipants((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, [field]: field === "amount" ? +value : value } : p
      )
    );
  };

  const calculateSplit = () => {
    setError("");

    if (participants.length < 2) {
      setError("At least 2 participants required.");
      return;
    }

    for (const p of participants) {
      if (!p.name.trim()) {
        setError("All participants must have a name.");
        return;
      }
      if (p.amount < 0) {
        setError("Amounts cannot be negative.");
        return;
      }
    }

    const total = participants.reduce((sum, p) => sum + p.amount, 0);
    const share = total / participants.length;

    const balances = participants.map((p) => ({
      name: p.name.trim(),
      balance: +(p.amount - share).toFixed(2),
    }));

    // Smart settle logic
    const debtors = balances
      .filter((b) => b.balance < 0)
      .sort((a, b) => a.balance - b.balance);
    const creditors = balances
      .filter((b) => b.balance > 0)
      .sort((a, b) => b.balance - a.balance);
    const transactions = [];

    let i = 0,
      j = 0;
    while (i < debtors.length && j < creditors.length) {
      const debtor = debtors[i];
      const creditor = creditors[j];
      const amount = Math.min(Math.abs(debtor.balance), creditor.balance);

      transactions.push({
        from: debtor.name,
        to: creditor.name,
        amount: amount.toFixed(2),
      });

      debtor.balance += amount;
      creditor.balance -= amount;

      if (Math.abs(debtor.balance) < 0.01) i++;
      if (creditor.balance < 0.01) j++;
    }

    setResults({ total: total.toFixed(2), share: share.toFixed(2), transactions });
  };

  const resetAll = () => {
    setParticipants([{ id: 1, name: "", amount: 0, description: "" }]);
    setResults(null);
    setError("");
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "auto",
        padding: 20,
        fontFamily: "Arial",
      }}
    >
      <h1>Expense Splitter</h1>

      {participants.map(({ id, name, amount, description }, i) => (
  <div key={id} className="participant-row">
    <input
      type="text"
      placeholder={`Participant #${i + 1} Name`}
      value={name}
      onChange={(e) => handleChange(id, "name", e.target.value)}
      style={{ flex: "4" }}
    />
    <input
      type="number"
      placeholder="Amount Paid"
      value={amount}
      min="0"
      onChange={(e) => handleChange(id, "amount", e.target.value)}
      style={{ flex: "2" }}
    />
    <input
      type="text"
      placeholder="Description"
      value={description}
      onChange={(e) => handleChange(id, "description", e.target.value)}
      style={{ flex: "3" }}
    />
    {participants.length > 1 && (
      <button onClick={() => removeParticipant(id)}>✕</button>
    )}
  </div>
))}


      <div style={{ marginTop: 15 }}>
        <button
          onClick={addParticipant}
          style={{ marginRight: 10, padding: "8px 12px" }}
        >
          + Add Participant
        </button>

        <button
          onClick={calculateSplit}
          style={{ marginRight: 10, padding: "8px 12px" }}
        >
          Calculate Split
        </button>

        <button
          onClick={resetAll}
          style={{ padding: "8px 12px", backgroundColor: "#f88" }}
        >
          Clear All
        </button>
      </div>

      {error && (
        <div style={{ color: "red", marginTop: 20 }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {results && (
        <div
          style={{
            marginTop: 30,
            background: "#f0f0f0",
            padding: 20,
            borderRadius: 8,
          }}
        >
          <h2>Results</h2>
          <p>Total Expense: ${results.total}</p>
          <p>Each Share: ${results.share}</p>
          <h3>Settlements:</h3>
          <ul>
            {results.transactions.length === 0 ? (
              <p>No settlements needed. Everyone paid equally.</p>
            ) : (
              results.transactions.map((t, i) => (
                <li key={i}>
                  <strong>{t.from}</strong> pays <strong>{t.to}</strong> ${t.amount}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
