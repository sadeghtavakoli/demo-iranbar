import React, { Component } from "react";

class Input extends Component {
  render() {
    const { showModal } = this.props;
    return <div>{showModal && <div>hello</div>}</div>;
  }
}

export default Input;
