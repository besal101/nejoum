import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ManagedModal from "./features/modal";
import { ModalProvider } from "./context/modal.context";
import { Toaster } from "./components/ui/toaster";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <ManagedModal />
        <App />
        <Toaster />
      </ModalProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
