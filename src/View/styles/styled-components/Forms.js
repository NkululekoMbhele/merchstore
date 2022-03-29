import React from "react";
import styled from "styled-components";

export const FormGroup = styled.div`
	color: #111;
    display: block;
	width: 25rem;
	margin: 0.2rem auto;
    @media only screen and (max-width: 450px) {
        width: 18rem;
    }
`;

export const Select = styled.select`
    padding: 0.5rem 0.6rem;
    width: 100%;
    padding: 0.5em;
    box-sizing: border-box;
    outline: none;
    line-height: 1.1;
    cursor: pointer;
`;



export const Label = styled.label`
	margin-bottom: 0.2rem;
	color: #111;
    display: block;
    font-size: 0.8rem;
`;


export const Input = styled.input`
	padding: 0.5em;
	color: #111;
	background: #fff;
	border: 1px solid #001D3D;
	border-radius: 3px;
	width: 100%;
	margin-bottom: 0.5em;
    
`;
export const Textarea = styled.textarea`
	padding: 0.5em;
	color: #111;
	background: #fff;
	border: 1px solid #001D3D;
	border-radius: 3px;
	width: 100%;
	margin-bottom: 0.5em;
`;

export const Message = styled.label`
    font-size: 0.8rem;
	color: #ba181b;
    display: block;
`;
export const FormButton = styled.input`
    font-size: 1.1rem;
    letter-spacing: 0.05rem;
    text-align: center;
    padding: 0.8rem 5rem;
    text-transform: uppercase;
	color: #fff;
    font-weight: 600;
    background-color: #001d3d;
    display: block;
    border: none;
    border-radius: 0.5rem;
    margin: 1.5rem 0;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
        background-color: #001d55;
    }
`;

export const Button = styled.button`
    font-size: 1.1rem;
    letter-spacing: 0.05rem;
    text-align: center;
    padding: 0.8rem 5rem;
    text-transform: uppercase;
	color: #fff;
    font-weight: 600;
    background-color: #001d3d;
    display: block;
    border: none;
    border-radius: 0.5rem;
    margin: 1.5rem 0;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
        background-color: #001d55;
    }
`;
