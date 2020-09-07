import { gql } from 'apollo-boost';
import { client } from '../../../utils/apollo';

const UserApi = {
  registerUser: async (email, password) => {
    console.log("email", email, password);
    let result =  await client.mutate({
      mutation: gql`
        mutation register($email: String!, $password: String!) {
          register(email: $email, password: $password)
        }
      `,
      variables: {
        email: email,
        password: password
      }
    })
    let data = result.data ? result.data.register : null;
    return data;
  },

  authenticateUser: async (email, password) => {
    console.log("email", email, password);
    let result =  await client.mutate({
      mutation: gql`
        mutation authenticate($email: String!, $password: String!) {
          authenticate (email: $email, password: $password)
        }
      `,
      variables: {
        email: email,
        password: password
      }
    })
    let data = result.data ? result.data.authenticate : null;
    return data;
  }
}
export default UserApi;
