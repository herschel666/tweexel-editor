import { FunctionalComponent, h } from 'preact';

import { colors, ColorName } from '../../constants';
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
  <form
    onChange={onChange}
    method="post"
    onSubmit={preventDefault}
    class="palette"
  >
    <fieldset class="palette__inner">
      <legend class="palette__caption">Color Palette</legend>
      <div class="palette__colors space-between">
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
