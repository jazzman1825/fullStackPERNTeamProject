import React from 'react'
import styled from 'styled-components'

const Ftr = styled.footer`
display: flex;
background: rgb(2,0,36);
background: radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(0,0,0,1) 47%, rgba(0,212,255,1) 100%);
color: white;
height: 100px;
width: 100%;
justify-content: center;
align-items: center;
font-size: 16px;
position: fixed;
bottom: 0;
font-family: Verdana, Geneva, sans-serif;
letter-spacing: 1px;
font-variant: small-caps;
font-style: italic;
`;

const FooterContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100px;
width: 100%;
max-width: 1200px;
`;

const FooterContent = styled.div`
font-family: Verdana, Geneva, sans-serif;
letter-spacing: 1px;
font-variant: small-caps;
font-style: italic;
font-size: 12px;

`;

// --- //

const Footer   = () => {
    return (
        <>
            <Ftr>
                <FooterContainer>
                <FooterContent>
                <p>FoodApp Oy</p>
                <p>Myllykatu 77, 90100 Oulu</p>
                <p>© Myllylä, Sahlström, Timoshchenko, Kalliokoski 2021 </p>




                </FooterContent>
                </FooterContainer>
                </Ftr>
        </>
    )
}

export default Footer