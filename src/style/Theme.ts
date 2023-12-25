import { CategoryColor } from "@/dummies/calendar";

type Colors = 'Red' | 'Orange' | 'Yellow' | 'Green' | 'Blue' | 'Purple' | 'Gray';
type CategoryColorsKeys = `category${'Main' | 'Sub'}${Colors}`;
const categoryColors: {[key in CategoryColorsKeys]: string} = {
  categoryMainRed: '#e4617a',
  categorySubRed: '#f1b0bc',
  categoryMainOrange: '#e0744e',
  categorySubOrange: '#dfb9a6',
  categoryMainYellow: '#daa12b',
  categorySubYellow: '#ecd095',
  categoryMainGreen: '#26aa85',
  categorySubGreen: '#92d4c2',
  categoryMainBlue: '#506ee2',
  categorySubBlue: '#a7b6f0',
  categoryMainPurple: '#8d4de2',
  categorySubPurple: '#c6a6f0',
  categoryMainGray: '#777d85',
  categorySubGray: '#bbbec2',
}

const theme = {
  devices: {
    mobile: '(max-width: 834px)',
    tablet: '(max-width: 1024px)',
  },

  colors: {
    black: '#111111',
    black80: `#11111180`,
    blue: '#2b5ee1',
    gray: '#adb5bd',
    lightGray: '#d9d9d9',
    white: '#ececec',

    /* 범주 */
    ...categoryColors,

    category: (color: CategoryColor, level: number) => {
      return categoryColors[`category${level === 0 ? 'Main' : 'Sub'}${`${color.charAt(0).toUpperCase()}${color.slice(1)}` as Colors}`];
    }
  },

  sizes: {
    calendar: {
      cellWidth: {
        mobile: '122px',
        tablet: '133px',
        desktop: '232px',
      },
      cellHeight: {
        mobile: '2rem',
        tablet: '1.5rem',
        desktop: '1.125rem',
      },
      lineGap: '4px',
    }
  }
}

type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export default theme;