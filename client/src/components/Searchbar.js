import React from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa';

const SearchBar = styled.div`
    display: flex;
    align-items: center;
    width: 500px;
    margin-left: auto;
    margin-right: auto;
`;

const SearchLogo = styled(FaSearch)`
    width: 25px;
    height: 25px;
    margin-right: 5px;
`;

const Input = styled.input`
    width: 400px;
    height: 40px;
    padding: 10px 10px;
    border: 2px inset black;
    border-radius: 10px;
    transition: all 200ms ease-in-out;
    font-size: 18px;
    box-shadow: 0 6px 20px rgba(56, 125, 255, 0.17);

    &::placeholder {
        color: lightgray;
    }

    &:focus {
        border-bottom: 5px solid rgb(0, 157, 224);
    }

`;

const Searchbar = ({ newSearch, setNewSearch, placeholder }) => {
    return (
        <SearchBar>
            <SearchLogo /> 
            <Input value={newSearch} placeholder={placeholder} onChange={(e) => setNewSearch(e.target.value)} />
        </SearchBar>
    )
}

export default Searchbar
