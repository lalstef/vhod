import React, { Component } from 'react';


class OverallMonthlyBillsView extends Component {
    render() {
        let appartments = [
            {
                'number': '84',
                'number_habitants': '4',
                'bill_paid': false,
                'bills': {
                    'cleaning': '3.20',
                    'elevator_maintenance': '0',
                    'elevator_electricity': '0',
                    'electricity_stairs': '0.33',
                    'maintenance': '6.48',
                    'total': '13.54',
                }
            },            {
                'number': '85',
                'number_habitants': '2',
                'bill_paid': true,
                'bills': {
                    'cleaning': '3.20',
                    'elevator_maintenance': '0',
                    'elevator_electricity': '0',
                    'electricity_stairs': '0.33',
                    'maintenance': '6.40',
                    'total': '9.93',
                }
            },
            {
                'number': '86',
                'number_habitants': '2',
                'bill_paid': true,
                'bills': {
                    'cleaning': '3.20',
                    'elevator_maintenance': '0',
                    'elevator_electricity': '0',
                    'electricity_stairs': '0.33',
                    'maintenance': '4.74',
                    'total': '8.27',
                }
            },
            {
                'number': '87',
                'number_habitants': '2',
                'bill_paid': true,
                'bills': {
                    'cleaning': '3.20',
                    'elevator_maintenance': '0',
                    'elevator_electricity': '0',
                    'electricity_stairs': '0.33',
                    'maintenance': '3.38',
                    'total': '6.91',
                }
            },
            {
                'number': '88',
                'number_habitants': '3',
                'bill_paid': false,
                'bills': {
                    'cleaning': '4.80',
                    'elevator_maintenance': '0',
                    'elevator_electricity': '0',
                    'electricity_stairs': '0.49',
                    'maintenance': '6.40',
                    'total': '11.69',
                }
            },
            {
                'number': '89',
                'number_habitants': '2',
                'bill_paid': true,
                'bills': {
                    'cleaning': '3.20',
                    'elevator_maintenance': '4.55',
                    'elevator_electricity': '1.97',
                    'electricity_stairs': '0.33',
                    'maintenance': '4.74',
                    'total': '14.79',
                }
            },
            {
                'number': '90',
                'number_habitants': '1',
                'bill_paid': false,
                'bills': {
                    'cleaning': '0',
                    'elevator_maintenance': '0',
                    'elevator_electricity': '0',
                    'electricity_stairs': '0',
                    'maintenance': '3.38',
                    'total': '3.38',
                }
            },
        ];
        var appartments_elements = [];

        for (let app_number in appartments) {
            let app = appartments[app_number],
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

        return (
            <div>
                <h3>Юли, 2017</h3>
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
                        { appartments_elements }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default OverallMonthlyBillsView;
