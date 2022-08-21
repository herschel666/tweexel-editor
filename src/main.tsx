import { render } from 'preact';
import { App } from './components/app';
import './app.css';

render(<App />, document.getElementById('app') as HTMLElement);
