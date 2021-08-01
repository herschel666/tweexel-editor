import { Component, h } from 'preact';
import type { ComponentChild } from 'preact';
import { route } from 'preact-router';

import styles from './editor.css';

import {
  STORAGE_KEY_SIZE,
  STORAGE_KEY_COLOR,
  STORAGE_KEY_PIXELS,
  Color,
  canvasSizes,
} from '../../constants';
import type { Size } from '../../constants';
import type { ColorName } from '../../constants';
import { Ruler } from '../ruler';
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

const changeSizeWarning = `When changing the size of the canvas, you'll lose your current drawing. Proceed anyways?`;

const isSelected = (x: number, y: number, [w, h]: Size): boolean =>
  w === x && h === y;

const getInitialCanvas = (x: number, y: number): ColorName[] =>
  Array.from({ length: x * y }, () => 'grey');

export class Editor extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.setSize = this.setSize.bind(this);
    this.setCurrentColor = this.setCurrentColor.bind(this);
    this.setPixelColor = this.setPixelColor.bind(this);
    this.resetCanvas = this.resetCanvas.bind(this);
    this.state = {
      currentColor: 'red' as ColorName,
      pixels: getInitialCanvas(...props.size),
    };
  }

  componentDidMount(): void {
    const amount = this.props.size[0] * this.props.size[1];
    const { [STORAGE_KEY_COLOR]: currentColor = 'red' } = sessionStorage;
    const { [STORAGE_KEY_PIXELS]: storedPixelsString = '[]' } = sessionStorage;
    const storedPixels = JSON.parse(storedPixelsString);
    const pixels =
      Array.isArray(storedPixels) && storedPixels.length === amount
        ? storedPixels
        : getInitialCanvas(...this.props.size);

    this.setState({ pixels, currentColor });
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
      const pixels = getInitialCanvas(...size);

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
    const pixels = getInitialCanvas(...this.props.size);

    this.setState({ pixels }, () =>
      sessionStorage.setItem(STORAGE_KEY_PIXELS, JSON.stringify(pixels))
    );
  }

  render(props: Props, state: State): ComponentChild {
    const { currentColor, pixels } = state;
    const { size } = props;
    const [columns] = size;

    return (
      <div class={styles.editor}>
        <Palette currentColor={currentColor} onChange={this.setCurrentColor} />
        <Ruler />
        <Canvas pixels={pixels} onClick={this.setPixelColor} size={size} />
        <Ruler />
        <div class={styles.toolbar}>
          <CopyButton columns={columns} pixels={pixels} />
          <Button onClick={this.resetCanvas}>Reset</Button>
          <form onChange={this.setSize} method="post">
            <select class={styles.select}>
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
      </div>
    );
  }
}
