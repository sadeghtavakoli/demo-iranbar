import React, { Component } from "react";

class Input extends Component {
  render() {
    const { name, label, error, ...rest } = this.props;
    return (
      <div className="form-group">
        {label && <label htmlFor={name}>{label}</label>}
        <input {...rest} name={name} id={name} className="form-control" />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  }
}

export default Input;
