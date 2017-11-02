import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Api from '../Api';


class OverallYearlyBillsView extends Component {
    constructor(props) {
        super(props);
        this.state = {year: props.match.params.year || moment().year(), appartments_elements: []};
    }

    componentWillReceiveProps(props) {
        this.setState({year: props.match.params.year || moment().year()});
    }

    setYear(year) {
        let self = this;
        this.setState({year: year}, this.update);

        Api.getYearlyBills(year)
          .then(data => {
                let appartments_elements = [];

                for (let app_number in data) {
                    let app_bills = data[app_number],
                        row = [];

                    for (let i in app_bills) {
                        let bill = app_bills[i],
                            paid_class = 'bill-not-paid';

                        if (bill.paid_date !== null) {
                            paid_class = 'bill-paid';
                        }

                        row.push(<td key={i} className={ paid_class }>{ bill.amount }</td>);
                    }

                    appartments_elements.push(<tr key={ app_number }><td>{ app_number }</td>{ row }</tr>);

                }
              self.setState({appartments_elements: appartments_elements});
          });
    }

    componentDidMount() {
        let self = this;

        Api.getYearlyBills(this.state.year)
          .then(data => {
                let appartments_elements = [];

                for (let app_number in data) {
                    let app_bills = data[app_number],
                        row = [];

                    for (let i in app_bills) {
                        let bill = app_bills[i],
                            paid_class = 'bill-not-paid';

                        if (bill.paid_date !== null) {
                            paid_class = 'bill-paid';
                        }

                        row.push(<td key={i} className={ paid_class }>{ bill.amount }</td>);
                    }

                    appartments_elements.push(<tr key={ app_number }><td>{ app_number }</td>{ row }</tr>);

                }
              self.setState({appartments_elements: appartments_elements});
          });
    }

    render() {
        return (
            <div>
                <h3>{this.state.year} г.</h3>
                <div className="sidebar">
                    <div>
                        <Link to={`/bills/year/${2016}/`} onClick={this.setYear.bind(this, 2016)}>2016 г.</Link>
                        &nbsp;&nbsp;
                        <Link to={`/bills/year/${2017}/`} onClick={this.setYear.bind(this, 2017)}>2017 г.</Link>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Ап. №</th>
                            <th>Януари</th>
                            <th>Февруари</th>
                            <th>Март</th>
                            <th>Април</th>
                            <th>Май</th>
                            <th>Юни</th>
                            <th>Юли</th>
                            <th>Август</th>
                            <th>Септември</th>
                            <th>Октомври</th>
                            <th>Ноември</th>
                            <th>Декември</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.appartments_elements }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default OverallYearlyBillsView;
