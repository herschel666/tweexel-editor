import type { FunctionalComponent } from 'preact';

import { colors } from '../../constants';
import type { ColorName } from '../../constants';
import { preventDefault } from '../../helpers';
import { Color } from '../color';

interface Props {
  currentColor: ColorName;
  onChange: (evnt: Event) => void;
}

export const Palette: FunctionalComponent<Props> = ({
  currentColor,
  onChange,
}) => (
  <form onChange={onChange} method="post" onSubmit={preventDefault}>
    <fieldset class="p-0 m-0 border-0">
      <legend class="block mb-2 text-base">Color Palette</legend>
      <div class="flex justify-between items-center px-0 py-1">
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
