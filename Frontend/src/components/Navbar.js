import React, { useContext } from 'react'
import styled from 'styled-components'
import { FaPizzaSlice } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import restaurantService from "../services/restaurants"
import productService from "../services/products"
import orderService from "../services/orders"

const Nav = styled.nav`
    display: flex;
    position: sticky;
    background: rgb(2,0,36);
    background: radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(0,212,255,1) 0%, rgba(0,0,0,1) 100%);
    height: 80px;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    top: 0;
    z-index: 1;
`;

const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 80px;
    width: 100%;
    padding: 0 24px;
    max-width: 1200px;
`;

const NavLogo = styled(Link)`
    display: flex;
    color: white;
    justify-self: flex-start;
    cursor: pointer;
    font-size: 24px;
    align-items: center;
    margin-left: 25px;
    font-weight: bold;
    text-decoration: none;
`;

const Logo = styled(FaPizzaSlice)`
    margin-right: 10px;
`;

const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
`;

const NavItem = styled.li`
    display: flex;
    height: 80px;    
`;

const NavLinks = styled(Link)`
    display: flex;
    color: white;
    align-items: center;
    text-decoration: none;
    padding: 0 16px;
    height: 100%;
    cursor: pointer;
    font-family: Verdana, Geneva, sans-serif;
    letter-spacing: 1px;
    font-variant: small-caps;
    font-style: italic;

    &:hover {
        transition: all 0.2s ease-in-out;
        color: black;
        font-size: 150%;
    }
`;

const SignButtonContainer = styled.nav`
    display: flex;
    align-items: center;
`;

const SignButton = styled.button`
    border-radius: 50px;
    background: rgb(0, 157, 224);
    white-space: nowrap;
    padding: 10px 22px;
    color: white;
    font-size: 15px;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        filter: brightness(1.2);
    }
`;

const Navbar = ({ openModal, navLinks, setNavLinks, setIsConsumer, setCartProducts }) => {
    const { user, setUser } = useContext(UserContext)
    let home = navLinks[0].path
    let links = navLinks.slice(1)
    let navigate = useNavigate()

    const handleLogOut = () => {
        window.localStorage.removeItem('loggedUser')
        setUser(null)
        setIsConsumer(false)
        setCartProducts([])
        setNavLinks([
          {
            "path": "/"
          },
          {
            "path": "/restaurants",
            "name": "Restaurants"
          },
          {
            "path": "/about",
            "name": "About Us"
          }
        ])
        restaurantService.setToken("")
        productService.setToken("")
        orderService.setToken("")
        navigate("/")
      }

    
    return (
        <Nav>
            <NavbarContainer>
                <NavLogo to={home} >
                    <Logo /> FoodApp
                </NavLogo>
                <NavMenu>
                    <NavItem>
                        {links.map((l, idx) => 
                            <NavLinks key={idx} to={l.path}>{l.name}</NavLinks>
                        )}
                    </NavItem>
                </NavMenu>
                <SignButtonContainer>
                    {user === null
                        ? <SignButton onClick={openModal} >Sign In/Up</SignButton>
                        : <SignButton onClick={handleLogOut} >Log Out</SignButton>
                    }
                
                </SignButtonContainer>
            </NavbarContainer>
        </Nav>
    )
}

export default Navbar
