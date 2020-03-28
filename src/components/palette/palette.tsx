import { FunctionalComponent, h } from 'preact';
import classNames from 'classnames';

import { colors, ColorName } from '../../constants';
import { preventDefault } from '../../helpers';
import { Color } from '../color';

interface Props {
  currentColor: ColorName;
  onChange: (evnt: Event) => void;
}

const classPalette = classNames(
  'border-gray-400',
  'border-solid',
  'border-t-2',
  'pt-6',
  'mt-6'
);
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
  <form
    onChange={onChange}
    method="post"
    onSubmit={preventDefault}
    class={classPalette}
  >
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
