import { h } from 'preact';
import type { FunctionalComponent } from 'preact';
import classNames from 'classnames';

import type { ColorName, Colors } from '../../constants';
import styles from './color.css';

interface Props {
  color: ColorName;
  hex: Colors[keyof Colors];
  checked: boolean;
}

export const Color: FunctionalComponent<Props> = ({ color, hex, checked }) => (
  <label
    class={classNames(styles.color, { [styles.colorActive]: checked })}
    style={{ backgroundColor: hex }}
    htmlFor={color}
  >
    <input
      type="radio"
      name="color"
      id={color}
      value={color}
      checked={checked}
      class={styles.input}
    />
  </label>
);
