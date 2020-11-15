import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';


export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/projects">
          <Projects />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
