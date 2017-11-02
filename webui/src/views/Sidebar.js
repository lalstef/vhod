import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {

    render() {

        let appartments = [84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103],
            appartments_elements = [];

        for (let i in appartments) {
            let app_number = appartments[i];

            appartments_elements.push(
              <li key={app_number} className="appartment-link">
                  <Link to={`/bills/appartment/${app_number}`}>Ап. { app_number }</Link>
              </li>
            );
        }

        let months = ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"],
            months_elements = [];

        for (let i in months) {
            let month = months[i];

            months_elements.push(
              <li key={i} className="appartment-link">
                  <Link to={`/bills/year/2017/month/${i}`}>{ month }</Link>
              </li>
            );
        }

        return (
            <div className="sidebar">
                <ul className="sidebar-menu">
                    <li><Link to="/bills/year">Годишни (Вход)</Link></li>
                    <li><Link to="/bills/">Месечни (Вход)</Link></li>
                    { months_elements }
                    <li><Link to="/bills/">Апартаменти</Link></li>
                    { appartments_elements }
                </ul>
            </div>
        )
    }
}

export default Sidebar;
