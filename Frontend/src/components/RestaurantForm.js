import React, { useState, useContext } from 'react'
import styled from 'styled-components';
import restaurantService from '../services/restaurants'
import Error from '../components/Error'
import { UserContext } from '../contexts/UserContext';

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    width: 80%;
    align-items: center;
    margin-bottom: 20px;
`;

const Info = styled.div`
    font-size: 20px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    margin-top: 5px;
    margin-bottom: 20px;
`;

const TextInput = styled.input`
    width: 600px;
    height: 42px;
    padding: 10px 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    border: 2px inset black;
    transition: all 200ms ease-in-out;
    font-size: 18px;

    &::placeholder {
        color: lightgray;
    }

    &:focus {
        border-bottom: 5px solid rgb(0, 157, 224);
    }
`;

const TimeContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 625px;
    margin-top: 10px;
`;

const TimeLabel = styled.label`
    display: flex;
    justify-content: center;
    font-size: 20px;
`;

const TimeInputWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 30px;
    font-weight: 700;
`;

const TimeInput = styled.input`
    width: 30%;
    padding: 10px 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    border: 2px inset black;
    font-size: 20px;
`;

const DropdownContainer = styled.div`
    display: flex;
    width: 625px;
    justify-content: space-between;
    margin-top: 10px;
`;

const DropdownLabel = styled.label`
    font-size: 20px;
    margin-left: 5px;
    padding-bottom: 5px;
`;

const DropdownWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Dropdown = styled.select`
    width: 300px;
    height: 60px;
    padding: 10px 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    border: 2px inset black;
    transition: all 200ms ease-in-out;
    font-size: 18px;
    cursor: pointer;
`;

const DropdownItem = styled.option`

`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 625px;
`;

const ClearButton = styled.button`
    width: 300px;
    border-radius: 100px;
    background: rgb(224, 0, 0);
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
        filter: brightness(1.5);
    }

`;

const SubmitButton = styled.button`
    width: 300px;
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

const CancelButton = styled.button`
    width: 625px;
    border-radius: 100px;
    background: rgb(100, 200, 200);
    white-space: nowrap;
    padding: 15px 0px;
    margin-top: 15px;
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

const RestaurantForm = ({ restaurants, setRestaurants, setShowRestaurantForm, setShowMenuForm, handleCancel }) => {
    const [ name, setName ] = useState("")
    const [ location, setLocation ] = useState("")
    const [ imageURL, setImageURL ] = useState("")
    const [ operatingHours, setOperatingHours ] = useState("")
    const [ operatingHours2, setOperatingHours2 ] = useState("")
    const [ type, setType ] = useState("Buffet")
    const [ priceLevel, setPriceLevel ] = useState("$")
    const [ errorMessage, setErrorMessage ] = useState(null)
    const { user } = useContext(UserContext)

    const typeOptions = ["Buffet", "Fast food", "Fast casual", "Casual dining", "Fine dining"]
    const pricelvlOptions = ["$", "$$", "$$$", "$$$$"]

    const clearForm = () => {
        setName("")
        setLocation("")
        setImageURL("")
        setOperatingHours("")
        setOperatingHours2("")
        setType("")
        setPriceLevel("")
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (imageURL.length > 250) {
            setErrorMessage("Image URL too long!")
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
            return
        }

        const newRestaurant = {
            restaurant_name: name,
            restaurant_location: location,
            restaurant_image: imageURL,
            operatingHours: `${operatingHours} – ${operatingHours2}`,
            restaurant_type: type,
            restaurant_pricelvl: priceLevel
        }

        restaurantService
        .update(newRestaurant)
        .then(returnedRestaurant => {
            setRestaurants(restaurants.map(r => r.restaurant_id !== user.userID ? r : returnedRestaurant))
            clearForm()
            setShowRestaurantForm(false)
            setShowMenuForm(true)
        })
        .catch(err => {
            console.log(err)
            setErrorMessage("You are unauthorized!")
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000) 
        })
    }

    return (
        <FormContainer onSubmit={handleSubmit} >
            <Info>Fill out the form and reach new customers!</Info>
            {errorMessage && <Error message={errorMessage} />}
            <TextInput type="text" placeholder="Restaurant name" required={true} value={name} onChange={(e) => setName(e.target.value)} />
            <TextInput type="text" placeholder="Location" required={true} value={location} onChange={(e) => setLocation(e.target.value)} />
            <TextInput type="text" placeholder="Restaurant image (URL)" required={true} value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
            <TimeContainer>
                <TimeLabel> Operating hours: </TimeLabel>
                <TimeInputWrapper>
                    <TimeInput type="time" required={true} value={operatingHours} onChange={(e) => setOperatingHours(e.target.value)} />
                    <TimeInput type="time" required={true} value={operatingHours2} onChange={(e) => setOperatingHours2(e.target.value)} />
                </TimeInputWrapper>
            </TimeContainer>
            <DropdownContainer>
                <DropdownWrapper>
                    <DropdownLabel>Restaurant type:</DropdownLabel>
                    <Dropdown value={type} onChange={(e) => setType(e.target.value)} >
                        {typeOptions.map((o, idx) =>
                            <DropdownItem key={idx} value={o} >{o}</DropdownItem>    
                        )}
                    </Dropdown>
                </DropdownWrapper>
                <DropdownWrapper>
                    <DropdownLabel>Price level:</DropdownLabel>
                    <Dropdown value={priceLevel} onChange={(e) => setPriceLevel(e.target.value)} >
                        {pricelvlOptions.map((o, idx) =>
                            <DropdownItem key={idx} value={o} >{o}</DropdownItem> 
                        )}
                    </Dropdown>
                </DropdownWrapper>
            </DropdownContainer>
            <ButtonContainer>
                <ClearButton type="reset" onClick={clearForm} >Clear form</ClearButton>
                <SubmitButton type="submit" >Create a restaurant</SubmitButton>
            </ButtonContainer>
            <CancelButton onClick={handleCancel}>Cancel editing</CancelButton>
        </FormContainer>
    )
}

export default RestaurantForm
