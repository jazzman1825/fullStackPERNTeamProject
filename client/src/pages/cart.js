import React from 'react';
import styled from 'styled-components'

const CartContainer = styled.div`
display: flex;
justify-content: center;
text-align: center;
width: 100%;
`;

const CartContent = styled.div`
font-family: 'Muli', sans-serif;
letter-spacing: 1px;
font-variant: small-caps;
font-style: italic;
font-size: 20px;
color: black;
line-height: 200%;

`;

const row = styled.div`
display: flex;
justify-content: space-between;    
`;







const ShoppingCart = ({AddToCart, RemoveFromCart, cartProducts, setCartProducts}) => {


    return (
    <CartContainer>
        <CartContent>
         <table>
            <tbody>
            <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
             </tr>
        {cartProducts.map(p =>
         <><tr key={p.id}>
                <td> {p.name} </td>
                <td> {p.qty}</td>
                <td> {p.price}</td>
            </tr>
            
                 
            </>
            
            
            )}
        </tbody>
        </table>
        </CartContent>

    </CartContainer>
    )
}

export default ShoppingCart