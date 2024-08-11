import { View, Text } from 'react-native'

const LeaveCard = ({ leave: { name, allowedDays } }) => {
    return (
        <View className='flex-col items-center px-4 mb-14'>
            <View className='flex-row gap-3 items-start'>
                <View className='justify-center items-center flex-row flex-1'>
                    <View className='w-[46px] h-[46px] rounded-full border border-secondary justify-center items-center'>
                        <Text className='text-white font-psemibold text-xl'>
                            {allowedDays}
                        </Text>
                    </View>
                    <View className='justify-center flex-1 ml-3 gap-y-1'>
                        <Text className='text-white font-psemibold text-lg' numberOfLines={1}>
                            {name}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default LeaveCard
