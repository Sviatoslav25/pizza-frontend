import React from 'react';
import { Button, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import paths from '../../router/paths';
import usePizzas from '../../hooks/usePizzas';
import PizzaCard from '../pizza/PizzaCard';

export default function PizzaList() {
  const [pizzas, { loading: isLoading, refetch }] = usePizzas();

  return (
    <>
      <Container className="mt-3">
        <Link style={{ float: 'right', marginRight: '20px' }} to={paths.addPizza}>
          <Button>Add pizza</Button>
        </Link>
      </Container>
      {isLoading && !pizzas ? <>Loading...</> : null}
      {pizzas?.map((pizza) => {
        return (
          <Col key={pizza._id} lg="3" md="4" sm="6" xs="6" className="mt-4">
            <PizzaCard pizza={pizza} refetch={refetch} />
          </Col>
        );
      })}
    </>
  );
}
