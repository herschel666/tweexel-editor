const STORAGE_KEY = 'tweexel';
export const STORAGE_KEY_SIZE = `${STORAGE_KEY}:size`;
export const STORAGE_KEY_PIXELS = `${STORAGE_KEY}:pixels`;
export const STORAGE_KEY_COLOR = `${STORAGE_KEY}:color`;

export enum Color {
  red = 'red',
  blue = 'blue',
  green = 'green',
  brown = 'brown',
  orange = 'orange',
  yellow = 'yellow',
  violet = 'violet',
  grey = 'grey',
  black = 'black',
}
export type ColorName = keyof typeof Color;
export type Colors = { [color in ColorName]: string };
export const colors: Colors = {
  red: '#dd2e44',
  blue: '#55acee',
  green: '#78b159',
  brown: '#c1694f',
  orange: '#ffac33',
  yellow: '#fdcb58',
  violet: '#aa8ed6',
  grey: '#e6e7e8',
  black: '#31373d',
};

export type Emojis = { [color in ColorName]: string };
export const emojis: Emojis = {
  red: '🟥',
  blue: '🟦',
  green: '🟩',
  brown: '🟫',
  orange: '🟧',
  yellow: '🟨',
  violet: '🟪',
  grey: '⬜️',
  black: '⬛️',
};

export const canvasSizes = [
  [16, 8],
  [8, 16],
  [12, 9],
  [9, 12],
  [10, 10],
  [8, 8],
  [5, 5],
];
