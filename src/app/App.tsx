import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import './index.css';

import CaesarContainer from './containers/Caesar/CaesarContainer';
import AffineContainer from './containers/Affine/AffineContainer';
import PageNotFound from './components/PageNotFound/PageNotFound';
import HomeContainer from './containers/Home/HomeContainer';
import Navigation from './components/Navigation/Navigation';
import BaconContainer from './containers/Bacon/BaconContainer';
import HillContainer from './containers/Hill/HillContainer';

const AppContainer: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <Navigation />
        </div>
        <Switch>
          <Route exact path='/' component={HomeContainer} />
          <Route exact path='/caesar' component={CaesarContainer} />
          <Route exact path='/affine' component={AffineContainer} />
          <Route exact path='/bacon' component={BaconContainer} />
          <Route exact path='/hill' component={HillContainer} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default AppContainer;
