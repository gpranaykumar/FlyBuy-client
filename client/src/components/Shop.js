import { Component } from 'react';
import {Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Container} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItems } from '../redux/actions/itemActions';
import { addToCart } from '../redux/actions/cartActions';
import { Link } from 'react-router-dom';

class Home extends Component {

    static propTypes = {
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,
        addToCart: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired
    }

    onAddToCart = async (id, productId) => {
        console.log("shop-addToCart: userId = "+id+" : productId = " + productId)
        await this.props.addToCart(id, productId, 1);

        alert ('Item added to Cart');
    }

    render(){
        //console.log("gpk items props : "+ this.props.products)
        const { items } = this.props.item;
        const user = this.props.user;

        const displayItem = () => {
            
               { if(JSON.stringify(items).length !== 2){
                   //console.log(typeof(items));
                   //console.log(JSON.stringify(items));
                   //console.log("Products");
                    return (
                        items.map((item)=>(
                        <div className="col-md-4" key={item._id}>
                            <Card className="mb-4 gpk-product-scale gpk-product-minHeight">
                            
                                <CardBody>
                                <Link to={`/shop/${item._id}`} className="text-dark text-decoration-none" >
                                    <CardTitle tag="h5">{item.title}</CardTitle>
                                    <CardSubtitle tag="h6" >category:{item.category}</CardSubtitle>
                                </Link>
                                    <div className="row">
                                        <div className="col">
                                            <CardText tag="h4">Rs. {item.price}</CardText>
                                        </div>
                                    </div>
                                    {this.props.isAuthenticated ?
                                        <CardText >
                                        <Button
                                            color="success"
                                            size="sm"
                                            onClick={this.onAddToCart.bind(this, user._id, item._id)}
                                            >Add To Cart</Button> 
                                        </CardText>: null }
                                </CardBody>
                                
                            </Card>
                            </div>
                        ))
                    );
                } else {
                    console.log("No Products");
                    return (
                        <div className="text-center"><h2>No Products</h2></div>
                    );
                }
            }
            
        }
        return (
            <div>
            <Container>
                <div className="row pt-4">
                {
                    displayItem()
                }
                 </div>
            </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, { addToCart})(Home);
