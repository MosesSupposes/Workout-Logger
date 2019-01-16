import C from '../constants'
import { combineReducers } from 'redux'
import initialState from '../initialState.json'

// TODO: Create updateStreak reducer and call it every time the action is C.ADD_DAY or C.REMOVE_DAY

export const goal = (state=365, action) => 
    (action.type === C.SET_GOAL) ? 
        parseInt(action.payload) : 
        state
        
export const errors = (state=[], action) => {
    switch(action.type) {
        case C.ADD_ERROR:
            return [...state, action.payload]
        case C.CLEAR_ERROR:
            return state.filter(
                (message, i) => i !== action.payload
            )
        default: 
            return state
    }
}

// helper for allWorkoutDays reducer
export const addWorkoutDay = (state=null, action) => 
    (action.type === C.ADD_DAY) ? 
        action.payload : 
        state

export const allWorkoutDays = (state=[], action) => {
    switch(action.type) {
        case C.ADD_DAY: 
            const stateAlreadyHasDay = state.some(
                workoutDay => workoutDay.date === action.payload.date
            )
            return (stateAlreadyHasDay) ? 
                state :
                [
                    ...state,
                    addWorkoutDay(null, action)
                ]
        case C.REMOVE_DAY:
                return state.filter(workoutDay => workoutDay.date !== action.payload)
        default: 
            return state
    }
}

export const fetching = (state=false, action) => {
    switch(action.type) {
        case C.FETCH_WORKOUT_TARGETS:
            return true
        case C.CANCEL_FETCHING:
            return false
        case C.CHANGE_SUGGESTIONS:
            return false
        default: 
            return state
        
    }
}

export const suggestions = (state=null, action) => {
    switch(action.type) {
        case C.CLEAR_SUGGESTIONS:
            return []
        case C.CHANGE_SUGGESTIONS:
            return action.payload
        default: 
            return state
    }
}

// helper for streakInfo reducers
export const updateStreak = (state, action) => {

    let { allWorkoutDays, streakInfo: { currentStreak, onStreak, highestStreak} } = action.payload
        
    const checkForConsecutiveWorkouts = (yesterday, today) => {
        switch(yesterday) {
            case 31:
                return today === 1 && true
            case 30: 
                return today === 1 && true
            case 28:
                return today === 1 && true
            default: 
                return today - yesterday === 1 && true
        }
    }
        
    const extractDayFromDate = date => {
        // the date param comes from the date property on state.allWorkoutDays.
        // the default format for that is '2019-01-12'. The following line extracts the last two digits (the day)
        let day = date.split('-')[2]
        // formatDate takes the day (a string) and checks if the first character is a 0.
        // If so, it parses the second character as an int and returns it, otherwise it parses both characters as an int and returns it.
        const formatDate = date => date.split('')[0].includes('0') ? parseInt(date[1]) : parseInt(date)
        return formatDate(day)
    }

    const discoverHigestStreak = streak => {
        if (streak > highestStreak) {
            highestStreak = streak;
        }
        return highestStreak
    }
    

    const streakRecord = allWorkoutDays.reduce((streakInfoCollection, currentDay) => {
        let yesterday = extractDayFromDate(streakInfoCollection.slice(-1).pop().previousDay.date)
        let today = extractDayFromDate(currentDay.date)
        let onStreak = (() => checkForConsecutiveWorkouts(yesterday, today))()
        let streakCount = (() => {
            onStreak ? currentStreak++ : currentStreak = 1
            return currentStreak
        })()
    
        streakInfoCollection.push({
            previousDay: currentDay,
            onStreak,
            streakCount
        })
        return streakInfoCollection
    }, [
            {
                previousDay: {date: allWorkoutDays.slice(-1).pop().date || new Date()}, 
                onStreak,
                streakCount: currentStreak
            }
        ]
    )
    const lastRecord = streakRecord.slice(-1).pop()
    return {
        onStreak: lastRecord.onStreak,
        currentStreak: lastRecord.streakCount,
        highestStreak: discoverHigestStreak(lastRecord.streakCount)
    } 
}

export const onStreak = (state=false, action) => {
    if (action.type === C.UPDATE_STREAK) {
        const streakInfo = updateStreak(null, action)
        return streakInfo.onStreak
    } else {
        return state
    }
}

export const currentStreak = (state=0, action) => {
    if (action.type === C.UPDATE_STREAK) {
        const streakInfo = updateStreak(null, action)
        return streakInfo.currentStreak
    } else {
        return state
    }
}

export const highestStreak = (state=0, action) => {
    if (action.type === C.UPDATE_STREAK) {
        const streakInfo = updateStreak(null, action)
        return streakInfo.highestStreak
    } else {
        return state
    }
}

export default combineReducers({
    allWorkoutDays,
    streakInfo: combineReducers({
        onStreak,
        currentStreak,
        highestStreak
    }),
    goal,
    errors,
    workoutTargetNames: combineReducers({
        fetching,
        suggestions
    })
})