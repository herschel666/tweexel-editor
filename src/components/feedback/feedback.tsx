import { FunctionalComponent, h } from 'preact';
import classNames from 'classnames';

export enum FeedbackType {
  info = 'info',
  error = 'error',
}

interface Props {
  message: string;
  onClick: () => void;
  type: FeedbackType;
}

const classFeedback = classNames(
  'fixed',
  'right-0',
  'bottom-0',
  'px-6',
  'py-4',
  'm-4',
  'flex',
  'border',
  'border-solid',
  'border-gray-400',
  'rounded-sm',
  'bg-white',
  'shadow-xl',
  'overflow-hidden'
);
const classType = classNames('absolute', 'inset-y-0', 'left-0', 'w-1');
const classMessage = classNames('mr-4');

export const Feedback: FunctionalComponent<Props> = ({
  message,
  onClick,
  type,
}) => {
  const classTypeBgColor = classNames({
    'bg-green-700': type === FeedbackType.info,
    'bg-red-700': type === FeedbackType.error,
  });

  return (
    <div class={classFeedback} aria-role="status" tabIndex={0}>
      <span class={classNames(classType, classTypeBgColor)} />
      <div class={classMessage}>{message}</div>
      <button onClick={onClick} aria-label="Close">
        &times;
      </button>
    </div>
  );
};
