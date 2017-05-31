import React, {Component} from 'react';
import {BrowserRouter as Router, browserHistory, Route} from 'react-router-dom';

import MainLayout from './components/MainLayout';

import School from './components/school/School';
import Classroom from './components/classroom/Classroom';
import Lecture from './components/lecture/Lecture';
import Schedule from './components/schedule/Schedule';

export default () => (
    <Router history={browserHistory}>
        <MainLayout>
            <Route exact path="/" component={Schedule} />
            <Route path="/school" component={School} />
            <Route path="/classroom" component={Classroom} />
            <Route path="/lecture" component={Lecture} />
        </MainLayout>
    </Router>
);