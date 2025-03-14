"use client";
import { useEffect, useState } from "react";

export default function PaymentsTable() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/payments")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setPayments(data.data.items || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // console.log(payments);

  if (loading) return <p>Loading payments...</p>;

  return (
    <div>
      <h2>Razorpay Payments</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount (₹)</th>
            <th>Status</th>
            <th>Method</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{(payment.amount / 100).toFixed(2)}</td>
              <td>{payment.status}</td>
              <td>{payment.method}</td>
              <td>{new Date(payment.created_at * 1000).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
