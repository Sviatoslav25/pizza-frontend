import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import PizzaForm from '../components/pizzaForm/PizzaForm';
import useAddPizza from '../hooks/useAddPizza';
import paths from '../router/paths';

export default function AddPizza() {
  const history = useHistory();

  const [addPizza] = useAddPizza({
    onError: (e) => toast.error(e.message),
    onCompleted: () => {
      toast.success('Pizza created successfully');
      history.push(paths.home);
    },
  });

  const onSubmit = async (value) => {
    console.log(value);
    addPizza({ variables: { input: value } });
  };
  return (
    <Row className="mt-5">
      <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }} sm={{ span: 8 }}>
        <Card>
          <Card.Body>
            <PizzaForm onSubmit={onSubmit} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
