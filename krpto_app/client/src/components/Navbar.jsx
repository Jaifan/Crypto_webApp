import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../src/logo.png"

const NavItem = ({title, classprop})=> (
  <li className={`mx-4 cursor-pointer ${classprop}`}>{title}</li>
)

const Navbar = () => {

  const [toggleMenu , setToggleMenu] = React.useState(false);

  return (
    <nav className='w-full flex md:justify-center justify-between items-center p-4 bg-gradient-to-r from-green-400 to-blue-500'>
      <div className='md:flex-[0.5] flex-initial justify-center items-center'>
        <img src={logo} alt="logo" className='w-32 cursor-pointer'/>
      </div>

      <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'>
        {["Market","Exchange","Tutorial","Wallet"].map((item, index) => (
          <NavItem key={item+index} title={item}/>
        ))}
        <li className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]'>Log In</li>
      </ul>

      <div className="flex relative">
        {!toggleMenu && (
            <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
          )}
          {toggleMenu && (
            <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
          )}

          {toggleMenu && (
            <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md text-white animate-slide-in bg-gradient-to-r from-pink-500 to-yellow-500"
            >
               <li className="text-xl w-full my-2"><AiOutlineClose onClick={() => setToggleMenu(false)} /></li>

               {["Market","Exchange","Tutorial","Wallet"].map((item, index) => (
                    <NavItem key={item+index} title={item} classprops="my-2 text-lg"/>
                ))}
              
            </ul>
          )

          }


      </div>

    </nav>
  )
}

export default Navbar