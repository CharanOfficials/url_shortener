import React from "react";
import { Box, Text } from "@chakra-ui/react";
import Logout from "../logout/Logout";
import { useUrlContext } from "../../context/url.context";
const Header = () => {
  const { visible } = useUrlContext();
  return (
    <Box className="htext header">
      <div className="text">
        <Text>URL MINIFIRE</Text>
      </div>
      {visible ? <Logout /> : <></>}
    </Box>
  );
};

export default Header;
