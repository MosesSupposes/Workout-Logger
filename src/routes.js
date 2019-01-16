import App from './components/ui/App'
import Whoops404 from './components/ui/Whoops404'
import WorkoutLoggerCount from './components/containers/WorkoutLoggerCount'
import AddDayForm from './components/containers/AddDayForm'
import WorkoutLoggerList from './components/containers/WorkoutLoggerList'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

const Routes = () => (
    <Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={WorkoutLoggerCount}/>
			<Route path="add-day" component={AddDayForm}/>
			<Route path="list-days" component={WorkoutLoggerList}>
				<Route path=":filter" component={WorkoutLoggerList} />
			</Route>
			<Route path="*" component={Whoops404}/>
		</Route>
	</Router>
)

export default Routes 