import ApolloClient, { gql } from 'apollo-boost';
const client = new ApolloClient({
  uri: 'http://localhost:4000',
});

const PostApi = {
  getPosts: async () => {
    let result = await client.query({
		  query: gql`
		      {
		        posts(pagination:{limit:6}) {
		          id,
		          title,
		          content,
		          image,
		          createdAt
		        }
		      }
		    `
		})
		let data = result.data ? result.data.posts : [];
    return data;
  },

  getPostDetail: async (id) => {
    let result = await client.query({
		  query: gql`
      {
        post(id:${id}) {
          id,
          title,
          content,
          image,
          createdAt,
          comments {
            id,
            postId,
            content,
            createdAt
          }
        }
      }`
		})

    let data = result.data ? result.data.post : null;
    return data;
  },

  addPost: async (id) => {
    let result = await client.query({
		  query: gql`
      mutation($id: Int, $title: String, $content: String, $image: String) {
        addPost (postInput:{id: $id, title: $title, content: $content, image: $image})
      }
      `
		})
    console.log("crash", result);
    let data = result.data ? result.data.post : null;
    return data;
  }
}
export default PostApi;
