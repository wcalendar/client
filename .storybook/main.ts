import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  webpackFinal: async config => {
    config.module?.rules?.unshift({
      test: /\.svg$/,
      use: ['@svgr/webpack',]
    });

    return config;
  },
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-themes"
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
