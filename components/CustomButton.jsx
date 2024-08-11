import { View, Text, TouchableOpacity } from 'react-native'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading }) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className={`bg-secondary-100 rounded-xl 
            min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
            disabled={isLoading}
        >
            <View>
                <Text className={`font-psemibold text-lg ${textStyles}`}>
                    {title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default CustomButton