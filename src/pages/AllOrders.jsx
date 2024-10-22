// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import Loader from '../components/Loader/Loader';
// import {FaUserLarge, FaCheck } from "react-icons/fa6"
// import { IoOpenOutline } from 'react-icons/io5';
// import { Link } from 'react-router-dom';
// const AllOrders = () => {
//   const[AllOrders,setAllOrders]=useState()
//   const[Options,setOptions]=useState(-1)
//   const[Values,setValues]=useState({status:""});
//   const headers ={
//     id:localStorage.getItem("id"),
//     authorization:`Bearer ${localStorage.getItem("token")}`,
// };
//   useEffect(()=>{
//    const fetch = async () =>{
//     const response = await axios.get("http://localhost:1000/api/v1/get-all-orders",{headers});
//     setAllOrders(response.data.data);

    
//    };
//    fetch();
//   },[AllOrders]);
//   const change=(e)=>{
//     const {value} =e.target;
//     setValues({status:value});
//   };
//   const  submitChanges = async (i)=>{
//     const id = AllOrders[i]._id;
//     const response = await axios.put(`http://localhost:1000/api/v1/update-status/${id}`,Values,{headers});
//     alert(response.data.message)
//   };
//   AllOrders && AllOrders.splice(AllOrders.length -1,1)
 
//   return (
//     <>
//     {!AllOrders && <div className='h-[100%] flex items-center justify-center'>
//       {""}
//       <Loader/> {""}
//       </div>
//       }
//       {AllOrders && AllOrders.length>0 && (
//         <div className="h-[100%] p-0 md:p-4 text-zinc-100">
//           <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
//             All Orders
//           </h1>
//           <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
//             <div className="w-[3%]">
//               <h1 className="text-center">Sr.</h1>
//             </div>
//             <div className="w-[40%] md:w-[22%]">
//               <h1>Books</h1>
//             </div>
//             <div className="w-0 md:w-[45%] hidden md:block">
//               <h1>Description</h1>
//             </div>
//             <div className="w-[17%] md:w-[9%]">
//               <h1>Price</h1>
//             </div>
//             <div className="w-[30%] md:w-[16%]">
//               <h1>Status</h1>
//             </div>
//             <div className="w-[10%] md:w-[5%]">
//               <h1 className=''><FaUserLarge/></h1>
//             </div>
//           </div>
//           {AllOrders.map((items,i)=>(
//             <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300'>
//               <div className='w-[3%]'>
//                 <h1 className='text-center'>{i+1}</h1>
//               </div>
//               <div className='w-[40%] md:w-[22%]'>
//                 <Link
//                 to={`/view-book-details/${items.book._id}`}
//                 className='hover:text-blue-300'
//                 >
//                   {items.book.title}
//                 </Link>
//               </div>
//               <div className='w-0 md:w-[45%] hidden md:block'>
//                 <h1 className=''>{items.book.desc.slice(0,50)}...</h1>
//               </div>
//               <div className='w-[17%] md:w-[9%]'>
//                 <h1 className=''>₹{items.book.price}</h1>
//               </div>
//               <div className='w-[30%] md:w-[16%]'>
//                 <h1 className='font-semibold'>
//                   <button className='hover:scale-105 transition-all duration-300' onClick={()=>setOptionsButton(i)}>
//                     {items.status === "Order Placed" ? (
//                       <div className='text-yellow-500'>{items.status}</div>
//                     ) : items.status === "canceled" ? (
//                       <div className='text-red-500'>{items.status}</div>
//                     ):(
//                       <div className='text-green-500'>{items.status}</div>
//                      ) }
//                   </button>
//                   <div className={`${Options === i ? "block" :"hidden"} flex mt-4`}>
//                     <select 
//                     name='status' 
                    
