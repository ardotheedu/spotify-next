import styled from 'styled-components'
export const Container = styled.main`
    max-width: 1120px;
    margin: 0 auto;
    padding: 0 2rem;
    height: 100vh;

    display: flex;
    align-items: center;
    justify-content: space-between;
    .hero {
        max-width: 600px;

        > span {
            font-size: 1.5rem;
            font-weight: bold;
        }

        h1 {
            font-size: 4.5rem;
            line-height: 4.5rem;
            font-weight: 900;
            margin-top: 2.5rem;

            span {
                color: var(--cyan-500)
            }
        }

        p {
            font-size: 1.5rem;
            line-height: 2.25rem;
            margin-top: 1.5rem;

            span {
                color: var(--cyan-500);
                font-weight: bold;
            }
        }

        button {
            margin-top: 2.5rem;
        }
    }
`;

export const LoginButton = styled.a`
 width: 268px;
    height: 4rem;
    border: 0;
    border-radius: 2rem;
    background: var(--red);
    color: var(--white);
    font-size: 1.25rem;
    font-weight: bold;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: filter 0.2s;

    &:hover {
        filter: brightness(0.8)
    }
`;