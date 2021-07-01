import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  validate = () => {
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);
    if (!result.error) return null;

    const errors = {};
    result.error.details.forEach((error) => {
      errors[error.path[0]] = error.message;
    });
    return errors;
  };
  validateProperty = ({ name }, data) => {
    const obj = { [name]: data[name] };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };

    data[input.name] = input.value;
    this.setState({ data });

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input, data);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    this.setState({ errors });
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  };
  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        error={errors[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
      />
    );
  };

  renderSubmit = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary my-2">
        {label}
      </button>
    );
  };
}

export default Form;
