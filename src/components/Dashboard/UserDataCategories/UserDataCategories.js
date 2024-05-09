import { PlusCircle, Trash2, Clipboard, Edit2, Plus } from "lucide-react";
import React from "react";
class UserDataCategories extends React.Component {
    constructor(props) {
      super();
      this.state = props.form
    }
    handleAddField = () => {
      this.setState({
        customerDataValues: [...this.state.customerDataValues, ""],
      }, () => {
        this.props.handleUpdateForm(this.state);
      });
    };
    handleRemoveField = (index) => {
      const values = [...this.state.customerDataValues];
      values.splice(index, 1);
      this.setState({
        customerDataValues: values,
      }, () => {
        this.props.handleUpdateForm(this.state);
      });
    };
    handleChangeField = (index, event) => {
      const values = [...this.state.customerDataValues];
      values[index] = event.target.value;
      this.setState({
        customerDataValues: values,
      }, () => {
        this.props.handleUpdateForm(this.state);
      });
    };
    handleSubmit = (event) => {
      event.preventDefault();
      console.log("Form Submitted:", this.state);
    };
    handleAddForm = () => {
      this.setState({
        forms: [...this.state.forms, "New User Profile Form"],
      }, () => {
        this.props.handleUpdateForm(this.state);
      });
    };
  render() {
    return (
      <fieldset className="mb-4">
        <legend
          className="text-gray-700 text-sm font-bold mb-2" >
          Customer Data Values
        </legend>
        {this.state.customerDataValues.map((value, index) => (
          <div
            key={index}
            className="flex items-center mb-2" >
            <input
              type="text"
              value={value}
              onChange={(e) => this.handleChangeField(index, e)}
              className="shadow appearance-none border rounded flex-grow py-2 px-3 text-gray-700 leading-tight"
              aria-label={`Customer data value ${index + 1}`} />
            <button
              type="button"
              onClick={() => this.handleRemoveField(index)}
              className="ml-2" >
              <Trash2 className="text-gray-600" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={this.handleAddField}
          className="flex items-center" >
          <PlusCircle className="text-gray-600 mr-2" />
          Add New Field
        </button>
      </fieldset>
    );
  }
}
export default UserDataCategories;