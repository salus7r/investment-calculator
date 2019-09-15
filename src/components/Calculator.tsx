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
      amountValue: 0,
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
    const { amountValue, yearsValue } = this.state;

    return (
      <Fragment>
        <h4>Initial Investment PKR {amountValue}</h4>
        <InputRange
          step={10}
          maxValue={9999999999999}
          minValue={0}
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