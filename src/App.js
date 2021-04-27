import './default.scss';
import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils'

//layouts
import MainLayout from './layouts/MainLayout'
import HomepageLayout from './layouts/HomepageLayout'

//pages

import Homepage from './components/pages/home/Home';
import Register from './components/pages/registration/Register';
import Login from './components/pages/Login/Login';
import Recovery from './components/pages/Recovery/Recovery';


const initialState = {
  currentUser: null
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    }
  }

  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          })
        })
      }

      this.setState({
        ...initialState
      })
    });
  }

  componentWillUnmount() {
    this.authListener();
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="App">
        <Switch>
          <Route exact path='/' render={() => (
            <HomepageLayout currentUser={currentUser}>
              <Homepage />
            </HomepageLayout>
          )} />
          <Route path='/register' render={() => currentUser ? <Redirect to='/' /> : (
            <MainLayout currentUser={currentUser}>
              <Register />
            </MainLayout>
          )} />
          <Route path='/login'
            render={() => currentUser ? <Redirect to='/' /> : (
              <MainLayout currentUser={currentUser}>
                <Login />
              </MainLayout>
            )} />
          <Route path='/recovery' render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )} />
        </Switch>
      </div>
    );
  }
}

export default App;

// both ways working 
