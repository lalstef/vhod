import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { Nav, NavItem } from 'react-bootstrap';
import moment from 'moment';
import './App.css';
import OverallMonthlyBillsView from './views/OverallMonthlyBillsView';
import OverallYearlyBillsView from './views/OverallYearlyBillsView';
import AppartmentBillsView from './views/AppartmentBillsView';
import Home from './views/Home';


class App extends Component {

  render() {
    let FIRST_APPARTMENT = 84,
        year = moment().year(),
        month = moment().month();

    return (
      <div className="App">
        <header className="App-header">
            <Nav bsStyle="pills" activeKey={1}>
                <NavItem eventKey={0} disabled>Блок 628, вход "Д"</NavItem>
                <NavItem eventKey={1} href="/">Начало</NavItem>
                <NavItem eventKey={2} href={`/bills/year/${year}`}>Годишни Сметки</NavItem>
                <NavItem eventKey={3} href={`/bills/year/${year}/month/${month}`}>Месечни Сметки</NavItem>
                <NavItem eventKey={4} href={`/bills/year/${year}/appartment/${FIRST_APPARTMENT}/`}>Сметки по Апартаменти</NavItem>
            </Nav>
        </header>

        <div className="content">
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/bills/year/:year/appartment/:id' component={AppartmentBillsView}/>
              <Route path='/bills/year/:year/month/:month' component={OverallMonthlyBillsView}/>
              <Route path='/bills/year/:year/month/' component={OverallMonthlyBillsView}/>
              <Route path='/bills/year/:year' component={OverallYearlyBillsView}/>
              <Route path='/bills/year/' component={OverallYearlyBillsView}/>
              <Route path='/bills' component={OverallMonthlyBillsView}/>
            </Switch>
        </div>
      </div>
    );
  }
}

export default App;
