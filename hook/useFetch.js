import axios from 'axios'
import { useState, useEffect } from 'react'
import { RAPID_API_KEY } from '@env'

const rapid_api_key = RAPID_API_KEY

const useFetch = (endpoint, query) => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'X-RapidAPI-Key': rapid_api_key,
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
