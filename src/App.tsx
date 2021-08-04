import { Route, Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './App.scss';
import { About } from './components/About';
import { Country } from './components/Country';
import { NavBar } from './components/NavBar';

function App() {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <div className="App">
        <NavBar />

        <Switch>
          <Route path='/about' component={About} />
          <Route path='/' component={Country} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
