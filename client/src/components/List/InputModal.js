import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../../actions";

class InputModal extends React.Component {
  state = {
    modal: false,
    name: "",
    isButtonDisabled: true
  };

  componentDidMount() {
    window.setTimeout(() => {
      this.setState({
        isButtonDisabled: false
      });
    }, 1000);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const newItem = {
      name: this.state.name
    };
    //CALLING ACTION CREATOR
    this.props.addItem(newItem);
    this.toggle();
  };

  render() {
    return (
      <div>
        <div className="text-center">
          <Button
            color="dark"
            onClick={this.toggle}
            size="sm"
            disabled={this.state.isButtonDisabled}
          >
            Add More
          </Button>
        </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add to Your List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="New To Do"
                  onChange={this.onChange}
                  autoComplete="off"
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  item: state.item
});
export default connect(
  mapStateToProps,
  { addItem }
)(InputModal);
