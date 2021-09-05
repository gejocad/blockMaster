import { db } from "../firebase/firebase-config";

export const loadMovies = async (id) => {

    const moviesSnap = await db.collection(`movies/`).get()
    const movies = []

    moviesSnap.forEach(snapHijo => {
        movies.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    })

    return movies
}