import { createContext, useState } from "react";
import { baseUrl } from "../baseUrl";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const navigate = useNavigate();

    const fetchBlogPost = async (page = 1, tag=null, category) => {
        setLoading(true);
        let url = `${baseUrl}?page=${page}`;
        if(tag){
            url += `&tag=${tag}`;
        }
        if(category){
            url += `&category=${category}`;
        }
        try{
            const result = await fetch(url);
            const data = await result.json();
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
        navigate({ search: `?page=${page}` });
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

