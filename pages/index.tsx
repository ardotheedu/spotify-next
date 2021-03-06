import React from 'react';
import Link from 'next/link'

import { Container, Content, Title } from '../styles/pages/home';

const Home = () => {
  
  return (
        <Container>
            <Content>
                <Title>SpotifyMe</Title>
                <Link href="/login">
                  <a>
                        login
                  </a>
                </Link>
            </Content>
        </Container>
  );
};

export default Home;
