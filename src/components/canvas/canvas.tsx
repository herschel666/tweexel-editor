import { Component, h } from 'preact';
import type { ComponentChild } from 'preact';
import classNames from 'classnames';

import type { ColorName, Size } from '../../constants';
import { getHexValueFromColorName } from '../../helpers';
import { Pixel } from '../pixel/';
import styles from './canvas.css';

interface Props {
  pixels: ColorName[];
  size: Size;
  onClick: (i: number) => void;
}

const getClassCanvasInner = (size: Size): string =>
  classNames(styles.inner, `tweexel-size-${size.join('-')}`);

export class Canvas extends Component<Props> {
  mousedown = false;
  currentPixel: number | null = null;

  constructor(props: Props) {
    super(props);

    this.handleCanvasMouseDown = this.handleCanvasMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handlePixelMouseLeave = this.handlePixelMouseLeave.bind(this);
    this.handleCanvasMouseLeave = this.handleCanvasMouseLeave.bind(this);
  }

  handlePixelMouswDown(i: number): void {
    this.props.onClick(i);
  }

  handleCanvasMouseDown(): void {
    this.mousedown = true;
  }

  handleMouseUp(): void {
    this.mousedown = false;
    this.currentPixel = null;

    if (
      document.activeElement &&
      document.activeElement.nodeName.toLowerCase() === 'button'
    ) {
      (document.activeElement as HTMLButtonElement).blur();
    }
  }

  handleMouseEnter(i: number): void {
    if (!this.mousedown || i === this.currentPixel) {
      return;
    }
    this.currentPixel = i;
    this.props.onClick(i);
  }

  handlePixelMouseLeave(): void {
    this.currentPixel = null;
  }

  handleCanvasMouseLeave = this.handleMouseUp;

  render(): ComponentChild {
    const { pixels, size } = this.props;
    const classCanvasInner = getClassCanvasInner(size);

    return (
      <div class={styles.canvas}>
        <div
          class={classCanvasInner}
          onMouseDown={this.handleCanvasMouseDown}
          onMouseUp={this.handleMouseUp}
          onMouseLeave={this.handleCanvasMouseLeave}
        >
          {pixels.map((color, i) => (
            <button
              key={`item-${i}`}
              onMouseDown={() => this.handlePixelMouswDown(i)}
              onMouseEnter={() => this.handleMouseEnter(i)}
              onMouseLeave={this.handlePixelMouseLeave}
              data-testid="tweexel"
            >
              <Pixel color={getHexValueFromColorName(color)} />
            </button>
          ))}
        </div>
      </div>
    );
  }
}
