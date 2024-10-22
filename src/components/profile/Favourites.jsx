
// import React, { useEffect, useState } from "react";
// import axios from 'axios';
// import BookCard from "../BookCard/BookCard";

// const Favourites = () => {
//   const [FavouriteBooks, setFavouriteBooks] = useState([]);
//   const headers = {
//     id: localStorage.getItem("id"),
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//   };

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const response = await axios.get("http://localhost:1000/api/v1/get-favourite-books", { headers });
//         setFavouriteBooks(response.data.data);
//       } catch (error) {
//         console.error("Error fetching favourite books", error);
//       }
//     };
//     fetch();
//   }, [FavouriteBooks]); // Empty dependency array to run the effect only once

//   return (

//    <>{FavouriteBooks.length === 0 && <div className=" h-[100%] text-5xl font-semibold text-zinc-500 flex items-center justify-center flex-col w-full">No favourite books 
//    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXoqReR-iPTOFlv_MDzo1EdkV0DLB7xRa0ew&s" alt="no image" className="h-[20vh] my-8"></img>
//    </div>}
//    <div className="grid grid-cols-3 gap-4">
      
//       {FavouriteBooks.map((items, i) => (
//         <div key={i}>
//           <BookCard data={items} favourite={true} />
//         </div>
//       ))}
//     </div> 
//    </>
    
//   );
// };

// export default Favourites;

import React, { useEffect, useState } from "react";
import axios from 'axios';
import BookCard from "../BookCard/BookCard";

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState([]);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/get-favourite-books", { headers });
        setFavouriteBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching favourite books", error);
      }
    };
    fetch();
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <>
      {FavouriteBooks.length === 0 && (
        <div className="h-full text-2xl md:text-5xl font-semibold text-zinc-500 flex items-center justify-center flex-col w-full">
          No favourite books
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXoqReR-iPTOFlv_MDzo1EdkV0DLB7xRa0ew&s"
            alt="No favourite books"
            className="h-40 md:h-60 my-8"
          />
        </div>
      )}

      {FavouriteBooks.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {FavouriteBooks.map((items, i) => (
            <div key={i}>
              <BookCard data={items} favourite={true} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Favourites;

