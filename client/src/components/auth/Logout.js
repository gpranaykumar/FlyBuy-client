import { Component, Fragment } from 'react';
import { logout } from '../../redux/actions/authActions';
import { connect } from 'react-redux';
import {NavLink, Button} from 'reactstrap';
import PropTypes from 'prop-types';

export class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    }

    render() {
        return (
            <div>
                <Fragment>
                    <Button color="light" className="btn btn-outline-danger btn-sm">
                        <NavLink onClick={this.props.logout} href="#">
                            <span className="text-dark">
                                Logout
                            </span>
                        </NavLink>
                    </Button>
                </Fragment>
            </div>
        )
    }
}

export default connect(null,{logout})(Logout);
