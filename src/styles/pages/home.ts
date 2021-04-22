import styled from 'styled-components'

export const Title = styled.h1`
    color: var(--white-s);
    font-size: 9rem;
`;
export const Text = styled.p`
    color: var(--white-s);

`;

export const Content = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    z-index: 1;

    > div {
        display: column;
        text-align: center;
        font-size: 1rem;
    }

    > a {
        border: none;
        outline: none;
        color: #fff;
        background: var(--green-s);
        width: 100%;
        border-radius: 5px;
        padding: 13px 49px;
        font-weight: bold;
        font-size: 14px;
        line-height: 16px;
        text-transform: uppercase;
        display: flex;
        text-align: center;
        max-width: 150px;
        text-decoration: none;
    }
`;

/*Background*/
export const Container = styled.div`
    background: url('https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80');
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;

    &::before {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-image: linear-gradient(45deg,rgba(133,255,189, 0.3),rgba(255,251,125, 0.3))
        
    }
`;