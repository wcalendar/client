import { CategoryColor } from "@/types";

type Colors = 'Red' | 'Orange' | 'Yellow' | 'Green' | 'Blue' | 'Purple' | 'Gray' | 'NewRed' | 'NewOrange' | 'NewGreen' | 'NewPink' | 'NewPurple';
type CategoryColorsKeys = `category${Colors}`;
const categoryColors: {[key in CategoryColorsKeys]: string} = {
  categoryRed: '#f1b0bc',
  categoryOrange: '#efb9a6',
  categoryYellow: '#ecd095',
  categoryGreen: '#92d4c2',
  categoryBlue: '#a7b6f0',
  categoryPurple: '#c6a6f0',
  categoryGray: '#bbbec2',
  categoryNewRed: '#FF7676',
  categoryNewOrange: '#F39843',
  categoryNewGreen: '#4DD653',
  categoryNewPurple: '#AE9EED',
  categoryNewPink: '#F192D1',
}

const theme = {
  devices: {
    mobile: '(max-width: 834px)',
    tablet: '(max-width: 1024px)',
  },

  colors: {
    oldBlack: '#111111',
    black80: `#11111180`,
    blue: '#2b5ee1',
    gray: '#adb5bd',
    lightGray: '#d9d9d9',
    oldWhite: '#ececec',
    lightBlue: '#eaeffc',
    warningRed: '#ff2323',

    // new
    primary: '#5483FD',
    primaryHover: '#5483FDCC',
    black: '#000000',
    white: '#ffffff',
    whiteHover: '#0000000D',

    category: (color: CategoryColor, level: number) => {
      return `${categoryColors[`category${`${color.charAt(0).toUpperCase()}${color.slice(1)}` as Colors}`]}${level === 0 ? '' : (level === 1 ? 'cc' : '99')}`;
    },
    newCategory: (color: CategoryColor, level: number) => {
      return `${categoryColors[`category${`${color.charAt(0).toUpperCase()}${color.slice(1)}` as Colors}`]}${level === 0 ? '' : (level === 1 ? '80' : '1A')}`;
    },
    finishedCategory: (color: CategoryColor) => {
      return `${categoryColors[`category${`${color.charAt(0).toUpperCase()}${color.slice(1)}` as Colors}`]}33`;
    }
  },

  sizes: {
    header: {
      newHeaderHeight: {
        mobile: '3.75rem',
        tablet: '4.5rem',
        desktop: '4.5rem',
      },
      newHeaderVerticalPadding: {
        mobile: '1.125rem',
        tablet: '1.5rem',
        desktop: '1.5rem',
      },
      // TODO Delete
      headerHeight: {
        mobile: '5.25rem',
        tablet: '3.125rem',
        desktop: '4.375rem',
      },
      headerPadding: {
        mobile: '.5rem',
        tablet: '.5rem',
        desktop: '1rem',
      },
    },
    calendar: {
      cellWidth: {
        mobile: '3.75rem',
        tablet: '8.625rem',
        desktop: '14.75rem',
      },
      cellHeight: {
        mobile: '1.75rem',
        tablet: '1.75rem',
        desktop: '1.125rem',
      },
      categoryCellWidth: {
        mobile: '7.375rem',
        tablet: '9.125rem',
        desktop: '15.75rem',
      },
      memoWidth: {
        mobile: '0',
        tablet: '0',
        desktop: '4.0625rem',
      },
      lineGap: {
        mobile: '.5rem',
        tablet: '.25rem',
        desktop: '.125rem',
      },
      PriorityCount: {
        mobile: '4',
        tablet: '4',
        desktop: '4',
      },
      PriorityListWidth: {
        mobile: '8.625rem',
        tablet: '8.625rem',
        desktop: '14.75rem',
      },
    }
  }
}

type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export default theme;