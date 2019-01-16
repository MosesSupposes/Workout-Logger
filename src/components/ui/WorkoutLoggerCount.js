import { PropTypes } from 'react'
import '../../stylesheets/WorkoutLoggerCount.scss'

const WorkoutLoggerCount = ({ totalWorkouts = 0, targets = {}, streakInfo: [ onStreak = false, currentStreak = 0 ] = [], supplementalRuns = 0, totalMiles = 0 }) => {
    
    return (
        <div className="workout-routine-count">
            <div className="total-days">
                <span id="totalDays">Total days: {totalWorkouts} </span>
                <span id="streak">Current streak: {onStreak ? currentStreak : 0} days</span>
            </div>

            <div className="targets">
                <ul>
                    <li>
                        <span>{targets.legDays || 0}</span>
                        <span> leg days</span>
                    </li>
                    <li>
                        <span>{targets.chestAndArmDays || 0}</span>
                        <span> chest and arm days</span>
                    </li>
                    <li>
                        <span>{targets.coreDays || 0}</span>
                        <span> core days</span>
                    </li>
                    <li>
                        <span>{targets.calisthenicsDays || 0}</span>
                        <span> calesthenics days</span>
                    </li>
                    <li>
                        <span>{targets.runningOnlyDays || 0}</span>
                        <span> running-only days</span>
                    </li>
                </ul>
            </div>
            <div className="running-info">
                <ul>
                    <li>
                        <span>{supplementalRuns}</span>
                        <span> supplemental runs </span> 
                    </li>
                    <li>
                        <span>{totalMiles}</span>
                        <span> miles ran</span>
                    </li>
                </ul>
            </div>
        </div>  
    )
}

WorkoutLoggerCount.propTypes = {
    totalWorkouts: PropTypes.number,
    targets: PropTypes.object,
    supplementalRuns: PropTypes.number,
    totalMiles: PropTypes.number,
    streakInfo: PropTypes.array,
}

export default WorkoutLoggerCount


// export class WorkoutLoggerCount extends Component {
//     // static defaultProps() {
//     //     return {
//     //         totalWorkouts: 0,
//     //         targets: {
//     //             legDays: 0,
//     //             chestAndArmDays: 0,
//     //             coreDays: 0,
//     //             calisthenicsDays: 0,
//     //             runningOnlyDays: 0
//     //         },
//     //         supplementalRuns: 0,
//     //         goal: 100
//     //     }
//     // }
    
//     percentToDecimal(decimal) {
//         return (decimal * 100).toFixed(0) + '%'
//     }
    
//     calcGoalProgress(total, goal) {
//         return this.percentToDecimal(totalWorkouts / goal)
//     }
    
//     render() {
//         return (
//             <div className="workout-routine-count">
//                 <div className="total-days">
//                     <span>Total days: {this.props.totalWorkouts} </span>
//                     <span id="streak">Current streak: {this.props.streak ? this.props.streak[1] : 0} days</span>
//                 </div>
                
//                 <div className="targets">
//                     <ul>
//                     <li>
//                     <span>{this.props.targets.legDays || 0}</span>
//                     <span> leg days</span>
//                     </li>
//                     <li>
//                     <span>{this.props.targets.chestAndArmDays || 0}</span>
//                     <span> chest and arm days</span>
//                     </li>
//                     <li>
//                     <span>{this.props.targets.coreDays || 0}</span>
//                     <span> core days</span>
//                     </li>
//                     <li>
//                     <span>{this.props.targets.calisthenicsDays || 0}</span>
//                     <span> calesthenics days</span>
//                     </li>
//                     <li>
//                     <span>{this.props.targets.runningOnlyDays || 0}</span>
//                     <span> running-only days</span>
//                     </li>
//                     </ul>
//                 </div>
//                 <div className="running-info">
//                     <ul>
//                     <li>
//                     <span>{this.props.supplementalRuns}</span>
//                     <span> supplemental runs </span> 
//                     </li>
//                     <li>
//                     <span>{this.props.totalMiles}</span>
//                     <span> total miles ran</span>
//                     </li>
//                     </ul>
//                 </div>
//                 <div className="goal">
//                     <span>Goal: {this.calcGoalProgress(this.props.totalWorkouts, this.props.goal)}</span>
//                 </div>
//             </div>  
//         )
//     }
// }

// WorkoutLoggerCount.defaultProps = {
//     totalWorkouts: 0,
//     targets: {
//         legDays: 0,
//         chestAndArmDays: 0,
//         coreDays: 0,
//         calisthenicsDays: 0,
//         runningOnlyDays: 0
//     },
//     supplementalRuns: 0,
//     totalMiles: 0,
//     goal: 100
// }