import React from "react";
import styled from "styled-components";
import Error from "../Error"

const BoxContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  margin-top: 90px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.h3`
  margin: 0;
  font-size: 28px;

`;

const Info = styled.p`
  font-size: 22px;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  align-items: center;
  margin-bottom: 20px;
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

const SignUpContainer = styled.div`
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

const SignInForm = (props) => {
  return (
    <BoxContainer>
      <HeaderContainer>
        <Header>Welcome back!</Header>
        {props.errorMessage && <Error message={props.errorMessage} />}
        <Info>Please sign-in to continue</Info>
      </HeaderContainer>
      <FormContainer onSubmit={props.handleLogin}>
        <TextInput type="email" placeholder="Email" required={true} value={props.email} onChange={(e) => {props.setEmail(e.target.value)}} />
        <TextInput type="password" placeholder="Password" required={true} value={props.password} onChange={(e) => props.setPassword(e.target.value)} />
        <SubmitButton type="submit">Sign In</SubmitButton>
      </FormContainer>
      <SignUpContainer>
        <h2>Don't have an account?</h2>
        <button onClick={() => props.setShowSignUp(!props.showSignUp)}>Sign Up</button>
      </SignUpContainer>
    </BoxContainer>
  )
}

export default SignInForm
