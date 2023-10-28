import axios from 'axios'
import { useState, useEffect } from 'react'

const useFetch = (endpoint, query) => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'X-RapidAPI-Key': '27fb79905bmsh08c1583108b1fe1p1f0ff4jsn5251161fcc71',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
        },
        params: {
            ...query,
        },
    }
    const fetchData = async () => {
        setIsLoading(true)

        try {
            const response = await axios.request(options)
            setData(response.data.data)
            setIsLoading(false)
        } catch (error) {
            setError(error)
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const reFetch = () => {
        setIsLoading(true)
        fetchData()
    }

    return { data, isLoading, error, reFetch }
}

export default useFetch
