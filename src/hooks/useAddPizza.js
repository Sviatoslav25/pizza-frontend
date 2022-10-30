import { gql, useMutation } from '@apollo/client';

const addPizzaMutation = gql`
  mutation CreatePizza($input: PizzaCreateInput!) {
    createPizza(input: $input) {
      _id
    }
  }
`;

const useAddPizza = (props) => {
  const [addPizza, rest] = useMutation(addPizzaMutation, props);
  return [addPizza, rest];
};

export default useAddPizza;
