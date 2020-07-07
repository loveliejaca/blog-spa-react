import ApolloClient, { gql } from 'apollo-boost';
const client = new ApolloClient({
  uri: 'http://localhost:4000',
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
});

const UserApi = {
  registerUser: async (email, password) => {
    let result =  await client.mutate({
      mutation: gql`
        mutation {
          register(email: "${email}", password: "${password}")
        }
      `
    })

    console.log("result", result);

    let data = result.data ? result.data.authenticate : null;
    return data;
  },

  authenticateUser: async (email, password) => {

    let result =  await client.mutate({
      mutation: gql`
        mutation {
          authenticate(email: "${email}", password: "${password}")
        }
      `
    })

    let data = result.data ? result.data.authenticate : null;
    return data;
  }
}
export default UserApi;


// const LOGIN_USER = client.mutate({
//   mutation: gql`
//     mutation {
//       authenticate(email: email, password: password)
//     }
//   `
// });
