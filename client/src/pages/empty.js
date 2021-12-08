import React from 'react'
import styled from 'styled-components'

const EmptyRoute = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  font-size: 30px;
  background-color: rgba(255, 0, 0, 0.3);
  font-weight: 700;
`;

const EmptyPage = () => {
    return  <EmptyRoute>Page not found!</EmptyRoute>
}

export default EmptyPage
