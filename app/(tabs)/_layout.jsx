import React from 'react'
import { Tabs } from 'expo-router'
import { Image, Text, View } from 'react-native'
import { icons } from '../../constants/';

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className='items-center justify-center gap-1'>
            <Image
                source={icon}
                resizeMode='contain'
                tintColor={color}
                className='w-6 h-6'
            />
            <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
                style={{ color: color }}
            >
                {name}
            </Text>
        </View>
    )
}

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#FFA001',
                    tabBarInactiveTintColor: '#CDCDE0',
                    tabBarStyle: {
                        backgroundColor: '#161622',
                        borderTopWidth: 1,
                        borderTopColor: '#232533',
                        height: 84,
                    }
                }}
            >
                <Tabs.Screen name='home' options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.home}
                            color={color}
                            name="Home"
                            focused={focused}
                        />
                    )
                }} />

                <Tabs.Screen name='on-leave' options={{
                    title: 'Leave',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.onLeave}
                            color={color}
                            name="Leave"
                            focused={focused}
                        />
                    )
                }} />

                <Tabs.Screen name='on-work-from-home' options={{
                    title: 'WFH',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.wfh}
                            color={color}
                            name="WFH"
                            focused={focused}
                        />
                    )
                }} />

                <Tabs.Screen name='profile' options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.profile}
                            color={color}
                            name="Profie"
                            focused={focused}
                        />
                    )
                }} />

            </Tabs>
        </>
    )
}

export default TabsLayout