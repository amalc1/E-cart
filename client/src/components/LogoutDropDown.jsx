import React, { useContext, useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
const LogoutDropDown = () => {
  const [open, setOpen] = useState(true);
  const { userDetails, setUserDetails } = useContext(UserData);
  const navigate = useNavigate();
  const doLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUserDetails({});
    navigate("/");
  };
  return (
    <>
      <div
        className="relative flex flex-col items-center w-full h-7 rounded"
        onClick={() => setOpen((prev) => !prev)}
      >
        <button className="bg-blue-400 text-black rounded px-2 py-1 flex gap-1 items-center justify-between text-md -tracking-wider border-transparent">
          {userDetails?.user && userDetails?.user?.name}
          {open ? <AiFillCaretDown /> : <AiFillCaretUp />}
        </button>
        {open && (
          <div
            className="absolute bg-blue-400  text-white top-10 rounded px-3  py-1"
            onClick={() => doLogout()}
          >
            <div>
              <h3>Logout</h3>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LogoutDropDown;
