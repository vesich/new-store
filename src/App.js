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
import AdminLayout from './layouts/AdminLayout'
import DashboardLayout from './layouts/DashboardLayout'

//pages

import Payment from './components/pages/Payment/Payment'
import Homepage from './components/pages/home/Home';
import Search from './components/pages/Search/Search';
import Register from './components/pages/registration/Register';
import Login from './components/pages/Login/Login';
import Dashboard from './components/pages/Dashboard/Dashboard'
import Recovery from './components/pages/Recovery/Recovery';
import Admin from './components/pages/admin/Admin'
import ProductDetails from './components/pages/ProductDetails/ProductDetails'
import Cart from './components/pages/Cart/Cart';
import Order from './components/pages/Order/Order'


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
        <Route exact path='/search' render={() => (
          <MainLayout>
            <Search />
          </MainLayout>
        )} />
        <Route path='/search/:filterType' render={() => (
          <MainLayout>
            <Search />
          </MainLayout>
        )} />
        <Route path='/product/:productId' render={() => (
          <MainLayout>
            <ProductDetails />
          </MainLayout>
        )} />
        <Route path='/cart' render={() => (
          <MainLayout>
            <Cart />
          </MainLayout>
        )} />

        <Route path='/payment' render={() => (
          <WithAuth>
            <MainLayout>
              <Payment />
            </MainLayout>
          </WithAuth>
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
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </WithAuth>
        )} />
        <Route path='/order/:orderId' render={() => (
          <WithAuth>
            <DashboardLayout>
              <Order />
            </DashboardLayout>
          </WithAuth>
        )}/>
        <Route path='/admin' render={() => (
          <WithAdminAuth>
            <AdminLayout>
              <Admin />
            </AdminLayout>
          </WithAdminAuth>
        )} />
      </Switch>
    </div>
  );
}

export default App;


