import ShowErrors from '../ui/ShowErrors'
import { clearError } from '../../actionCreators'
import { connect } from 'react-redux'

const mapStateToProps = state => ({errors: state.errors})
const mapDispatchToProps = dispatch => 
    ({
        onClearError(index) {
            dispatch(clearError(index))
        }
    })

export default connect(mapStateToProps, mapDispatchToProps)(ShowErrors)
