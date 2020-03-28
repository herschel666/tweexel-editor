import { Component, h } from 'preact';
import * as ClipBoard from 'clipboard-polyfill';

import { ColorName } from '../../constants';
import { getEmojiFromColorName } from '../../helpers';
import { Button } from '../button';

interface Props {
  pixels: ColorName[];
  columns: number;
}

interface State {
  readonly copying: boolean;
}

export class CopyButton extends Component<Props, State> {
  state = {
    copying: false,
  };

  constructor(props: Props) {
    super(props);

    this.addToClipboard = this.addToClipboard.bind(this);
  }

  addToClipboard() {
    this.setState({ copying: true });
    const text = this.props.pixels
      .map(getEmojiFromColorName)
      .reduce<string>((txt, emoji, index) => {
        const suffix = (index + 1) % this.props.columns === 0 ? '\r\n' : '';
        return `${txt}${emoji}${suffix}`;
      }, '');

    ClipBoard.writeText(`${text}\r\n#tweexel`).then(
      () => {
        this.setState({ copying: false });
      },
      (err) => {
        console.error(err);
        this.setState({ copying: false });
      }
    );
  }

  render() {
    const { copying } = this.state;

    return (
      <Button onClick={this.addToClipboard} disabled={copying}>
        Copy artwork
      </Button>
    );
  }
}
