import React from 'react';
import { Alert, Card, Col, Container, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PizzaForm from '../components/pizzaForm/PizzaForm';
import usePizzaById from '../hooks/usePizzaById';
import useUpdatePizza from '../hooks/useUpdatePizza';
import paths from '../router/paths';

export default function EditPizza() {
  const params = useParams();
  const history = useHistory();
  const [pizza, { loading: isLoading, error }] = usePizzaById(params.id, { fetchPolicy: 'network-only' });
  const [editPizza] = useUpdatePizza({
    onCompleted: () => {
      toast.success('pizza updated successfully');
      history.push(paths.home);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onSubmit = (values) => {
    editPizza({ variables: { pizzaId: params.id, input: values } });
  };

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error.message}</Alert>
      </Container>
    );
  }

  if (isLoading && !pizza) {
    return <Container className="mt-4">loading...</Container>;
  }

  return (
    <Row className="mt-5">
      <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }} sm={{ span: 8 }}>
        <Card>
          <Card.Body>
            <PizzaForm textSubmitButton="Edit pizza" onSubmit={onSubmit} initialValues={pizza} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
