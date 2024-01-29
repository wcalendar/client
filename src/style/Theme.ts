import { CategoryColor } from "@/types";

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
    lightBlue: '#eaeffc',

    /* 범주 */
    ...categoryColors,

    category: (color: CategoryColor, level: number) => {
      return categoryColors[`category${level === 0 ? 'Main' : 'Sub'}${`${color.charAt(0).toUpperCase()}${color.slice(1)}` as Colors}`];
    }
  },

  sizes: {
    header: {
      headerHeight: {
        mobile: '2.5rem',
        tablet: '3.125rem',
        desktop: '4.375rem',
      },
      headerPadding: {
        mobile: '.25rem',
        tablet: '.5rem',
        desktop: '1rem',
      },
    },
    calendar: {
      cellWidth: {
        mobile: '8.5625rem',
        tablet: '8.5625rem',
        desktop: '14.6875rem',
      },
      cellHeight: {
        mobile: '1.75rem',
        tablet: '1.75rem',
        desktop: '1.125rem',
      },
      categoryCellWidth: {
        mobile: '9.125rem',
        tablet: '9.125rem',
        desktop: '15.75rem',
      },
      memoWidth: {
        mobile: '0',
        tablet: '0',
        desktop: '4.0625rem',
      },
      lineGap: {
        mobile: '1rem',
        tablet: '1rem',
        desktop: '.125rem',
      },
      PriorityCount: {
        mobile: '4',
        tablet: '4',
        desktop: '4',
      },
      PriorityListWidth: {
        mobile: '133px',
        tablet: '133px',
        desktop: '232px',
      },
    }
  }
}

type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export default theme;