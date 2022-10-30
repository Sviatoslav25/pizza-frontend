import { gql, useMutation } from '@apollo/client';

const removePizzaFromBasketMutation = gql`
  mutation removePizzaFromBasket($basketId: ID!) {
    removePizzaFromBasket(basketId: $basketId)
  }
`;

const useRemovePizzaFromBasket = (props) => {
  const [removePizzaFromBasket, rest] = useMutation(removePizzaFromBasketMutation, props);
  return [removePizzaFromBasket, rest];
};

export default useRemovePizzaFromBasket;
