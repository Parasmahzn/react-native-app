import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const WorkFromHomeCard = ({ serialNumber, leave: { userName, designation, fromDate, toDate, reason, noOfDays, shift } }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <View className='px-4 mb-1'>
            <TouchableOpacity
                onPress={() => setIsExpanded(!isExpanded)}
                className={`bg-gray-800 rounded-lg p-4 ${isExpanded ? 'border-2 border-yellow-500' : 'border-transparent'}`}
            >
                <View className='flex-row items-center'>
                    <View className='w-[30px] h-[30px] rounded-full border border-secondary justify-center items-center'>
                        <Text className='text-white font-psemibold text-xl'>
                            {serialNumber}
                        </Text>
                    </View>
                    <View className='ml-3 flex-1'>
                        <Text className='text-white font-psemibold text-lg' numberOfLines={1}>
                            {userName}
                        </Text>
                    </View>
                </View>

                {/* Conditionally render the additional details */}
                {isExpanded && (
                    <View className='mt-2 mx-6'>
                        <Text className='text-gray-400 text-sm'>
                            Designation: {designation}
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
                            Total Days: {noOfDays} {shift}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default WorkFromHomeCard;
