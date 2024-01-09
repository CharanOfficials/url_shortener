import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useUrlContext } from "../../context/url.context";
const HitCount = () => {
  const { shortUrl } = useUrlContext();
  return (
    <Box className="hitcount">
      <Text className="htext">Hit Count</Text>
      <Box className="hcount">
        <div>{shortUrl.hit_ratio > 0 ? shortUrl.hit_ratio : 0}</div>
      </Box>
    </Box>
  );
};

export default HitCount;
