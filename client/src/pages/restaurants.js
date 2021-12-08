import React, { useState } from 'react'
import styled from 'styled-components'
import Restaurant from '../components/Restaurant';
import Searchbar from '../components/Searchbar';
import Filter from '../components/Filter';

const RestaurantsContainer = styled.div`
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

const FilterContainer = styled.div`
    display: flex;
    width: 80%;
    justify-content: space-between;
    align-items: center;
`;

const RestaurantsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 50px;
`;

const RestaurantsPage = ({ restaurants }) => {
    const [ newSearch, setNewSearch ] = useState("")
    const [ newSort, setNewSort ] = useState("Sort by")
    const sortingOptions = 
    ["Price: High-Low", "Price: Low-High", "Type: Buffet", "Type: Fast food",
        "Type: Fast casual", "Type: Casual dining", "Type: Fine dining"]

    let restaurantsToShow = restaurants

    const filterBySearch = (currentRestaurants) => {
        restaurantsToShow = currentRestaurants.filter(r => r.name.toLowerCase().includes(newSearch.toLowerCase())
                                            || r.location.toLowerCase().includes(newSearch.toLowerCase()))
    }
    
    if(newSearch !== "" || newSort !== "Sort by") {
        if(newSort === "Price: High-Low") {
            let sortedRestaurants = [].concat(restaurants)
            restaurantsToShow = sortedRestaurants.sort((a, b) => (a.price_level < b.price_level) ? 1 : -1)
            if(newSearch !== "") {
                filterBySearch(restaurantsToShow)
            }
        }
        else if(newSort === "Price: Low-High") {
            let sortedRestaurants = [].concat(restaurants)
            restaurantsToShow = sortedRestaurants.sort((a, b) => (a.price_level > b.price_level) ? 1 : -1)
            if(newSearch !== "") {
                filterBySearch(restaurantsToShow)
            }
        }
        else if(newSort === "Type: Buffet" || newSort === "Type: Fast food" ||newSort === "Type: Fast casual"
        || newSort === "Type: Casual dining" || newSort === "Type: Fine dining") {
            restaurantsToShow = restaurants.filter(r => r.type.includes(newSort.slice(6)))
            if(newSearch !== "") {
                filterBySearch(restaurantsToShow)
            }
        }
        else {
            filterBySearch(restaurantsToShow)
        }
    }

    return (
        <RestaurantsContainer>
            <Header>Restaurants</Header>
            <FilterContainer>
                <Searchbar newSearch={newSearch} setNewSearch={setNewSearch} placeholder={"Search restaurants by name or location"} />
                <Filter setNewSort={setNewSort} sortingOptions={sortingOptions} />
            </FilterContainer>
            <RestaurantsWrapper>
                {restaurantsToShow.map(r =>
                    <Restaurant key={r.id} id={r.id} name={r.name} location={r.location}
                    src={r.image_url} operatingHours={r.operating_hours} type={r.type} priceLevel={r.price_level} />
                )}
            </RestaurantsWrapper>
        </RestaurantsContainer>
    )
}

export default RestaurantsPage
