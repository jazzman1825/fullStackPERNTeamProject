import React, { useState } from 'react'
import styled from 'styled-components'
// import restaurantService from '../services/restaurants'

const MenuFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    margin-bottom: 20px;
`;

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
    width: 625px;
    padding: 10px 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    border: 2px inset black;
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

const Error = styled.div`
    padding: 10px 60px;
    border: 2px inset black;
    border-radius: 10px;
    background-color: rgba(255, 0, 0, 0.3);
    box-shadow: 0 6px 20px rgba(255, 0, 0, 0.3);
    font-size: 25px;
    font-weight: 700;
`;

const Products = styled.li`

`;

const MenuForm = ({ setShowMenuForm }) => {
    const [ newCategory, setNewCategory ] = useState("") 
    const [ categories, setCategories ] = useState([])
    const [ categoryName, setCategoryName ] = useState("")
    const [ productName, setProductName ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ price, setPrice] = useState("")
    const [ imageURL, setImageURL ] = useState("")
    const [ showError, setShowError ] = useState(false)
    const [ showMenu, setShowMenu ] = useState(false)
    const [ menuProducts, setMenuProducts ] = useState([])

    const clearProductForm = () => {
        setProductName("")
        setDescription("")
        setPrice("")
        setImageURL("")
        setCategoryName("")
        setCategories([])
    }

    const clearMenu = () => {
        setMenuProducts([])
        setShowMenu(false)
    }

    const addCategory = (e) => {
        e.preventDefault()
        if (!categories.find(c => c === newCategory)) {
            setCategories(categories.concat(newCategory))
            setCategoryName(newCategory)
            setNewCategory("")
        }
    }

    const addProduct = (e) => {
        e.preventDefault()

        if(categoryName === "") {
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 5000)
            return
        }
        
        const newProduct = {
            category: categoryName,
            name: productName,
            description: description,
            price: price,
            img: imageURL,
            alt: productName
        }
        
        setProductName("")
        setDescription("")
        setPrice("")
        setImageURL("")
        setMenuProducts(menuProducts.concat(newProduct))
        setShowMenu(true)
    }

    const addMenu = (e) => {
        e.preventDefault()
        setShowMenuForm(false)
        console.log(menuProducts)

        // const menu = menuProducts.reduce((menu, product) => {
        //     const category = product.category
        //     if (menu[category] == null) menu[category] = []
        //     menu[category].push(product)
        //     return menu
        // }, [])

        // console.log(menu)
        

        // restaurantService
        // .create(newRestaurant)
        // .then(returnedRestaurant => {
        //     setRestaurants(restaurants.concat(returnedRestaurant))
        //     clearForm()
        //     setShowForm(false)
        // })
        // .catch(err => console.log(err))
    }

    return (
        <MenuFormContainer>
            <Info>Fill out the form to add your menu!</Info>
            <FormContainer onSubmit={addCategory}>
                <Info>Add new category:</Info>
                <TextInput type="text" placeholder="Category name" required={true} value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                <SubmitButton type="submit" >Add category</SubmitButton>
            </FormContainer>
            <FormContainer onSubmit={addProduct} >
                <Info>Add products to your menu:</Info>
                {showError && <Error>Product is missing a category!</Error>}
                <DropdownContainer>
                    <DropdownWrapper>
                        <DropdownLabel>Product category:</DropdownLabel>
                        <Dropdown value={categoryName} onChange={(e) => setCategoryName(e.target.value)} >
                            {categories.map((c, idx) =>
                                <DropdownItem key={idx} value={c} >{c}</DropdownItem>    
                            )}
                        </Dropdown>
                    </DropdownWrapper>
                </DropdownContainer>
                <TextInput type="text" placeholder="Product name" required={true} value={productName} onChange={(e) => setProductName(e.target.value)} />
                <TextInput type="text" placeholder="Description" required={true} value={description} onChange={(e) => setDescription(e.target.value)} />
                <TextInput type="number" placeholder="Price" required={true} value={price} onChange={(e) => setPrice(e.target.value)} />
                <TextInput type="text" placeholder="Restaurant image (URL)" required={true} value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
                <ButtonContainer>
                    <ClearButton type="reset" onClick={clearProductForm} >Clear form</ClearButton>
                    <SubmitButton type="submit" >Add product</SubmitButton>
                </ButtonContainer>
            </FormContainer>
            {showMenu && <FormContainer onSubmit={addMenu}>
                <Info>Your menu:</Info>
                {menuProducts.map((p, idx) => 
                    <Products key={idx}>{p.category} - {p.name}</Products>
                )}
                <ButtonContainer>
                    <ClearButton type="reset" onClick={clearMenu} >Clear menu</ClearButton>
                    <SubmitButton type="submit" >Add this menu</SubmitButton>
                </ButtonContainer>
            </FormContainer>
            }
        </MenuFormContainer>
    )
}

export default MenuForm
