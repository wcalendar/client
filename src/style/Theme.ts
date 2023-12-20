const categoryColors: {[key: string]: string} = {
  category0Main: '#e4617a',
  category0Sub : '#f1b0bc',
  category1Main: '#e0744e',
  category1Sub : '#dfb9a6',
  category2Main: '#daa12b',
  category2Sub : '#ecd095',
  category3Main: '#26aa85',
  category3Sub : '#92d4c2',
  category4Main: '#506ee2',
  category4Sub : '#a7b6f0',
  category5Main: '#8d4de2',
  category5Sub : '#c6a6f0',
  category6Main: '#777d85',
  category6Sub : '#bbbec2',
}

const theme = {
  colors: {
    black: '#111111',
    black80: `#11111180`,
    blue: '#2b5ee1',
    gray: '#adb5bd',
    lightGray: '#d9d9d9',
    white: '#ececec',

    /* 범주 */
    category0Main: '#e4617a',
    category0Sub : '#f1b0bc',
    category1Main: '#e0744e',
    category1Sub : '#dfb9a6',
    category2Main: '#daa12b',
    category2Sub : '#ecd095',
    category3Main: '#26aa85',
    category3Sub : '#92d4c2',
    category4Main: '#506ee2',
    category4Sub : '#a7b6f0',
    category5Main: '#8d4de2',
    category5Sub : '#c6a6f0',
    category6Main: '#777d85',
    category6Sub : '#bbbec2',

    category: (color: number, level: number) => {
      return categoryColors[`category${color}${level === 0 ? 'Main' : 'Sub'}`];
    }
  },
  sizes: {
    calendar: {
      cellWidth: 232,
      lineGap: 4,
    }
  }
}

type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export default theme;