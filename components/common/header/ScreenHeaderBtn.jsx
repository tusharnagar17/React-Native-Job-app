import React from "react"
import { View, Text, TouchableOpacity, Image } from "react-native"

import styles from "./screenheader.style"
import { SIZES } from "../../../constants"

const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress }) => {
    return (
        <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
            <Image source={iconUrl} resizeMode="cover" style={styles.btnImg(dimension)} />
        </TouchableOpacity>
    )
}

export default ScreenHeaderBtn
