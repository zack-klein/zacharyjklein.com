import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Footer from './components/Footer';


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
        <Route path="/blog">
          <Blog />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}
