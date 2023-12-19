'use client';

import StyledComponentsRegistry from "@/lib/styled-components-registry";
import React from "react";
import GlobalStyle from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import theme from "./Theme";

export default function StyleProvider({
  children
}: { children: React.ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  )
}