import { SafeAreaView, View, Text, Button, ScrollView, TouchableOpacity } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { useState } from 'react'
import { COLORS, SIZES, icons, images } from '../constants'
import { Welcome, Popularjobs, Nearbyjobs, ScreenHeaderBtn } from '../components'

const Home = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.lightWhite, flex: 1 }}>
            <Stack.Screen
                options={{
                    headerTitle: '',
                    headerShadowVisible: true, // this is for helping turn that to be false.
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerLeft: () => <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />,
                    headerRight: () => (
                        <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
                    ),
                }}
            />
            <ScrollView>
                <View style={{ padding: SIZES.medium }}>
                    <Welcome
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleClick={() => {
                            if (searchTerm) {
                                router.push(`/search/${searchTerm}`)
                            }
                        }}
                    />
                    <Popularjobs />
                    <Nearbyjobs />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Home
