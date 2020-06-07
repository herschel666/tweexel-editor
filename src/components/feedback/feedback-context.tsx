import { Component, createContext, h } from 'preact';
import type { FunctionalComponent, VNode, ComponentChild } from 'preact';

import { Feedback, FeedbackType } from './feedback';

export type SendFeedback = (message: string, type?: FeedbackType) => void;
const FeedbackContext = createContext<SendFeedback>(() => undefined);

interface State {
  message: string | null;
  type: FeedbackType | null;
}

export class FeedbackProvider extends Component<unknown, State> {
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

  sendFeedback(message: string, type: FeedbackType = FeedbackType.info): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    this.setState({ message, type }, () => {
      this.timeout = window.setTimeout(this.removeFeedback, 4000);
    });
  }

  removeFeedback(): void {
    this.setState({
      message: null,
      type: null,
    });
    this.timeout = null;
  }

  render(): ComponentChild {
    const { message, type } = this.state;
    const hasFeedback = message !== null && type !== null;

    /* eslint-disable @typescript-eslint/no-non-null-assertion */
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
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
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
