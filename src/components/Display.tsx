import React, { Component, FC } from 'react';
import DisplayChild from "./DisplayChild";

interface IProps { 
    amount: number;
    years: number;
}

interface IState {
    APR: number;
}

export default class Display extends Component<IProps, IState> {
  constructor(props: IProps) {
      super(props);
      
      this.state = {
      APR: 0.05
      };
  }
  
  componentDidUpdate(prevProps: IProps) {
    if (prevProps !== this.props) {
      this.calculateAPR();
    }
  }

  calculateAPR = () => {
    let { amount } = this.props;

    if (1000 < amount && amount < 5000) {
      this.setState({ APR: 0.05 });
    }
    if (5000 < amount && amount < 10000) {
      this.setState({ APR: 0.1 });
    }
    if (10000 < amount && amount < 15000) {
      this.setState({ APR: 0.15 });
    }
    if (15000 < amount && amount < 20000) {
      this.setState({ APR: 0.2 });
    }
  };

  calculateMonthlyRepayment = () => {
    let { amount, years } = this.props;
    let decimalFormat = this.state.APR + 1;
    let totalOwed = decimalFormat * amount;
    let monthlyRepayment = totalOwed / (years * 12);

    return <p>PKR {Math.round(monthlyRepayment)}</p>;
  };

  percentageAPR = () => {
    return <p>{this.state.APR * 100}%</p>;
  };

  render() {
    return (
      <div className="flex">
        <DisplayChild func={this.percentageAPR()} text="interest rate" />
        <DisplayChild
          func={this.calculateMonthlyRepayment()}
          text=" monthly repayment"
        />
      </div>
    );
  }
}