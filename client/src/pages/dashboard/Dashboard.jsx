import { Box, Text } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import DashMenu from "../../components/dashboardmenu/GeneratedLinks";
import HitCount from "../../components/dashboardmenu/HitCount";
import HitRatioDayWise from "../../components/dashboardmenu/HitRatioDayWise";
import ShortLinkForm from "../../components/shortlink/SHortLinkForm";
import { useUrlContext } from "../../context/url.context";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const { shortUrl } = useUrlContext();
  const history = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("userInfo");
    if (!token) {
      history("/");
    }
  });
  return (
    <>
      <div className="dashBoard">
        <ShortLinkForm />
        <Box className="subdashboard">
          <Box>
            <DashMenu />
          </Box>
          <div className="hitsgraphcount">
            <Text mt={"2rem"} w={"80%"} className="htext border">
              Dashboard
            </Text>
            {shortUrl !== "" ? (
              <>
                <HitCount />
                <div className="hitgraph">
                  <HitRatioDayWise />
                </div>
              </>
            ) : (
              "Select a link to load Data"
            )}
          </div>
        </Box>
      </div>
    </>
  );
};

export default Dashboard;
