import React from 'react'
import { Link } from 'react-router-dom';
const Hero = () => {
    return (
        <div className="lg:screen md:h-[75vh] flex flex-col md:flex-row items-cnter justify-center">
            <div className="w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
                <h1 className="text-4xl 1g:text-6xl font-semibold text-yellow-100 text-center lg:text-left">
                    Discover Your Next Great Read
                </h1>
                <p className="mt-4 text-xl ■text-zinc-300 text-center lg:text-left">
                    Uncover captivating stories, enriching knowledge, and endless
                    inspiration in our curated collection of books
                </p>
                <Link to="all-books" className="mt-8">
                    <button className="text-yellow-100 text-xl lg:text-2xl font-semibold border border-yellow">
                        Discover Books
                    </button>
                </Link>
            </div>
            <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center rounded-md">
                <img src="./hero.png" alt="hero" />
            </div>
        </div>
    );
}

export default Hero