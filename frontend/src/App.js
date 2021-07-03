//import Home from './components/home';
import './App.css';
import {BrowserRouter,Switch,Route} from "react-router-dom"

import login from './components/login'
import signup from './components/signup'

function App() {
  return (
  <BrowserRouter>
  <Switch>
    <Route path="/login" component={login}></Route>
    <Route path="/signup" component={signup}></Route>
  </Switch>
  </BrowserRouter>
  );
}
export default App;
