import React, { useState } from 'react'
import { formatDate, getDayName, getTime12Hour } from '../lib/dateUtils';
import { Text, TouchableOpacity, View } from 'react-native';

const PunchInCard = ({ data: { calanderDate, punchInAt, punchOutAt, description: punchInRemarks, punchOutDescription: punchOutRemarks, hoursLogged } }) => {
    const [showDetails, setShowDetails] = useState(false);

    const notAvailable = 'N/A';
    return (
        <TouchableOpacity
            className="bg-gray-800 p-4 m-2 rounded-lg shadow"
            onPress={() => setShowDetails(!showDetails)}
        >
            <View className="mb-1 pb-1">
                <Text className="text-xl text-white text-center font-psemibold">{formatDate(calanderDate, 'DD MMM YYYY')}</Text>
                <Text className="text-sm text-white text-center font-psemibold">{getDayName(calanderDate)}</Text>
                <View className="flex-row justify-between mt-2 mb-1">
                    <Text className="text-sm text-gray-300">Punch In:</Text>
                    <Text className="text-sm text-gray-300">{getTime12Hour(punchInAt)}</Text>
                </View>
                <View className="flex-row justify-between">
                    <Text className="text-sm text-gray-300">Punch Out:</Text>
                    <Text className="text-sm text-gray-300">{punchOutAt ? getTime12Hour(punchOutAt) : notAvailable}</Text>
                </View>

            </View>

            {showDetails && (
                <View>
                    <View className="bg-gray-700 p-2 rounded-lg mt-2">
                        <Text className="text-lg text-white font-semibold mb-1">Remarks</Text>
                        <View className="flex-row justify-between mb-2">
                            <Text className="text-gray-400 text-sm font-medium">Punch In:</Text>
                            <Text className="text-gray-300 text-sm">{punchInRemarks || notAvailable}</Text>
                        </View>
                        <View className="flex-row justify-between mb-2">
                            <Text className="text-gray-400 text-sm font-medium">Punch Out:</Text>
                            <Text className="text-gray-300 text-sm">{punchOutRemarks || notAvailable}</Text>
                        </View>

                    </View>
                    <View className="bg-gray-700 p-2 rounded-lg mt-2 items-center">
                        <Text className="text-lg text-white font-semibold mb-1">Total Hours</Text>
                        <Text className="text-gray-300 text-sm text-center">{hoursLogged || notAvailable}</Text>
                    </View>
                </View>
            )}
        </TouchableOpacity>
    );
}

export default PunchInCard