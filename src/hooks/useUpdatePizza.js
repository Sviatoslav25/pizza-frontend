import { gql, useMutation } from '@apollo/client';

const updatePizzaMutation = gql`
  mutation UpdatePizza($pizzaId: ID!, $input: PizzaUpdateInput!) {
    updatePizza(pizzaId: $pizzaId, input: $input) {
      _id
    }
  }
`;

const useUpdatePizza = (options) => {
  const [updatePizza, rest] = useMutation(updatePizzaMutation, options);
  return [updatePizza, rest];
};

export default useUpdatePizza;
