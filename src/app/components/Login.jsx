import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="flex flex-col gap-4 justify-center items-center"
        action="

        "
      >
        <input type="text" placeholder="Enter email" />
        <input type="password" placeholder="Enter password" />
        <button className="bg-black text-white rounded-md p-2">Login</button>
      </form>
    </div>
  );
};

export default Login;
