import { FunctionalComponent, h } from 'preact';

import { ColorName } from '../../constants';
import { getCanvasGridStyles, getHexValueFromColorName } from '../../helpers';
import { Pixel } from '../pixel/';

interface Props {
  pixels: ColorName[];
  onClick: (i: number) => void;
  columns: number;
  rows: number;
}

export const Canvas: FunctionalComponent<Props> = ({
  pixels,
  onClick,
  columns,
  rows,
}) => (
  <div class="canvas">
    <div class="canvas__inner" style={getCanvasGridStyles(columns, rows)}>
      {pixels.map((color, i) => (
        <span class="canvas__item" key={`item-${i}`} onClick={() => onClick(i)}>
          <Pixel color={getHexValueFromColorName(color)} />
        </span>
      ))}
    </div>
  </div>
);
