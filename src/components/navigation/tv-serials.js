import React, {useEffect, useState} from 'react';
import axios from 'axios';
import SingleCard from "../singleContent/single-card";
import CustomPagination from "../pagination/CustomPagination";
import Genres from "../genres";
import useGenre from "../../hook/useGenre";


const TvSerials = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1)
    const [numOfPages, setNumOfPages] = useState()
    const [selectedGenres, setSelectedGenres] = useState([])
    const [genres, setGenres] = useState([])
    const genreforURL = useGenre(selectedGenres)

    const fetchMovies = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=76578856efa3b3119d5ebe76dc5498b0&page=${page}&with_genres=${genreforURL}`);
        console.log(data)
        setContent(data.results);
        setNumOfPages(data.total_pages)

    }
    useEffect(() => {
        fetchMovies();
    }, [page, genreforURL])


    return (

        <>
            <div className="my-container">
                <div>

                    <h2 className="trending-title">TV Serials:</h2>

                    <Genres
                        type="tv"
                        selectedGenres={selectedGenres}
                        setSelectedGenres={setSelectedGenres}
                        genres={genres}
                        setGenres={setGenres}
                        setPage={setPage}
                    />

                    <div className="single-card-container">
                        {
                            content && content.map((c) => <SingleCard
                                key={c.id}
                                id={c.id}
                                poster={c.poster_path}
                                title={c.title || c.name}
                                date={c.first_air_date || c.release_date}
                                media_type="tv"
                                vote_average={c.vote_average}/>)
                        }
                    </div>

                    {numOfPages > 1 && (
                        <div className="pagination-container">
                            <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default TvSerials;