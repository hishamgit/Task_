const express = require('express');
const { fetchPosts, postsWithMoreData } = require('./posts.service');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
  const start = parseInt(req.query.start);
  const limit = parseInt(req.query.limit);

  const posts = await fetchPosts({ start, limit });

  const response=await postsWithMoreData(posts); 

  res.json(response);
});

module.exports = router;
