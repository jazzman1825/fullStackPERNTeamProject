import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { UserContext } from '../contexts/UserContext';
import productService from '../services/products'
import Error from '../components/Error'

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

const ProductContainer = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 625px;
    text-align: center;
`;

const Product = styled.li`
    font-size: 18px;
    list-style: none;
`;

const ProductButton = styled.button`
    width: 100px;
    border-radius: 100px;
    background: rgb(180, 50, 255);
    white-space: nowrap;
    padding: 5px 0px;
    margin-bottom: 20px;
    color: white;
    font-size: 15px;
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

const MenuForm = ({ handleCancel }) => {
    const [ newCategory, setNewCategory ] = useState("") 
    const [ categories, setCategories ] = useState([])
    const [ categoryName, setCategoryName ] = useState("")
    const [ productName, setProductName ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ price, setPrice] = useState("")
    const [ imageURL, setImageURL ] = useState("")
    const [ errorMessage, setErrorMessage ] = useState(null)
    const [ products, setProducts ] = useState([])
    const { user } = useContext(UserContext)

    useEffect(() => {
        productService
        .getAll(user.userID)
        .then(initialProducts => {
            setProducts(initialProducts)
          })
        .catch(error => console.log(error))
    }, [user]);

    const clearProductForm = () => {
        setProductName("")
        setDescription("")
        setPrice("")
        setImageURL("")
        setCategoryName("")
        setCategories([])
    }

    const addCategory = (e) => {
        e.preventDefault()
        if (!categories.find(c => c === newCategory)) {
            setCategories(categories.concat(newCategory))
            setCategoryName(newCategory)
            setNewCategory("")
        }
    }

    const handleProductAdd = (e) => {
        e.preventDefault()

        if (categoryName === "") {
            setErrorMessage("Product is missing a category!")
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000) 
            return
        }

        if (imageURL.length > 250) {
            setErrorMessage("Image URL too long!")
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
            return
        }
        
        const newProduct = {
            restaurant_id: user.userID,
            product_category: categoryName,
            product_name: productName,
            product_description: description,
            product_price: price,
            product_image: imageURL
        }

        productService
        .create(newProduct)
        .then(returnedProduct => {
            setProducts(products.concat(returnedProduct))
            setProductName("")
            setDescription("")
            setPrice("")
            setImageURL("")
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleProductEdit = (product) => {
        console.log(product)
        if (categoryName === "" || productName === "" || description === ""
        || price === "" || imageURL === "") {
            setErrorMessage("Something is missing!")
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000) 
            return
        }

        if (imageURL.length > 250) {
            setErrorMessage("Image URL too long!")
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
            return
        }

        const newProduct = {
            product_id: product.product_id,
            product_category: categoryName,
            product_name: productName,
            product_description: description,
            product_price: price,
            product_image: imageURL
        }


        productService
        .update(newProduct)
        .then(returnedProduct => {
            setProducts(products.map(p => p.product_id !== product.product_id ? p : returnedProduct))
            setProductName("")
            setDescription("")
            setPrice("")
            setImageURL("")
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
        <MenuFormContainer>
            <Info>Fill out the form to add products!</Info>
            <FormContainer onSubmit={addCategory}>
                <Info>Add new category:</Info>
                <TextInput type="text" placeholder="Category name" required={true} value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                <SubmitButton type="submit" >Add category</SubmitButton>
            </FormContainer>
            <FormContainer onSubmit={handleProductAdd} >
                <Info>Add products to your menu:</Info>
                {errorMessage && <Error message={errorMessage} />}
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
                    <SubmitButton type="submit">Add product</SubmitButton>
                </ButtonContainer>
                <CancelButton onClick={handleCancel}>Cancel editing</CancelButton>
            </FormContainer>
            <ProductContainer>
                <Info>Your products:</Info>
                {products.map(p =>
                <div key={p.product_id}>
                    <Product  >{p.product_name}</Product>                    
                    <ProductButton onClick={() => handleProductEdit(p)}>Edit</ProductButton>
                </div>
                )}
            </ProductContainer>
        </MenuFormContainer>
    )
}

export default MenuForm
