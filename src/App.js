import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { KanbanBoard, SharedLayout } from "./pages";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<KanbanBoard />} />
            {/* Prioritize the more specific dynamic route */}
            <Route path=":groupId/:orderId" element={<KanbanBoard />} />
            {/* Fallback for when only :groupId is provided */}
            <Route path=":groupId" element={<KanbanBoard />} />
            {/* Fallback for when only :orderId is provided */}
            <Route path=":orderId" element={<KanbanBoard />} />
          </Route>
          {/* Add a catch-all for undefined routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
