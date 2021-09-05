import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Grid, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@chakra-ui/react'
import styled from 'styled-components'
import { activeMovies } from '../../actions/movieAction';
import { FaPlay, FaPlus } from 'react-icons/fa'

const ImgMovies = styled.img`
    border-radius: 10px !important;
    opacity: 0.5;
    :hover {
        opacity: 1;
    }
`

const SModalContent = styled(ModalContent)`
    max-width: none;
    width: 80%;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 20px;
`

const SModalBody = styled(ModalBody)`
    display: flex;
`

const SH1 = styled.h1`

`

const Peliculas = () => {

    const dispatch = useDispatch()

    const { movie } = useSelector(state => state.movie)

    const { active } = useSelector(state => state.movie)

    const { isOpen, onOpen, onClose } = useDisclosure()

    console.log(movie);

    const handleClickMovie = (mov) => {
        dispatch(activeMovies(mov.id, { ...mov }))
    }

    return (
        <>
            <Grid templateColumns="repeat(5, 1fr)" gap={3} m={10}>
                {
                    movie.map((mov, index) => {
                        return (
                            <Box w="100%" h="100%" key={index} onClick={() => handleClickMovie(mov)}>
                                <ImgMovies onClick={onOpen} src={mov.image} alt={mov.tittle} border="0" />
                            </Box>
                        )
                    })
                }
            </Grid>
            <Modal isOpen={isOpen} onClose={onClose}>
                <SModalContent className='hola'>
                    <ModalHeader>
                        <ModalCloseButton />
                    </ModalHeader>
                    <SModalBody>
                        <img src={active.image} alt={active.tittle} border="0" style={{marginRight: '10px', width: '30%', height:'30%'}} />
                        <div>
                            <h1 style={{fontSize: '30px'}}>{active.tittle}</h1>
                            <hr />
                            <p style={{fontSize: '18px'}}>{active.description}</p>
                            <hr />
                            <p style={{fontSize: '14px'}}>{active.year} - {active.categorie} - {active.duration}</p>
                        </div>
                    </SModalBody>
                    <ModalFooter>
                        <Button leftIcon={<FaPlay />} style={{width: '270', height: '50', background: '#FED941', color: '#0F0E17', border: 'solid #FED941', marginRight: '10px'}}>Ver Ahora</Button>
                        <Button leftIcon={<FaPlus />} style={{width: '270', height: '50', background: 'transparent', color: '#FED941', border: 'solid #FED941'}}>Ver despues</Button>
                    </ModalFooter>
                </SModalContent>
            </Modal>
        </>
    )
}

export default Peliculas
