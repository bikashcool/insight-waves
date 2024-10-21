import { useContext, useEffect } from 'react';
import Blogs from './Components/Blogs';
import Header from './Components/Header';
import Pagination from './Components/Pagination';
import { AppContext } from './Context/AppContext';

function App() {

  const {fetchBlogPost} = useContext(AppContext);
  useEffect(() => {
    fetchBlogPost();
  }, []);
  return (
    <div className="flex flex-col w-full h-full gap-y-1 justify-center items-center">
      <Header/>
      <Blogs/>
      <Pagination/>
    </div>
  );
}

export default App;
