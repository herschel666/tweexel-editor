import { colors, emojis, Colors, ColorName, Emojis } from './constants';

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

export const preventDefault = (evnt: Event) => evnt.preventDefault();

export const getCanvasGridStyles = (columns: number, rows: number) => ({
  gridTemplateColumns: `repeat(${columns}, 18px)`,
  gridTemplateRows: `repeat(${rows}, 18px)`,
});
