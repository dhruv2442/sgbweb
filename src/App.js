import React from 'react';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import AddProducts from './components/AddProducts';
import Cart from './components/Cart';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route  exact path="/signup" component ={SignUp}/>
          <Route exact path="/login" component ={Login}/>
          <Route exact path="/add-products" component ={AddProducts}/>
          <Route exact path="/cart" component ={Cart}/>
          <Route  path="/" component ={Home}/>
          <Route component={ErrorPage}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App

