import "./App.css";
import "../src/pages/dashboard/dashboard.scss";
import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Header from "./components/header/Header";
function App() {
  return (
    <>
      <Box>
        <Header />
        <Outlet />
      </Box>
    </>
  );
}

export default App;
