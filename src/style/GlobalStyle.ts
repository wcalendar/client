'use client';

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;

    color: ${({theme}) => theme.colors.black};
  }

  html {
    overflow: hidden;
  }
`;

export default GlobalStyle;