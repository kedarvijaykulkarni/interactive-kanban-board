import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <Box
      px="2"
      bg="#f4f5f9"
      style={{ height: "calc(100vh - 8px)" }}
      area={"main"}
    >
      <Outlet />
    </Box>
  );
};
export default Home;
