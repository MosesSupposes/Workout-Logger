import WorkoutLoggerCount from '../ui/WorkoutLoggerCount'
import { connect } from 'react-redux'
import { targetsMod, calculateTotalMiles, tallyDays as tallyDaysWithFilter } from '../ui/App'

const mapStateToProps = state => 
    ({    
        totalWorkouts: state.allWorkoutDays.length,
        targets: targetsMod.tallyTargets(state.allWorkoutDays),
        streakInfo: [state.streakInfo.onStreak, state.streakInfo.currentStreak],
        supplementalRuns: tallyDaysWithFilter(state.allWorkoutDays, 'supplementalRun'),
        totalMiles: calculateTotalMiles(state.allWorkoutDays)
    })

export default connect(mapStateToProps)(WorkoutLoggerCount)
