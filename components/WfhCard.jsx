import { View, Text } from 'react-native';

const WorkFromHomeCard = ({ serialNumber, leave: { userName, designation, fromDate, toDate, reason, noOfDays, shift } }) => {

    return (
        <View className='flex-col items-center px-4 mb-8'>
            <View className='flex-row gap-3 items-start'>
                <View className='justify-center items-center flex-row flex-1'>
                    <View className='w-[46px] h-[46px] rounded-full border border-secondary justify-center items-center'>
                        <Text className='text-white font-psemibold text-xl'>
                            {serialNumber}
                        </Text>
                    </View>
                    <View className='justify-center flex-1 ml-3 gap-y-1'>
                        <Text className='text-white font-psemibold text-lg' numberOfLines={1}>
                            {userName}
                        </Text>
                        {/* Add additional fields as needed */}
                        <Text className='text-gray-400 text-sm'>
                            {designation}
                        </Text>
                        <Text className='text-gray-400 text-sm'>
                            Reason: {reason}
                        </Text>
                        <Text className='text-gray-400 text-sm'>
                            From: {new Date(fromDate).toLocaleDateString()}
                        </Text>
                        <Text className='text-gray-400 text-sm'>
                            To: {new Date(toDate).toLocaleDateString()}
                        </Text>
                        <Text className='text-gray-400 text-sm'>
                            Total Days : {noOfDays} {shift}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default WorkFromHomeCard;
