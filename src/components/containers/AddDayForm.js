import AddDayForm from '../ui/AddDayForm'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { addDay, suggestTargetNames, clearSuggestions, updateStreak } from '../../actionCreators'

const mapStateToProps = (state, props) => 
    ({
        suggestions: state.workoutTargetNames.suggestions,
        fetching: state.workoutTargetNames.fetching,
        router: props.router
    })

const mapDispatchToProps = dispatch => 
    ({
        addDay({target, date, supplementalRun, milesRan}) {
            dispatch(addDay(target, date, supplementalRun, parseInt(milesRan)))
        },
        onChange(value) {
            (value) 
                ? dispatch(suggestTargetNames(value)) 
                : dispatch(clearSuggestions())
        },
        onClear() {
            dispatch(clearSuggestions())
        },
        updateStreak() {
            dispatch(updateStreak())
        }
    })

const Container = connect(mapStateToProps, mapDispatchToProps)(AddDayForm)


export default withRouter(Container)