import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch, Route } from 'react-router-dom'
import SignIn from './views/SignIn';
import Instruments from './views/Instruments';
import Dashboard from './views/Dashboard';
// import Instruments from './views/Instruments';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
          
          <Route exact path="/instruments/:_id">
            <Instruments />
          </Route>

          <Route exact path="/dashboard/:_id">
            <Dashboard />
          </Route>
          
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
