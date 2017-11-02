import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import Api from '../Api';


class OverallMonthlyBillsView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            month: props.match.params.month || moment().month(),
            year: props.match.params.year || moment().year(),
            appartments_elements: []
        };

        this.months_elements = [];

        this.MONTH_NAMES = ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"];

        for (let month in this.MONTH_NAMES) {
            let monthName = this.MONTH_NAMES[month];

            this.months_elements.push(
              <li key={month} className="appartment-link">
                  <Link to={`/bills/year/${this.state.year}/month/${month}`} onClick={this.setMonth.bind(this, {month})}>{ monthName }</Link>
              </li>
            );
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            year: nextProps.match.params.year,
            month: nextProps.match.params.month
        });
    }

    setYear(year) {
        this.setState({year: year}, this.update);
    }

    setMonth(month) {
        this.setState({month: month}, this.update);
    }

    componentDidMount() {
        this.update();
    }

    update() {
        let self = this;

        Api.getMonthlyBills(this.state.year, this.state.month)
          .then(data => {
                    let appartments_elements = [];

                    for (let app_number in data) {
                        let app = data[app_number],
                            paid_class = 'bill-not-paid';

                        if (app.bill_paid) {
                            paid_class = 'bill-paid';
                        }

                        appartments_elements.push(
                            <tr key={app_number} className={ paid_class }>
                                <td className="appartment-number">{ app.number }</td>
                                <td>{ app.number_habitants }</td>
                                <td>{ app.bills.cleaning }</td>
                                <td>{ app.bills.elevator_maintenance }</td>
                                <td>{ app.bills.elevator_electricity }</td>
                                <td>{ app.bills.electricity_stairs }</td>
                                <td>{ app.bills.maintenance }</td>
                                <td>{ app.bills.total }</td>
                            </tr>
                        );
                    }
              self.setState({appartments_elements: appartments_elements});
          });
    }

    render() {
        return (
            <div>
                <h3>Месечни сметки за м. { this.MONTH_NAMES[this.state.month] }, { this.state.year } г.</h3>
                <div className="sidebar">
                    <div>
                        <Link to={`/bills/year/${2016}/month/${this.state.month}`} onClick={this.setYear.bind(this, 2016)}>2016 г.</Link>
                        &nbsp;&nbsp;
                        <Link to={`/bills/year/${2017}/month/${this.state.month}`} onClick={this.setYear.bind(this, 2017)}>2017 г.</Link>
                    </div>

                    <br />

                    <ul className="sidebar-menu">
                        { this.months_elements }
                    </ul>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Ап. №</th>
                            <th>Брой лица</th>
                            <th>Чистачка и препарати</th>
                            <th>Асансьор Абонамент</th>
                            <th>Асансьор Ток</th>
                            <th>Ток стълби и мазе</th>
                            <th>Основен ремонт</th>
                            <th>Обща сума</th>
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

export default OverallMonthlyBillsView;
