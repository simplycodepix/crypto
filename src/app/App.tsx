import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import './index.css';

import CaesarContainer from './containers/Caesar/CaesarContainer';
import PageNotFound from './components/PageNotFound/PageNotFound';
import HomeContainer from './containers/Home/HomeContainer';
import Navigation from './components/Navigation/Navigation';

const AppContainer: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path='/' component={HomeContainer} />
          <Route exact path='/caesar' component={CaesarContainer} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default AppContainer;
