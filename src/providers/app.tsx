import React from "react";
import { QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { Button } from "@mui/material";

import { queryClient } from "@/lib/react-query";

import { NotificationProvider } from "./notification";
import { AuthProvider } from "./auth";

const ErrorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <Button
        className="mt-4"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </Button>
    </div>
  );
};

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          suspense
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <QueryClientProvider client={queryClient}>
          <NotificationProvider />
          <AuthProvider>
            <Router>{children}</Router>
          </AuthProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
