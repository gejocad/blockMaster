import React from 'react'
import AddInput from '../../components/addmovie/AddInput'
import PaintMovies from '../../components/addmovie/PaintMovies'

const AddMovie = () => {
    return (
        <div style={{ color: 'white' }}>
            <AddInput />
            <PaintMovies />
        </div >
    )
}

export default AddMovie
