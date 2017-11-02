import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


class Home extends Component {
    render() {
        return (
          <Grid>
              <Row>
                <Col md={4}>
                    <Link to="/bills/">Годишни сметки</Link>
                </Col>
                <Col md={4}>
                    <Link to="/bills/">Месечни сметки</Link>
                </Col>
                <Col md={4}>
                    <Link to="/bills/">По апартаменти</Link>
                </Col>
              </Row>
          </Grid>
        )
    }
}

export default Home;
