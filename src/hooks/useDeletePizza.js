import { gql, useMutation } from '@apollo/client';

const removePizzaMutation = gql`
  mutation removePizza($pizzaId: ID!) {
    removePizza(pizzaId: $pizzaId)
  }
`;

const useDeletePizza = (options) => {
  const [deletePizza, rest] = useMutation(removePizzaMutation, options);
  return [deletePizza, rest];
};

export default useDeletePizza;
