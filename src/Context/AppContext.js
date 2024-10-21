import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);

    const fetchBlogPost = async (page = 1) => {
        setLoading(true);
        let url = `${baseUrl}?page=${page}`;
        try{
            const result = await fetch(url);
            const data = await result.json();
            console.log(data);
            setPage(data.page);
            setPosts(data.posts);
            setTotalPages(data.totalPages);
        }
        catch(error){
            alert("Error 404 in Fetching Data");
            setPage(1);
            setPosts([]);
            setTotalPages(null);
        }
        setLoading(false);
    };

    const handlePageChange = (page) => {
        setPage(page);
        fetchBlogPost(page);
    }

    const value = {
        loading,
        setLoading,
        posts, 
        setPosts,
        page, 
        setPage,
        totalPages,
        setTotalPages,
        fetchBlogPost,
        handlePageChange,
    };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

