import './default.scss';
import { Route, Switch } from 'react-router-dom';

//layouts
import MainLayout from './layouts/MainLayout'
import HomepageLayout from './layouts/HomepageLayout'

//pages

import Homepage from './components/pages/home/Home';
import Register from './components/pages/registration/Register';

function App() {
  return (
    <div className="App">

      <Switch>
        <Route exact path='/' render={() => (
          <HomepageLayout>
            <Homepage />
          </HomepageLayout>
        )} />
        <Route path='/register' render={() => (
          <MainLayout>
            <Register />
          </MainLayout>
        )} />
      </Switch>

    </div>
  );
}

export default App;

// both ways working 
