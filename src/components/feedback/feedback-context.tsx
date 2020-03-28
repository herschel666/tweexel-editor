import {
  Component,
  FunctionalComponent,
  createContext,
  h,
  VNode,
} from 'preact';

import { Feedback, FeedbackType } from './feedback';

export type SendFeedback = (message: string, type?: FeedbackType) => void;
const FeedbackContext = createContext<SendFeedback>(() => undefined);

interface State {
  message: string | null;
  type: FeedbackType | null;
}

export class FeedbackProvider extends Component<{}, State> {
  state = {
    message: null,
    type: null,
  };
  timeout: number | null = null;

  constructor() {
    super();

    this.sendFeedback = this.sendFeedback.bind(this);
    this.removeFeedback = this.removeFeedback.bind(this);
  }

  sendFeedback(message: string, type: FeedbackType = FeedbackType.info) {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.setState({ message, type }, () => {
      this.timeout = window.setTimeout(this.removeFeedback, 4000);
    });
  }

  removeFeedback() {
    this.setState({
      message: null,
      type: null,
    });
    this.timeout = null;
  }

  render() {
    const { message, type } = this.state;
    const hasFeedback = message !== null && type !== null;

    return (
      <FeedbackContext.Provider value={this.sendFeedback}>
        {this.props.children}
        {hasFeedback && (
          <Feedback
            message={this.state.message!}
            onClick={this.removeFeedback}
            type={type!}
          />
        )}
      </FeedbackContext.Provider>
    );
  }
}

interface Props {
  children: (value: SendFeedback) => VNode;
}
export const FeedbackConsumer: FunctionalComponent<Props> = ({ children }) => (
  <FeedbackContext.Consumer>
    {(value) => children(value)}
  </FeedbackContext.Consumer>
);
