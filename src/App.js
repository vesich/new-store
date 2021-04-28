import './default.scss';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { auth, handleUserProfile } from './firebase/utils'
import { setCurrentUser } from './redux/user/user.actions'
import { useDispatch, useSelector } from 'react-redux'

//hoc
import WithAuth from './hoc/withAuth'

//layouts
import MainLayout from './layouts/MainLayout'
import HomepageLayout from './layouts/HomepageLayout'

//pages

import Homepage from './components/pages/home/Home';
import Register from './components/pages/registration/Register';
import Login from './components/pages/Login/Login';
import Dashboard from './components/pages/Dashboard/Dashboard'
import Recovery from './components/pages/Recovery/Recovery';


const App = props => {

  const dispatch = useDispatch();

  useEffect(() => {

    const authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
          dispatch(setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          }))
        })
      }

      dispatch(setCurrentUser(userAuth))
    });

    return () => {
      authListener();
    }
  }, [])


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
        <Route path='/login'
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )} />
        <Route path='/recovery' render={() => (
          <MainLayout>
            <Recovery />
          </MainLayout>
        )} />

        <Route path='/dashboard' render={() => (
          <WithAuth>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </WithAuth>
        )} />
      </Switch>
    </div>
  );
}

export default App;


