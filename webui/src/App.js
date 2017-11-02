import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';
import moment from 'moment';
import './App.css';
import OverallMonthlyBillsView from './views/OverallMonthlyBillsView';
import OverallYearlyBillsView from './views/OverallYearlyBillsView';
import AppartmentBillsView from './views/AppartmentBillsView';
import Home from './views/Home';


class App extends Component {

  // constructor(props) {
  //     super(props);
  //     console.log(props);
  //     this.state = {activeKey: 1};
  // }

  render() {
    let FIRST_APPARTMENT = 84,
        year = moment().year(),
        month = moment().month();

    return (
      <div className="App">
        <header className="App-header">
            <Nav bsStyle="pills">
                <NavItem disabled>Блок 628, вход "Д"</NavItem>
                {/*<LinkContainer exact to="/"><NavItem eventKey={1}>Начало</NavItem></LinkContainer>*/}
                <LinkContainer exact to={`/bills/year/${year}/`}><NavItem active={true}>Годишни Сметки</NavItem></LinkContainer>
                <LinkContainer exact to={`/bills/year/${year}/month/${month}/`}><NavItem>Месечни Сметки</NavItem></LinkContainer>
                <LinkContainer exact to={`/bills/year/${year}/appartment/${FIRST_APPARTMENT}/`}><NavItem>Сметки по Апартаменти</NavItem></LinkContainer>
            </Nav>
        </header>

        <div className="content">
            <Switch>
              <Route exact path='/bills/year/:year/appartment/:id/' component={AppartmentBillsView} />
              <Route exact path='/bills/year/:year/month/:month/' component={OverallMonthlyBillsView} />
              <Route exact path='/bills/year/:year/month/' component={OverallMonthlyBillsView} />
              <Route exact path='/bills/year/:year/' component={OverallYearlyBillsView} />
              <Route exact path='/bills/year/' component={OverallYearlyBillsView} />
              <Route exact path='/' component={OverallYearlyBillsView} />
            </Switch>
        </div>
      </div>
    );
  }
}

export default App;
