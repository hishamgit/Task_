const { fetchUserById } = require('../users/users.service');

const axios = require('axios').default;


/**
 * Fetches posts from a remote API.
 * @async
 * @param {Object} [params] - The parameters for fetching posts.
 * @param {number} [params.start=0] - The start index of posts to fetch.
 * @param {number} [params.limit=10] - The maximum number of posts to fetch.
 * @returns {Promise<Array>} - A promise that resolves to an array of posts.
 */
async function fetchPosts(params) {
  const { start = 0, limit = 10 } = params || {};
  const { data: posts } = await axios.get(
    'https://jsonplaceholder.typicode.com/posts?limit',
    {
      params: {
        _start: start,
        _limit: limit,
      },
    },
  );

  return posts;
}

const postsWithMoreData = async (posts) => {
  return await Promise.all(
    posts.map(async post => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/albums/${post.id}/photos`,
          {
            params: {
              _start: 0,
              _limit: 3,
            },
          },
        );
        const photos = response.data;
        const images = photos.map(photo => photo.url);

        const { name, email, firstName, lastName } = await fetchUserById(
          post.userId,
        );

        return {
          ...post,
          images,
          name,
          firstName,
          lastName,
          email,
        };
      } catch (error) {
        console.error('Error fetching photos:', error);
        return post; // Return the original post if there's an error
      }
    }),
  );
};
module.exports = { fetchPosts, postsWithMoreData };
