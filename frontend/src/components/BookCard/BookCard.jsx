import React from 'react'
import { Link } from "react-router-dom"
import axios from "axios"

const BookCard = ({ data, favorite }) => {
    // console.log(data._id);
    const bookid = data._id;
    const headers = { 
        id: localStorage.getItem("id"), 
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: bookid,
      }
    const handleRemoveBook = async () => {
        const response = await axios.put("http://localhost:1000/api/v1/remove-book-from-favorite", 
            {},
            { headers },
        )
        console.log(response.data.message)
        alert(response.data.message);
    }

    return (
        <div className='h-[100%] bg-zinc-800 rounded p-4 flex flex-col'>
            <Link to={`/view-book-details/${data._id}`}>
                <div className="bg-zinc-800 rounded p-4 flex flex-col">
                    <div className="bg-zinc-900 rounded flex items-center justify-center">
                        <img src={data.url} alt="/" className="h-[25vh]" />
                    </div>
                    <h2 className="mt-4 text-xl text-white font-semibold">{data.title}</h2>
                    <p className="mt-2 text-zinc-400 font-semibold">by {data.author}</p>
                    <p className="mt-2 text-zinc-200 font-semibold text-xl">
                        ₹ {data.price}
                    </p>
                </div>
            </Link>
            {favorite && (
                <button className='bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4'
                onClick={handleRemoveBook}
            >
                Remove from favorite
            </button>
            )}
        </div>
    )
}

export default BookCard