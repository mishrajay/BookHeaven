import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import axios from "axios"
import { useNavigate, useParams } from 'react-router-dom'
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart, FaEdit } from "react-icons/fa"
import { useSelector } from 'react-redux';
import { MdOutlineDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

const ViewBookDetails = () => {
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    const [data, setData] = useState();
    const { id } = useParams();
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    }
    // console.log(id);
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
            setData(response.data.data);
            // console.log(response.data.data.price)
        }
        fetch();
    }, []);

    const handleFavorite = async () => {
        const response = await axios.put("http://localhost:1000/api/v1/add-book-to-favorite", 
            {}, 
            { headers }
        );
        alert(response.data.message);
    };

    const handleCart = async () => {
        const response = await axios.put("http://localhost:1000/api/v1/add-to-cart", 
            {}, 
            { headers }
        );
        alert(response.data.message);
    };

    const deleteBook = async () => {
        const response = await axios.delete("http://localhost:1000/api/v1/delete-book", 
            { headers }
        );
        alert(response.data.message);
        navigate("/all-books");
    };

    return (
        <>
            {data && (
                <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8 items-start">
                    <div className="w-full lg:w-3/6">
                        {" "}
                        <div className='bg-zinc-800 flex flex-col lg:flex-row justify-around py-12 rounded'>
                            {" "}
                            <img src={data.url} alt="/" className="h-[50vh] md:h-[60vh] lg:h-[70vh] rounded" />
                            {isLoggedIn && role === 'user' && (
                                <div className='flex flex-col md:flex-row lg:flex-col mt-4 lg:mt-0 items-center justify-between lg:justify-start'>
                                    <button className='bg-white rounded lg:rounded-full text-3xl p-3 text-red-500 flex items-center justify-center'
                                        onClick={handleFavorite}
                                    >
                                        <FaHeart /> <span className='ms-4 block lg:hidden'>Favorites</span>
                                    </button>
                                    <button className='text-white rounded mt-8 md:mt-0 lg:rounded-full text-3xl p-3 lg:mt-8 bg-blue-500 flex items-center justify-center'
                                        onClick={handleCart}
                                    >
                                        <FaShoppingCart /> <span className='ms-4 block lg:hidden'>Add to cart</span>
                                    </button>
                                </div>
                            )}
                            {isLoggedIn && role === 'admin' && (
                                <div className='flex flex-col md:flex-row lg:flex-col mt-4 lg:mt-0 items-center justify-between lg:justify-start'>
                                    <Link to={`/update-book/${id}`} className='bg-white rounded lg:rounded-full text-3xl p-3 flex items-center justify-center'
                                    >
                                        <FaEdit /> <span className='ms-4 block lg:hidden'>Edit</span>
                                    </Link>
                                    <button className='text-red-500 rounded mt-8 md:mt-0 lg:rounded-full text-3xl p-3 lg:mt-8 bg-white flex items-center justify-center'
                                        onClick={deleteBook}
                                    >
                                        <MdOutlineDelete /> <span className='ms-4 block lg:hidden'>Delete Book</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="p-4 w-full lg:w-3/6">
                        <h1 className="text-4xl text-zinc-300 font-semibold">
                            {data.title}
                        </h1>
                        <p className="text-zinc-400 mt-1">by {data.author}</p>
                        <p className="text-zinc-500 mt-4 text-xl">{data.desc}</p>
                        <p className="flex mt-4 items-center justify-start text-zinc-400">
                            <GrLanguage className="me-3" /> {data.language}
                        </p>
                        <p className="mt-4 text-zinc-100 text-3xl font-semibold">
                            Price : ₹ {data.price}{" "}
                        </p>
                    </div>
                </div>
            )}
            {!data && (
                <div className='flex items-center justify-center my-8'>
                    <Loader />
                </div>
            )
            }
        </>
    )
}

export default ViewBookDetails