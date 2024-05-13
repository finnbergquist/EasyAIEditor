import React from "react";
import UserDataCategories from "../UserDataCategories/UserDataCategories";
import { Loader } from 'lucide-react'

class Prompter extends React.Component {
  constructor(props) {
    super();
    this.state = props.form
  }

  handleChangePrompt = (event) => {
    this.setState({
      prompt: event.target.value,
    }, () => {
      this.props.handleUpdateForm(this.state);
    });
  };

  render() {
    return (
      <div className="w-full p-4">
        <textarea
          value={this.state.prompt}
          onChange={this.handleChangePrompt}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          aria-label="AI prompt" 
        />
        <div className="w-full text-left mb-4">
          <UserDataCategories form={this.state} handleUpdateForm={this.props.handleUpdateForm} />
        </div>
        <div className="flex justify-center">
          <button
            className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700" 
            onClick={() => {
                this.props.generateImages(this.state);
            }}
          >
            Generate
          </button>
        </div>
        {this.props.loading && <Loader className="animate-spin h-5 w-5 ml-3" />}
      </div>
    );
  }
}

export default Prompter;