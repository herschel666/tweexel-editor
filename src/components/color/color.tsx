import { FunctionalComponent, h } from 'preact';

import { ColorName, Colors } from '../../constants';

interface Props {
  color: ColorName;
  hex: Colors[keyof Colors];
  checked: boolean;
}

export const Color: FunctionalComponent<Props> = ({ color, hex, checked }) => (
  <label
    class={`tile${checked ? ' tile--active' : ''}`}
    style={{ backgroundColor: hex }}
    htmlFor={color}
  >
    <input
      type="radio"
      name="color"
      id={color}
      value={color}
      checked={checked}
      class="tile__input"
    />
  </label>
);
