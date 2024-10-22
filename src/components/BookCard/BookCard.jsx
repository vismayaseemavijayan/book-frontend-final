import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const BookCard = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    
      const response = await axios.put(
        'http://localhost:1000/api/v1/remove-book-from-favourite',
        {},
        { headers }
      );
      toast.info(response.data.message);
  };

  return (
    <div className='bg-zinc-800 rounded-lg p-4 flex flex-col w-full max-w-[250px] shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl'>
      <Link to={`/view-book-details/${data._id}`}>
        <div className='bg-zinc-900 rounded-lg flex items-center justify-center h-[250px] overflow-hidden'>
          <img
            src={data.url}
            alt='Book Cover'
            className='h-full max-h-full object-contain transition duration-300 hover:scale-110'
          />
        </div>
        <div className='mt-4 flex-grow'>
          <h2 className='text-xl text-zinc-200 font-semibold truncate'>
            {data.title}
          </h2>
          <p className='mt-2 text-zinc-400 font-semibold truncate'>
            by {data.author}
          </p>
          <p className='mt-2 text-zinc-200 font-semibold text-lg'>
            ${data.price}
          </p>
        </div>
        <ToastContainer position='top-center' autoClose={5000} theme='colored' />
      </Link>
      {favourite && (
        <button
          className='bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-500 text-yellow-500 mt-4 hover:bg-yellow-500 hover:text-yellow-50 transition duration-300'
          onClick={handleRemoveBook}
        >
          Remove From Favourite
        </button>
             

      )}
      
    </div>
  );
};

export default BookCard;
