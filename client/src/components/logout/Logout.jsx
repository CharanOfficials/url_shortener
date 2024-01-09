import { Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useUrlContext } from "../../context/url.context";
const Logout = () => {
  const { setVisible } = useUrlContext();
  const history = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    setVisible(false);
    history("/");
  };
  return (
    <button onClick={logoutHandler}>
      <FiLogOut />
    </button>
  );
};

export default Logout;
