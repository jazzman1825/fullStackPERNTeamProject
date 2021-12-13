import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdClose } from 'react-icons/md'
import { useSpring, animated } from 'react-spring'
import SignInForm from "./SignInForm";
import SignUpForm  from "./SignUpForm";
import { UserContext } from '../../contexts/UserContext'
import loginService from "../../services/login"
import registerService from "../../services/register"
import restaurantService from "../../services/restaurants"
import productService from "../../services/products"
import orderService from "../../services/orders"

const Background = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
`;

const FormContainer = styled.div`
    width: 480px;
    height: 650px;
    background: white;
    color: black;
    position: relative;
    z-index: 10;
    border-radius: 10px;
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1.8;    
`;

const CloseModalButton = styled(MdClose)`
    cursor: pointer;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
`;

const Modal = ({ showModal, setShowModal, setNavLinks, setIsConsumer }) => {
    const modalRef = useRef()
    const [ showSignUp, setShowSignUp ] = useState(false)
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ passwordConfirm, setPasswordConfirm ] = useState('')
    const [ accountType, setAccountType ] = useState('')
    const [ errorMessage, setErrorMessage ] = useState(null)
    const { setUser } = useContext(UserContext)
    let navigate = useNavigate()

    const animation = useSpring({
        config: {
            duration: 350
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translateY(0%)` : `translateY(50%)`
    })

    const closeModal = (e) => {
        if(modalRef.current === e.target) {
            handleModalClose()
        }
    }

    const handleModalClose = () => {
        setShowModal(false)
        setShowSignUp(false)
        setEmail('')
        setPassword('')
        setPasswordConfirm('')
        setAccountType('')
    }

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                email, password
            })

            window.localStorage.setItem(
                'loggedUser', JSON.stringify(user)
            )
            if(user.userType === "consumer") {
                setIsConsumer(true)
            }
            restaurantService.setToken(user.token)
            productService.setToken(user.token)
            orderService.setToken(user.token)
            setUser(user)
            handleModalClose()
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
                  "name": "About Us",
                },
                {
                  "path": "/account",
                  "name": "Account"
                },
                {
                  "path": "/cart",
                  "name": "Cart"
                },
                {
                  "path": "/manager",
                  "name": "Managers"
                }
            ])
            
        } catch (err) {
            setErrorMessage("Invalid username or password!")
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000) 
        }
    }

    const handleRegister = async (event) => {
        event.preventDefault()

        if(password !== passwordConfirm) {
            setErrorMessage("Passwords do not match!")
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
            return
        }

        try {
            await registerService.register({ email, password, accountType })
            window.alert(`Account created for the ${accountType}!`)
            handleModalClose()
            navigate("/")
            
        } catch (err) {
            setErrorMessage("Email already in use!")
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)  
        }
    }

    return (
        <>
            {showModal && (
                <Background ref={modalRef} onClick={closeModal}>
                    <animated.div style={animation}>
                    <FormContainer>
                        <ModalContent>
                           {showSignUp 
                           ? <SignUpForm showSignUp={showSignUp} setShowSignUp={setShowSignUp} handleRegister={handleRegister}
                                email={email} setEmail={setEmail} password={password} setPassword={setPassword}
                                passwordConfirm={passwordConfirm} setPasswordConfirm={setPasswordConfirm} 
                                setAccountType={setAccountType} errorMessage={errorMessage}
                             /> 
                           : <SignInForm showSignUp={showSignUp} setShowSignUp={setShowSignUp} handleLogin={handleLogin}
                                email={email} setEmail={setEmail} password={password} setPassword={setPassword} errorMessage={errorMessage}
                             /> 
                            }
                       </ModalContent>
                       <CloseModalButton onClick={handleModalClose} />
                    </FormContainer>
                    </animated.div>
                </Background> 
            )}
        </>
    )
}

export default Modal
