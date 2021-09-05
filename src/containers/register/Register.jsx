import { Alert, AlertIcon, Box, Button, Container, FormControl, Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FaUserAlt, FaLock } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { startRegisterUser } from '../../actions/authAction'
import { removeError, setError } from '../../actions/uiAction'
import validator from 'validator'
import {useFormik} from 'formik';
import * as Yup from 'yup'

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
    padding: 70px 30px;
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

const DivName = styled.div`
    display: flex;
    align-items: center;
`

const Register = () => {

    const dispatch = useDispatch()

    const [showPassword1, setShowPassword1] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)
    const handleShowClick1 = () => setShowPassword1(!showPassword1)
    const handleShowClick2 = () => setShowPassword2(!showPassword2)

    const { msjError } = useSelector(state => state.ui)

    const [formValues, handleInputChange] = useForm({
        name: '',
        lastName: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, lastName, email, password, password2 } = formValues

    const formValid = () => {
        if (name.trim().length === 0) {
            dispatch(setError('Nombre requerido'))
            return false
        } else if (lastName.trim().length === 0) {
            dispatch(setError('Apellido requerido'))
            return false
        } else if (!validator.isEmail(email)) {
            dispatch(setError('Email requerido'))
            return false
        } else if (!validator.isStrongPassword(password)) {
            dispatch(setError('Password no strong'))
            return false
        } else if (password !== password2) {
            dispatch(setError('Passwords no coinciden'))
            return false
        }

        dispatch(removeError())
        return true
    }

    const handleRegister = e => {
        e.preventDefault()

        if (formValid()) {
            dispatch(startRegisterUser(name, lastName, email, password))
        }
    }

    return (
        <DivFondo>
            <DivLogin>
                <DivCentral>
                    <img src="https://i.ibb.co/L9gqLtb/logo-block-Master.png" alt="logo-block-Master" border="0" />
                    <form onSubmit={handleRegister}>
                        {
                            msjError &&
                            (
                                <Alert status='error' mt={5}>
                                    <AlertIcon />
                                    {msjError}
                                </Alert>
                            )
                        }
                        <DivName>
                            <FormControl mt={10} mr={2}>
                                <InputLogin>
                                    <InputLeftElement
                                        pointerEvents='none'
                                        children={<FaUserAlt color="#0F0E17" />}
                                    />
                                    <Input type='text' placeholder='Name' name='name' value={name} onChange={handleInputChange} />
                                </InputLogin>
                            </FormControl>
                            <FormControl mt={10} ml={2}>
                                <InputLogin>
                                    <InputLeftElement
                                        pointerEvents='none'
                                        children={<FaUserAlt color="#0F0E17" />}
                                    />
                                    <Input type='text' placeholder='Last name' name='lastName' value={lastName} onChange={handleInputChange} />
                                </InputLogin>
                            </FormControl>
                        </DivName>
                        <FormControl mt={5}>
                            <InputLogin>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={<MdEmail color="#0F0E17" />}
                                />
                                <Input type='email' placeholder='Email address' name='email' value={email} onChange={handleInputChange} />
                            </InputLogin>
                        </FormControl>
                        <FormControl mt={5}>
                            <InputLogin>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={<FaLock color="#0F0E17" />}
                                />
                                <Input type={showPassword1 ? 'text' : 'password'} placeholder='Password' name='password' value={password} onChange={handleInputChange} />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleShowClick1}>
                                        {showPassword1 ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputLogin>
                        </FormControl>
                        <FormControl mt={5}>
                            <InputLogin>
                                <InputLeftElement
                                    pointerEvents='none'
                                    children={<FaLock color="#0F0E17" />}
                                />
                                <Input type={showPassword2 ? 'text' : 'password'} placeholder='Confirm password' name='password2' value={password2} onChange={handleInputChange} />
                                <InputRightElement width='4.5rem'>
                                    <Button h='1.75rem' size='sm' onClick={handleShowClick2}>
                                        {showPassword2 ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputLogin>
                        </FormControl>
                        <Button type='submit' width='100%' mt={5} background='#2832c2' color='#FED941' _hover={{ background: '#FED941', color: '#2832c2' }}>Register</Button>
                    </form>
                    <Box mt={3} mb={3} color='#FFFFFE'>
                        Already registered?{" "}
                        <Link to='/auth/login' style={{ color: '#FED941' }} onClick={() => {
                            dispatch(removeError())
                        }}>
                            Sign in
                        </Link>
                    </Box>
                </DivCentral>
            </DivLogin>
        </DivFondo>
    )
}

export default Register