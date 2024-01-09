import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useUrlContext } from "../../context/url.context";
import { REACT_ROUTE } from "../../../paths";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const HitRatioDayWise = () => {
  const { shortUrl } = useUrlContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const toast = useToast();
  useEffect(() => {
    try {
      const loadAnalysis = async () => {
        setLoading(true);
        const url = REACT_ROUTE;
        const token = JSON.parse(localStorage.getItem("userInfo"));
        const config = {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axios.get(
          `${url}/api/analysis/urlhit/${shortUrl._id}`,
          config
        );
        setData(data.data);
        setLoading(false);
      };
      if (shortUrl !== "") {
        loadAnalysis();
      }
    } catch (error) {}
  }, [shortUrl]);
  return (
    <ResponsiveContainer>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hit_date" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="day_wise_hit_count"
          stroke="#477152"
          fill="#a3e3b4"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default HitRatioDayWise;
