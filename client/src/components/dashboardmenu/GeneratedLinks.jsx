import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@chakra-ui/react";
import { MdOutlineContentCopy } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import { REACT_ROUTE } from "../../../paths";
import { useNavigate } from "react-router-dom";
import { useToast, Text } from "@chakra-ui/react";
import copy from "clipboard-copy";
import { useUrlContext } from "../../context/url.context";
const DashMenu = () => {
  const [loading, setLoading] = useState(false);
  const { shortUrl, setShortUrl, isUpdated } = useUrlContext();
  const [urls, setUrls] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();
  const handleCopy = (url) => {
    copy(`${REACT_ROUTE}/api/${url}`);
    toast({
      title: "Copied.",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  };
  const handleRedirect = (url) => {
    setShortUrl("");
    url.hit_ratio++;
    setShortUrl(url);
    window.open(`${REACT_ROUTE}/api/${url.short_url}`, "_blank");
  };
  useEffect(() => {
    try {
      const loadShortLinks = async () => {
        setLoading(true);
        const url = REACT_ROUTE;
        const token = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(`${url}/api/urls`, config);
        setUrls(data.data);
        setLoading(false);
        toast({
          title: "Dashboard Refreshed",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      };
      const token = localStorage.getItem("userInfo");
      if (token) {
        loadShortLinks();
      }
    } catch (error) {}
  }, [isUpdated]);

  return (
    <Box h={"77%"} w={"20rem"} m={"0.8rem"}>
      <Text className="htext border" style={{ marginTop: "2.05rem" }}>
        Generated Links
      </Text>
      <Box className="shortlinks">
        {urls.map((url) => (
          <Box
            className="generatedlinks"
            key={url._id}
            backgroundColor={shortUrl?._id === url._id ? "#a3e3b4" : "white"}
          >
            <div
              className="links"
              onClick={() => setShortUrl(url)}
            >{`${REACT_ROUTE}/api/${url.short_url}`}</div>
            <div>
              <button onClick={() => handleCopy(url.short_url)}>
                <MdOutlineContentCopy />
              </button>
            </div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleRedirect(url)}
            >
              <FiExternalLink />
            </div>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default DashMenu;
