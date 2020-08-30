import { Component, Fragment, h } from 'preact';
import type { ComponentChild } from 'preact';
import { route } from 'preact-router';
import classNames from 'classnames';

import {
  STORAGE_KEY_SIZE,
  STORAGE_KEY_COLOR,
  STORAGE_KEY_PIXELS,
  Color,
  canvasSizes,
} from '../../constants';
import type { Size } from '../../constants';
import type { ColorName } from '../../constants';
import { Palette } from '../palette';
import { Canvas } from '../canvas';
import { Button } from '../button';
import { CopyButton } from '../copy-button';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
  // tslint:disable-next-line:no-var-requires
  require('preact/debug');
}

interface State {
  currentColor: ColorName;
  pixels: ColorName[];
}

interface Props {
  size: Size;
}

const classsRuler = classNames('my-6');
const classSelect = classNames('border', 'border-solid', 'border-gray-400');
const classToolbar = classNames('flex', 'justify-between', 'items-center');

const changeSizeWarning = `When changing the size of the canvas, you'll lose your current drawing. Proceed anyways?`;

const isSelected = (x: number, y: number, [w, h]: Size): boolean =>
  w === x && h === y;

export class Editor extends Component<Props, State> {
  state: State = {
    currentColor: 'red' as ColorName,
    pixels: [],
  };

  constructor(props: Props) {
    super(props);

    this.setSize = this.setSize.bind(this);
    this.setCurrentColor = this.setCurrentColor.bind(this);
    this.setPixelColor = this.setPixelColor.bind(this);
    this.resetCanvas = this.resetCanvas.bind(this);
  }

  componentDidMount(): void {
    const { [STORAGE_KEY_COLOR]: currentColor = 'red' } = sessionStorage;
    const pixelsFallback = JSON.stringify(
      this.getInitialCanvas(...this.props.size)
    );
    const { [STORAGE_KEY_PIXELS]: pixels = pixelsFallback } = sessionStorage;
    this.setState({
      pixels: JSON.parse(pixels),
      currentColor,
    });
  }

  getInitialCanvas(x: number, y: number): ColorName[] {
    return Array.from({ length: x * y }, () => 'grey');
  }

  setSize(evnt: Event): void {
    if (!evnt.target) {
      return;
    }

    const elem = evnt.target as HTMLSelectElement;
    const isWip = this.state.pixels.some((pixel) => pixel !== Color.grey);

    if (!isWip || confirm(changeSizeWarning)) {
      const sizeString = elem.value;
      const size = JSON.parse(sizeString) as Size;
      const pixels = this.getInitialCanvas(...size);

      this.setState({ pixels }, () => {
        sessionStorage.setItem(STORAGE_KEY_SIZE, sizeString);
        sessionStorage.setItem(STORAGE_KEY_PIXELS, JSON.stringify(pixels));
        route(`/size/${size.join('-')}/`, true);
      });
    }
    elem.form && elem.form.reset();
  }

  setCurrentColor(evnt: Event): void {
    if (!evnt.target) {
      return;
    }
    const currentColor =
      ((evnt.target as HTMLInputElement).value as ColorName) || 'red';

    this.setState({ currentColor }, () =>
      sessionStorage.setItem(STORAGE_KEY_COLOR, currentColor)
    );
  }

  setPixelColor(index: number): void {
    let pixels: ColorName[];
    this.setState(
      ({ currentColor, pixels: oldPixels }) => {
        pixels = [
          ...oldPixels.slice(0, index),
          currentColor,
          ...oldPixels.slice(index + 1),
        ];
        return { currentColor, pixels };
      },
      () => sessionStorage.setItem(STORAGE_KEY_PIXELS, JSON.stringify(pixels))
    );
  }

  resetCanvas(): void {
    const pixels = this.getInitialCanvas(...this.props.size);

    this.setState({ pixels }, () =>
      sessionStorage.setItem(STORAGE_KEY_PIXELS, JSON.stringify(pixels))
    );
  }

  render(props: Props, state: State): ComponentChild {
    const { currentColor, pixels } = state;
    const { size } = props;
    const [columns] = size;

    return (
      <Fragment>
        <Palette currentColor={currentColor} onChange={this.setCurrentColor} />
        <hr class={classsRuler} />
        <Canvas pixels={pixels} onClick={this.setPixelColor} size={size} />
        <hr class={classsRuler} />
        <div class={classToolbar}>
          <CopyButton columns={columns} pixels={pixels} />
          <Button onClick={this.resetCanvas}>Reset</Button>
          <form onChange={this.setSize} method="post">
            <select class={classSelect}>
              <option>Change size…</option>
              {canvasSizes.map(
                ([x, y], _, __, value = JSON.stringify([x, y])) => (
                  <option
                    value={value}
                    key={`${x}×${y}`}
                    selected={isSelected(x, y, size)}
                  >
                    {x}×{y}
                  </option>
                )
              )}
            </select>
          </form>
        </div>
      </Fragment>
    );
  }
}
