import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Navbar = () => {
    const links = [
        { title: "Home", link: "/" },
        
        { title: "All Books", link: "/all-books" },
        { title: "Cart", link: "/cart" },
        { title: "Profile", link: "/profile" },
         {title:"Admin Profile",link:"/profile"},
    ];
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
     const role= useSelector((state)=>state.auth.role);
    if(isLoggedIn === false)
    {
        links.splice(2,2);

    }
    if(isLoggedIn == true && role ==="user"){
        links.splice(4,1)
    }
     if(isLoggedIn == true && role === "admin"){
        links.splice(3,1);


     }
    

    const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);

    const toggleMobileNav = () => {
        setIsMobileNavVisible(!isMobileNavVisible);
    };

    return (
        <>
            <nav className='z-50 relative flex bg-zinc-800 text-white px-8 py-2 items-center justify-between'>
                <Link to="/" className='flex items-center'>
                    <img className='h-10 me-4' src='https://cdn-icons-png.flaticon.com/128/10433/10433049.png' alt='logo' />
                    <h1 className='text-2xl font-semibold'>Book Heaven</h1>
                </Link>
                <div className='nav-links-bookheaven md:flex items-center gap-4'>
                    <div className='hidden md:flex gap-4'>
                        {links.map((items, i) => (
                            <div className='flex items-center justify-center'>
                            {items.title === "profile" || items.title === "Admin Profile" ? (
                            <Link 
                            to={items.link} 
                            // className='hover:text-blue-500 border border-blue-500 transition-all duration-300'
                            //  className='hover:text-blue-500 border border-blue-500 transition-all duration-300 inline-block'
                            className='px-4 mb-8 text-3xl font-semibold py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration:300ms'
                             key={i}
                             >
                            {items.title}
                            </Link>
                            ): (
                            <Link
                            to={items.link}
                            className='hover:text-blue-500 transition-all duration-300'
                            key={i}
                            >
                                {items.title}{""}
                            </Link>
                            )}
                            
                            
                            </div>
                        ))}
                        
                    </div>
                    

                    {/* Login and Signup buttons visible on large screens */}
                    {isLoggedIn === false&& (
                    <div className='hidden md:flex gap-4'>
                        <Link
                            to="/Login"
                            className='px-4 mb-8 text-3xl font-semibold py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration:300ms'
                        >
                            LogIn
                        </Link>
                        <Link
                            to="/SignUp"
                            className='px-4 mb-8 text-3xl font-semibold py-2 bg-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration:300ms'
                        >
                            Sign Up
                        </Link>
                    </div>
                    )}

                    {/* Hamburger button visible on small screens */}
                    <button 
                        className='block md:hidden text-white text-2xl hover:text-zinc-400' 
                        onClick={toggleMobileNav}
                    >
                        <FaGripLines />
                    </button>
                </div>
            </nav>

            {/* Mobile navigation menu */}
            <div className={`${isMobileNavVisible ? 'flex' : 'hidden'} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex-col items-center justify-center`}>
                {links.map((item, i) => (
                    <Link to={item.link} className='text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300' key={i} onClick={toggleMobileNav}>
                        {item.title}
                    </Link>
                ))}
                
                {/* Login and Signup buttons under the hamburger button for mobile */}
                {isLoggedIn === false && (
                    <>
                <div className='flex flex-col items-center mt-8'>
                    <Link
                        to="/Login"
                        className='mb-4 px-4 text-3xl font-semibold py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-duration:300ms'
                        onClick={toggleMobileNav}
                    >
                        LogIn
                    </Link>
                    <Link
                        to="/SignUp"
                        className='px-4 text-3xl font-semibold py-2 bg-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-duration:300ms'
                        onClick={toggleMobileNav}
                    >
                        Sign Up
                    </Link>
                    
                    
                </div>
                </>
                )}
            </div>
        </>
    );
}

export default Navbar;

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaGripLines } from "react-icons/fa";
// import { useSelector } from 'react-redux';

// const Navbar = () => {
//     const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//     const role = useSelector((state) => state.auth.role);

//     // Define the links based on login status and role
//     const links = [
//         { title: "Home", link: "/" },
//         { title: "All Books", link: "/all-books" },
//         { title: "Cart", link: "/cart" },
//         ...(isLoggedIn && role === "admin"
//             ? [{ title: "Admin Profile", link: "/admin-profile" }]
//             : [{ title: "Profile", link: "/profile" }])
//     ];

//     const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);

//     const toggleMobileNav = () => {
//         setIsMobileNavVisible(!isMobileNavVisible);
//     };

//     return (
//         <>
//             <nav className='z-50 relative flex bg-zinc-800 text-white px-8 py-2 items-center justify-between'>
//                 <Link to="/" className='flex items-center'>
//                     <img className='h-10 me-4' src='https://cdn-icons-png.flaticon.com/128/10433/10433049.png' alt='logo' />
//                     <h1 className='text-2xl font-semibold'>Book Heaven</h1>
//                 </Link>
//                 <div className='nav-links-bookheaven md:flex items-center gap-4'>
//                     <div className='hidden md:flex gap-4'>
//                         {links.map((item, i) => (
//                             <div className='flex items-center justify-center' key={i}>
//                                 <Link
//                                     to={item.link}
//                                     className='hover:text-blue-500 transition-all duration-300'
//                                 >
//                                     {item.title}
//                                 </Link>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Login and Signup buttons visible on large screens */}
//                     {isLoggedIn === false && (
//                         <div className='hidden md:flex gap-4'>
//                             <Link
//                                 to="/Login"
//                                 className='px-4 mb-8 text-3xl font-semibold py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300'
//                             >
//                                 LogIn
//                             </Link>
//                             <Link
//                                 to="/SignUp"
//                                 className='px-4 mb-8 text-3xl font-semibold py-2 bg-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300'
//                             >
//                                 Sign Up
//                             </Link>
//                         </div>
//                     )}

//                     {/* Hamburger button visible on small screens */}
//                     <button
//                         className='block md:hidden text-white text-2xl hover:text-zinc-400'
//                         onClick={toggleMobileNav}
//                     >
//                         <FaGripLines />
//                     </button>
//                 </div>
//             </nav>

//             {/* Mobile navigation menu */}
//             <div className={`${isMobileNavVisible ? 'flex' : 'hidden'} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex-col items-center justify-center`}>
//                 {links.map((item, i) => (
//                     <Link
//                         to={item.link}
//                         className='text-white text-4xl mb-8 font-semibold hover:text-blue-500 transition-all duration-300'
//                         key={i}
//                         onClick={toggleMobileNav}
//                     >
//                         {item.title}
//                     </Link>
//                 ))}

//                 {/* Login and Signup buttons under the hamburger button for mobile */}
//                 {isLoggedIn === false && (
//                     <div className='flex flex-col items-center mt-8'>
//                         <Link
//                             to="/Login"
//                             className='mb-4 px-4 text-3xl font-semibold py-2 border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300'
//                             onClick={toggleMobileNav}
//                         >
//                             LogIn
//                         </Link>
//                         <Link
//                             to="/SignUp"
//                             className='px-4 text-3xl font-semibold py-2 bg-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300'
//                             onClick={toggleMobileNav}
//                         >
//                             Sign Up
//                         </Link>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// };

// export default Navbar;
