import React from 'react'
import { View, Text, Image } from 'react-native'
import { checkImageURL } from '../../../utils'
import styles from './company.style'
import { icons } from '../../../constants'

const Company = ({ jobTitle, companyLogo, companyName, location }) => {
    return (
        <View style={styles.container}>
            <View style={styles.logoBox}>
                <Image
                    source={{
                        uri: checkImageURL(companyLogo)
                            ? companyLogo
                            : 'https://t4.ftcdn.net/jpg/05/05/61/73/360_F_505617309_NN1CW7diNmGXJfMicpY9eXHKV4sqzO5H.jpg',
                    }}
                    style={styles.logoImage}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.jobTitleBox}>
                <Text style={styles.jobTitle}>{jobTitle}</Text>
                <View style={styles.companyInfoBox}>
                    <Text style={styles.companyName}>{companyName} /</Text>
                    <View style={styles.locationBox}>
                        <Image
                            style={styles.locationImage}
                            source={icons.location}
                            resizeMethod="contain"
                        />
                        <Text style={styles.locationName}>{location}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Company
