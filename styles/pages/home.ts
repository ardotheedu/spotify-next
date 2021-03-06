import styled from 'styled-components'

export const Title = styled.h1`
    transform: translate(0px, -30px);
    color: var(--white-s);
    font-size: 150px;
`;

export const Content = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
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
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
`;