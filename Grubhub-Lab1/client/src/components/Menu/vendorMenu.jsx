import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { vendorActions } from "../../js/actions/index";
import _ from "lodash";
import { Container, Row, Card } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";

class vendorMenu extends Component {
  constructor() {
    super();
    this.state = {
      menu: [],
      sections: []
    };
  }
  componentDidMount() {
    this.props.getMenu({
      restaurant_id: this.props.restaurant.id
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.restaurant.menu && nextProps.restaurant.menu.length) {
      const sections = nextProps.restaurant.menu.map(eachSection => ({
        name: eachSection.section,
        id: eachSection.id,
        dishes: _.map(eachSection.dishes, "id"),
        updated_name: ""
      }));
      this.setState({
        menu: nextProps.restaurant.menu,
        sections
      });
    } else {
      this.props.getMenu({ restaurant_id: this.props.restaurant.id });
    }
  }
  handleChange = e => {
    e.preventDefault();
    let key = parseInt(e.currentTarget.id);
    let value = e.currentTarget.value;
    let updatedSection = [...this.state.sections];
    _.find(updatedSection, { id: key }).updated_name = value;
    this.setState({
      sections: updatedSection
    });
  };

  handleEdit = e => {
    e.preventDefault();
    const current_section = _.find(this.state.sections, {
      id: parseInt(e.currentTarget.value)
    });
    if (current_section.updated_name) {
      current_section.restaurant_id = this.props.restaurant.id;
      if (e.currentTarget.name === "edit") {
        this.props.editSection(current_section);
      } else if (e.currentTarget.name === "delete") {
        this.props.deleteSection(current_section);
      } else {
        console.log("Invalid");
      }
    }
  };

  render() {
    return (
      <div>
        <Sidebar></Sidebar>
        <Container className="vendorMenu">
          <Row className="p-3 col-sm-9 col-md-7 col-lg-5 mx-auto align-center">
            <Link to="/dish">
              <button type="submit" className="btn btn-danger m-3">
                Add Item to Menu
              </button>
            </Link>
          </Row>
          <div>
            {this.state.menu && this.state.menu.length
              ? this.state.menu.map(eachSection => {
                  return (
                    <Container key={eachSection.section}>
                      <Row>
                        <div>
                          <label className="col-sm-2 col-form-label col-form-label-lg">
                            {eachSection.section}
                          </label>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              onChange={this.handleChange}
                              key={eachSection.id}
                              id={eachSection.id}
                              placeholder="Want to change title?"
                              aria-describedby="button-addon4"
                            />
                            <div
                              className="input-group-append"
                              id="button-addon4"
                            >
                              <button
                                className="btn btn-outline-danger"
                                type="button"
                                name="edit"
                                value={eachSection.id}
                                onClick={this.handleEdit}
                              >
                                Edit
                              </button>
                              <br/>
                            </div>
                          </div>
                        </div>
                      </Row>
                      <Row>
                        <Container>
                          <Row>
                            {eachSection.dishes.map(dish => {
                              let dish_detail_link = `/dish/detail/${dish.id}`;
                              return (
                                <Link key={dish.id} to={dish_detail_link}>
                                  <div className="m-2">
                                    <Card style={{ width: "20rem" }}>
                                      <Card.Body>
                                        <Card.Title>Item: {dish.name}</Card.Title>
                                        <Card.Text>                            
                                          <label>Description: {dish.description}</label>
                                          <br></br>
                                          <label>Price: ${dish.price}</label>
                                        </Card.Text>
                                      </Card.Body>
                                    </Card>
                                    <br/><br/>
                                  </div>
                                </Link>
                              );
                            })}
                          </Row>
                        </Container>
                      </Row>
                    </Container>
                  );
                })
              : null}
          </div>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  restaurant: state.restaurant
});

const mapDispatchToProps = dispatch => ({
  getMenu: payload => dispatch(vendorActions.getMenu(payload)),
  editSection: payload => dispatch(vendorActions.editSection(payload)),
  deleteSection: payload => dispatch(vendorActions.deleteSection(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(vendorMenu);
