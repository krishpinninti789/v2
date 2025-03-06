import React from "react";

const UserDetails = (user) => {
  const userData = user.user;
  return (
    <div>
      <div>
        {userData.length != 0 ? (
          userData.map((Item, index) => (
            <div className="text-md font-bold" key={index}>
              <h1>Email id. :{Item.email}</h1>
            </div>
          ))
        ) : (
          <p>No Results..</p>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
