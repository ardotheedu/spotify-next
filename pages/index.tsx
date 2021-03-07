import redirect from 'nextjs-redirect'
import useSWR from 'swr'
import { Container, Content, Title } from '../styles/pages/home';
import { useState } from 'react';
type Data = {
  link: string;
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw Error("Yo that's NOT OK!!!");
  }
  const {link}: Data = await res.json();
  return link;
};

const Home = () => {
  const [canRedirect, setRedirect] = useState(false)
  const { data, error } = useSWR('/api/login', fetcher)
  console.log(data)
  return (
        <Container>
            <Content>
                <Title>SpotifyMe</Title>
                <a href={data}>
                  Login
                </a>
            </Content>
        </Container>
  );
};

export default Home;

