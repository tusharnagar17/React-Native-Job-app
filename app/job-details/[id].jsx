import { useLocalSearchParams } from 'expo-router'
import { View, Text, ActivityIndicator } from 'react-native'
import { Company, ScreenHeaderBtn, JobTabs } from '../../components'
import { Stack, useRouter } from 'expo-router'
import { ScrollView, SafeAreaView } from 'react-native'
import { useCallback, useState } from 'react'
import useFetch from '../../hook/useFetch'
import { COLORS, SIZES, icons } from '../../constants'
import { JobAbout, Specifics } from '../../components/'
import Footer from '../../components/jobdetails/footer/Footer'
import Tabs from '../../components/jobdetails/tabs/Tabs'

const tabs = ['About', 'Qualifications', 'Responsibilities']

const jobdetails = () => {
    const router = useRouter()
    const params = useLocalSearchParams()
    const { data, isLoading, error, reFetch } = useFetch('job-details', { job_id: params.id })
    const [activeTab, setActiveTab] = useState(tabs[0])

    const displayTab = () => {
        switch (activeTab) {
            case 'About':
                return <JobAbout info={data[0].job_description ?? 'No data provided'} />
            case 'Qualification':
                return (
                    <Specifics
                        title="Qualification"
                        points={data[0].job_highlights.Qualifications ?? ['N/A']}
                    />
                )
            case 'Responsibilities':
                return (
                    <Specifics
                        title="Responsibilities"
                        points={data[0].Responsibilities ?? ['N/A']}
                    />
                )
            default:
                return null
        }
    }
    const displayTabContent = () => {
        switch (activeTab) {
            case 'Qualifications':
                return (
                    <Specifics
                        title="Qualifications"
                        points={data[0].job_highlights?.Qualifications ?? ['N/A']}
                    />
                )

            case 'About':
                return <JobAbout info={data[0].job_description ?? 'No data provided'} />

            case 'Responsibilities':
                return (
                    <Specifics
                        title="Responsibilities"
                        points={data[0].job_highlights?.Responsibilities ?? ['N/A']}
                    />
                )

            default:
                return null
        }
    }
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
                        {displayTabContent()}
                    </View>
                )}
            </ScrollView>
            <Footer />
        </SafeAreaView>
    )
}

export default jobdetails
