import type { Preview } from "@storybook/react";
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import theme from '../src/style/Theme';
import GlobalStyle from '../src/style/GlobalStyle';
import { ThemeProvider } from "styled-components";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
};

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      theme: theme,
    },
    defaultTheme: 'theme',
    Provider: ThemeProvider,
    GlobalStyles: GlobalStyle,
  }),
];

export default preview;
