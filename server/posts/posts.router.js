const express = require('express');
const { fetchPosts, postsWithMoreData } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');

const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await fetchPosts();

  const response=await postsWithMoreData(posts); 
 console.log(response);
  res.json(response);
});

module.exports = router;
