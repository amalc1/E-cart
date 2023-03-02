import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "../api/authRequest";
import { UserData } from "../context/UserContext";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { setUserDetails } = useContext(UserData);
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const doLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await LogIn(login);
      if (data) {
        setLoading(false);
        const { token, ...user } = data;
        localStorage.setItem("token", JSON.stringify(data.token));
        localStorage.setItem("user", JSON.stringify(user));
        setUserDetails(user);
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      let { msg } = error.response.data;
      setErrMsg(msg);
      setTimeout(() => setErrMsg(""), 1000);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-slate-200">
        <div className="bg-white p-16 rounded shadow-2xl w-1/3">
          <h2 className="text-3xl text-center font-bold mb-10 text-gray-800">
            Login
          </h2>
          {errMsg && (
            <h2 className="text-center bg-red-100 text-red-800 text-xm font-semibold mr-5 ml-5 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
              {errMsg}
            </h2>
          )}
          <form onSubmit={doLogin}>
            <div className="space-y-5 ">
              <div>
                <label className="block mb-1 font-bold text-gray-500">
                  UserName
                </label>
                <input
                  type="email"
                  name="email"
                  value={login.email}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block mb-1 font-bold text-gray-500">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={login.password}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
                />
              </div>

              <button
                className={
                  loading
                    ? `block italic w-full bg-indigo-700 hover:bg-indigo-500 p-4 rounded text-white hover:text--800 transition duration-300`
                    : "`block w-full bg-indigo-700 hover:bg-indigo-500 p-4 rounded text-white hover:text--800 transition duration-300`"
                }
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

              <div className="flex items-center">
                <label className="ml-2 text-gray-700 text-sm">
                  Dont have account!
                  <span className="text-indigo-600 cursor-pointer ml-1">
                    <Link to="/signup">Sign Up</Link>
                  </span>
                </label>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
