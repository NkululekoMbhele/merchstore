import styled from "styled-components";
import {Colors} from "../Colors";

const NavContainer = styled.nav `
display: flex;
align-items: center;
width: 100vw;
height: 10vh;
margin: 0;
padding: 0;
  text-align: center;
  color: ${Colors.darkblue};
  box-shadow: 0px 5px 10px 0px rgba(50,50,50,0.25);
-webkit-box-shadow: 0px 5px 10px 0px rgba(50,50,50,0.25);
-moz-box-shadow: 0px 5px 10px 0px rgba(50,50,50,0.25);
`;


const ContainerLarge = styled.div `
    padding: 0 5vw;
    width: 95%;
    height: 100%;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    @media only screen and (max-width: 769px) {
        padding: 0 3vw;
    }

`


const FlexContainer = styled.div `
    display: flex;
    align-items: center;
`;
const Logo = styled.img `
    width: 5rem;
    height: auto;
`;
const SideBar = styled.div `
    width: 25rem;
    margin: 0;
    z-index: 5;
    min-height: 100vh;
    left: -500px;
    top: 0px;
    transition: all 0.3s ease-out;
    position: absolute;
    background-color: #fff;
    box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.49);
-webkit-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.49);
-moz-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.49);

@media only screen and (max-width: 768px) {
    width: 18rem;
}

`;



export { NavContainer, FlexContainer, Logo, ContainerLarge, SideBar }