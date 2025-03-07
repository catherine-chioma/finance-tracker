import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/api/transactions`)
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div>
      <h2>Recent Transactions</h2>
      <ul>
        {transactions.map((tx) => (
          <li key={tx.id}>{tx.description} - ${tx.amount}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
