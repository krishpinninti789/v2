import React from "react";

const DueDetails = (dues) => {
  const studentDues = dues.dues;
  //   console.log(studentDues);

  return (
    <div>
      {studentDues.length > 0 ? (
        studentDues.map((Item, index) => (
          <div className="text-md font-bold" key={index}>
            <h1>Year: {Item.year}</h1>
            <h1>Roll No. :{Item.roll}</h1>
          </div>
        ))
      ) : (
        <p>No Results..</p>
      )}
    </div>
  );
};

export default DueDetails;
