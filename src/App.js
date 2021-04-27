import './default.scss';

import Header from './components/header/Header';
import Homepage from './components/pages/home/Home';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="main">

        <Homepage />
      </div>
    </div>
  );
}

export default App;
