import React, { useEffect, useState } from 'react'
import axios from 'axios';
import BookCard from '../BookCard/BookCard';

const Favorites = () => {
    const [favoriteBooks, setfavoriteBooks] = useState();
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get("http://localhost:1000/api/v1/get-favorite-book",
                { headers }
            );
            setfavoriteBooks(response.data.data);
            // console.log(response.data.data);
        };
        fetch();
    }, [favoriteBooks])

    return (
        <>
            {favoriteBooks && favoriteBooks.length == 0 && (
                <div className='text-5xl font-semibold h-[100%] text-zinc-500 flex flex-col items-center justify-center w-full'>
                    No Favorite Books
                </div>
            )}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                {favoriteBooks &&
                    favoriteBooks.map((items, i) => (
                        <div key={i}>
                            <BookCard data={items} favorite={true} />
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Favorites