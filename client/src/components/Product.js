import React from 'react'
import styled from 'styled-components'
import { MdAddShoppingCart } from 'react-icons/md'

const ProductItem = styled.li`
    display: flex;
    margin-bottom: 50px;
    margin-left: 16px;
    margin-right: 16px;
    box-shadow: 0 6px 20px rgba(56, 125, 255, 0.17);
    border-radius: 10px;
`;

const ProductContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
`;

const ProductName = styled.div`
    font-size: 18px;
    font-weight: 700;
    padding: 5px;
`;

const ProductDescription = styled.div`
    width: 280px;
    text-align: center;
    color: darkgray;
    padding: 10px;
    font-size: 14px;
`;

const ProductBuyInfo = styled.div`
    display: flex;
    justify-content: space-between;
    width: 280px;
    margin-top: 25px;
    border-top: 2px dashed lightgray;
    font-weight: 700;
    padding: 5px;
    color: darkgray;
`;

const ProductPrice = styled.div`
    width: 50%;
    margin-left: 5px;
`;

const ShoppingCartLogo = styled(MdAddShoppingCart)`
    cursor: pointer;
`;

const ProductFigure = styled.figure`
    overflow: hidden;
`;

const ProductImage = styled.img`
    display: block;
    width: 200px;
    height: 120px;
    transition: all 0.2s linear;

    &:hover {
        transform: scale(1.1);
    }
`;

const Product = (props) => {
    return (
        <ProductItem>
            <ProductContent>
                <ProductName>{props.name}</ProductName>
                <ProductDescription>{props.description}</ProductDescription>
                <ProductBuyInfo>
                    <ProductPrice>€{props.price}</ProductPrice>
                    <ShoppingCartLogo onClick={()=>props.AddToCart(props)} />
                </ProductBuyInfo>
            </ProductContent>
            <ProductFigure>
                <ProductImage src={props.src} alt={props.name}></ProductImage>
            </ProductFigure>
        </ProductItem>
    )
}

export default Product
