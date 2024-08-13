import { View, Text } from 'react-native'
import React from 'react'

const ErrorState = ({ message, title = 'Error' }) => {
    return (
        <View className="flex-1 justify-center items-center">
            <Text className="text-white text-lg font-bold mb-2">{title}</Text>
            <Text className="text-white text-base">{message}</Text>
        </View>
    )
}

export default ErrorState