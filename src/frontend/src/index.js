import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import HomePage from "./pages/HomePage";
import FacebookCallback from "./pages/FacebookCallback";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/facebook/callback" element={<FacebookCallback />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
