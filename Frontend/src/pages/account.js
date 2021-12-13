import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import orderService from '../services/orders'
import { UserContext } from '../contexts/UserContext';

const AccountPageContainer = styled.div`
    display: flex;
    flex-flow: column;
    padding-top: 50px;
    align-items: center;
    min-height: 100vh;
`;

const CurrentOrderHeader = styled.h1`
    text-align: center;
    width: 90%;
    border-bottom: 2px solid lightgray;
    padding-bottom: 15px;
`;

const HistoryHeader = styled.h1`
    text-align: center;
    width: 90%;
    border-bottom: 2px solid lightgray;
    padding-bottom: 15px;
    margin-top: 100px;
`;

const OrderContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    align-items: center;
    justify-content: center;
`;

const OrderContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-bottom: 20px;
`;

const Order = styled.div`
    height: 100%;
    font-size: 18px;
    margin-right: 5px;
`;

const Button = styled.button`
    width: 120px;
    border-radius: 100px;
    background: rgb(0, 157, 224);
    white-space: nowrap;
    padding: 7px 0px;
    margin-left: 5px;
    color: white;
    font-size: 15px;
    font-weight: 700;
    border: none; 
    cursor: pointer;
    transition: all, 240ms ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        filter: brightness(1.2);
    }
`;

const StatusButton = styled.button`
    width: 250px;
    border-radius: 100px;
    background: rgb(0, 200, 200);
    white-space: nowrap;
    padding: 7px 0px;
    margin-left: 5px;
    color: white;
    font-size: 15px;
    font-weight: 700;
    border: none; 
    cursor: pointer;
    transition: all, 240ms ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        filter: brightness(1.2);
    }
`;

const CloseButton = styled.button`
    width: 120px;
    border-radius: 100px;
    background: rgb(205, 0, 0);
    white-space: nowrap;
    padding: 7px 0px;
    margin-top: 10px;
    color: white;
    font-size: 15px;
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
    border: 2px inset black;
    border-radius: 10px;
    background-color: rgba(0, 255, 0, 0.3);
    box-shadow: 0 6px 20px rgba(, 255, 0, 0.3);
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
`;

const Dropdown = styled.select`
    width: 200px;
    height: 45px;
    padding: 10px 10px;
    border-radius: 10px;
    border: 2px inset black;
    font-size: 16px;
    cursor: pointer;
    margin-left: 10px;
    margin-right: 5px;
`;

const DropdownItem = styled.option`

`;

const AccountPage = () => {
    const [ orders, setOrders ] = useState([])
    const [ showDetails, setShowDetails ] = useState(false)
    const [ orderDetails, setOrderDetails ] = useState([])
    const [ showButton, setShowButton ] = useState(true)
    const [ message, setMessage ] = useState(null)
    const [ isAdmin, setIsAdmin ] = useState(false)
    const [ status, setStatus ] = useState("Preparing")
    const [ time, setTime ] = useState("25")
    const { user } = useContext(UserContext)

    const statusOptions = ["Preparing", "Ready for delivery", "Delivering"]
    const timeOptions = ["25", "20", "15", "10", "5"]

    useEffect(() => {
        orderService
        .getAll()
        .then(initialOrders => {
          setOrders(initialOrders)
          if (user && user.userType === "manager") {
            setIsAdmin(true)
        }
        })
        .catch(error => console.log(error))
    }, [user]);

    let ordersInProgress = []
    let completedOrders = []
    orders.filter(o => o.order_status !== "Delivered" ? ordersInProgress.push(o) : completedOrders.push(o));

    // Customer confirms that the order has been delivered
    const handleDelivered = (order) => {
        const orderObject = { order_id: order.order_id, order_status: "Delivered"}

        orderService
        .update(orderObject)
        .then(returnedOrder => {
            setMessage("Order delivered!")
            setTimeout(() => {
                setMessage(null)
            }, 5000);
            setOrders(orders.map(o => o.order_id !== returnedOrder.order_id ? o : returnedOrder))
        })
    }

    const handleStatusChange = (order) => {
        const orderObject = { order_id: order.order_id, order_status: status, order_etc: time}

        orderService
        .update(orderObject)
        .then(returnedOrder => {
            setMessage("Order status changed!")
            setTimeout(() => {
                setMessage(null)
            }, 5000);
            setOrders(orders.map(o => o.order_id !== returnedOrder.order_id ? o : returnedOrder))
        })
    }

    // Customer or Manager wants to check the products of a specific order
    const handleDetails = (order) => {
        setShowButton(false)
        setShowDetails(true)

        try {
            orderService
            .getDetails(order.order_id)
            .then(returnedOrderDetails => {
                setOrderDetails(returnedOrderDetails)
            })
                
        } catch (err) {
            console.error(err)
            setMessage("Couldn't get the order details!")
            setTimeout(() => {
                setMessage(null)
            }, 3000)  
        }        
    }

    const handleDetailClose = () => {
        setShowDetails(false)
        setShowButton(true)
    }

    return (
        <AccountPageContainer>
            <CurrentOrderHeader>Orders in progress</CurrentOrderHeader>
            {message && <Message>{message}</Message>}
            <OrderContainer>
                {ordersInProgress.map(o =>
                    <OrderContent key={o.order_id} >
                        <Order><b>Status:</b> {o.order_status} <p><b>Estimated time of completion:</b> {o.order_etc} min</p> <p>{o.order_address}</p> <p>{o.order_price}$</p></Order>
                        {showButton && <Button onClick={() => handleDetails(o)}>Show details</Button> }
                        {isAdmin &&
                            <div>
                                <Dropdown value={status} onChange={(e) => setStatus(e.target.value)}>
                                    {statusOptions.map((o, idx) =>
                                        <DropdownItem key={idx} value={o} >{o}</DropdownItem>    
                                    )}
                                </Dropdown>
                                <Dropdown value={time} onChange={(e) => setTime(e.target.value)} >
                                    {timeOptions.map((o, idx) =>
                                        <DropdownItem key={idx} value={o} >{o}</DropdownItem>
                                    )}
                                </Dropdown> min
                            </div>
                        }
                        {!isAdmin 
                        ? <StatusButton onClick={() => handleDelivered(o)} >Confirm the order as delivered</StatusButton>
                        : <StatusButton onClick={() => handleStatusChange(o)} >Change the status of this order</StatusButton>
                        }
                    </OrderContent>  
                )}
            </OrderContainer>
            {showDetails &&
                <OrderContainer>
                    <HistoryHeader>Order details:</HistoryHeader>
                    {orderDetails.map((d, index) => 
                        <li key={index}>{d.product_name} {d.product_price}$ </li>    
                    )}
                    <CloseButton onClick={handleDetailClose} >Close details</CloseButton>
                </OrderContainer>
            }
            <HistoryHeader>Order history</HistoryHeader>
            <OrderContainer>
                {completedOrders.map(o =>
                    <OrderContent key={o.order_id} >
                        <Order><b>{o.order_time}</b> <p>{o.order_address}</p> <p>{o.order_price}$</p> </Order>
                        {showButton &&<Button onClick={() => handleDetails(o)} >Show details</Button> }
                    </OrderContent>   
                )}
            </OrderContainer>
        </AccountPageContainer>
    )
}

export default AccountPage
