import { h } from 'preact';
import type { FunctionalComponent } from 'preact';

import { colors } from '../../constants';
import type { ColorName } from '../../constants';
import { preventDefault } from '../../helpers';
import { Color } from '../color';
import styles from './palette.css';

interface Props {
  currentColor: ColorName;
  onChange: (evnt: Event) => void;
}

export const Palette: FunctionalComponent<Props> = ({
  currentColor,
  onChange,
}) => (
  <form onChange={onChange} method="post" onSubmit={preventDefault}>
    <fieldset class={styles.inner}>
      <legend class={styles.caption}>Color Palette</legend>
      <div class={styles.colors}>
        {Object.entries(colors).map(([color, hex]) => (
          <Color
            color={color as ColorName}
            hex={hex}
            checked={currentColor === (color as ColorName)}
            key={color}
          />
        ))}
      </div>
    </fieldset>
  </form>
);
