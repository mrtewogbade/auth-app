import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Header = () => {

  const { currentUser } = useSelector((state) => state.user);


  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold">Auth App</h1>
        </Link>

        <ul className="flex flex-row justify-between gap-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/profile">

              {currentUser ? (<img className='rounded-full h-9 w-9 object-cover' src={currentUser.photoURL} alt="" />) : (<li>Sign In</li>)}

            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header