//                     id="" 
//                     className='bg-gray-800'
//                       onChange={change}
//                       value={Values.status}
//                       >
//                       {[
//                         "order placed",
//                         "out for deleivery",
//                         "Deleivered",
//                         "canceled",
//                       ].map((items,i)=>(
//                         <option value={items} key={i}>
//                           {items}
//                         </option>
//                       ))}
//                     </select>
//                     <button className='text-green-500 hover:text-pink-600 mx-2'
//                     onClick={()=>{
//                       setOptions(-1);
//                       submitChanges(i);
//                     }}
//                     >
//                       <FaCheck/>
//                     </button>
//                   </div>
//                 </h1>
//               </div>
//               <div className='w-[100%] md:w-[5%]'>
//                 <button className='text-xl hover:text-orange-500' onClick={()=>{
//                   setuserDiv("fixed");
//                   setuserDivDate(items.user);
//                 }}
//                 >
//                   <IoOpenOutline/>
//                 </button>
//               </div>
//             </div>
//           ))}
//           </div>
    
  
// )}
// </>
//   );
// };


// export default AllOrders


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader'; // Ensure this path is correct
import { FaUserLarge, FaCheck } from 'react-icons/fa6';
import { IoOpenOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import SeeUserData from './SeeUserData';

const AllOrders = () => {
  const [AllOrders, setAllOrders] = useState([]);
  const [Options, setOptions] = useState(-1);
  const [Values, setValues] = useState({ status: "" });
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/get-all-orders", { headers });
        setAllOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    try {
      const id = AllOrders[i]._id;
      const response = await axios.put(`http://localhost:1000/api/v1/update-status/${id}`, Values, { headers });
      alert(response.data.message);
      setOptions(-1); // Close the options dropdown after successful update
      // Update the order list locally after successful update
      setAllOrders((prevOrders) =>
        prevOrders.map((order, index) => (index === i ? { ...order, status: Values.status } : order))
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const setOptionsButton = (i) => {
    setOptions(i);
    setValues({ status: AllOrders[i].status });
  };

  return (
    <>
      {!AllOrders.length && (
        <div className='h-full flex items-center justify-center'>
          <Loader />
        </div>
      )}
      {AllOrders.length > 0 && (
        <div className="h-full p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            All Orders
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%] text-center">Sr.</div>
            <div className="w-[40%] md:w-[22%]">Books</div>
            <div className="w-0 md:w-[45%] hidden md:block">Description</div>
            <div className="w-[17%] md:w-[9%]">Price</div>
            <div className="w-[30%] md:w-[16%]">Status</div>
            <div className="w-[10%] md:w-[5%]">
              <FaUserLarge />
            </div>
          </div>

          {AllOrders.map((items, i) => (
            <div
              key={items._id}
              className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300'
            >
              <div className='w-[3%] text-center'>{i + 1}</div>
              <div className='w-[40%] md:w-[22%]'>
                <Link to={`/view-book-details/${items.book._id}`} className='hover:text-blue-300'>
                  {items.book.title}
                </Link>
              </div>
              <div className='w-0 md:w-[45%] hidden md:block'>
                <h1>{items.book.desc.slice(0, 50)}...</h1>
              </div>
              <div className='w-[17%] md:w-[9%]'>₹{items.book.price}</div>
              <div className='w-[30%] md:w-[16%]'>
                <h1 className='font-semibold'>
                  <button
                    className='hover:scale-105 transition-all duration-300'
                    onClick={() => setOptionsButton(i)}
                  >
                    {items.status === "Order Placed" ? (
                      <div className='text-yellow-500'>{items.status}</div>
                    ) : items.status === "canceled" ? (
                      <div className='text-red-500'>{items.status}</div>
                    ) : (
                      <div className='text-green-500'>{items.status}</div>
                    )}
                  </button>
                  {Options === i && (
                    <div className="flex mt-4">
                      <select
                        name='status'
                        className='bg-gray-800'
                        onChange={change}
                        value={Values.status}
                      >
                        {["Order Placed", "Out for Delivery", "Delivered", "canceled"].map((status, i) => (
                          <option value={status} key={i}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <button
                        className='text-green-500 hover:text-pink-600 mx-2'
                        onClick={() => submitChanges(i)}
                      >
                        <FaCheck />
                      </button>
                    </div>
                  )}
                </h1>
              </div>
              <div className='w-[100%] md:w-[5%]'>
                <button
                  className='text-xl hover:text-orange-500'
                  onClick={() => {
                    setUserDiv("fixed");
                    setUserDivData(items.user);
                  }}
                >
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {userDivData && (
        <SeeUserData
        userDivData={userDivData}
        userDiv={userDiv}
        setuserDiv={setUserDiv}
        />
      )}
    </>
  );
};

export default AllOrders;
