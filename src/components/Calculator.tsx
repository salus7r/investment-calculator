import React, { Fragment } from 'react';
import InputRange, { Range } from "react-input-range";
import Display from "./Display";

import "../styles/Calculator.css";
import "react-input-range/lib/css/index.css";

interface IProps {}

interface IState {
  amountValue: number;
  yearsValue: number;
}

class Calculator extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    
    this.state = {
      amountValue: 5000,
      yearsValue: 1
    };
  }

  handleAmountChange = (value: number | Range) => {
    this.setState({ amountValue: value as number });
  };
  handleYearChange = (value: number | Range) => {
    this.setState({ yearsValue: value as number });
  };

  render() {
    let { amountValue, yearsValue } = this.state;

    return (
      <Fragment>
        <h4>I want to borrow PKR {amountValue}</h4>
        <InputRange
          step={100}
          maxValue={20000}
          minValue={1000}
          value={amountValue}
          onChange={this.handleAmountChange}
        />
        <h4>
          Over {yearsValue} year{yearsValue > 1 && "s"}
        </h4>
        <InputRange
          step={0.5}
          maxValue={5}
          minValue={1}
          value={yearsValue}
          onChange={this.handleYearChange}
        />
        <Display years={yearsValue} amount={amountValue} />
      </Fragment>
    );
  }
}

export default Calculator;