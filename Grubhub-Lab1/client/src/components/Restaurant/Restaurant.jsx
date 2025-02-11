import React, { Component } from "react";
import { connect } from "react-redux";
import { buyerActions } from "../../js/actions/index";
import { Container, Row, Card, Form, Col } from "react-bootstrap";
import _ from "lodash";
import Navigbar from "../Navbar/Navbar";
import "./style.css";
import PosterPage from '../Search/PosterPage';

class Restaurant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_restaurant: {
        id: "",
        name: "",
        cuisine: "",
        address: "",
        zipcode: "",
        menu: ""
      },
      cart: {}
    };
  }
  componentDidMount() {
    this.props.getRestaurantDetails({
      restaurant_id: this.props.match.params.restaurant_id
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.current_restaurant) {
      this.setState({
        current_restaurant: nextProps.current_restaurant
      });
    }
  }
  handleQuantity = e => {
    if (e.target.value < 0) {
      e.target.value = 0;
    } else if (e.target.value > 10) {
      e.target.value = 10;
    }
    const cart = this.state.cart;
    cart[e.target.id] = e.target.value;
    this.setState({
      cart
    });
  };
  handleAddToCart = e => {
    e.preventDefault();
    const dishes = _.chain(this.state.current_restaurant.menu)
      .map("dishes")
      .concat()
      .flatten()
      .value();
    if (dishes && dishes.length) {
      const cart = dishes.map(dish => {
        if (this.state.cart[dish.id] && this.state.cart[dish.id] !== 0) {
          return {
            id: dish.id,
            name: dish.name,
            quantity: this.state.cart[dish.id],
            price: dish.price ? dish.price * this.state.cart[dish.id] : 0
          };
        }
      });
      this.props.addToCart({
        cart: _.compact(cart)
      });
    }
  };
  render() {
    const { current_restaurant } = this.state;
    return (
      <div>
        <Navigbar />
        <div className="Poster">
          <PosterPage />
        </div>
        <div className="form-group row restaurant_title">
          <div className="restaurant_name">
            <h4>{current_restaurant.name}</h4>
            <h5>{current_restaurant.address}</h5>
            <h5>{current_restaurant.cuisine}</h5>
          </div>
        </div>
        <div className="restaurant-detail">
          <div className="container">
              {current_restaurant.menu && current_restaurant.menu.length
              ? current_restaurant.menu.map(eachSection => {
                  return (
                    <div className="section">
                      <h4>{eachSection.section}</h4>
                      <div>
                        <Container>
                          <Row>
                            {eachSection.dishes.map(dish => {
                              return (
                                <div className="m-2">
                                  <Card
                                    style={{ width: "50rem", height: "10rem" }}
                                    key={dish.id}
                                  >
                                    <Card.Body>
                                      <Card.Title>{dish.name}</Card.Title>
                                      <Card.Text>
                                        <label>{dish.description}</label>
                                        <br></br>
                                        <label>${dish.price}</label>
                                        <Form.Group as={Row}>
                                          <Form.Label column sm="6">
                                            Quantity
                                          </Form.Label>
                                          <Col sm="6">
                                            <Form.Control
                                              type="number"
                                              placeholder=""
                                              min="0"
                                              max="10"
                                              id={dish.id}
                                              onChange={this.handleQuantity}
                                            />
                                          </Col>
                                        </Form.Group>
                                      </Card.Text>
                                    </Card.Body>
                                  </Card>
                                </div>
                              );
                            })}
                          </Row>
                        </Container>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
          <button
            type="submit"
            className="btn btn-danger m-3"
            onClick={this.handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  current_restaurant: state.buyer.current_restaurant
});
const mapDispatchToProps = dispatch => ({
  getRestaurantDetails: payload =>
    dispatch(buyerActions.getRestaurantDetails(payload)),
  addToCart: payload => dispatch(buyerActions.addToCart(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Restaurant);
