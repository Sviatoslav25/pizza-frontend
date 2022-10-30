import { gql, useQuery } from '@apollo/client';
import { getFirstResult } from '../utils/graphql';

const pizzaQuery = gql`
  query Pizza($_id: ID!) {
    pizza(_id: $_id) {
      _id
      name
      description
      img
      price
    }
  }
`;

const usePizzaById = (pizzaId, props) => {
  const { loading, data, error, ...rest } = useQuery(pizzaQuery, {
    variables: { _id: pizzaId },
    fetchPolicy: 'cache-and-network',
    ...props,
  });
  return [getFirstResult(data), { loading, error, ...rest }];
};

export default usePizzaById;
