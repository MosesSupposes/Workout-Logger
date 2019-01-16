import WorkoutLoggerList from '../ui/WorkoutLoggerList'
import { connect } from 'react-redux'
import { removeDay, updateStreak } from '../../actionCreators'

const mapStateToProps = (state, props) => 
    ({
        days: state.allWorkoutDays,
        filter: props.params.filter,
    })

const mapDispatchToProps = dispatch => 
    ({
        onRemoveDay(date) {
            dispatch(removeDay(date))
            dispatch(updateStreak())
        }
    })

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutLoggerList)
