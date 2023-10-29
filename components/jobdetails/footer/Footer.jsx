import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'

import styles from './footer.style'
import { icons } from '../../../constants'
import { Linking } from 'react-native'

const Footer = ({ url }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.likeBtn}>
                <Image style={styles.likeBtnImage} source={icons.heart} resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.applyBtn}
                onPress={() => {
                    Linking.openURL(url)
                }}
            >
                <Text style={styles.applyBtnText}>Apply the Job</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Footer
