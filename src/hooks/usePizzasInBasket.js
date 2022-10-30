import { gql, useQuery } from '@apollo/client';
import { getFirstResult } from '../utils/graphql';

const PizzasInBasketQuery = gql`
  query PizzasInBasket {
    pizzasInBasket {
      _id
      pizzaName
      img
      price
      description
    }
  }
`;

const usePizzasInBasket = () => {
  const { loading, data, error, ...rest } = useQuery(PizzasInBasketQuery, { fetchPolicy: 'cache-and-network' });
  return [getFirstResult(data) || [], { loading, error, ...rest }];
};

export default usePizzasInBasket;
