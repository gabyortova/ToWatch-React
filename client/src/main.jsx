import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { LoadingProvider } from "./providers/LoadingProvider.jsx";
import App from "./App.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            padding: "16px",
          },
          iconTheme: {
            primary: "#612940",
            secondary: "#ffffff",
          },
        }}
      />
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </BrowserRouter>
  </QueryClientProvider>,
);
