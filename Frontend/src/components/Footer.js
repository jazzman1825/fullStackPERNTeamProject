import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.div`
    display: flex;
    background: rgb(2,0,36);
    background: radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 47%, rgba(0,212,255,1) 100%);
    color: white;
    height: 100px;
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 16px;
    font-family: Verdana, Geneva, sans-serif;
    letter-spacing: 1px;
    font-variant: small-caps;
    font-style: italic;
`;

const FooterContent = styled.div`
    max-width: 1200px;
    font-family: Verdana, Geneva, sans-serif;
    letter-spacing: 1px;
    font-variant: small-caps;
    font-style: italic;
    font-size: 12px;
`;

const Footer   = () => {
    return (
        <FooterContainer>
            <FooterContent>
                <p>FoodApp Oy</p>
                <p>Myllykatu 77, 90100 Oulu</p>
                <p>© Myllylä, Sahlström, Timoshchenko, Kalliokoski 2021 </p>
            </FooterContent>
        </FooterContainer>
    )
}

export default Footer