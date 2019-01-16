import WorkoutLoggerRow from './WorkoutLoggerRow'
import { PropTypes } from 'react'
import { Link } from 'react-router'
import '../../stylesheets/WorkoutLoggerList.scss'

export function conformFilterToAPI(filterString) {
    // filterString should look like this: "leg-days"
    // we want it to look like this: "leg day"
    return filterString.split('')
        // replace the hyphens with spaces
        .map(letter => letter.replace('-', ' '))
        // remove the last letter (should be an 's')
        .slice(0,-1) 
        .join('')
}

export default function WorkoutLoggerList({days, filter, onRemoveDay=f=>f}) {
    const acceptedFilters = /leg-day|core-day|chest-and-arm-day|calisthenics-day|running-only-day/gi

    const filteredDays = (!filter || !filter.match(acceptedFilters)) ?
        days : 
        days.filter(day => day.target === conformFilterToAPI(filter))

    const activeFilterStyle = {
        textDecoration: 'none',
        color: 'black'
    }
    return (
        <div className="workout-routine-list">
            <nav className="filters">
                <ul>
                    <li>
                        <Link to="/list-days" style={(!filter) ? activeFilterStyle : null}>
                            All Days
                        </Link>
                    </li>
                    <li>
                        <Link to="/list-days/leg-days" activeStyle={activeFilterStyle}>
                            Leg Days
                        </Link>
                    </li>
                    <li>
                        <Link to="/list-days/core-days" activeStyle={activeFilterStyle}>
                            Core Days
                        </Link>
                    </li>
                    <li>
                        <Link to="/list-days/chest-and-arm-days" activeStyle={activeFilterStyle}>
                            Chest And Arm Days
                        </Link>
                    </li>
                    <li>
                        <Link to="/list-days/calisthenics-days" activeStyle={activeFilterStyle}>
                            Calisthenics days
                        </Link>
                    </li>
                    <li>
                        <Link to="/list-days/running-only-days" activeStyle={activeFilterStyle}>
                            Running Only Days
                        </Link>
                    </li>
                </ul>
            </nav>

            <table>
                <caption>double click to remove</caption>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Target</th>
                        <th>Supplemental Run</th>
                    </tr>
                </thead>
                
                <tbody>
                    {filteredDays.map((day, i) => 
                        <WorkoutLoggerRow key={i}
                        {...day}
                        onRemoveDay={onRemoveDay} />
                        )}
                </tbody>
            </table>
        </div>
    )
}

WorkoutLoggerList.propTypes = {
    filter: PropTypes.oneOf(['core-days', 'leg-days', 'calisthenics-days', 'running-only-days', 'chest-and-arm-days']),
    onRemoveDay: PropTypes.func,
    days: (props) => (!Array.isArray(props.days)) ?
        new Error("WorkoutLoggerList days property must be an array") :
        (!props.days.length) ?
            new Error("WorkoutLoggerList days array must contain at least one record") :
            null
}
