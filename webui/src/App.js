import React, { Component } from 'react';
import './App.css';
import OverallMonthlyBillsView from './views/OverallMonthlyBillsView';
import OverallYearlyBillsView from './views/OverallYearlyBillsView';
import AppartmentBillsView from './views/AppartmentBillsView';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <h1 className="App-title">Блок 628, вход "Д"</h1>
        </header>

        <div className="sidebar">
            <ul className="sidebar-menu">
                <li><a>Всички</a></li>
                <li><a>85</a></li>
                <li><a>86</a></li>
                <li><a>87</a></li>
                <li><a>88</a></li>
                <li><a>89</a></li>
                <li><a>90</a></li>
                <li><a>91</a></li>
                <li><a>92</a></li>
                <li><a>93</a></li>
                <li><a>94</a></li>
                <li><a>95</a></li>
                <li><a>96</a></li>
                <li><a>97</a></li>
                <li><a>98</a></li>
                <li><a>99</a></li>
                <li><a>100</a></li>
                <li><a>101</a></li>
                <li><a>102</a></li>
                <li><a>103</a></li>
            </ul>
        </div>

        <div className="content">
            {/*<OverallMonthlyBillsView></OverallMonthlyBillsView>*/}
            <OverallYearlyBillsView></OverallYearlyBillsView>
            {/*<AppartmentBillsView></AppartmentBillsView>*/}
        </div>
      </div>
    );
  }
}

export default App;
