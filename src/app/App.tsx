import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import './index.css';

import CaesarContainer from './containers/Caesar/CaesarContainer';
import AffineContainer from './containers/Affine/AffineContainer';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Navigation from './components/Navigation/Navigation';
import BaconContainer from './containers/Bacon/BaconContainer';
import HillContainer from './containers/Hill/HillContainer';
import HillContainerDecode from './containers/Hill/HillContainerDecode';
import HillContainerAnalyse from './containers/Hill/HillContainerAnalyse';
import VigenereContainer from './containers/Vigenere/VigenereContainer';

const AppContainer: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <Navigation />
        </div>
        <Switch>
          <Route exact path='/' component={CaesarContainer} />
          <Route exact path='/caesar' component={CaesarContainer} />
          <Route exact path='/affine' component={AffineContainer} />
          <Route exact path='/bacon' component={BaconContainer} />
          <Route exact path='/vigenere' component={VigenereContainer} />
          <Route exact path='/hill' component={HillContainer} />
          <Route exact path='/hilldecode' component={HillContainerDecode} />
          <Route exact path='/hillanalyse' component={HillContainerAnalyse} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default AppContainer;
