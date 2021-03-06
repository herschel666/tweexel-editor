import { h } from 'preact';
import type { FunctionalComponent } from 'preact';
import classNames from 'classnames';

import { colors } from '../../constants';
import type { ColorName } from '../../constants';
import { preventDefault } from '../../helpers';
import { Color } from '../color';

interface Props {
  currentColor: ColorName;
  onChange: (evnt: Event) => void;
}

const classPaletteInner = classNames('p-0', 'm-0', 'border-0');
const classPaletteCaption = classNames('block', 'mb-2', 'text-base');
const classPaletteColors = classNames(
  'flex',
  'justify-between',
  'items-center',
  'px-0',
  'py-1'
);

export const Palette: FunctionalComponent<Props> = ({
  currentColor,
  onChange,
}) => (
  <form onChange={onChange} method="post" onSubmit={preventDefault}>
    <fieldset class={classPaletteInner}>
      <legend class={classPaletteCaption}>Color Palette</legend>
      <div class={classPaletteColors}>
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
