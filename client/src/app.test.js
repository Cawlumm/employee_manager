import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Authentication from "./pages/authpage.component";
import { OpenProvider } from "./contexts/open.contex";
import { AuthProvider } from "./contexts/auth.context";
import App from "./App";

test("renders application", () => {
  render(<AuthProvider >
    <OpenProvider>
      <App />
    </OpenProvider>
  </AuthProvider>);

});






