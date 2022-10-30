import React from 'react';
import { Card, Col, Image, Row, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import useRemovePizzaFromBasket from '../../hooks/useRemovePizzaFromBasket';

export default function BasketCard({ pizza, refetch }) {
  const [removePizzaFromBasket, { loading: isRemoving }] = useRemovePizzaFromBasket({
    onCompleted: refetch,
    onError: (e) => {
      toast.error(e.message);
    },
  });
  const onRemove = () => {
    removePizzaFromBasket({ variables: { basketId: pizza._id } });
  };
  return (
    <Row>
      <Col className="mt-3">
        <Card>
          <div title="remove" style={{ marginTop: '-12px', marginRight: '-8px' }}>
            {isRemoving ? (
              <Spinner style={{ float: 'right', color: 'gray' }} animation="border" variant="secondary" />
            ) : (
              <FontAwesomeIcon
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  e.nativeEvent.stopImmediatePropagation();
                  onRemove();
                }}
                style={{ float: 'right' }}
                size="lg"
                icon={faTimesCircle}
              />
            )}
          </div>
          <Card.Body style={{ marginTop: '-6px', display: 'grid', gridTemplateColumns: '100px 1fr' }}>
            <div>
              <Image
                src={pizza.img}
                alt="Pizza img"
                roundedCircle
                style={{
                  maxWidth: '80px',
                  height: 'auto',
                  objectFit: 'cover',
                }}
              />
            </div>
            <div>
              <Card.Title style={{ display: 'grid', gridTemplateColumns: '1fr 20px' }}>
                <div>
                  <strong>Pizza name: </strong>
                  {pizza.pizzaName}
                </div>
              </Card.Title>
              <Card.Text>
                <strong>Description:</strong> {pizza.description}
              </Card.Text>
              <Card.Text>
                <strong>Price:</strong> {pizza.price}
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
