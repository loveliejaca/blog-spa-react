import ApolloClient, { gql } from 'apollo-boost';
import { useQuery } from '@apollo/client';
import { client } from '../../../utils/apollo';


const PostApi = {
  getPosts: async (offset) => {
    let result = await client.query({
		  query: gql`
        query posts($limit: Int, $offset: Int) {
          posts(pagination: {limit: $limit, offset: $offset}) {
            id
            title
            content
            image
            createdAt
            comments {
              id
              postId
              content
              createdAt
            }
          }
        }
		    `,
        variables: {
          limit: 6,
          offset: offset
        }
		})
		let data = result.data ? result.data.posts : [];
    return data;
  },

  getPostDetail: async (postId) => {
    console.log("postId", postId);
    let result = await client.query({
      query: gql`
        query post($id: Int!) {
          post(id: $id) {
            id
            title
            content
            image
            createdAt
            comments {
              id
              postId
              content
              createdAt
            }
          }
        }
		   `,
      variables: {
        id: parseInt(postId)
      }
		})
    let data = result.data ? result.data.post : null;
    return data;
  },

  addComment: async (postId, content) => {
    let result = await client.mutate({
      mutation: gql`
        mutation addComment($postId: Int!, $content: String!) {
          addComment(postId: $postId, content: $content) {
            postId
            content
          }
        }
      `,
      variables: {
        "postId" : parseInt(postId),
        "content": content
      }
    })


    let data = result.data ? result.data.addComment : null;
    return data;
  }
}
export default PostApi;
