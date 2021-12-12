import React from 'react'
import styled from 'styled-components'
import Restaurant from '../components/Restaurant'

const RestaurantsContainer = styled.div`
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

const RestaurantsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 50px;
`;

const HomePage = ({ restaurants }) => {
    const shuffle = (arr) => {
        let i = arr.length
        let j = 0
        let temp

        while (i--) {
            j = Math.floor(Math.random() * (i+1))
            temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
        return arr
    }

    let idsOfRestaurants = []
    restaurants.forEach(r => idsOfRestaurants.push(r.restaurant_id))
    let randomIds = shuffle(idsOfRestaurants)
    randomIds.splice(5, idsOfRestaurants.length - 6)
    let randomRestaurants = restaurants.filter(r => randomIds.includes(r.restaurant_id))

    return (
        <RestaurantsContainer>
            <Header>Check out these popular restaurants!</Header>
                <RestaurantsWrapper>
                    {randomRestaurants.map(r =>
                        <Restaurant key={r.restaurant_id} id={r.restaurant_id} name={r.restaurant_name} location={r.restaurant_location}
                        src={r.restaurant_image} operatingHours={r.operating_hours} type={r.restaurant_type} priceLevel={r.restaurant_pricelvl} />
                    )}
                </RestaurantsWrapper>
        </RestaurantsContainer>   
    )
}

export default HomePage
