import React from 'react';
import { Container, Alert, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import BasketCard from '../components/basket/BasketCard';
import ButtonWithSpinner from '../components/common/ButtonWithSpinner';
import useOrder from '../hooks/useOrder';
import usePizzasInBasket from '../hooks/usePizzasInBasket';
import paths from '../router/paths';

export default function Basket() {
  const history = useHistory();
  const [pizzas, { loading, error, refetch }] = usePizzasInBasket();
  const [order, { loading: isOrdering }] = useOrder({
    onError: (e) => toast.error(e.message),
    onCompleted: () => {
      toast.success('Order is successful');
      history.push(paths.home);
    },
  });

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error?.message}</Alert>
      </Container>
    );
  }

  if (loading && !pizzas) {
    return <Container className="mt-4">Loading...</Container>;
  }

  return (
    <Container className="mt-5">
      {pizzas.map((pizza) => {
        return <BasketCard pizza={pizza} refetch={refetch} />;
      })}
      <Row className="justify-content-md-center mt-4 mb-3">
        <Col xs lg="2">
          {pizzas.length ? (
            <ButtonWithSpinner loading={isOrdering} onClick={() => order()}>
              Order
            </ButtonWithSpinner>
          ) : (
            <strong>Card is empty</strong>
          )}
        </Col>
      </Row>
    </Container>
  );
}
