import { createContext, useState } from "react";

export const UserData = createContext("");

function UserDetails({ children }) {
  const [userDetails, setUserDetails] = useState({});
  let [productRefresh, setProductRefresh] = useState(false);

  return (
    <UserData.Provider
      value={{ userDetails, setUserDetails, productRefresh, setProductRefresh }}
    >
      {children}
    </UserData.Provider>
  );
}

export default UserDetails;
