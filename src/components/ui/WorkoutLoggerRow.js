import { PropTypes } from 'react'

// const today = new Date();
const WorkoutLoggerRow = ({ target = 'rest day', date = '2019-01-12', supplementalRun = false, milesRan = 0, onRemoveDay=f=>f }) => {
    return (
        <tr onDoubleClick={() => onRemoveDay(date)}>
            <td>
                {date}
                {/* {date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()} */}
            </td>
            <td>
                {target}
            </td>
            <td>
                {(supplementalRun) ? `🏃🏿 (${milesRan} mi.)` : null}
            </td>
        </tr>
    )
}

WorkoutLoggerRow.propTypes = {
    target: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    // date: PropTypes.instanceOf(Date).isRequired,
    supplementalRun: PropTypes.bool,
    milesRan: PropTypes.number,
    streak: PropTypes.array
}

export default WorkoutLoggerRow