import {
    Alert,
    AlertIcon,
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import { FcGoogle } from "react-icons/fc"
import { SiFacebook } from 'react-icons/si'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useForm } from '../../hooks/useForm'
import { removeError, setError } from '../../actions/uiAction'
import validator from 'validator'
import { startGoogleLogin, startFacebookLogin, startLogin } from '../../actions/authAction'

const DivFondo = styled.div`
    background: url('https://i.ibb.co/jzwCKMb/BG.png') center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
`

const DivLogin = styled(Container)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`

const DivCentral = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 90%;
    text-align: -webkit-center;
    padding: 80px 30px;
    background: #0F0E17;
    border: solid #FED941;
    border-radius: 5px;
    @media (max-width: 460px) {
        width: 90%;
        padding: 50px 30px;
    }
`

const InputLogin = styled(InputGroup)`
    background: #FFFFFE;
    /* opacity: 0.5; */
    color: #000000;
    border-radius: 10px;
`

const DivSocial = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
`

const Login = () => {

    const dispatch = useDispatch()

    const [showPassword, setShowPassword] = useState(false)
    const handleShowClick = () => setShowPassword(!showPassword)

    const [formValues, handleInputChange] = useForm({
        user: '',
        password: ''
    })

    const { user, password } = formValues

    const { msjError } = useSelector(state => state.ui)

    // const { loading } = useSelector(state => state.ui)

    const formValid = () => {
        if (!validator.isEmail(user)) {
            dispatch(setError('Email requerido'))
            return false
        } else if (!validator.isStrongPassword(password)) {
            dispatch(setError('La contraseña es incorrecta'))
            return false
        }

        dispatch(removeError())
        return true
    }

    const handleSubmit = e => {
        e.preventDefault()

        if (formValid()) {
            dispatch(startLogin(user, password))
        }
    }

    const handleGoogleLogin = () => {
        dispatch(startGoogleLogin())
    }

    const handleFacebookLogin = () => {
        dispatch(startFacebookLogin())
    }

    return (
        <DivFondo>
            <DivLogin>
                <DivCentral>
                    <img src="https://i.ibb.co/L9gqLtb/logo-block-Master.png" alt="logo-block-Master" border="0" />
                    <form onSubmit={handleSubmit}>
                        {
                            msjError &&
                            (
                                <Alert status='error' mt={5}>
                                    <AlertIcon />
                                    {msjError}
                                </Alert>
                            )
                        }
                        <FormControl mt={10}>
                            <InputLogin>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={<FaUserAlt color="#0F0E17" />}
                                />
                                <Input type='email' placeholder='Email address' name='user' value={user} onChange={handleInputChange} />
                            </InputLogin>
                        </FormControl>
                        <FormControl mt={10}>
                            <InputLogin>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={<FaLock color="#0F0E17" />}
                                />
                                <Input type={showPassword ? 'text' : 'password'} placeholder='Password' name='password' value={password} onChange={handleInputChange} />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleShowClick}>
                                        {showPassword ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputLogin>
                        </FormControl>
                        <Button type='submit' width='100%' mt={5} background='#2832c2' color='#FED941' _hover={{ background: '#FED941', color: '#2832c2' }}>Login</Button>
                    </form>
                    <Box mt={3} mb={3} color='#FFFFFE'>
                        New to us?{" "}
                        <Link to='/auth/register' style={{ color: '#FED941' }} onClick={() => {
                            dispatch(removeError())
                        }}>
                            Sign Up
                        </Link>
                    </Box>
                    <Grid templateColumns="repeat(3, 1fr)" gap={2} width='100%' mt='10px'>
                        <Box w="100%" h="10" mt='13px'><hr color='#FFFFFE' /></Box>
                        <Box w="100%" h="10" textAlign='center' color='#FFFFFE'>or</Box>
                        <Box w="100%" h="10" mt='13px'><hr color='#FFFFFE' /></Box>
                    </Grid>
                    <DivSocial>
                        <IconButton
                            colorScheme="teal"
                            aria-label="Call Segun"
                            size="lg"
                            background='#fffffe'
                            _hover={{ bg: "#fffffe" }}
                            icon={<FcGoogle fontSize='30px' />}
                            onClick={handleGoogleLogin}
                        />
                        <IconButton
                            colorScheme="teal"
                            aria-label="Call Segun"
                            size="lg"
                            background='#3b5a9a'
                            color='#fffffe'
                            // border= 'solid'
                            // borderColor= '#3b5a9a'
                            _hover={{ bg: "#3b5a9a", color: '#fffffe' }}
                            icon={<SiFacebook fontSize='30px' />}
                            onClick={handleFacebookLogin}
                        />
                    </DivSocial>
                </DivCentral>
            </DivLogin >
        </DivFondo>
    )
}

export default Login
