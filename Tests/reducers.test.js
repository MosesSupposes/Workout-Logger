import C from '../src/constants'
import { fetching } from '../src/store/reducers'

describe('fetching', () => {
    const action = {
        type: C.FETCH_WORKOUT_TARGETS
    }

    const state = false
    const expectedState = true
    
    const actualState = fetching(state, action)

    it('should match expected state', () => {
        expect(actualState).toEqual(expectedState)
    })
})