import React from "react";
import { useState, useEffect, useRef, useCallback } from 'react';
import './bookmarkManager.css';
import { getBookmarks, createBookmark, deleteBookmark} from  "../../Services/BookmarkService";
import { getCategories } from  "../../Services/BookmarkService";
import { TextField } from '@material-ui/core';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { MenuItem } from '@mui/material';
import { authenticate } from "../../Services/AuthenticationService";

export default function BookmarkManager() {

    const [bookmarks, setBookmarks] = useState([]);
    const [newBookmark, setNewBookmark] = useState({
        "name": "",
        "category": "",
        "url": "",
    })

    const dirty = useRef({
        "name": false,
        "category": false,
        "url": false,
    })
    const [helperText, setHelperText] = useState({
        "name": "",
        "category": "",
        "url": "",
    })

    const [categories, setCategories] = useState([
        {"_id": "--" },
    ]);
    const [category, setCategory] = useState("--");

    const fetchBookmarks = async(category) => {
        const bookmarks = await getBookmarks(category);
        setBookmarks(bookmarks);
    }

    const fetchCategories = async() => {
        const categories = await getCategories();
        setCategories([{"_id": "--" }].concat(categories));
    }

    useEffect( () => {
        authenticate().then( () => {
            fetchBookmarks(); 
            fetchCategories();    
        })
    }, [])

    const validateData = useCallback( () => {
        setHelperText({
            "name": newBookmark.name.length === 0 && dirty.current.name ? "Name is required" : "",
            "category": newBookmark.category.length === 0 && dirty.current.category ? "Category is required" : "",
            "url": newBookmark.url.length === 0 && dirty.current.url ? "URL is required" : "",
        })
    }, [newBookmark])

    useEffect( () => {
        validateData();     
    }, [newBookmark, validateData])

    useEffect( () => {
        console.log("Current category: " + category);
        let categoryFilter = category  === "--" ? null : category
        fetchBookmarks(categoryFilter);
    }, [category])


    const handleUpdateNewBookmark = (e) => {
        setNewBookmark((prevBookmark) => {
            let newBookmark = {...prevBookmark};
            switch (e.target.id){
                case "name" : 
                    newBookmark.name = e.target.value; 
                    dirty.current.name = true;
                    break;
                case "category" : 
                    newBookmark.category = e.target.value; 
                    dirty.current.category = true;
                    break;
                case "url" : 
                    newBookmark.url = e.target.value; 
                    dirty.current.url = true;
                    break;
                default: break;
            }
            return newBookmark;
        })
    };

    const handleCreateNewBookmark = () => {

        dirty.current.name = true;
        dirty.current.category = true;
        dirty.current.url = true;
        validateData();
        if(newBookmark.name.length === 0 || newBookmark.category.length === 0 || newBookmark.url.length === 0) return;

        //setBookmarks( prevBookmarks => ([...prevBookmarks, newBookmark]))
        const bookmark = {...newBookmark}
        setNewBookmark({
            "name": "",
            "category": "",
            "url": "",
        })
        dirty.current.name = false;
        dirty.current.category = false;
        dirty.current.url = false;       
        const addBookmark = async() => {
            await createBookmark(bookmark);
            setNewBookmark({
                "name": "",
                "category": "",
                "url": "",
            }) 
            fetchBookmarks(); 
            fetchCategories();   
        }
        addBookmark();  
    }

    const handleDeleteBookmark = (id) => {
        setBookmarks( prevBookmarks => (prevBookmarks.filter( (elem) => elem._id !== id )))
        const removeBookmark = async() => {
            await deleteBookmark(id);  
            fetchCategories();
        }
        removeBookmark();        
        
    }

    return (
        <div>
            <h1>Bookmark Manager</h1>
            <form className="input-form">
                <TextField  
                    onChange={handleUpdateNewBookmark} 
                    className="input"
                    id="name" 
                    name="name" 
                    label="Name" 
                    error ={helperText.name.length === 0 ? false : true }
                    helperText={helperText.name}
                    value={newBookmark.name}
                    size = "small"
                    required 
                    variant="outlined"
                />
                <TextField 
                    onChange={handleUpdateNewBookmark} 
                    className="input"
                    id="category" 
                    name="category" 
                    label="Category" 
                    error ={helperText.category.length === 0 ? false : true }
                    helperText={helperText.category}
                    value={newBookmark.category}
                    size = "small"
                    required 
                    variant="outlined"
                />
                <TextField 
                    onChange={handleUpdateNewBookmark} 
                    className="input"
                    id="url" 
                    name="url" 
                    label="URL" 
                    error ={helperText.url.length === 0 ? false : true }
                    helperText={helperText.url}
                    value={newBookmark.url}
                    size = "small"
                    sx={{ margin: 2 }}
                    required 
                    variant="outlined"
                />
                <div className="icon-wrapper">
                    <AddCircleOutline onClick={handleCreateNewBookmark} ></AddCircleOutline>
                </div>
            </form>
            <div className="filter-wrapper">
                <TextField
                className="input"
                    id="category"
                    name="category" 
                    value={category}
                    label="Category"
                    select // tell TextField to render select
                    onChange={(e) => {setCategory(e.target.value)}}
                    variant="outlined"
                >
                    { categories.map( (elem, index) => {
                        return(
                            <MenuItem key={index} value={elem._id}>{elem._id}</MenuItem>
                        )
                    })}
                </TextField>
            </div>
            <div className="table-wrapper">
                <Table className="bookmark-table" size="small" >
                    <TableHead>
                        <TableRow>
                            <TableCell  >Name</TableCell  >
                            <TableCell  >Category</TableCell  >
                            <TableCell  >URL</TableCell  >
                            <TableCell  ></TableCell  >
                        </TableRow>
                    </TableHead>
                    <TableBody  >
                        { bookmarks.map( (elem, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell >{elem.name}</TableCell >
                                        <TableCell >{elem.category}</TableCell >
                                        <TableCell ><a href={elem.url}>{elem.url}</a></TableCell >
                                        <TableCell>
                                        <div className="icon-wrapper">
                                            <DeleteOutline onClick={() => handleDeleteBookmark(elem._id)} ></DeleteOutline>
                                        </div>
                                        </TableCell >
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>              
            </div>
        </div>

    )
}