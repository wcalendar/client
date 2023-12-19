const theme = {
  colors: {
    black: '#111111',
    blue: '#2b5ee1',
    gray: '#adb5bd',
    lightGray: '#d9d9d9',
    white: '#ececec',

    /* 범주 */
    category1Main: '#e4617a',
    category1Sub : '#f1b0bc',
    category2Main: '#e0744e',
    category2Sub : '#dfb9a6',
    category3Main: '#daa12b',
    category3Sub : '#ecd095',
    category4Main: '#26aa85',
    category4Sub : '#92d4c2',
    category5Main: '#506ee2',
    category5Sub : '#a7b6f0',
    category6Main: '#8d4de2',
    category6Sub : '#c6a6f0',
    category7Main: '#777d85',
    category7Sub : '#bbbec2',
  }
}

type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export default theme;