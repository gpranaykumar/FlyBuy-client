import { Component } from 'react';
import {Container, Row} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Home extends Component {

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object.isRequired
    }


    render(){
        const user = this.props.user;
        return (
            <div className="home">
            <Container >
                <Row className="text-center  pt-5">
                        <h1 
                        >Welcome <spam className="font-italic">{ this.props.isAuthenticated ? user.name.toUpperCase(): null }</spam> <br/> <a  className="text-info text-decoration-none" href="/shop">click here to shop</a>
                        </h1>
                </Row >
                    

            </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, {})(Home);