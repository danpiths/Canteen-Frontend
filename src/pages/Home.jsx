import React from 'react';
import sushiImage from '../Images/sushi.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
  const user = useSelector(state => state.user);

  return (
    <div className='flex  flex-1 flex-col items-center justify-center xl:flex-row-reverse'>
      <div className='mb-7 w-1/2 xl:flex xl:items-center xl:justify-center'>
        <img src={sushiImage} className='xl:w-1/2 ' alt='' />
      </div>
      <div className='text-center xl:flex xl:w-1/2 xl:flex-col xl:gap-5  xl:px-32  '>
        <h1 className='mb-2 text-3xl font-bold capitalize xl:mb-0 xl:text-left xl:text-6xl '>
          Title goes here
        </h1>
        <p className='mb-4 px-3 xl:mb-0 xl:px-0  xl:text-left xl:text-lg'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          placeat voluptates laboriosam et repellat! Commodi culpa quos
          doloremque, inventore cum rerum placeat maxime dignissimos ea, in
          recusandae! Excepturi eos, facere atque cumque aut impedit delectus
          facilis, rem numquam quod quas quae! Vitae architecto assumenda vero
          veniam praesentium accusantium temporibus fugit.
        </p>
        {user.userId ? (
          user.role !== 'admin' ? (
            <Link
              to='/Menu'
              className='rounded-md border-2 border-amber-500 bg-amber-100 px-4 py-2 font-bold uppercase tracking-wide text-amber-700 xl:self-start xl:text-lg'
            >
              Food Menu
            </Link>
          ) : (
            <Link
              to='/admin'
              className='rounded-md border-2 border-amber-500 bg-amber-100 px-4 py-2 font-bold uppercase tracking-wide text-amber-700 xl:self-start xl:text-lg'
            >
              Admin Panel
            </Link>
          )
        ) : (
          <Link
            to='/register'
            className='rounded-md border-2 border-orange-500 bg-orange-100 px-4 py-2 font-bold uppercase tracking-wide text-orange-700 xl:self-start xl:text-lg'
          >
            Register
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
