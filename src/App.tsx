import './App.css';

import Minesweeper from './components/Minesweeper';

function App() {
  console.debug('render App')
  return (
    <div className="App">
      < Minesweeper />
    </div>
  );
}

export default App;
