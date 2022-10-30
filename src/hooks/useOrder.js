import { gql, useMutation } from '@apollo/client';

const removeBasketByUserIdMutation = gql`
  mutation removeBasketByUserId {
    removeBasketByUserId
  }
`;

const useOrder = (props) => {
  const [removeBasketByUserId, rest] = useMutation(removeBasketByUserIdMutation, props);
  return [removeBasketByUserId, rest];
};

export default useOrder;
