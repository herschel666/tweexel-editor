import { h } from 'preact';
import type { FunctionalComponent } from 'preact';
import classNames from 'classnames';

import type { ColorName, Colors } from '../../constants';
import { color, colorActive } from './color.css';

interface Props {
  color: ColorName;
  hex: Colors[keyof Colors];
  checked: boolean;
}

const classColor = classNames(
  color,
  'box-border',
  'h-0',
  'relative',
  'overflow-hidden',
  'border',
  'border-solid',
  'border-white',
  'rounded-full',
  'cursor-pointer'
);

export const Color: FunctionalComponent<Props> = ({ color, hex, checked }) => (
  <label
    class={classNames(classColor, { [colorActive]: checked })}
    style={{ backgroundColor: hex }}
    htmlFor={color}
  >
    <input
      type="radio"
      name="color"
      id={color}
      value={color}
      checked={checked}
      class="opacity-0"
    />
  </label>
);
