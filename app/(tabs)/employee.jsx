import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import OnLeave from '../../components/OnLeave';
import OnWorkFromHome from '../../components/OnWorkFromHome';
import AllEmployees from '../../components/AllEmployees';

const Employee = () => {
    const viewOptions = {
        all: 'all',
        onLeave: 'onLeave',
        onWFH: 'onWFH',
    };

    const [selectedView, setSelectedView] = useState(viewOptions.all);

    const renderSelectedComponent = () => {
        switch (selectedView) {
            case viewOptions.onLeave:
                return <OnLeave />;
            case viewOptions.onWFH:
                return <OnWorkFromHome />;
            default:
                return <AllEmployees />;
        }
    };

    return (
        <SafeAreaView className='bg-primary h-full'>
            <View className='flex-row justify-between px-4 mt-8'>
                <CustomButton
                    title="All"
                    handlePress={() => setSelectedView(viewOptions.all)}
                    containerStyles={`flex-1 mx-1 ${selectedView === viewOptions.all ? 'bg-secondary-100' : 'bg-gray-500'}`}
                />
                <CustomButton
                    title="Leave"
                    handlePress={() => setSelectedView(viewOptions.onLeave)}
                    containerStyles={`flex-1 mx-1 ${selectedView === viewOptions.onLeave ? 'bg-secondary-100' : 'bg-gray-500'}`}
                />
                <CustomButton
                    title="WFH"
                    handlePress={() => setSelectedView(viewOptions.onWFH)}
                    containerStyles={`flex-1 mx-1 ${selectedView === viewOptions.onWFH ? 'bg-secondary-100' : 'bg-gray-500'}`}
                />
            </View>
            {renderSelectedComponent()}
        </SafeAreaView>
    );
}

export default Employee