import { Component, h } from 'preact';
import classNames from 'classnames';

import { ColorName } from '../../constants';
import { getCanvasGridStyles, getHexValueFromColorName } from '../../helpers';
import { Pixel } from '../pixel/';

interface Props {
  pixels: ColorName[];
  onClick: (i: number) => void;
  columns: number;
  rows: number;
}

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

  handlePixelMouswDown(i: number) {
    this.props.onClick(i);
  }

  handleCanvasMouseDown() {
    this.mousedown = true;
  }

  handleMouseUp() {
    this.mousedown = false;
    this.currentPixel = null;

    if (
      document.activeElement &&
      document.activeElement.nodeName.toLowerCase() === 'button'
    ) {
      (document.activeElement as HTMLButtonElement).blur();
    }
  }

  handleMouseEnter(i: number) {
    if (!this.mousedown || i === this.currentPixel) {
      return;
    }
    this.currentPixel = i;
    this.props.onClick(i);
  }

  handlePixelMouseLeave() {
    this.currentPixel = null;
  }

  handleCanvasMouseLeave = this.handleMouseUp;

  render() {
    const { pixels, columns, rows } = this.props;

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
