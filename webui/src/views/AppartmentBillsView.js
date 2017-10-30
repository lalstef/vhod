import React, { Component } from 'react';


class AppartmentBillsView extends Component {
    render() {
        let MONTHS = [
          "Януари", "Февруари", "Март", "Април", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"
        ];

        let monthly_bills = [
            {
                'paid': true,
                'habitants': '1',
                'cleaning': '3.20',
                'elevator_maintenance': '0',
                'elevator_electricity': '0',
                'electricity_stairs': '0.33',
                'maintenance': '6.48',
                'total': '13.54',
            },
            {
                'paid': true,
                'habitants': '1',
                'cleaning': '3.20',
                'elevator_maintenance': '0',
                'elevator_electricity': '0',
                'electricity_stairs': '0.33',
                'maintenance': '6.48',
                'total': '13.54',
            },
            {
                'paid': false,
                'habitants': '1',
                'cleaning': '3.20',
                'elevator_maintenance': '0',
                'elevator_electricity': '0',
                'electricity_stairs': '0.33',
                'maintenance': '6.48',
                'total': '13.54',
            },
        ];

        var monthly_bills_elements = [];

        for (let i in monthly_bills) {
            let bill = monthly_bills[i],
                paid_class = 'bill-not-paid';

            if (bill.paid) {
                paid_class = 'bill-paid';
            }

            monthly_bills_elements.push(
              <tr class={ paid_class }>
                  <td>{ MONTHS[i] }</td>
                  <td>{ bill.total }</td>
                  <td>{ bill.habitants }</td>
                  <td>{ bill.cleaning }</td>
                  <td>{ bill.elevator_maintenance }</td>
                  <td>{ bill.elevator_electricity }</td>
                  <td>{ bill.electricity_stairs }</td>
                  <td>{ bill.maintenance }</td>
              </tr>
            );
        }


        return (
            <div>
                <h3>Апартамент 97</h3>
                <h4>2017 година</h4>
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
                        { monthly_bills_elements }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default AppartmentBillsView;
