import { Component, h, FunctionalComponent } from 'preact';
import * as ClipBoard from 'clipboard-polyfill';

import { ColorName } from '../../constants';
import { getEmojiFromColorName } from '../../helpers';
import { Button } from '../button';
import { FeedbackConsumer, FeedbackType, SendFeedback } from '../feedback/';

interface ComponentProps {
  pixels: ColorName[];
  columns: number | null;
}

interface ClassProps {
  sendFeedback: SendFeedback;
}

type Props = ComponentProps & ClassProps;

interface State {
  copying: boolean;
}

class CopyButtonClass extends Component<Props, State> {
  state = {
    copying: false,
  };

  constructor(props: Props) {
    super(props);

    this.addToClipboard = this.addToClipboard.bind(this);
  }

  addToClipboard() {
    if (this.props.columns === null) {
      return;
    }

    this.setState({ copying: true });
    const text = this.props.pixels
      .map(getEmojiFromColorName)
      .reduce<string>((txt, emoji, index) => {
        const suffix =
          (index + 1) % (this.props.columns as number) === 0 ? '\r\n' : '';
        return `${txt}${emoji}${suffix}`;
      }, '');

    ClipBoard.writeText(`${text}\r\n#tweexel`).then(
      () => {
        this.setState({ copying: false });
        this.props.sendFeedback('Artwork copied to clipboard.');
      },
      (err) => {
        console.error(err);
        this.setState({ copying: false });
        this.props.sendFeedback('Copying failed.', FeedbackType.error);
      }
    );
  }

  render() {
    const { columns } = this.props;
    const { copying } = this.state;
    const disabled = copying || columns === null;

    return (
      <Button onClick={this.addToClipboard} disabled={disabled}>
        Copy artwork
      </Button>
    );
  }
}

export const CopyButton: FunctionalComponent<ComponentProps> = (props) => (
  <FeedbackConsumer>
    {(sendFeedback) => (
      <CopyButtonClass sendFeedback={sendFeedback} {...props} />
    )}
  </FeedbackConsumer>
);
