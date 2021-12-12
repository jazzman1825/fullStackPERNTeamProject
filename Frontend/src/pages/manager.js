import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import MenuForm from '../components/MenuForm';
import RestaurantForm from '../components/RestaurantForm';
import restaurantService from '../services/restaurants'
import { UserContext } from '../contexts/UserContext';
import Restaurant from '../components/Restaurant';

const ManagerPageContainer = styled.div`
    display: flex;
    flex-flow: column;
    padding-top: 50px;
    align-items: center;
    min-height: 100vh;
`;

const Header = styled.h1`
    text-align: center;
    width: 90%;
    border-bottom: 2px solid lightgray;
    padding-bottom: 15px;
`;

const RestaurantContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ModifyButton = styled.button`
    border-radius: 100px;
    background: rgb(0, 157, 224);
    white-space: nowrap;
    padding: 15px 0px;
    margin-top: 10px;
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

const ManagerPage = ({ restaurants, setRestaurants }) => {
    const [ restaurant, setRestaurant ] = useState(null)
    const [ showRestaurantForm, setShowRestaurantForm ] = useState(false)
    const [ showMenuForm, setShowMenuForm ] = useState(false)
    const [ hasRestaurant, setHasRestaurant ] = useState(false)
    const [ isAdmin, setIsAdmin ] = useState(false)
    const { user } = useContext(UserContext)

    useEffect(() => {
        restaurantService
        .getOne(user.userID)
        .then(initialRestaurant => {
          setRestaurant(initialRestaurant)
          if (user && user.userType === "manager") {
            setIsAdmin(true)
        }
        })
        .catch(error => console.log(error))
    }, [user]);

    useEffect(() => {
        if (restaurant && restaurant.restaurant_name == null) {
            setShowRestaurantForm(true)
        }
        if (restaurant && restaurant.restaurant_name != null) {
            setHasRestaurant(true)
        }
    }, [restaurant])

    const handleModifyRestaurant = () => {
        setHasRestaurant(false)
        setShowRestaurantForm(true)
    }

    const handleModifyMenu = () => {
        setHasRestaurant(false)
        setShowMenuForm(true)
    }

    const handleCancel = () => {
        setHasRestaurant(true)
        setShowRestaurantForm(false)
        setShowMenuForm(false)
    }
    
    return (
        <ManagerPageContainer>
            {isAdmin ? <Header>Hello manager!</Header> : <Header>Please login as a manager!</Header> }
            {isAdmin && hasRestaurant && 
            <RestaurantContainer> 
                <Restaurant id={restaurant.restaurant_id} name={restaurant.restaurant_name} location={restaurant.restaurant_location}
                    src={restaurant.restaurant_image} operatingHours={restaurant.operating_hours} type={restaurant.restaurant_type} priceLevel={restaurant.restaurant_pricelvl} /> 
                <ModifyButton onClick={handleModifyRestaurant} >Modify your restaurant</ModifyButton>
                <ModifyButton onClick={handleModifyMenu} >Add products or modify your menu</ModifyButton>
            </RestaurantContainer>
            }
            {showRestaurantForm && <RestaurantForm restaurants={restaurants} setRestaurants={setRestaurants}
                setShowRestaurantForm={setShowRestaurantForm} setShowMenuForm={setShowMenuForm} handleCancel={handleCancel} /> 
            }
            {showMenuForm && <MenuForm handleCancel={handleCancel} /> }
        </ManagerPageContainer>
    )
}

export default ManagerPage
