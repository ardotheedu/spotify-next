import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    :root {
    --black-s: #121214;
    --white-s: #FFFFFF;
    --green-s: #1DB954;
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }
    body {
        background: var(--black-s);
        font-family: 'Work Sans', sans-serif;
    }
    h1, h2, h3, h5, h6 {
      font-weight: 700;
    }

    input, button {
      font-weight: 400;
    }
    
`;

const BasicLayout = ({ children }: { children: any }) => {
  return (
    <>
      <GlobalStyle />
      {children}
    </>
  );
};

export default BasicLayout;