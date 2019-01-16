import Menu from './Menu'
import ShowErrors from '../containers/ShowErrors'
import GoalProgress from '../containers/GoalProgress'
import '../../stylesheets/index.scss'

export default function App({children}) {
    return (
        <div className="app">
            <ShowErrors />
            {children}
            <GoalProgress />
            <Menu />
        </div>
    )
}

export function calculateTotalMiles(allWorkoutDays) {
    return allWorkoutDays.reduce((totalMiles, currentDay) => {
        totalMiles += currentDay.milesRan
        return totalMiles
    }, 0)
}

export function tallyDays(allWorkoutDays, filter) {
    return allWorkoutDays.filter(day => filter ? day[filter] : day).length
}


export const targetsMod = {

    conformTargetToAPI(target) {
        /*
            here's how props is passed to the WorkoutLoggerCount component: 
            {
                legDays: 2
                chestAndArmDays: 4
                etc...
            }
    
            here's how the target param comes in from state: 'leg day', or 'chest and arm day'.
            This function converts its input to its plural, camelCased equivalent to match the props' API
        */
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
    },
    
    discoverTargetType(target) {
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
        return target.includes('not a valid target') ? null : this.conformTargetToAPI(targetType)
    },
    
    tallyTargets(allWorkoutDays) {
        const allTargets = allWorkoutDays.map(day => day.target)
        let tally = allTargets.reduce((tracker, currentTarget) => {
            let target = this.discoverTargetType(currentTarget)
            tracker[target] !== null && tracker[target]++
            return tracker
        }, {
            legDays: 0,
            chestAndArmDays: 0,
            coreDays: 0,
            calisthenicsDays: 0,
            runningOnlyDays: 0
        })
        return tally
    }
}


