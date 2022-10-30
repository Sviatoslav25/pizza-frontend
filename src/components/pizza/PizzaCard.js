import { faEdit, faTrash, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { generatePath, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAddPizzaToBasket from '../../hooks/useAddPizzaToBasket';
import useDeletePizza from '../../hooks/useDeletePizza';
import paths from '../../router/paths';
import ButtonWithSpinner from '../common/ButtonWithSpinner';
import ModalDialog from '../ModalDialog/ModalDialog';

export default function PizzaCard({ pizza, refetch }) {
  const [isVisibleModalDialogToDelete, setIsVisibleModalDialogToDelete] = useState(false);
  const [deletePizza, { loading: isDeleting }] = useDeletePizza({
    onCompleted: () => {
      toast.success('pizza deleted successfully');
      refetch();
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
  const [addPizzaToBasket, { loading: isAdding }] = useAddPizzaToBasket({
    onCompleted: () => {
      toast.success('pizza has been added to cart');
      refetch();
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  const onDeletePizza = () => {
    deletePizza({ variables: { pizzaId: pizza._id } });
    setIsVisibleModalDialogToDelete(false);
  };
  return (
    <>
      {isVisibleModalDialogToDelete ? (
        <ModalDialog
          show={isVisibleModalDialogToDelete}
          handleClose={setIsVisibleModalDialogToDelete}
          confirmed={onDeletePizza}
          headerText="Confirm deletion"
          bodyText="Are you sure that you want to delete this pizza?"
          confirmButtonText="Delete"
        />
      ) : null}
      <Card>
        <Card.Img alt={`${pizza.name} image`} variant="top" src={pizza.img} />
        <Card.Body>
          <Card.Title>{pizza.name}</Card.Title>
          <Card.Text>{pizza.description}</Card.Text>
          <Card.Text>Price: {pizza.price}</Card.Text>
          <Row className="justify-content-md-center mt-2">
            <Col md="auto">
              <Link to={generatePath(paths.editPizza, { id: pizza._id })}>
                <ButtonWithSpinner variant="outline-light">
                  <FontAwesomeIcon icon={faEdit} />
                </ButtonWithSpinner>
              </Link>
              <ButtonWithSpinner
                style={{ marginLeft: '10px' }}
                variant="outline-primary"
                loading={isDeleting}
                onClick={() => {
                  setIsVisibleModalDialogToDelete(true);
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </ButtonWithSpinner>
            </Col>
          </Row>
          <Row className="justify-content-md-center mt-2">
            <Col md="auto">
              <ButtonWithSpinner
                variant="outline-danger"
                loading={isAdding}
                onClick={() => {
                  addPizzaToBasket({ variables: { pizzaId: pizza._id } });
                }}
              >
                <FontAwesomeIcon icon={faCartArrowDown} />
              </ButtonWithSpinner>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}
