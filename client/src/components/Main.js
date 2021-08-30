import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Switch, Route, withRouter,Redirect } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Shop from './Shop';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import Orders from './Orders';
import AdminHome from './Admin/AdminHome';
import PropTypes from 'prop-types';
import { getItems } from '../redux/actions/itemActions';
import LoginModal from './auth/loginModal';

class Main extends Component {
    constructor(props){
        super(props);
        
      }
    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired
    }
    componentDidMount(){
      //console.log("Main-items "+ JSON.stringify(this.props.item.items).length)
        if(JSON.stringify(this.props.item.items).length === 2 ){

          this.props.getItems();   
        }
    }
    render(){
        return (
            <div className="d-flex flex-column min-vh-100">
            <Header />
              <div>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/home' component={Home} />
                    <Route exact path='/shop' component={ () =>  <Shop products={this.props.item.items} /> } />
                    <Route path='/shop/:productId' component={(match) =>  <ProductDetail  products={this.props.item.items}  match={match}/>}/>
                    <Route exact path='/cart' component={Cart} /> 
                    <Route exact path='/orders' component={Orders} /> 
                    <Route exact path='/admin' component={AdminHome} /> 
                  {/*<Route exact path='/login' component={LoginModal} /> */}
                    <Redirect to="/home" />
                </Switch>
              </div>
            <Footer />
          </div>
        )
    }
}
const mapStateToProps = (state) => ({
  item: state.item,
  //user: state.auth.user
})
export default withRouter(connect(mapStateToProps, {getItems})(Main));
