import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'
import { icons, SIZES } from '../../../constants'

import styles from './welcome.style'
import { useRouter } from 'expo-router'

const JobsTypes = ['full-time', 'part-time', 'contract']

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
    const router = useRouter()
    const [activeJobs, setActiveJob] = React.useState('full-time')
    // const [inputValue, setInputValue] = React.useState('Search')
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.userName}>Hello Tushar</Text>
                <Text style={styles.welcomeMessage}>Find your perfect job</Text>
            </View>
            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        onChangeText={(text) => setSearchTerm(text)}
                        value={searchTerm}
                        placeholder="what are looking for?"
                    />
                </View>
                <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>
                    <Image
                        style={styles.searchBtnImage}
                        source={icons.search}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.tabsContainer}>
                {/* using Flatlist to pass activejobs, tyles */}
                <FlatList
                    data={JobsTypes}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.tab(activeJobs, item)}
                            onPress={() => {
                                setActiveJob(item)
                                router.push(`/search/${item}`)
                            }}
                        >
                            <Text style={styles.tabText(activeJobs, item)}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item}
                    contentContainerStyle={{ columnGap: SIZES.small }}
                    horizontal
                />
            </View>
        </View>
    )
}

export default Welcome
