import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'

import styles from './nearbyjobs.style'

import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard'
import { COLORS, SIZES } from '../../../constants'
import { useRouter } from 'expo-router'
import useFetch from '../../../hook/useFetch'

const Nearbyjobs = () => {
    const [selectedJob, setSelectedJob] = useState()
    const router = useRouter()
    const [tushar, setTushar] = useState('tushar nagar')
    const { data, isLoading, error } = useFetch('search', {
        query: 'React Native',
        num_pages: 1,
    })

    // console.log(data)
    // console.log(error)

    function handleCardPress({ item }) {
        router.push(`/`)
        setSelectedJob(item.job_id)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Nearby Jobs</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>Show all</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cardsContainer}>
                {/* console.log("tushar") */}
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ) : error ? (
                    <Text>Something Went Wrong</Text>
                ) : (
                    data?.map((job) => (
                        <NearbyJobCard
                            job={job}
                            key={`/near-by-${job.job_id}`}
                            handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
                        />
                    ))
                )}
            </View>
        </View>
    )
}

export default Nearbyjobs
