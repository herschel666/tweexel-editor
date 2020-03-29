import { Component, Fragment, h } from 'preact';
import classNames from 'classnames';

import {
  STORAGE_KEY_SIZE,
  STORAGE_KEY_COLOR,
  STORAGE_KEY_PIXELS,
  ColorName,
  canvasSizes,
} from '../../constants';
import { Palette } from '../palette';
import { Canvas } from '../canvas';
import { Button } from '../button';
import { CopyButton } from '../copy-button';
import { InitialScreen } from '../initial-screen';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
  // tslint:disable-next-line:no-var-requires
  require('preact/debug');
}

interface State {
  size: [number, number] | null;
  currentColor: ColorName;
  pixels: ColorName[];
}

const classsRuler = classNames('my-6');
const classSelect = classNames('border', 'border-solid', 'border-gray-400');
const classToolbar = classNames('flex', 'justify-between', 'items-center');

export class Editor extends Component<{}, State> {
  state: State = {
    size: null,
    currentColor: 'red' as ColorName,
    pixels: [],
  };

  constructor() {
    super();

    this.setSize = this.setSize.bind(this);
    this.resetSize = this.resetSize.bind(this);
    this.setCurrentColor = this.setCurrentColor.bind(this);
    this.setPixelColor = this.setPixelColor.bind(this);
    this.resetCanvas = this.resetCanvas.bind(this);
  }

  componentDidMount() {
    const {
      [STORAGE_KEY_SIZE]: sizeString = null,
      [STORAGE_KEY_COLOR]: currentColor = 'red',
    } = sessionStorage;
    const size = JSON.parse(sizeString) as State['size'];
    const pixelsFallback = Array.isArray(size)
      ? JSON.stringify(this.getInitialCanvas(...size))
      : '[]';
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

  setSize(evnt: Event) {
    if (!evnt.target) {
      return;
    }

    const elem = evnt.target as HTMLInputElement;
    const size = JSON.parse(elem.value) as [number, number];

    this.setState(
      {
        size: size,
        pixels: this.getInitialCanvas(...size),
      },
      () => sessionStorage.setItem(STORAGE_KEY_SIZE, elem.value)
    );
  }

  resetSize() {
    this.setState({ size: null }, () => {
      sessionStorage.removeItem(STORAGE_KEY_SIZE);
      sessionStorage.removeItem(STORAGE_KEY_PIXELS);
    });
  }

  setCurrentColor(evnt: Event) {
    if (!evnt.target) {
      return;
    }
    const currentColor =
      ((evnt.target as HTMLInputElement).value as ColorName) || 'red';

    this.setState({ currentColor }, () =>
      sessionStorage.setItem(STORAGE_KEY_COLOR, currentColor)
    );
  }

  setPixelColor(index: number) {
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

  resetCanvas() {
    if (this.state.size) {
      const pixels = this.getInitialCanvas(...this.state.size);

      this.setState({ pixels }, () =>
        sessionStorage.setItem(STORAGE_KEY_PIXELS, JSON.stringify(pixels))
      );
    }
  }

  render() {
    const { size, currentColor, pixels } = this.state;

    if (size) {
      return (
        <Fragment>
          <Palette
            currentColor={currentColor}
            onChange={this.setCurrentColor}
          />
          <hr class={classsRuler} />
          <Canvas
            pixels={pixels}
            onClick={this.setPixelColor}
            columns={size[0]}
            rows={size[1]}
          />
          <hr class={classsRuler} />
          <div class={classToolbar}>
            <Button onClick={this.resetSize}>Choose new size</Button>
            <CopyButton columns={size[0]} pixels={pixels} />
            <Button onClick={this.resetCanvas}>Reset</Button>
          </div>
        </Fragment>
      );
    }

    return (
      <InitialScreen>
        <select onChange={this.setSize} class={classSelect}>
          <option>Select a size…</option>
          {canvasSizes.map(([x, y], _, __, size = JSON.stringify([x, y])) => (
            <option value={size} key={`${x}×${y}`}>
              {x}×{y}
            </option>
          ))}
        </select>
      </InitialScreen>
    );
  }
}
