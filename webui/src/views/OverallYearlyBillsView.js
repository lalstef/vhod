import React, { Component } from 'react';


class OverallYearlyBillsView extends Component {
    render() {
        let appartments = {
            '85': [{'amount': '13.03', 'paid': true}, {'amount': '13.03', 'paid': true}, {'amount': '13.03', 'paid': false}, {'amount': '13.03', 'paid': false} ],
            '86': [{'amount': '13.03', 'paid': true}, {'amount': '13.03', 'paid': true}, {'amount': '13.03', 'paid': true}, {'amount': '13.03', 'paid': true} ],
            '87': [{'amount': '13.03', 'paid': true}, {'amount': '13.03', 'paid': false}, {'amount': '13.03', 'paid': false}, {'amount': '13.03', 'paid': false} ],
            '88': [{'amount': '13.03', 'paid': false}, {'amount': '13.03', 'paid': false}, {'amount': '13.03', 'paid': false}, {'amount': '13.03', 'paid': false} ],
            '89': [{'amount': '13.03', 'paid': true}, {'amount': '13.03', 'paid': true}, {'amount': '13.03', 'paid': true}, {'amount': '13.03', 'paid': true} ],
        };


        var appartments_elements = [];

        for (let app_number in appartments) {
            let app_bills = appartments[app_number],
                row = [];

            for (let i in app_bills) {
                let bill = app_bills[i],
                    paid_class = 'bill-not-paid';

                if (bill.paid) {
                    paid_class = 'bill-paid';
                }

                row.push(<td key={i} className={ paid_class }>{ bill.amount }</td>);
                console.log(row);
            }

            appartments_elements.push(<tr key={ app_number }><td>{ app_number }</td>{ row }</tr>);

        }

        return (
            <div>
                <h3>Юли, 2017</h3>
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
                        { appartments_elements }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default OverallYearlyBillsView;
