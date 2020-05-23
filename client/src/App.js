import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import InitPage from './components/InitPage/InitPage';
import JoinNoRegisterUser from './components/noRegisterUser/Join/Join';
import ChatNoRegisterUser from './components/noRegisterUser/Chat/Chat';

const App = () => (
    <Router>
        <Route path="/" exact component={InitPage} />
        <Route path="/joinNoRegisterUser" component={JoinNoRegisterUser} />
        <Route path="/chatNoRegisterUser" component={ChatNoRegisterUser} />
    </Router>
);

export default App;