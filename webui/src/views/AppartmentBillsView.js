import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import moment from 'moment';
import Api from '../Api';


class AppartmentBillsView extends Component {
    constructor(props) {
        super(props);

        this.FIRST_APPARTMENT = 84;
        this.APPARTMENTS = [84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103];

        this.state = {
            year: props.match.params.year || moment().year(),
            appartment_number: props.match.params.id || this.FIRST_APPARTMENT,
            monthly_bills_elements: [],
            appartments_elements: []
        };
    }

    componentDidMount() {
        this.update();
    }

    componentWillReceiveProps(nextProps) {
        let appartments_elements = [],
            classCurrent = '';

        for (let i in this.APPARTMENTS) {
            let app_number = this.APPARTMENTS[i];
            classCurrent = (app_number === Number(nextProps.match.params.id)) ? 'current' : '';

            appartments_elements.push(
              <li key={app_number} className={`appartment-link ${classCurrent}`}>
                  <Link to={`/bills/year/${this.state.year}/appartment/${app_number}`}>Ап. { app_number }</Link>
              </li>
            );
        }

        this.setState({
            appartment_number: nextProps.match.params.id,
            appartments_elements: appartments_elements
        }, this.update);
    }

    update() {
        let self = this;
        let classCurrent = '';

        let appartments_elements = [];
        for (let i in this.APPARTMENTS) {
            let app_number = this.APPARTMENTS[i];
            classCurrent = (app_number === Number(this.state.appartment_number)) ? 'current' : '';

            appartments_elements.push(
              <li key={app_number} className={`appartment-link ${classCurrent}`}>
                  <Link to={`/bills/year/${this.state.year}/appartment/${app_number}`}>Ап. { app_number }</Link>
              </li>
            );
        }

        this.state.appartments_elements = appartments_elements;


        let MONTHS = [
          "Януари", "Февруари", "Март", "Април", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"
        ];

        let monthly_bills_elements = [];
        Api.getYearlyBillsAppartment(this.state.year, this.state.appartment_number)
            .then(monthly_bills => {
                for (let i in monthly_bills) {
                    let bill = monthly_bills[i],
                        paid_class = 'bill-not-paid';

                    if (bill.paid) {
                        paid_class = 'bill-paid';
                    }

                    monthly_bills_elements.push(
                      <tr key={i} className={ paid_class }>
                          <td>{ MONTHS[i] }</td>
                          <td>{ Number(bill.total, 2) }</td>
                          <td>{ bill.habitants }</td>
                          <td>{ bill.cleaning }</td>
                          <td>{ bill.elevator_maintenance }</td>
                          <td>{ bill.elevator_electricity }</td>
                          <td>{ bill.electricity_stairs }</td>
                          <td>{ bill.maintenance }</td>
                      </tr>
                    );
                }

                self.setState({monthly_bills_elements: monthly_bills_elements})
            });
    }

    setYear(year) {
        this.setState({year: year}, this.update);
    }

    render() {
        return (
            <div>
                <h3>Апартамент { this.state.appartment_number }</h3>
                <h4>{ this.state.year } г.</h4>
                <div className="sidebar">
                    <div>
                        <Link to={`/bills/year/${2016}/appartment/${this.state.appartment_number}`} onClick={this.setYear.bind(this, 2016)}>2016 г.</Link>
                        &nbsp;&nbsp;
                        <Link to={`/bills/year/${2017}/appartment/${this.state.appartment_number}`} onClick={this.setYear.bind(this, 2017)}>2017 г.</Link>
                    </div>

                    <br />

                    <ul className="sidebar-menu">{ this.state.appartments_elements }</ul>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Месец</th>
                            <th>Обща сума</th>
                            <th>Брой лица</th>
                            <th>Чистачка и препарати</th>
                            <th>Асансьор Абонамент</th>
                            <th>Асансьор Ток</th>
                            <th>Ток стълби и мазе</th>
                            <th>Основен ремонт</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.monthly_bills_elements }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AppartmentBillsView;
