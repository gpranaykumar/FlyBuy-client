import { Component, Fragment } from 'react';
import {
    Collapse, 
    Navbar, 
    NavbarToggler, 
    NavbarBrand, 
    Nav, 
    NavItem, 
    Container,
   // NavLink
} from 'reactstrap';
import RegisterModal from './auth/registerModal';
import Logout from './auth/Logout';
import LoginModal from './auth/loginModal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
class Header extends Component {
    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                {/*<NavItem>
                    <span className="text-light">
                        { user ? `Welcome ${user.name}` : ''}
                    </span>
                </NavItem>
                */}
                <NavItem >
                    <NavLink activeClassName="gpk-active" className="nav-link" to="/" >Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink activeClassName="gpk-active" className="nav-link" to="/shop">Shop</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink activeClassName="gpk-active" className="nav-link" to="/cart">Cart</NavLink>
                </NavItem>
                <NavItem className="mr-2">
                    <NavLink activeClassName="gpk-active" href="/orders">Orders</NavLink>
                </NavItem>
                <NavItem>
                    <Logout/>
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <NavLink activeClassName="gpk-active" className="nav-link" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink activeClassName="gpk-active" className="nav-link" to="/shop">Shop</NavLink>
                </NavItem>
                <NavItem>
                    <RegisterModal/>
                </NavItem>
                <NavItem>
                   <LoginModal/>
                   {/*<NavLink to="/login"> Login </NavLink>*/}
                </NavItem>
            </Fragment>
        );

        return(
            <div>
                <Navbar color="light" style={{fontWeight: "700"}} light expand="sm" >
                    <Container>
                        <NavbarBrand href="/">FlyBuy</NavbarBrand>
                        <NavbarToggler onClick={this.toggle}/>
                        <Collapse isOpen={this.state.isOpen} className='justify-content-end' navbar>
                            <Nav className="ml-auto" navbar> 
                                { isAuthenticated ? authLinks: guestLinks}                               
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(Header);

