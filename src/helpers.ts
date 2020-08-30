import {
  STORAGE_KEY_SIZE,
  DEFAULT_CANVAS_SIZE,
  canvasSizes,
  colors,
  emojis,
} from './constants';
import type { Colors, ColorName, Emojis, Size } from './constants';

const toTuple = (a: (string | number)[]): number[] => a.slice(0, 2).map(Number);

const isSize = (s: unknown): s is Size => {
  const [x, y] = Array.isArray(s) ? s : [];
  return (
    typeof x === 'number' &&
    typeof y === 'number' &&
    Boolean(canvasSizes.find(([width, height]) => x === width && y === height))
  );
};

const getStoredValue = (): unknown | null => {
  if (typeof sessionStorage === 'undefined') {
    return null;
  }
  try {
    return JSON.parse(sessionStorage[STORAGE_KEY_SIZE]);
  } catch {
    return null;
  }
};

export const getCurrentSize = (sizeUrlParam?: string): Size => {
  const urlSize = toTuple((sizeUrlParam || '').split('-'));
  const storedSizeValue = getStoredValue();
  const storedSize = Array.isArray(storedSizeValue)
    ? toTuple(storedSizeValue)
    : null;

  switch (true) {
    case isSize(urlSize):
      return urlSize as Size;
    case isSize(storedSize):
      return storedSize as Size;
    default:
      return DEFAULT_CANVAS_SIZE;
  }
};

export const getHexValueFromColorName = (
  colorName: ColorName
): Colors[keyof Colors] | never => {
  if (colors[colorName]) {
    return colors[colorName];
  }
  throw new Error(`${colorName} is not a valid color name.`);
};

export const getEmojiFromColorName = (
  colorName: ColorName
): Emojis[keyof Emojis] | never => {
  if (emojis[colorName]) {
    return emojis[colorName];
  }
  throw new Error(
    `There is no emoji referenced by the given color name ${colorName}.`
  );
};

export const preventDefault = (evnt: Event): void => evnt.preventDefault();
