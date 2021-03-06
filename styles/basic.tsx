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