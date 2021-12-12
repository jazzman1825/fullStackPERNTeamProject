import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router'
import Searchbar from '../components/Searchbar';
import Filter from '../components/Filter';
import Product from '../components/Product';
import productService from "../services/products"
import restaurantService from "../services/restaurants"

const RestaurantMenuContainer = styled.div`
    display: flex;
    flex-flow: column;
    padding-top: 50px;
    align-items: center;
    min-height: 100vh;
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

const CategoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 10px;
`;

const CategoryName = styled.h3`
    font-size: 30px;
`;

const ProductWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
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

const RestaurantMenuPage = ({ AddToCart, message }) => {
    const [ products, setProducts ] = useState([])
    const [ newSearch, setNewSearch ] = useState("")
    const [ newSort, setNewSort ] = useState("Sort by")
    const [ currentRestaurant, setCurrentRestaurant ] = useState(null)
    const params = useParams()
    const sortingOptions = []

    useEffect(() => {
        productService
        .getAll(params.restaurantId)
        .then(initialProducts => {
            setProducts(initialProducts)
          })
        .catch(err => console.error(err))
    }, [params]);

    useEffect(() => {
        restaurantService
        .getOne(params.restaurantId)
        .then(initialRestaurant => {
            setCurrentRestaurant(initialRestaurant.restaurant_name)
        })
        .catch(err => console.error(err))
    }, [params])

    // Group products by categories
    const menu = products.reduce((acc, product) => {
        const categoryIndex = acc.findIndex(item => item.name === product.product_category)
        if (categoryIndex > -1) {
            acc[categoryIndex].products.push(product);
        } else {
            acc.push({ name: product.product_category, products: [product] })
        };
        return acc;
    }, []);

    let categoriesToShow = menu

    // Add each category to sorting options
    menu.forEach(category => {
        sortingOptions.push(category.name)
    })

    // Sort categories
    if (newSearch !== "" || newSort !== "Sort by") {
        if (newSort !== "Sort by") {
            categoriesToShow = menu.filter(c => c.name.includes(newSort))
        }
        else {
            categoriesToShow = menu.filter(c => c.name.toLowerCase().includes(newSearch.toLowerCase()))
        }
    }
    
    return (
        <RestaurantMenuContainer>
            <Header>{currentRestaurant} menu</Header>
            <FilterContainer>
                <Searchbar newSearch={newSearch} setNewSearch={setNewSearch} placeholder={"Search for categories"} />
                <Filter setNewSort={setNewSort} sortingOptions={sortingOptions} />
            </FilterContainer>
            {message && <Message>{message}</Message> }         
            <MenuWrapper>
                {categoriesToShow.map((c, index) => 
                    <CategoryContainer key={index}>
                        <CategoryName>{c.name}</CategoryName>
                        <ProductWrapper>
                            {categoriesToShow[index].products.map((p, index) => 
                                <Product key={index} name={p.product_name} description={p.product_description}
                                price={p.product_price} src={p.product_image} AddToCart={AddToCart} product_id={p.product_id} restaurant_id={p.restaurant_id} /> 
                            )}
                        </ProductWrapper>
                    </CategoryContainer>
                )}
            </MenuWrapper> 
        </RestaurantMenuContainer>
    )
}




export default RestaurantMenuPage
