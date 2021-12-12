import React, { useState } from "react";
import styled from "styled-components";
import Error from "../Error"

const BoxContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

const Header = styled.h3`
  margin: 0;
  font-size: 28px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  align-items: center;
  margin-bottom: 20px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
`;

const Info = styled.div`
  margin-top: 15px;
  font-size: 20px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const CheckboxLabel = styled.label`
  font-size: 18px;
  cursor: pointer;
  user-select: none;
`;

const Checkbox = styled.input`
`;

const TextInput = styled.input`
  width: 100%;
  height: 42px;
  padding: 10px 10px;
  margin-bottom: 3px;
  border-radius: 10px;
  transition: all 200ms ease-in-out;
  font-size: 18px;

  &::placeholder {
    color: lightgray;
  }

  &:focus {
    border-bottom: 5px solid rgb(0, 157, 224);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  border-radius: 100px;
  background: rgb(0, 157, 224);
  white-space: nowrap;
  padding: 15px 0px;
  margin-top: 5px;
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

const SignInContainer = styled.div`
  display: flex;
  width: 90%;
  justify-content: center;
  border-top: 1px solid lightgray;

  h2 {
    font-size: 16px;
    color: rgb(200, 200, 200);
    cursor: default;
  }

  button {
    font-size: 11px;
    color: rgb(0, 157, 224);
    font-weight: 500;
    margin-left: 5px;
    border: none;
    background-color: white;
    cursor: pointer; 
  }
`;

const SignUpForm = (props) => {
  const [ consumer, setConsumer ] = useState(false)
  const [ consumerRequired, setConsumerRequired ] = useState(true)
  const [ manager, setManager ] = useState(false)
  const [ managerRequired, setManagerRequired ] = useState(true)

  const handleConsumer = () => {
    if(manager) {
      setManager(false)
    }
    setConsumer(!consumer)
    props.setAccountType("consumer")
    setConsumerRequired(true)
    setManagerRequired(false)
  }

  const handleManager = () => {
    if(consumer) {
      setConsumer(false)
    }
    setManager(!manager)
    props.setAccountType("manager")
    setConsumerRequired(false)
    setManagerRequired(true)
  }


  return (
    <BoxContainer>
      <HeaderContainer>
        <Header>Create an account</Header>
        {props.errorMessage && <Error message={props.errorMessage} />}
      </HeaderContainer>
      <FormContainer onSubmit={props.handleRegister} >
        <CheckboxContainer>
          <Info>Account type:</Info>
            <CheckboxLabel> 
              <Checkbox type="checkbox" checked={consumer} onChange={handleConsumer} required={consumerRequired} />
              Consumer
            </CheckboxLabel>
            <CheckboxLabel>
              <Checkbox type="checkbox" checked={manager} onChange={handleManager} required={managerRequired} />
              Restaurant manager
            </CheckboxLabel>
          </CheckboxContainer>
        <TextInput type="email" placeholder="Email" required={true} value={props.email} onChange={(e) => props.setEmail(e.target.value)} />
        <TextInput type="password" placeholder="Password" required={true} value={props.password} onChange={(e) => props.setPassword(e.target.value)} />
        <TextInput type="password" placeholder="Confirm Password" required={true} value={props.passwordConfirm} onChange={(e) => props.setPasswordConfirm(e.target.value)} />
        <SubmitButton type="submit">Sign Up</SubmitButton>
      </FormContainer>
      <SignInContainer>
        <h2>Already have an account?</h2>
        <button onClick={() => props.setShowSignUp(!props.showSignUp)}>Sign In</button>
      </SignInContainer>
    </BoxContainer>
  )
}

export default SignUpForm
