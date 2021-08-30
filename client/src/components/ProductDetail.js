import React, { Component } from 'react'
import {Button, Container, Row, Col} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addToCart } from '../redux/actions/cartActions';
import { useParams } from 'react-router-dom'
export class ProductDetail extends Component {


    static propTypes = {
        isAuthenticated: PropTypes.bool,
        addToCart: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    }

    onAddToCart = async (id, productId) => {
        await this.props.addToCart(id, productId, 1);
        alert ('Item added to Cart');
    }

    render() {
        //console.log("gpk item filter props : "+this.props.products);
        const {match } = this.props.match;
        const productId = match.params.productId;
        //console.log("match: "+JSON.stringify(match.params));
        //console.log("product id"+(productId))
        const  item1  = this.props.products.filter((i) => {
            if(i._id === productId){
                //console.log("i:"+JSON.stringify(i));
                return i;
            }
        })[0];
        //JSON.stringify
        //console.log("item1 : "+(item1.title))
        const user = this.props.user;
        //console.log("product details  : " + typeof(item1))
        const itemDetails=()=>{
            if(item1!==undefined){
                return (
                    <Row>   
                        <h1 className="text-center solid">Product Details</h1>
                        
                        <Col sm="8">
                            <h2>{item1.title}</h2>
                            <p>category:{item1.category}</p>
                            <h2>₹{item1.price}</h2>
                            <h4>Description</h4>
                            <p>{item1.description}</p>
                            {this.props.isAuthenticated ? 
                                <Button
                                    color="success"
                                    size="sm"
                                    onClick={this.onAddToCart.bind(this, user._id, item1._id)}
                                    >Add To Cart</Button> :
                                    null}
                        </Col>
                    </Row>
                )
            }else{
                return(
                    <div>
                        404 ERROR
                    </div>
                )
            }
        }
        return (
            <div>
                <Container>
                    {itemDetails()}
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})
export default connect(mapStateToProps, {addToCart})(ProductDetail)
