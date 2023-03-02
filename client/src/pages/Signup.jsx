import React, { useState } from "react";
import validator from "validator";
import { Link, useNavigate } from "react-router-dom";
import { SignUp } from "../api/authRequest";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      if (!validator.isEmail(user.email)) {
        setErrMsg("Enter a valid email");
        setTimeout(() => setErrMsg(""), 1000);
      } else if (user.password.length < 6) {
        setErrMsg("password should atleast contain 6 characters");
        setTimeout(() => setErrMsg(""), 1500);
      } else {
        const { data } = await SignUp(user);
        data && navigate("/");
      }
    } catch (error) {
      let { msg } = error.response.data;
      console.log(error);
      setErrMsg(msg);
      setTimeout(() => setErrMsg(""), 1000);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-slate-200">
        <div className="bg-white p-16 rounded shadow-2xl w-1/3">
          <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center">
            Create Your Account
          </h2>
          {errMsg && (
            <h2 className="text-center bg-red-100 text-red-800 text-xm font-semibold mr-5 ml-5 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
              {errMsg}
            </h2>
          )}

          <form onSubmit={register}>
            <div className="space-y-5 ">
              <div>
                <label className="block mb-1 font-bold text-gray-500">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block mb-1 font-bold text-gray-500">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
                />
                <p className="  text-red-600 text-sm font-semibold mr-5 ml-5 px-.5 py-0.5">
                  {/* {emailErr} */}
                </p>
              </div>

              <div>
                <label className="block mb-1 font-bold text-gray-500">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
                />
                <p className="  text-red-600 text-sm font-semibold mr-5 ml-5 px-.5 py-0.5">
                  {/* {passwordErr} */}
                </p>
              </div>

              <button className="block w-full bg-indigo-700 hover:bg-indigo-500 p-4 rounded text-white hover:text--800 transition duration-300">
                Sign Up
              </button>

              <div className="flex items-center">
                <label className="ml-2 text-gray-700 text-sm">
                  Already have account!
                  <Link to="/login">
                    <span className="text-indigo-600 cursor-pointer">
                      Login
                    </span>
                  </Link>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
