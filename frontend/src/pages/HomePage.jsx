import React from 'react'
import Navbar from "../components/Navbar"
import { useState } from 'react'
import RateLimitedUI from '../components/RateLimitedUI';
import { useEffect } from 'react';

const HomePage = () => {

    const [isRateLimited, setIsRateLimited] = useState(false);
    const [snippet, setSnippents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSnippets = async () => {
            try {
                const res = await fetch("https://localhost5001/api/snippets")
            } catch (error) {
                console.log("Error fetching the notes")
            }
        }
    },[])

    return (
        <div className ="min-h-screen">
            <Navbar/>
            {isRateLimited && <RateLimitedUI/>}
        </div>
    )
}

export default HomePage
