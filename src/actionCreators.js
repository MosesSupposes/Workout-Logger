import C from './constants'

export function addDay(target='rest day', date=new Date(), supplementalRun=false, milesRan=0) { 
    console.log(date)
    return {
        type: C.ADD_DAY, 
        payload: {target, date, supplementalRun, milesRan}
    } 
}

export function removeDay(day)  { 
    return {
        type: C.REMOVE_DAY, 
        payload: day 
    }
}

export function setGoal(goal) {
    return {
        type: C.SET_GOAL, 
        payload: goal 
    }
}

export function addError(error) {
    return {
        type: C.ADD_ERROR,
        payload: error
    }
}

export function clearError(error) {
    return {
        type: C.CLEAR_ERROR,
        payload: error
    }
}

export function fetchWorkoutTargets() {
    return {
        type: C.FETCH_WORKOUT_TARGETS
    }
}

export function cancelFetching() {
    return {
        type: C.CANCEL_FETCHING
    }
}

export function changeSuggestions(suggestions) {
    return {
        type: C.CHANGE_SUGGESTIONS,
        payload: suggestions
    }
}

export function clearSuggestions() {
    return {
        type: C.CLEAR_SUGGESTIONS,
    }
}

// Thunks 

export function updateStreak() {
    return function updateStreakThunk(dispatch, getState) {
        const allWorkoutDays = getState().allWorkoutDays
        const streakInfo = getState().streakInfo
        dispatch({
            type: C.UPDATE_STREAK,
            payload: {
                allWorkoutDays,
                streakInfo
            }
        })
    }
}

export function suggestTargetNames(value) {
    return function(dispatch) {
        dispatch(fetchWorkoutTargets())
        fetch(`http://localhost:3333/workout-targets/${value}`)
            .then(res => res.json())
            .then(suggestions => {
                dispatch(changeSuggestions(suggestions))
            })
            .catch(error => {
                dispatch(addError(error.message))
                dispatch(cancelFetching())
            })
    }
}