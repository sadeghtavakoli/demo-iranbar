import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import CustomeModal from "./Modal";
import { getAllCities } from "../services/cityService";
import { RegisterCustomer } from "../services/authService";
class RegisterForm extends Form {
  state = {
    data: {
      customerName: "",
      Mobile: "",
      Tel: "",
      CityCode: 0,
      Address: "",
      PostalCode: "",
    },
    errors: {},
    cities: [],
    modalIsVisible: false,
    modalContent: {},
  };

  schema = {
    customerName: Joi.string()
      .required("وارد کردن نام و نام خانوادگی الزامی است")
      .label("نام و نام خانوادگی"),
    Mobile: Joi.number()
      .required("وارد کردن شماره موبایل الزامی است")
      .min(9)
      .label("شماره موبایل"),
    Tel: Joi.number()
      .required("وارد کردن شماره تلفن الزامی است")
      .label("شماره تلفن"),
    CityCode: Joi.number().required("وارد کردن شهر الزامی است").label("شهر"),
    Address: Joi.string().required("وارد کردن آدرس الزامی است").label("آدرس"),
    PostalCode: Joi.number()
      .required("وارد کردن کد پستی الزامی است")
      .label("کد پستی"),
  };

  doSubmit = async () => {
    try {
      const customer = { ...this.state.data };
      customer.CityCode = Number(customer.CityCode);
      customer.NationID = customer.Mobile + customer.PostalCode;
      const { data: response } = await RegisterCustomer(customer);

      if (typeof response.data === "object") {
        // it means user was already registered!!
        const modalContent = { ...response };
        // change cityCode with cityName
        const myCity = this.state.cities.filter(
          (city) => city.cityId === response.data.cityCode
        );
        modalContent.data.cityCode = myCity[0].cityName;
        this.setState({
          modalIsVisible: true,
          modalContent,
        });
      } else {
        alert(response.message);
      }
      //using this line of code will cuase app be reloaded again
      //like we first entered it
      // window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  async componentDidMount() {
    const response = await getAllCities();
    const cities = response.data.data;
    this.setState({ cities });
  }
  render() {
    return (
      <>
        <CustomeModal
          show={this.state.modalIsVisible}
          onHide={() => {
            this.setState({ modalIsVisible: false });
          }}
          content={this.state.modalContent}
        />

        <div className="RegisterForm">
          <h1>ثبت نام صاحب کالا</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("customerName", "نام و نام خانوادگی")}
            {this.renderInput("Mobile", "شماره موبایل")}
            {this.renderInput("Tel", "شماره تلفن")}
            {this.renderSelect("CityCode", "شهر", this.state.cities)}
            {this.renderInput("Address", "آدرس")}
            {this.renderInput("PostalCode", "کد پستی")}
            {this.renderSubmit("ثبت اطلاعات")}
          </form>
        </div>
      </>
    );
  }
}

export default RegisterForm;
