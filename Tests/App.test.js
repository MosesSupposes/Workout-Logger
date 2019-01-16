
describe('discoverTargetType()', () => {
    const conformTargetToAPI = jest.fn(target => {
        let result = target.split('')
            // if we come across a letter that contains a space, captialize the letter after it
            .reduce((arrOfLetters, letter, i, src) => {
                arrOfLetters.push(letter)
                if (letter.indexOf(' ') > -1) src[i + 1] = src[i + 1].toUpperCase()
                return arrOfLetters
            }, [])
            // remove the spaces
            .filter(letter => letter.indexOf(' ') === -1)
            .concat('s')
            .join('')
            return result
    })
    const discoverTargetType = jest.fn(target => {
        let targetType

        switch(target) {
            case 'leg day': 
                targetType = 'leg day'
                break
            case 'chest and arm day':
                targetType = 'chest and arm day'
                break
            case 'calisthenics day':
                targetType = 'calisthenics day'
                break
            case 'core day':
                targetType = 'core day'
                break
            case 'running only day':
                targetType = 'running only day'
                break
            default: 
                targetType = 'not a valid target'
        }
        return target.indexOf('not a valid target') > -1 ? null : conformTargetToAPI(targetType)
    })
    test('logs imported function', () => {
        expect(discoverTargetType('leg day')).toBeTruthy()
    })
})

describe('updateStreak()', () => {

    const checkForConsecutiveWorkouts = jest.fn((yesterday, today) => {
        switch(yesterday) {
            case 31:
                console.log(today === 1)
                return (today === 1) && true
            case 30: 
                return today === 1 && true
            case 28:
                return today === 1 && true
            default: 
                return today - yesterday === 1 && true
        }
    })
    
    const extractDayFromDate = jest.fn(date => {
        // the date param comes from the date property on this.state.allWorkoutDays.
        // the default format for that is '2019-01-12'. The following line extracts the last two digits (the day)
        let day = date.split('-')[2]
        // formatDate takes the day (a string) and checks if the first character is a 0.
        // If so, it parses the second character as an int and returns it.
        // So, in the case where the param is "06", it will return 6
        const formatDate = date => date.split('')[0].includes('0') ? parseInt(date[1]) : parseInt(date)
        return formatDate(day)
    })

    const updateStreak = jest.fn(() => {

        let streak = state.streakInfo.currentStreak
        
        const streakRecord = state.allWorkoutDays.reduce((streakInfoCollection, currentDay) => {
            let yesterday = extractDayFromDate(streakInfoCollection.slice(-1).pop().previousDay.date)
            let today = extractDayFromDate(currentDay.date)
            let onStreak = (() => checkForConsecutiveWorkouts(yesterday, today))()
            let streakCount = (() => {
                onStreak ? streak++ : streak = 0
                return streak
            })()
            streakInfoCollection.push({
                previousDay: currentDay,
                onStreak,
                streakCount
            })
            return streakInfoCollection
        }, [
                {
                    previousDay: {date: '2016-02-22'}, 
                    onStreak: state.streakInfo.onStreak, 
                    streakCount: state.streakInfo.currentStreak
                }
            ]
        )
        
        state = {
            ...state,
            streakInfo: {
                onStreak: streakRecord.slice(-1).pop().onStreak,
                currentStreak: streakRecord.slice(-1).pop().streakCount
            }
        }
    })

    var state = {
        allWorkoutDays: [
            {
                target: 'leg day',
                date: "2016-01-02",
                supplementalRun: true,
                milesRan: 2, 
            },
            {
                target: 'core day',
                date: '2019-01-03',
                supplementalRun: false,
                milesRan: 0,
            },
            {
                target: 'calisthenics day',
                date: '2019-01-04',
                supplementalRun: true,
                milesRan: 3,
            }
        ],
        streakInfo: {
            onStreak: false,
            currentStreak: 0,
            highestStreak: 0
        }
    }

    describe('checkForConsecutiveWorkouts()', () => {
        it('should return true at the end of the month', () => {
            expect(checkForConsecutiveWorkouts(31,1)).toBeTruthy()
            expect(checkForConsecutiveWorkouts(30,1)).toBeTruthy()
            expect(checkForConsecutiveWorkouts(28,1)).toBeTruthy()
        })

        it('should work on random days', () => {
            expect(checkForConsecutiveWorkouts(2,3)).toBeTruthy()
            expect(checkForConsecutiveWorkouts(17,18)).toBeTruthy()
            expect(checkForConsecutiveWorkouts(4,8)).toBeFalsy()
            expect(checkForConsecutiveWorkouts(31,2)).toBeFalsy()
        })
    })

    describe('extractDayFromDate()', () => {
        it('should work on random days', () => {
            expect(extractDayFromDate('2018-12-31')).toBe(31)
            expect(extractDayFromDate('2018-08-12')).toBe(12)
            expect(extractDayFromDate('2018-12-03')).toBe(3)
        })
    })
})

// describe('tallyTargets()', () => {
//     const tallyTargets = jest.fn()
// })