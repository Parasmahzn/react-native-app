import React from 'react'
import { DataTable } from 'react-native-paper'
import { formatDate, getTime12Hour } from '../lib/dateUtils';

const PunchInCard = ({ data: { calanderDate, punchInAt, punchOutAt, description: punchInRemarks, punchOutDescription: punchOutRemarks, hoursLogged }, serialNumber }) => {
    return (
        <DataTable.Row className='border-b border-gray-200 bg-slate-500'>
            <DataTable.Cell className='text-[10px] mb-2 text-white font-psemibold'>
                {serialNumber}
            </DataTable.Cell>

            <DataTable.Cell className='text-[10px] mb-2 text-white font-psemibold'>
                {formatDate(calanderDate, 'DD MMM YYYY')}
            </DataTable.Cell>

            <DataTable.Cell className='text-[10px] mb-2 text-white font-psemibold'>
                {getTime12Hour(punchInAt)}
            </DataTable.Cell>

            <DataTable.Cell className='text-[10px] mb-2 text-white font-psemibold'>
                {!punchOutAt || getTime12Hour(punchOutAt)}
            </DataTable.Cell>

            <DataTable.Cell className='text-[10px] mb-2 text-white font-psemibold truncate'>
                {punchInRemarks}
            </DataTable.Cell>

            <DataTable.Cell className='text-[10px] mb-2 text-white font-psemibold truncate'>
                {punchOutRemarks}
            </DataTable.Cell>

            <DataTable.Cell className='text-[10px] mb-2 text-white font-psemibold'>
                {hoursLogged}
            </DataTable.Cell>
        </DataTable.Row>
    )
}

export default PunchInCard