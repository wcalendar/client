'use client';

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html {
    color: ${({theme}) => theme.colors.black};
    overflow: hidden;

    --header-height: ${({ theme }) => theme.sizes.header.headerHeight.desktop};
    --header-padding: ${({ theme }) => theme.sizes.header.headerPadding.desktop};

    @media ${({ theme }) => theme.devices.tablet} {
      --header-height: ${({ theme }) => theme.sizes.header.headerHeight.tablet};
      --header-padding: ${({ theme }) => theme.sizes.header.headerPadding.tablet};
    }

    @media ${({ theme }) => theme.devices.mobile} {
      --header-height: ${({ theme }) => theme.sizes.header.headerHeight.mobile};
      --header-padding: ${({ theme }) => theme.sizes.header.headerPadding.mobile};
    }
  }

  a {
    color: ${({ theme }) => theme.colors.black};
  }

  button {
    color: ${({ theme }) => theme.colors.black};
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 0.5;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 0.5;
    }

    100% {
      opacity: 0;
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(.97) translateX(-50%);
    }

    to {
      opacity: 1;
      transform: scale(1) translateX(-50%);
    }
  }

  @keyframes scaleOut {
    from {
      opacity: 1;
      transform: scale(1) translateX(-50%);
    }

    to {
      opacity: 0;
      transform: scale(.97) translateX(-50%);
    }
  }

  @keyframes fromUpOpen {
    0% {
      transform: translateY(-10%);
      opacity: 0;
    }

    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes fromUpClose {
    0% {
      transform: translateY(0);
      opacity: 1;
    }

    100% {
      transform: translateY(-10%);
      opacity: 0;
    }
  }
`;

export default GlobalStyle;