import { createTheme } from '@mantine/core';

export const theme = createTheme({
  /** Put your mantine theme override here */
  colors: {
    primary: [
      '#ecfdf5',
      '#d1fae5',
      '#a7f3d0',
      '#6ee7b7',
      '#34d399',
      '#059669',
      '#047857',
      '#065f46',
      '#064e3b',
      '#022c22',
      '#10B981',
    ],
    secondary: [
      '#fafaf9',
      '#f5f5f4',
      '#e7e5e4',
      '#d6d3d1',
      '#a8a29e',
      '#57534e',
      '#44403c',
      '#292524',
      '#1c1917',
      '#0c0a09',
      '#78716C',
    ],
  },
  primaryColor: 'primary',
  primaryShade: { light: 5, dark: 5 },
});
