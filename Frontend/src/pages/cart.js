import React, { useState, useContext } from 'react';
import styled from 'styled-components'
import { UserContext } from '../contexts/UserContext'
import orderService from '../services/orders'

const CartContainer = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
    width: 100%;
    min-height: 100vh;
`;

const Header = styled.h1`
    text-align: center;
    width: 90%;
    border-bottom: 2px solid lightgray;
    padding-bottom: 15px;
`;

const CartContent = styled.div`
    font-family: 'Muli', sans-serif;
    font-variant: small-caps;
    font-style: italic;
    font-size: 22px;
    color: black;
    line-height: 200%;
`;

const ProductImage = styled.img`
    display: block;
    width: 224px;
    height: 110px;
    transition: all 0.2s linear;
   `;

const IncreaseQty = styled.button`

`;

const DecreaseQty = styled.button`

`;

const TableHeader = styled.th`
    padding: 15px;
`;

const bottomRow = styled.div`
    justify-items: flex-start;
`;

const orderButton = styled.button`
    font-family: 'Muli', sans-serif;
    font-variant: small-caps;
    font-style: italic;
    font-size: 22px;
    color: black;
    border: 1px solid black;
`;

const TextInput = styled.input`
    width: 300px;
    height: 32px;
    padding: 10px 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    border: 2px inset black;
    transition: all 200ms ease-in-out;
    font-size: 18px;

    &::placeholder {
        color: lightgray;
    }

    &:focus {
        border-bottom: 5px solid rgb(0, 157, 224);
    }
`;

const SubmitButton = styled.button`
    width: 200px;
    border-radius: 100px;
    background: rgb(0, 157, 224);
    white-space: nowrap;
    padding: 15px 0px;
    margin-top: 5px;
    color: white;
    font-size: 16px;
    font-weight: 700;
    border: none; 
    cursor: pointer;
    transition: all, 240ms ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        filter: brightness(1.2);
    }
`;

const Message = styled.div`
    padding: 10px 60px;
    border: 1px inset black;
    border-radius: 10px;
    background-color: rgba(0, 100, 100, 0.3);
    box-shadow: 0 6px 20px rgba(, 255, 0, 0.3);
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
    margin-top: 30px;
`;

const ShoppingCart = ({ AddToCart, RemoveFromCart, cartProducts, setCartProducts, isConsumer }) => {
    const [ address, setAddress ] = useState("")
    const [ cardNumber, setCardNumber ] = useState("")
    const [ message, setMessage ] = useState(null)
    const { user } = useContext(UserContext)

    const totalPrice = cartProducts.reduce((a, c) => a + c.qty * c.price, 0);

    const handleOrderSend = () => {

        if (address === "") {
            setMessage("Please enter your address!")
            setTimeout(() => {
                setMessage(null)
            }, 5000)
            return
        }

        if (cardNumber.length < 14) {
            setMessage("Invalid card number!")
            setTimeout(() => {
                setMessage(null)
            }, 5000)
            return
        }

        if (cartProducts.length < 1) {
            setMessage("Your shopping cart is empty!")
            setTimeout(() => {
                setMessage(null)
            }, 5000)
            return
        }

        const firstId = cartProducts[0].restaurant_id
        if (!cartProducts.every(p => p.restaurant_id === firstId)) {
            setMessage("Shopping cart contains products from different restaurants!")
            setTimeout(() => {
                setMessage(null)
            }, 5000)
            return
        }

        let date = new Date()
        let day = date.getDate()
        let month = date.getMonth() +1
        let year = date.getFullYear()
        
        const newOrder = {
            restaurant_id: firstId,
            customer_id: user.userID,
            order_time: `${day}.${month}.${year}`,
            order_status: "Received",
            order_price: totalPrice.toFixed(2),
            order_address: address
        }

        let orderID = null

        orderService
        .create(newOrder)
        .then(returnedOrder => {
            setMessage("Thank you for your purchase!")
            setTimeout(() => {
                setMessage(null)
            }, 5000)
            setCartProducts([])
            setAddress("")
            setCardNumber("")
            orderID = returnedOrder.order_id
        })
        .then(() => {
            cartProducts.forEach(p => {
                for (let i=0; i<p.qty; i++) {
                    const newDetail = {
                        product_key: p.product_id,
                        order_key: orderID
                    }
                    orderService
                    .sendDetails(newDetail)
                } 
            })
        })
        .catch(err => {
            console.log(err)
            setMessage("Session expired, please login again!")
            setTimeout(() => {
                setMessage(null)
            }, 5000) 
        })
    }
    return (
        <CartContainer>
            {isConsumer 
                ? <CartContent>
                    {message && <Message>{message}</Message> }
                    <table>
                        <tbody>
                            <tr>
                                <th></th>
                                <TableHeader>Product</TableHeader>
                                <TableHeader>Quantity</TableHeader>
                                <TableHeader>Price ea</TableHeader>
                                <TableHeader></TableHeader>
                            </tr>
                            {cartProducts.map(p =>
                            <><tr key={p.product_id}>
                                    <td><ProductImage src={p.src} alt={p.name}></ProductImage></td>
                                    <td> {p.name} </td>
                                    <td><DecreaseQty onClick={()=>RemoveFromCart(p)}>-</DecreaseQty> {p.qty} <IncreaseQty onClick={()=>AddToCart(p)}> + </IncreaseQty> </td>
                                    <td> {p.price} $</td>
                                    {/* <td> {totalPrice.toFixed(2)} </td> */}
                                </tr>
                                </>
                                )}
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th>Total:</th>
                                    <th>{totalPrice.toFixed(2)}$</th>
                                </tr>
                                <tr>
                                    <th> <TextInput type="text" placeholder="Delivery address" onChange={(e) => setAddress(e.target.value)} /></th>    
                                    <th> <TextInput type="number" placeholder="Credit card number" onChange={(e) => setCardNumber(e.target.value)} /></th>
                                    <th> </th>
                                    <th><SubmitButton onClick={handleOrderSend} >Place your order</SubmitButton></th>
                                </tr>
                        </tbody>
                    </table>
                </CartContent>
            : <Header>Please log in as a consumer!</Header>
            }
        </CartContainer>
    )
}

export default ShoppingCart