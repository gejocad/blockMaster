import { db } from '../firebase/firebase-config'
import { loadMovies } from '../helpers/loadHelp';
import { types } from "../types/types";
import { fileUpload } from '../helpers/fileUpload'
import Swal from 'sweetalert2'

let fileUrl=[]

export const AddMovie = (tittle, description, year, categorie, image, duration) => {
    return async (dispatch) => {

        const newMovie = {
            image: fileUrl,
            tittle,
            description,
            year,
            categorie,
            duration,
            qualification: [],
            trailer: ''
        }

        console.log(newMovie);

        await db.collection('movies/').add(newMovie)
        dispatch(addNewMovie(newMovie))
        dispatch(startLoadingMovie('movies'))
    }
}

export const addNewMovie = (movie) => ({
    type: types.addMovie,
    payload: {
        ...movie
    }
})

export const startLoadingMovie = (id) => {
    return async (dispatch) => {
        const movie = await loadMovies(id)
        dispatch(setMovie(movie))
    }
}

export const setMovie = (movie) => ({
    type: types.loadMovie,
    payload: movie
})

export const activeMovies = (id, movie) => ({
    type: types.activeMovie,
    payload: {
        id,
        ...movie
    }
})


export const Edit = (movie) => {
    return async (dispatch, getState) => {
        
        if (!movie.url) {
            delete movie.url;
        }

        const EditMovie = {
                image: fileUrl,
                tittle: movie.tittle,
                description: movie.description,
                year: movie.year,
                categorie: movie.categoria,
                duration:movie.duracion,
                qualification: [],
                trailer: 'fdgfd'
        }

        const movieF = { ...EditMovie  }
        delete movieF.id

        Swal.fire({
            title: 'actualizando...',
            text: 'Por favor, Espere ...',
allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading()
            }
        })

        await db.doc(`movies/${movieF.id}`).update(EditMovie)
           console.log(EditMovie)

        Swal.fire('Guardado', movie.title, 'success');
        dispatch(startLoadingMovie(movieF.id))
    }
}

export const startUploading = (file) => {
    return async (dispatch) => {

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait ...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading()
            }
        })

        fileUrl = await fileUpload(file)
        console.log(fileUrl)
        Swal.close()
       return fileUrl
    }
}




export const Delete = (id) => {
    return async (dispatch, getState) => {

        

        await db.doc(`movies/${id}`).delete();

        dispatch(deleteMovie(id));
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Pelicula Eliminada',
            showConfirmButton: false,
            timer: 1500
          })
          dispatch(startLoadingMovie())
    }
}

export const deleteMovie = (id) => ({
    type: types.movieDelete,
    payload: id
});

export const listaSearch = (searchText) => {

    return async(dispatch) => {
        const moviesSnap = await db.collection(`movies/`).where('tittle','==',searchText).get();
        const moviesl = []
    
        moviesSnap.forEach(snapHijo => {
            moviesl.push({
                uid: snapHijo.id,
                ...snapHijo.data()
            })
        })
        console.log(moviesl)
        dispatch(listarSe(moviesl));

    }
}

export const listarSe = (movie) => {
    return {
        type: types.ListarBusqueda,
        payload: movie
    }
}