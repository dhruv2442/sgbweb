import React from 'react';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import AddProducts from './components/AddProducts';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component ={Home}/>
          <Route  path="/signup" component ={SignUp}/>
          <Route  path="/login" component ={Login}/>
          <Route  path="/add-products" component ={AddProducts}/>
          <Route component={ErrorPage}/>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App

