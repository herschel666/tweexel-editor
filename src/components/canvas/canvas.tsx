import { Component, h } from 'preact';
import type { ComponentChild } from 'preact';
import classNames from 'classnames';

import type { ColorName } from '../../constants';
import { getCanvasGridStyles, getHexValueFromColorName } from '../../helpers';
import { Pixel } from '../pixel/';
import { pulse } from './canvas.css';

interface Props {
  pixels: ColorName[];
  size: [number, number] | null;
  onClick: (i: number) => void;
}

const classPlaceholder = classNames('italic', 'text-center', pulse);
const classCanvas = classNames('flex');
const classCanvasInner = classNames(
  'grid',
  'gap-2',
  'grid-flow-row',
  'mx-auto',
  'my-2'
);

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

    if (size === null) {
      return <div class={classPlaceholder}>Creating canvas&hellip;</div>;
    }

    const [columns, rows] = size;

    return (
      <div class={classCanvas}>
        <div
          class={classCanvasInner}
          style={getCanvasGridStyles(columns, rows)}
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
            >
              <Pixel color={getHexValueFromColorName(color)} />
            </button>
          ))}
        </div>
      </div>
    );
  }
}
