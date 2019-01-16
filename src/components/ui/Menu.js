import { Link } from 'react-router'
import { FaHome as HomeIcon } from 'react-icons/fa'
import { FaCalendarPlus as AddDayIcon } from 'react-icons/fa'
import { FaTable as ListDaysIcon} from 'react-icons/fa'
import '../../stylesheets/Menu.scss'

const Menu = () => 
    <nav className="menu">
        <Link to="/" activeClassName="selected">
            <HomeIcon />
        </Link>
        <Link to="/add-day" activeClassName="selected">
            <AddDayIcon />
        </Link>
        <Link to="list-days" activeClassName="selected">
            <ListDaysIcon />
        </Link>
    </nav>

export default Menu