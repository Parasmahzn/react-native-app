import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const EmployeeCard = ({ serialNumber, employee: { fullName, email, designation, contactNumber } }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <View className='px-4 mb-1'>
            <TouchableOpacity
                onPress={() => setIsExpanded(!isExpanded)}
                className={`bg-gray-800 rounded-lg p-4 ${isExpanded ? 'border-2 border-yellow-500' : 'border-transparent'}`}
            >
                <View className='flex-row items-center'>
                    <View className='w-[35px] h-[35px] rounded-full border border-secondary justify-center items-center'>
                        <Text className='text-white font-psemibold text-xl'>
                            {serialNumber}
                        </Text>
                    </View>
                    <View className='ml-3 flex-1'>
                        <Text className='text-white font-psemibold text-lg' numberOfLines={1}>
                            {fullName}
                        </Text>
                    </View>
                </View>
                {isExpanded && (
                    <View className='mt-2 mx-6'>
                        <Text className='text-gray-400 text-sm'>
                            Email: {email}
                        </Text>
                        <Text className='text-gray-400 text-sm'>
                            Designation: {designation?.name}
                        </Text>
                        <Text className='text-gray-400 text-sm'>
                            Contact: {contactNumber}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default EmployeeCard;
