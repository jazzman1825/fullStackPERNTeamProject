import styled from "styled-components"
import React from 'react'

const ErrorMessage = styled.div`
  padding: 10px 60px;
  border: 2px inset black;
  border-radius: 10px;
  background-color: rgba(255, 0, 0, 0.3);
  box-shadow: 0 6px 20px rgba(255, 0, 0, 0.3);
  font-size: 20px;
  font-weight: 700;
`;

const Error = ({ message }) => {
    return (
        <ErrorMessage>{message}</ErrorMessage>
    )
}

export default Error
