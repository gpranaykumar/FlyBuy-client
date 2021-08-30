import React, { Component, useState } from 'react';
import {Card, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import { ITEMS_LOADING } from '../redux/actions/types';
import { Link } from 'react-router-dom';


class Cart extends Component {    
    constructor(props){
        super(props);
        this.state={Loading:false};
    }
    static propTypes = {
        cart: PropTypes.object.isRequired,
        getCart: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object.isRequired
    }
    render() {
        //console.log("cart : "+ JSON.stringify(this.props.cart));
        const cart   = this.props.cart.cart;
        //const { bill } = this.props.cart;
        //console.log(JSON.stringify(cart))
        //console.log(typeof(cartItems))
        
        const displayCart=()=> {
            //console.log("displayCart -> "+ cart+" JSON = "+ JSON.stringify(cart)+" == typeof"+ typeof(cart));
            if(this.Loading){
                this.setState({Loading:false});
            }
            if(cart!==null && cart!==""){
                return (
                cart.items.map((item)=> (
                    <div className="col-11" key={item.productId}>
                    <Card className="mb-4 gpk-product-scale">
                    
                        <CardBody>
                        <Link to={`/shop/${item.productId}`} className="text-dark text-decoration-none" >
                            <CardTitle tag="h5">{item.name}</CardTitle>
                            <CardSubtitle tag="h6" >Quantity:{item.quantity}</CardSubtitle>
                        </Link>
                            <div className="row">
                                <div className="col">
                                    <CardText tag="h4">Rs. {item.price}</CardText>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                    </div>
    
                ))
                
                )
            }else{
                return (
                    <div className="text-center"><h1>Cart is Empty</h1></div>
                )
            }
        }
        return (
            <div className="Container gpk-cart">
                {this.Loading?  <div class="loader text-danger">Loading</div>     
                    : null}
                {this.props.isAuthenticated ? 
                    <div className="row mt-3 m-3 ">
                        { displayCart()}
                        <h1>Total Bill: { cart? cart.bill: 0 }</h1>
                    </div>
                    
                : 
                    <div className="row mt-5 m-3">
                        <h1>Login to check Cart </h1>
                    </div>
                
                }

            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    cart: state.cart,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
  });
export default connect(mapStateToProps, { })(Cart);
