import { useLocalSearchParams } from 'expo-router'
import { View, Text, ActivityIndicator } from 'react-native'
import { Company, ScreenHeaderBtn, JobTabs } from '../../components'
import { Stack, useRouter } from 'expo-router'
import { ScrollView, SafeAreaView } from 'react-native'
import { useCallback, useState } from 'react'
import useFetch from '../../hook/useFetch'
import { COLORS, SIZES, icons } from '../../constants'
import { About, Specifics } from '../../components/jobdetails/about/About'
import Footer from '../../components/jobdetails/footer/Footer'
import Tabs from '../../components/jobdetails/tabs/Tabs'

const tabs = ['About', 'Qualification', 'Responsibilities']

const jobdetails = () => {
    const router = useRouter()
    const params = useLocalSearchParams()
    const { data, isLoading, error, reFetch } = useFetch('job-details', { job_id: params.id })
    const [activeTab, setActiveTab] = useState(tabs[0])

    // const displayTab= (activeTab) =>{
    //     switch (activeTab) {
    //         case "About":
    //             return (<About info={data[0].job_description ?? "No data provided"} />),
    //         case "Qualification": return (<Specifics title="Qualification" points={}/>)
    //     }
    // }
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.lightWhite, flex: 1 }}>
            <Stack.Screen
                options={{
                    headerTitle: '',
                    headerShadowVisible: false, // this is for helping turn that to be false.
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension="60%"
                            handlePress={() => router.back()}
                        />
                    ),
                    headerRight: () => <ScreenHeaderBtn iconUrl={icons.share} dimension="50%" />,
                }}
            />
            <ScrollView>
                {/*  1. compnay logo+job-type+location+ 2. tab [active, non-active] */}
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ) : error ? (
                    <Text>Something went wrong</Text>
                ) : data.length === 0 ? (
                    <Text>No data available</Text>
                ) : (
                    <View style={{ padding: SIZES.medium }}>
                        <Company
                            jobTitle={data[0]?.job_title}
                            companyLogo={data[0]?.employer_logo}
                            companyName={data[0]?.employer_name}
                            location={data[0]?.job_country}
                        />
                        <Tabs activeTab={activeTab} tabs={tabs} setActiveTab={setActiveTab} />
                    </View>
                )}
            </ScrollView>
            <Footer />
        </SafeAreaView>
    )
}

export default jobdetails
