import { createContext, useContext, useState } from "react";
import React from "react";
const UrlContext = createContext();
export const useUrlContext = () => {
  return useContext(UrlContext);
};
const UrlProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [visible, setVisible] = useState(false);

  return (
    <UrlContext.Provider
      value={{
        user,
        setUser,
        shortUrl,
        setShortUrl,
        isUpdated,
        setIsUpdated,
        visible,
        setVisible,
      }}
    >
      {children}
    </UrlContext.Provider>
  );
};

export default UrlProvider;
