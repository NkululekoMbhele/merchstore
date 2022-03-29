import styled from "styled-components";


export const CardContainer = styled.div`
    width: 15rem;
    min-height: 23rem;
    border-radius: 0.5rem;
    position: relative;
    box-shadow: 0px 0px 19px -4px rgba(0,0,0,0.49);
    -webkit-box-shadow: 0px 0px 19px -4px rgba(0,0,0,0.49);
    -moz-box-shadow: 0px 0px 19px -4px rgba(0,0,0,0.49);
`

export const CardHeader = styled.div`
    width: 100%;
    height: 50%;
`

export const CardImage = styled.img`
    width: 100%;
    height: 100%;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;

`

export const CardBody = styled.div`

`
export const ProductTitle = styled.h1`
    padding: 0.2rem 0.5rem;
    font-size: 0.8rem;
    font-weight: 500;
`
export const ProductCurrentPrice = styled.h4`
    font-size: 1.3rem;
    margin: 0;
    padding: 0;
    
`
export const ProductPreviousPrice = styled.h4`
    color: #aba6a6;
    text-decoration: line-through;
    font-size: 0.8rem;
    margin-left: 0.5rem;
    
`
export const ProductDiscount = styled.div`
    position: absolute;
    top: 8px;
    left: 8px;
    font-size: 10px;
    border-radius: 50%;
    background-color: #6ba2fa;
    width: 35px;
    height: 35px;
    text-align: center;
    color: #fff;
    line-height: 1;
    font-weight: 500;
    text-transform: uppercase;
    display: grid;
    place-items: center;
`
export const SaleTag = styled.div`
    position: absolute;
    top: 8px;
    left: 8px;
    font-size: 10px;
    border-radius: 50%;
    background-color: #6ba2fa;
    width: 35px;
    height: 35px;
    text-align: center;
    color: #fff;
    font-weight: 500;
    text-transform: uppercase;
    display: grid;
    place-items: center;

`
export const LikeButton = styled.div`
    position: absolute;
    top: 10px;
    right: 15px;
`

export const CardFooter = styled.div`
    position: absolute;
    bottom: 0;
    margin: auto;
    display: grid;
    place-items: center;
    width: 100%;
    padding: 0.8rem 0.6rem;

`
export const CardButton = styled.button`
 
    width: 100%;
    padding: 0.5rem 0.5rem;
    cursor: pointer;
`