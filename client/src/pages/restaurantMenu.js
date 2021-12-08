import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router'
import Searchbar from '../components/Searchbar';
import Filter from '../components/Filter';
import Category from '../components/Category';
import productService from "../services/products"

const RestaurantMenuContainer = styled.div`
    display: flex;
    flex-flow: column;
    padding-top: 50px;
    align-items: center;
`;

const FilterContainer = styled.div`
    display: flex;
    width: 80%;
    justify-content: space-between;
    align-items: center;
`;

const Header = styled.h1`
    text-align: center;
    width: 90%;
    border-bottom: 2px solid lightgray;
    padding-bottom: 15px;
`;

const MenuWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 50px;
`;


const RestaurantMenuPage = ({AddToCart}) => {
    const [ products, setProducts ] = useState([])
    const [ newSearch, setNewSearch ] = useState("")
    const [ newSort, setNewSort ] = useState("Sort by")
    const params = useParams()
    const sortingOptions = []

    useEffect(() => {
        productService
        .getAll(params.restaurantId)
        .then(initialProducts => {
            setProducts(initialProducts)
          })
        .catch(error => console.log(error))
    }, [params]);

    // Group products by categories
    const menu = products.reduce((acc, product) => {
        const categoryIndex = acc.findIndex(item => item.name === product.category)
        if (categoryIndex > -1) {
            acc[categoryIndex].products.push(product);
        } else {
            acc.push({ name: product.category, products: [product] })
        };
        return acc;
    }, []);

    menu.forEach(category => {
        sortingOptions.push(category.name)
    })

    let productsToShow = menu

    if (newSearch !== "" || newSort !== "Sort by") {
        if (newSort !== "Sort by") {
            productsToShow = menu.filter(c => c.name.includes(newSort))
            if (newSearch !== "") {
                productsToShow = menu.filter(c => c.name.toLowerCase().includes(newSearch.toLowerCase()))
                            // || c.products.name.toLowerCase().includes(newSearch.toLowerCase())
                            // || c.products.description.toLowerCase().includes(newSearch.toLowerCase()))
            }
        }
        else {
            productsToShow = menu.filter(c => c.name.toLowerCase().includes(newSearch.toLowerCase()))
                            // || c.products.name.toLowerCase().includes(newSearch.toLowerCase())
                            // || c.products.description.toLowerCase().includes(newSearch.toLowerCase()))
        }
    }

    return (
        <RestaurantMenuContainer>
            <Header>Restaurant Menu</Header>
            <FilterContainer>
                <Searchbar newSearch={newSearch} setNewSearch={setNewSearch} placeholder={"Search for products"} />
                <Filter setNewSort={setNewSort} sortingOptions={sortingOptions} />
            </FilterContainer>         
            <MenuWrapper>
                {productsToShow.map((c, index) => 
                    <Category key={index} name={c.name} products={c.products} AddToCart={AddToCart} />
                )}
            </MenuWrapper>
        </RestaurantMenuContainer>
    )
}

export default RestaurantMenuPage
