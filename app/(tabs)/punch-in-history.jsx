import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import EmptyState from '../../components/EmptyState'

const PunchInHistory = () => {
    return (
        <SafeAreaView className='bg-primary h-full'>
            <View>
                <EmptyState title={'Punch In History'} subtitle={'No records found'} />
            </View>
        </SafeAreaView>
    )
}

export default PunchInHistory