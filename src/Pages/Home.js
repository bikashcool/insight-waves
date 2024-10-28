import React from 'react'
import Header from '../Components/Header';
import Blogs from '../Components/Blogs';
import Pagination from '../Components/Pagination';

const Home = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col w-full h-full gap-y-1 justify-center items-center">
        <Blogs />
      </div>
      <Pagination />
    </div>
  );
}

export default Home;
