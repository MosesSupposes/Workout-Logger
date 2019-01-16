import C from '../constants'
import rootReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const consoleMessages = store => next => action => {
    let result
    
    console.groupCollapsed(`dispatching action => ${action.type}`)
    console.log(
        `Before state change: workout days: ${store.getState().allWorkoutDays.length}
        streak: ${store.getState().streakInfo.currentStreak}`
        )

    // code above this line takes place before action is dispatched
    result = next(action)
    // code below this line takes place after action is dispatched
    let {allWorkoutDays, goal, errors, workoutTargetNames, streakInfo: { currentStreak } } = store.getState()

    console.log('After state change:',`
    
        workout days: ${allWorkoutDays.length}
        goal: ${goal}
        streak: ${currentStreak}
        fetching: ${workoutTargetNames.fetching}
        suggestions: ${workoutTargetNames.suggestions}
        errors: ${errors.length}
        
    `)
    console.groupEnd()

    return result
}

export default (initialState={}) => {
    return applyMiddleware(thunk, consoleMessages)(createStore)(rootReducer, initialState)
}

