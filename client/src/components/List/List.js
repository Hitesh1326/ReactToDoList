import React from "react";
import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
//TO WIRE ACTIONS WE HAVE TO IMPORT {connect} and action name
import { connect } from "react-redux";
import { fetchItems, deleteItem } from "./../../actions";
import PropTypes from "prop-types";

class List extends React.Component {
  componentDidMount() {
    this.props.fetchItems();
  }

  deleteButton = id => {
    this.props.deleteItem(id);
  };
  render() {
    const { items } = this.props.item;
    return (
      <ListGroup>
        <TransitionGroup>
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={this.deleteButton.bind(this, _id)}
                >
                  &times;
                </Button>
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    );
  }
}
List.propTypes = {
  fetchItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};
//TO GET THE DATA FROM REDUX SIDE TO REACT SIDE WE NEED TO DEFINE mapStateToProps
const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { fetchItems, deleteItem }
)(List);
