import React from "react";

const DueDetails = (dues) => {
  const studentDues = dues.dues;
  //   console.log(studentDues);

  return (
    <div>
      {studentDues.length > 0 ? (
        <div>
          {studentDues.map((item, index) => (
            <div key={index}>
              <h3>Roll: {item.roll}</h3>
              <h1>Year:{item.year}</h1>
              <table
                border="1"
                cellPadding="10"
                cellSpacing="0"
                style={{
                  width: "100%",
                  textAlign: "left",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Amount ($)</th>
                    <th>Amount paid</th>
                    <th>Amount pending</th>
                    <th>Status</th>
                    <th>Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {item.dues.map((due, dueIndex) => (
                    <tr key={dueIndex}>
                      <td>{due.duetype}</td>
                      <td>{due.amount}</td>
                      <td>{due.amount_paid}</td>
                      <td>{due.amount_pending}</td>
                      <td>{due.status}</td>
                      <td>{due.due_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
        <p>No Results..</p>
      )}
    </div>
  );
};

export default DueDetails;
