import React from 'react';
import { useForm } from '../../hooks/useForm';
import { listaSearch } from '../../actions/movieAction';
import {  Grid } from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Contenedor from './Contenedor';

export const SearchScreen = () => {

    const dispatch = useDispatch();

    const  {search}  = useSelector(state => state.movie);
    console.log(search);

    const [formValues, handleInputChange] = useForm({
        searchText: ''
    });
    const { searchText } = formValues;


    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(listaSearch(searchText));
        // history.push(`?q=${ searchText }`);
    }

    return (
        <div>
            
                    {
                        (search) ?
                            (
                                <Grid templateColumns="repeat(5, 1fr)" gap={3} m={10}>
                                {
                                search.map((mov) => (
                                    <Contenedor
                                        key={mov.id}
                                        {...mov}
                                    />
                                ))
                            }
                            </Grid>

                            ) :
                            <p>No hay datos</p>
                    }






        </div>
    )
}
