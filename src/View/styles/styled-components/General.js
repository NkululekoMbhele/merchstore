import styled from "styled-components";



const BarDivider = styled.hr`
    background-color: #DFDFDF;
    width: 100%;
    height: 10px;
    border: none;
    box-shadow: 0px 0px 2px 1px rgba(0,0,0,0.18) inset;
-webkit-box-shadow: 0px 0px 2px 1px rgba(0,0,0,0.18) inset;
-moz-box-shadow: 0px 0px 2px 1px rgba(0,0,0,0.18) inset;

`
const LineDivider = styled.hr`
    width: 100%;
`
const PaddedDiv = styled.div`
    
    padding: 1.2rem 5vw;
`
const Container = styled.div`
    padding: 1.2rem 5vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const BlueBackground = styled.div`
    background-color: #003566;
`
const Title = styled.h1`
    padding: 1.2rem 0;
    font-size: 2.5rem;
`


export {Title, Container, BarDivider, LineDivider, PaddedDiv, BlueBackground }