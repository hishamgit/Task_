const axios = require('axios').default;

async function fetchAllUsers() {
  const { data: users } = await axios.get(
    'https://jsonplaceholder.typicode.com/users',
  );

  return users;
}
async function fetchUserById(userId) {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${userId}`,
  );
  const { name, email } = res.data;
  const nameParts = name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts[1];
  return {name,email,firstName,lastName};
}

module.exports = { fetchAllUsers, fetchUserById };
