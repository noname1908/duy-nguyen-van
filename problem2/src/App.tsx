import { cn } from '@/lib/utils';
import './App.css';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <header className={cn('App-header')}>
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="text-3xl font-bold underline text-red-500">
          Hello world!
        </h1>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;