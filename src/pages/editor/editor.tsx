import { h } from 'preact';
import type { FunctionComponent } from 'preact';
import classNames from 'classnames';

import { getCurrentSize } from '../../helpers';
import { Editor } from '../../components/editor/';

const classAppInner = classNames('w-full');

interface Props {
  matches?: { size: string };
}

export const EditorPage: FunctionComponent<Props> = ({ matches = {} }) => {
  const size = getCurrentSize(matches.size);

  return (
    <div class={classAppInner}>
      <Editor size={size} />
    </div>
  );
};
