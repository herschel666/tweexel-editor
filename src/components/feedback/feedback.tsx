import { FunctionalComponent, h } from 'preact';
import classNames from 'classnames';

import styles from './feedback.css';

export enum FeedbackType {
  info = 'info',
  error = 'error',
}

interface Props {
  message: string;
  onClick: () => void;
  type: FeedbackType;
}

export const Feedback: FunctionalComponent<Props> = ({
  message,
  onClick,
  type,
}) => {
  const classTypeBgColor = classNames({
    [styles.info]: type === FeedbackType.info,
    [styles.error]: type === FeedbackType.error,
  });

  return (
    <div class={styles.feedback} aria-role="status" tabIndex={0}>
      <span class={classNames(styles.type, classTypeBgColor)} />
      <div class={styles.message}>{message}</div>
      <button onClick={onClick} aria-label="Close">
        &times;
      </button>
    </div>
  );
};
