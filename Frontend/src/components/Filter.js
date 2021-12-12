import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { FaCaretDown } from 'react-icons/fa';

const DropdownContainer = styled.div`
    display: flex;
    width: 500px;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
`;

const DropdownHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 400px;
    height: 40px;
    padding: 10px 10px;
    border: 2px inset black;
    border-radius: 10px;
    transition: all 200ms ease-in-out;
    font-size: 18px;
    box-shadow: 0 6px 20px rgba(56, 125, 255, 0.17);
    font-weight: 700;
    color: black;
    cursor: pointer;
`;

const DropdownLogo = styled(FaCaretDown)`
    display: flex;
    width: 25px;
    height: 25px;
`;

const DropdownList = styled.ul`
    position: absolute;
    width: 390px;
    top: 280px;
    padding: 15px;
    background: white;
    box-shadow: 3px 3px 10px 6px rgba(0, 0, 0, 0.09);
    border-radius: 10px;
    z-index: 1;
`;

const ListItem = styled.li`
    list-style: none;
    padding: 10px;
    cursor: pointer;
    transition: all 200ms ease-in-out;
    border-bottom: 1px solid lightgray;

    &:hover {
        background: lightgray;
    }
`;

const Unsort = styled.li`
    list-style: none;
    padding: 10px;
    cursor: pointer;
    transition: all 200ms ease-in-out;
    border-bottom: 1px solid lightgray;
    color: red;

    &:hover {
        background: lightgray;
    }
`;

const Filter = ({ setNewSort, sortingOptions }) => {
    const [ open, setOpen ] = useState(false)
    const [ sort, setSort ] = useState("Sort by")
    const ref = useRef()

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if(open && ref.current && !ref.current.contains(e.target)) {
                setOpen(false)
            }
        }

        document.addEventListener("click", checkIfClickedOutside)
        return () => {
            document.removeEventListener("click", checkIfClickedOutside)
        }
    }, [open])

    const handleSorting = (filter) => {
        setOpen(false)
        setSort(filter)
        setNewSort(filter)
    }

    return (
        <DropdownContainer ref={ref}>
            <DropdownHeader onClick={() => setOpen(!open)} >
                {sort}
                <DropdownLogo/>
            </DropdownHeader>
            {open &&
                <DropdownList>
                    {sortingOptions.map((o, idx) => 
                        <ListItem key={idx} onClick={() => handleSorting(o)}>{o}</ListItem>
                    )}
                    <Unsort onClick={() => handleSorting("Sort by")} >Unsort</Unsort>
                </DropdownList>
            }
        </DropdownContainer>
    )
}

export default Filter
