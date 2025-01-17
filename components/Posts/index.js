import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import { WindowWidthContext } from '../hooks/windowWidthContext';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dataEnd, setDataEnd] = useState(false);

  const { isSmallerDevice } = useContext(WindowWidthContext);
  
  // Effect to fetch initial posts when component mounts or isSmallerDevice changes
  useEffect(() => {
    const fetchPost = async () => {
      const { data: posts } = await axios.get('/api/v1/posts', {
        params: { start: 0, limit: isSmallerDevice ? 5 : 10 },
      });
      setPosts(posts);
    };

    fetchPost();
  }, [isSmallerDevice]);

  // Handler to fetch more posts when Load More button is clicked
  const handleClick = async () => {
    setIsLoading(true);
    const { data: newPosts } = await axios.get('/api/v1/posts', {
      params: { start: posts.length, limit: isSmallerDevice ? 5 : 10 },
    });
    if (newPosts == '') {
      setDataEnd(true);
    }
    setPosts([...posts, ...newPosts]);
    setIsLoading(false);
  };

  return (
    <Container>
      <PostListContainer>
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </PostListContainer>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {!dataEnd ? (
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        ) : (
          ''
        )}
      </div>
    </Container>
  );
}
