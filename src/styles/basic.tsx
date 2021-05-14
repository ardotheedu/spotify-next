import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :root {
      --white: #A8DADC;
      --blue-light: #F1FAEE;
      --red: #E63946
  }
  @media (max-width: 1080px) {
      html {
          font-size: 93.75%
      }
  }
  @media (max-width: 720px) {
      html {
          font-size: 87.5%
      }
  }
  body {
      background: var(--blue-light);
      color: var(--white)
  }

  body, input, textarea, select, button {
      font: 400 1rem "Roboto", sans-serif
  }

  button {
      cursor: pointer;
  }

  a {
      color: inherit;
      text-decoration: none;
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