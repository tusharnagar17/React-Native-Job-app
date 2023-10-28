import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'

import styles from './popularjobs.style'

import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import { COLORS, SIZES } from '../../../constants'
import { useRouter } from 'expo-router'
import useFetch from '../../../hook/useFetch'

const Popularjobs = () => {
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
        router.push(`/job-details/${item.job_id}`)
        setSelectedJob(item.job_id)
    }
    function calling(place) {
        console.log(`called at ${place}`)
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Popular Jobs</Text>
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
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <PopularJobCard
                                item={item}
                                selectedJob={selectedJob}
                                handleCardPress={handleCardPress}
                            />
                        )}
                        keyExtractor={(item) => item.job_id}
                        contentContainerStyle={{ columnGap: SIZES.small }}
                        horizontal
                    />
                )}
            </View>
        </View>
    )
}

export default Popularjobs
