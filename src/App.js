import './default.scss';
import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { checkUserSession } from './redux/user/user.actions'
import { useDispatch } from 'react-redux'

//components
import AdminToolbar from './components/AdminToolbar/AdminToolbar'

//hoc
import WithAuth from './hoc/withAuth'
import WithAdminAuth from './hoc/withAdminAuth'

//layouts
import MainLayout from './layouts/MainLayout'
import HomepageLayout from './layouts/HomepageLayout'

//pages

import Homepage from './components/pages/home/Home';
import Register from './components/pages/registration/Register';
import Login from './components/pages/Login/Login';
import Dashboard from './components/pages/Dashboard/Dashboard'
import Recovery from './components/pages/Recovery/Recovery';
import Admin from './components/pages/admin/Admin'


const App = props => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession)
  }, [])


  return (
    <div className="App">
      <AdminToolbar />
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
        <Route path='/admin' render={() => (
          <WithAdminAuth>
            <MainLayout>
              <Admin />
            </MainLayout>
          </WithAdminAuth>
        )} />
      </Switch>
    </div>
  );
}

export default App;


