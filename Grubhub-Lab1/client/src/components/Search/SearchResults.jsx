import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import _ from "lodash";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import filterFactory, { selectFilter } from "react-bootstrap-table2-filter";
import BootstrapTable from "react-bootstrap-table-next";
import Navbar from "../Navbar/Navbar";
import './style.css';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    let cuisines =
      this.props.search_results && this.props.search_results.length
        ? _.chain(this.props.search_results)
            .map("cuisine")
            .uniq()
            .map(each => ({
              value: each,
              label: each
            }))
            .value()
        : [];
    this.state = {
      search_results: [],
      restaurant_list_columns: [
        {
          dataField: "id",
          text: "ID",
          hidden: true
        },
        {
          dataField: "name",
          text: "Name",
          formatter: this.restaurantNameFormatter
        },
        {
          dataField: "address",
          text: "Address"
        },
        {
          dataField: "cuisine",
          text: "Cuisine",
        }
      ]
    };
  }

  restaurantNameFormatter = (cell, row) => {
    let detailpage_link = `/restaurant/detail/${row.id}`;
    return <Link to={detailpage_link}>{cell}</Link>;
  };
  componentDidMount() {
    const search_results = this.props.search_results;
    if (search_results && search_results.length) {
      this.setState({
        search_results
      });
    }
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        {this.state.search_results && this.state.search_results.length ? (
          <div className="container shadow">
            <BootstrapTable
              keyField="id"
              data={this.state.search_results}
              columns={this.state.restaurant_list_columns}
              filter={filterFactory()}
              bordered={true}
            />
          </div>
        ) : (
          <div className="empty_style">
            <h3>Could find any restaurant serving this. Try finding another dish?</h3>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  search_results: state.buyer.search_results
});

export default connect(mapStateToProps)(SearchResults);
