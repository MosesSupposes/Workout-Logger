import GoalProgress from '../ui/GoalProgress'
import { connect } from 'react-redux'
import { setGoal } from '../../actionCreators'

const mapStateToProps = state => 
    ({
        current: state.allWorkoutDays.length,
        goal: state.goal
    })

const mapDispatchToProps = dispatch => 
    ({
        onNewGoal(goal) {
            dispatch(setGoal(goal))
        }
    })

export default connect(mapStateToProps, mapDispatchToProps)(GoalProgress)
