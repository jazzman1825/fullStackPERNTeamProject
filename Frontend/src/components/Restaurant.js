import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { GoLocation } from 'react-icons/go'
import { AiOutlineClockCircle } from 'react-icons/ai'

const RestaurantItem = styled.li`
    display: flex;
    margin-bottom: 50px;
    margin-left: 16px;
    margin-right: 16px;
`;

const RestaurantLink = styled(Link)`
    display: flex;
    flex-flow: column;
    box-shadow: 0 6px 20px rgba(56, 125, 255, 0.17);
    border-radius: 10px;
    text-decoration: none;
`;

const RestaurantFigure = styled.figure`
    overflow: hidden;
`;

const RestaurantImage = styled.img`
    display: block;
    width: 480px;
    height: 270px;
    transition: all 0.2s linear;

    &:hover {
        transform: scale(1.1);
    }
`;

const RestaurantContent = styled.div`
    text-align: center;
    color: black;
`;

const RestaurantName = styled.div`
    font-size: 18px;
    font-weight: 700;
`;

const RestaurantType = styled.div`
    color: darkgray;
    padding-top: 10px;
    font-size: 14px;
    margin: 0;
`;

const RestaurantInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    border-top: 2px dashed lightgray;
    font-weight: 700;
    padding: 5px;
    color: darkgray;
`;

const RestaurantLocation = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 33.33%;
`;

const LocationLogo = styled(GoLocation)`
    margin-right: 5px;
`;

const RestaurantHours = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 33.33%;
`;

const HoursLogo = styled(AiOutlineClockCircle)`
    margin-right: 5px;
`;

const RestaurantPricelvl = styled.div`
    width: 33.33%;
`;

const Restaurant = (props) => {
    return (
        <RestaurantItem>
            <RestaurantLink to={`/restaurants/${props.id}`}>
                <RestaurantFigure>
                    <RestaurantImage src={props.src} alt={props.name}></RestaurantImage>
                </RestaurantFigure>
                <RestaurantContent>
                    <RestaurantName>{props.name}</RestaurantName>
                    <RestaurantType>{props.type}</RestaurantType>
                    <RestaurantInfo>
                        <RestaurantLocation>
                            <LocationLogo /> {props.location}
                        </RestaurantLocation>
                        <RestaurantHours>
                            <HoursLogo /> {props.operatingHours}
                        </RestaurantHours>
                        <RestaurantPricelvl>Price level: {props.priceLevel}</RestaurantPricelvl>
                    </RestaurantInfo>
                </RestaurantContent>
            </RestaurantLink>
        </RestaurantItem>
    )
}

export default Restaurant
