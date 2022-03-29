import styled from "styled-components";

export const SectionContainer = styled.div`
    padding: 1.5rem 10vw;
    background-color: #f5f5f5;
    @media only screen and (max-width: 769px){
        padding: 1rem 2vw;
    }
`

export const Title = styled.h1`
    font-size: 1.5rem;
    margin: 15px 0;
`
export const SubTitle = styled.h1`
    font-size: 1.2rem;
    margin: 10px 0;
`
export const LinksContainer = styled.div`
    padding: 1rem;
    width: 25rem;
    min-height: 12rem;
    border-radius: 0.5rem;
    margin: 2rem;
    background-color: #fff;
    box-shadow: 2px 2px 12px -6px rgba(0,0,0,0.66);
    -webkit-box-shadow: 2px 2px 12px -6px rgba(0,0,0,0.66);
    -moz-box-shadow: 2px 2px 12px -6px rgba(0,0,0,0.66);
    @media only screen and (max-width: 769px){
        margin: 1rem;
    }
    @media only screen and (max-width: 469px){
        width: 20rem;
    }
`

export const LinkListContainer = styled.div`
    list-style: none;
    display: flex;
    flex-direction:  column;

`

export const LinkItem = styled.a`
    color: #003566;
`

export const LinkStyle = {
    color: '#003566',
    marginBottom: '5px', 
    textDecoration: 'none',
    cursor: 'pointer'
}