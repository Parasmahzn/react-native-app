import { View, Text } from 'react-native'

const LeaveCard = ({ leave: { leaveName, allowedDays, remainingDays } }) => {
    const daysTaken = allowedDays - remainingDays;
    return (
        <View className="flex-col items-center px-4 mb-6">
            <View className="flex-row gap-3 items-start w-full">
                <View className="justify-center flex-1">
                    <Text className="text-white font-psemibold text-lg">
                        {leaveName}
                    </Text>
                    <Text className="text-gray-400 text-sm">
                        Total Days: {allowedDays}
                    </Text>
                    <Text className="text-gray-400 text-sm">
                        Days Taken: {daysTaken}
                    </Text>
                </View>
                <View className="justify-center items-center">
                    <View className="w-[46px] h-[46px] rounded-full border border-secondary justify-center items-center">
                        <Text className="text-white font-psemibold text-xl">
                            {remainingDays}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default LeaveCard