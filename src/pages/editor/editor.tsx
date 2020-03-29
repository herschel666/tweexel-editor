import { FunctionalComponent, h } from 'preact';
import classNames from 'classnames';

import { Editor } from '../../components/editor/';

const classAppInner = classNames('w-full');

export const EditorPage: FunctionalComponent = () => (
  <div class={classAppInner}>
    <Editor />
  </div>
);
