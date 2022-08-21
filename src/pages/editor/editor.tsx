import type { FunctionComponent } from 'preact';

import { getCurrentSize } from '../../helpers';
import { Editor } from '../../components/editor/';

interface Props {
  matches?: { size: string };
}

export const EditorPage: FunctionComponent<Props> = ({ matches = {} }) => {
  const size = getCurrentSize(matches.size);

  return <Editor size={size} />;
};
