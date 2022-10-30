import React from 'react';
import { Row } from 'react-bootstrap';

import PizzaList from '../components/PizzaList/PizzaList';

export default function Home() {
  return (
    <>
      <Row>
        <PizzaList />
      </Row>
    </>
  );
}
