import { FunctionalComponent, h } from 'preact';
import classNames from 'classnames';

import { ColorName } from '../../constants';
import { getCanvasGridStyles, getHexValueFromColorName } from '../../helpers';
import { Pixel } from '../pixel/';

interface Props {
  pixels: ColorName[];
  onClick: (i: number) => void;
  columns: number;
  rows: number;
}

const classCanvas = classNames('flex');
const classCanvasInner = classNames(
  'grid',
  'gap-2',
  'grid-flow-row',
  'mx-auto',
  'my-2'
);

const blur = (evnt: Event) => {
  if (evnt.currentTarget) {
    (evnt.currentTarget as HTMLButtonElement).blur();
  }
};

export const Canvas: FunctionalComponent<Props> = ({
  pixels,
  onClick,
  columns,
  rows,
}) => (
  <div class={classCanvas}>
    <div class={classCanvasInner} style={getCanvasGridStyles(columns, rows)}>
      {pixels.map((color, i) => (
        <button key={`item-${i}`} onClick={() => onClick(i)} onMouseUp={blur}>
          <Pixel color={getHexValueFromColorName(color)} />
        </button>
      ))}
    </div>
  </div>
);
