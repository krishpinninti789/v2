import React from "react";

const StudentDetails = (user) => {
  const studentData = user.user;
  // console.log(studentData[0].name);
  // console.log(studentData);

  return (
    <div>
      {studentData.length != 0 ? (
        studentData.map((Item, index) => (
          <div className="text-md font-bold" key={index}>
            <h1>Name: {Item.name}</h1>
            <h1>Roll No. :{Item.roll}</h1>
            <h1>Year :{Item.year}</h1>
            <h1>Branch: {Item.branch}</h1>
            <h1>Mobile No :{Item.mobile_no}</h1>
            <h1>Parent No:{Item.parent_mobile_no}</h1>
            <h1>Address: {Item.address}</h1>
            <h1>Type: {Item.type}</h1>
          </div>
        ))
      ) : (
        <p>No Results..</p>
      )}
    </div>
  );
};

export default StudentDetails;
