import { Component, Fragment, h } from 'preact';
import type { ComponentChild } from 'preact';
import classNames from 'classnames';

import {
  STORAGE_KEY_SIZE,
  STORAGE_KEY_COLOR,
  STORAGE_KEY_PIXELS,
  Color,
  canvasSizes,
} from '../../constants';
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

type Size = [number, number];

interface State {
  size: Size | null;
  currentColor: ColorName;
  pixels: ColorName[];
}

const DEFAULT_CANVAS_SIZE: Size = [16, 8];

const classsRuler = classNames('my-6');
const classSelect = classNames('border', 'border-solid', 'border-gray-400');
const classToolbar = classNames('flex', 'justify-between', 'items-center');

const changeSizeWarning = `When changing the size of the canvas, you'll lose your current drawing. Proceed anyways?`;

const isSelected = (x: number, y: number, size: Size | null): boolean => {
  const currentSize = size || DEFAULT_CANVAS_SIZE;
  return currentSize[0] === x && currentSize[1] === y;
};

export class Editor extends Component<unknown, State> {
  state: State = {
    size: null,
    currentColor: 'red' as ColorName,
    pixels: [],
  };

  constructor() {
    super();

    this.setSize = this.setSize.bind(this);
    this.setCurrentColor = this.setCurrentColor.bind(this);
    this.setPixelColor = this.setPixelColor.bind(this);
    this.resetCanvas = this.resetCanvas.bind(this);
  }

  componentDidMount(): void {
    const {
      [STORAGE_KEY_SIZE]: sizeString = null,
      [STORAGE_KEY_COLOR]: currentColor = 'red',
    } = sessionStorage;
    const maybeSize = JSON.parse(sizeString) as State['size'];
    const size = Array.isArray(maybeSize) ? maybeSize : DEFAULT_CANVAS_SIZE;
    const pixelsFallback = JSON.stringify(this.getInitialCanvas(...size));
    const { [STORAGE_KEY_PIXELS]: pixels = pixelsFallback } = sessionStorage;
    this.setState({
      pixels: JSON.parse(pixels),
      currentColor,
      size,
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

      this.setState({ pixels, size }, () => {
        sessionStorage.setItem(STORAGE_KEY_SIZE, sizeString);
        sessionStorage.setItem(STORAGE_KEY_PIXELS, JSON.stringify(pixels));
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
    if (this.state.size) {
      const pixels = this.getInitialCanvas(...this.state.size);

      this.setState({ pixels }, () =>
        sessionStorage.setItem(STORAGE_KEY_PIXELS, JSON.stringify(pixels))
      );
    }
  }

  render(): ComponentChild {
    const { size, currentColor, pixels } = this.state;
    const columns = Array.isArray(size) ? size[0] : null;

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
