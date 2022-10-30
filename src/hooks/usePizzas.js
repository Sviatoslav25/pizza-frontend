import { gql, useQuery } from '@apollo/client';
import { getFirstResult } from '../utils/graphql';

const pizzasQuery = gql`
  query Pizzas {
    pizzas {
      _id
      name
      description
      img
      price
    }
  }
`;

const usePizzas = () => {
  const { loading, data, error, ...rest } = useQuery(pizzasQuery, { fetchPolicy: 'cache-and-network' });
  return [getFirstResult(data) || [], { loading, error, ...rest }];
};

export default usePizzas;
