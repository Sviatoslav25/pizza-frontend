import { gql, useMutation } from '@apollo/client';

const addToBasketMutation = gql`
  mutation AddToBasket($pizzaId: ID!) {
    addToBasket(pizzaId: $pizzaId)
  }
`;

const useAddPizzaToBasket = (props) => {
  const [addPizzaToBasket, rest] = useMutation(addToBasketMutation, props);
  return [addPizzaToBasket, rest];
};

export default useAddPizzaToBasket;
