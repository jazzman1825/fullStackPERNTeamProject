import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import MenuForm from '../components/MenuForm';
import RestaurantForm from '../components/RestaurantForm';
// import restaurantService from '../services/restaurants'

const ManagerPageContainer = styled.div`
    display: flex;
    flex-flow: column;
    padding-top: 50px;
    align-items: center;
`;

const Header = styled.h1`
    text-align: center;
    width: 90%;
    border-bottom: 2px solid lightgray;
    padding-bottom: 15px;
`;

const ManagerPage = ({ setNavLinks, restaurants, setRestaurants }) => {
    const [ showRestaurantForm, setShowRestaurantForm ] = useState(true)
    const [ showMenuForm, setShowMenuForm ] = useState(false)

    //If the restaurant manager has already created a restaurant, show the existing restaurant instead of form
    // setShowRestaurantForm(false)

    useEffect(() => {
        setNavLinks([
            {
                "path": "/manager/restaurant"
            },
            {
              "path": "/manager/restaurant",
              "name": "My restaurant"
            },
            {
              "path": "/manager/orders",
              "name": "Orders"
            }
        ])
    }, [setNavLinks])
    
    return (
        <ManagerPageContainer>
            <Header>Hello manager!</Header>
            {showRestaurantForm && <RestaurantForm restaurants={restaurants} setRestaurants={setRestaurants}
                setShowRestaurantForm={setShowRestaurantForm} setShowMenuForm={setShowMenuForm} /> 
            }
            {showMenuForm && <MenuForm setShowMenuForm={setShowMenuForm} /> }
        </ManagerPageContainer>
    )
}

export default ManagerPage
