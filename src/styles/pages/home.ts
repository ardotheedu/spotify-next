import styled from 'styled-components'
export const Container = styled.main`
    max-width: 1120px;
    margin: 0 auto;
    padding: 5rem 0 2rem;

    display: flex;
    align-items: center;
    justify-content: space-between;
`;
export const Hero = styled.main`
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

    a {
        margin-top: 2.5rem;
    }
`;

export const LoginButton = styled.a`
    width: 268px;
    height: 4rem;
    border: 0;
    border-radius: 2rem;
    background: var(--yellow-500);
    color: var(--purple-700);
    font-size: 1.25rem;
    font-weight: bold;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: filter 0.2s;

    &:hover {
        filter: brightness(0.8);
        color: var(--gray-900);
        text-decoration: none;
    }
`;