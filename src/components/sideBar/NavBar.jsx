import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useForm } from '../../hooks/useForm';
import { listaSearch } from '../../actions/movieAction';
import {
    Box,
    Stack,
    Flex,
    useDisclosure,
    FormControl,
    InputGroup,
    InputLeftElement,
    Input,
    Menu,
    Button,
    MenuButton,
    MenuList,
    MenuItem,
    Avatar
} from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/authAction';
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaSearch } from 'react-icons/fa';

const InputSearch = styled(InputGroup)`
    background: #FFFFFE;
    /* opacity: 0.5; */
    color: #000000;
    border-radius: 20px;
`

const NavBar = () => {

    const dispatch = useDispatch()

    const { email, image } = useSelector(state => state.auth)

    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleToggle = () => (isOpen ? onClose() : onOpen());

    const handleLogout = () => {
        dispatch(startLogout())
    }


    const  {search}  = useSelector(state => state.movie);
    console.log(search);

    const [formValues, handleInputChange] = useForm({
        searchText: ''
    }
    
    );
    const { searchText } = formValues;


    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(listaSearch(searchText));
        // history.push(`?q=${ searchText }`);
    }

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            paddingTop={5}
            paddingBottom={5}
            paddingLeft={10}
            paddingRight={10}
            background="#0F0E17"
            color="white"
        >
            <Flex align="center">
                <img src="https://i.ibb.co/L9gqLtb/logo-block-Master.png" alt="logo-block-Master" border="0" width='100px' height='60px' />
            </Flex>

            <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
                <GiHamburgerMenu />
            </Box>

            <Stack
                direction={{ base: "column", md: "row" }}
                display={{ base: isOpen ? "block" : "none", md: "flex" }}
                width={{ base: "full", md: "auto" }}
                alignItems="center"
                flexGrow={1}
                mt={{ base: 4, md: 0 }}
                justifyContent='center'
            >
                <Link to='/home'>All</Link>
            </Stack>

            <Stack
                direction={{ base: "column", md: "row" }}
                display={{ base: isOpen ? "block" : "none", md: "flex" }}
                width={{ base: "full", md: "auto" }}
                alignItems="center"
                flexGrow={1}
                mt={{ base: 4, md: 0 }}
                justifyContent='center'
            >
                <Link to='/search'>Buscar</Link>
            </Stack>

            <Stack
                direction={{ base: "column", md: "row" }}
                display={{ base: isOpen ? "block" : "none", md: "flex" }}
                width={{ base: "full", md: "auto" }}
                alignItems="center"
                flexGrow={1}
                mt={{ base: 4, md: 0 }}
                justifyContent='center'
            >
                <Link to='/home'>Least valued</Link>
            </Stack>

            <Stack
                direction={{ base: "column", md: "row" }}
                display={{ base: isOpen ? "block" : "none", md: "flex" }}
                width={{ base: "full", md: "auto" }}
                alignItems="center"
                flexGrow={1}
                mt={{ base: 4, md: 0 }}
            >
                <FormControl>
                    <InputSearch>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<FaSearch color="#0F0E17" />}
                        />
                        <form onSubmit={handleSearch}>
                        <Input type='search' placeholder='Search...' name="searchText" borderRadius={20} autoComplete="on" value={searchText} onChange={handleInputChange}/>
                        <Button
                            type="submit"
                        >
                            Search...
                        </Button>
                        </form>
                        
                    </InputSearch>
                </FormControl>
            </Stack>

            <Stack
                direction={{ base: "column", md: "row" }}
                display={{ base: isOpen ? "block" : "none", md: "flex" }}
                width={{ base: "full", md: "auto" }}
                alignItems="center"
                flexGrow={1}
                mt={{ base: 4, md: 0 }}
                justifyContent='center'
            >
                <Menu>
                    <MenuButton children={<Avatar name="Dan Abrahmov" src={image} />} />
                    <MenuList background='#0F0E17' color='#FED941'>
                        <MenuItem background='transparent !important' _hover={{ background: '#FED941 !important', color: '#2832c2' }}>Profile</MenuItem>
                        {
                            email === 'gejocadev@gmail.com'
                            &&
                            <Link to = '/addmovies'>
                                <MenuItem _hover={{ background: '#FED941', color: '#2832c2' }}>Add movie</MenuItem>
                            </Link>
                        }
                        <hr background='#FED941' />
                        <MenuItem onClick={handleLogout} _hover={{ background: '#FED941', color: '#2832c2' }}>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </Stack>

            {/* <Box display={{ base: isOpen ? "block" : "none", md: "block" }} mt={{ base: 4, md: 0 }}>
                <Button onClick={handleLogout} background='#2832c2' color='#FED941' _hover={{ background: '#FED941', color: '#2832c2' }}>Logout</Button>
            </Box> */}
        </Flex>
    )
}


export default NavBar
