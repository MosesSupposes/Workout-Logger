import { PropTypes } from 'react'
import Autocomplete from './Autocomplete'
import '../../stylesheets/AddDayForm.scss'
import { updateStreak } from '../../actionCreators';

const AddDayForm = ({ suggestions=[], addDay=f=>f, updateStreak=f=>f, onChange=f=>f, onClear=f=>f, fetching=false, router}) => {

    const refs = {}

    const toggleDisplay = ref => refs[ref].classList.toggle('no-display')

    const handleChecked = (specifiedElement, e) => {
        const addMilesInput = refs._milesRanWrapper.id
        // toggleDisplay only works if the id of the specifiedElement is the same as its ref 
        // Ex: <div id="_favoriteExercises" ref="_favoriteExercises</div>"
        toggleDisplay(specifiedElement.id || addMilesInput)
    }

    const handleSubmit = e => {
        e.preventDefault()
        addDay({
            target: refs._target.value,
            date: refs._date.value.toString(),
            supplementalRun: refs._supplementalRun.checked,
            milesRan: refs._milesRan.value || 0
        })
        updateStreak()

        const addAnother = confirm(`${refs._target.value} on ${refs._date.value.toString()} added. Add another?`)

        if (!addAnother) {
            router.push('/')
        }

        refs._target.value = ''
        refs._date.value = ''
        refs._supplementalRun.checked = false
        refs._milesRan.value = 0
    }

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit} className="add-day">

                <label htmlFor="target">Target</label>

                <Autocomplete id="target"
                              ref={input => refs._target = input}
                              suggestions={suggestions}
                              onChange={() => onChange(refs._target.value)}
                              fetching={fetching}
                              onClear={onClear}
                              reqiured
                />

                <label htmlFor="date">Date</label>
                <input id="date"
                    type="date"
                    ref={input => refs._date = input}
                    required
                />

                <div>
                    <input id="_supplementalRun" 
                            type="checkbox"
                            onClick={e => handleChecked(_milesRanWrapper, e)}
                            ref={input => refs._supplementalRun = input}
                    />
                    <label htmlFor="supplementalRun">Supplemental Run</label>
                </div>

                <div className="miles-ran no-display" id="_milesRanWrapper" ref={input => refs._milesRanWrapper = input}>
                    <input id="milesRan"
                           placeholder="0"
                           type="text"
                           ref={input => refs._milesRan = input} 
                    />
                    <label htmlFor="milesRan">Miles Ran</label>
                </div>

                <button>Add Day</button>
            </form>
        </div> 
    )
}

AddDayForm.propTypes = {
    suggestions: PropTypes.array,
    fetching: PropTypes.bool,
    updateStreak: PropTypes.func,
    addDay: PropTypes.func,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    router: PropTypes.object
}

export default AddDayForm

// import { PropTypes } from 'react'
// import Autocomplete from './Autocomplete'

// const defaultTargets = [
//     "leg day",
//     "core day",
//     "chest and arm day",
//     "calisthenics day",
//     "running only day"
// ]

// const AddDayForm = ({ suggestions=[], target, date, supplementalRun, milesRan, addDay=f=>f, updateStreak }) => {
//     const refs = {}
//     const handleSubmit = e  => {
//         e.preventDefault()
//         addDay({
//             target: refs._target.value, 
//             date: refs._date.value,
//             supplementalRun: refs._supplementalRun.checked,
//             milesRan: parseInt(refs._milesRan.value)
//         })
//         updateStreak()
//         refs._target.value = ''
//         refs._date.value = ''
//         refs._supplementalRun.checked = false
//         refs._milesRan.value = ''
//     }
    
//     const toggleDisplay = ref => refs[ref].classList.toggle('no-display')
    
//     const handleChecked = (specifiedElement, e) => {
//         const addMilesInput = refs._milesRanWrapper.id
//         // toggleDisplay only works if the id of the specifiedElement is the same as its ref 
//         // Ex: <div id="_favoriteExercises" ref="_favoriteExercises</div>"
//         toggleDisplay(specifiedElement.id || addMilesInput)
//     }

//     return (
//         <form onSubmit={handleSubmit} className="add-day">
//             <label htmlFor="target">Target</label>
//             <Autocomplete options={defaultTargets}
//                           ref={input => refs._target = input} />

//             <label htmlFor="date">Date</label>
//             <input id="date" 
//                     type="date"
//                     defaultValue={date}
//                     ref={input => refs._date = input} 
//                     required />

//             <div>
//                 <input id="_supplementalRun" 
//                         type="checkbox"
//                         onClick={e => handleChecked(refs._milesRanWrapper, e)}
//                         ref={input => refs._supplementalRun = input}
//                         defaultChecked={supplementalRun} />
//                 <label htmlFor="supplementalRun">Supplemental Run</label>
//             </div>

//             <div className="miles-ran no-display" id="_milesRanWrapper" ref={input => refs._milesRanWrapper = input}>
//                 <input id="milesRan"
//                         type="text"
//                         ref={input => refs._milesRan = input}
//                         defaultValue={milesRan} />
//                 <label htmlFor="milesRan">Miles Ran</label>
//             </div>

//             <button>Add Day</button>
//         </form>
//     )
// }
// export default AddDayForm

// AddDayForm.defaultProps = {
//     target: 'running only day',
//     date: '2019-01-05',
//     supplementalRun: false,
//     milesRan: 0
// }

// AddDayForm.PropTypes = {
//     target: PropTypes.string.isRequired,
//     date: PropTypes.string.isRequired,
//     supplementalRun: PropTypes.bool.isRequired,
//     milesRan:  PropTypes.number.isRequired
// }