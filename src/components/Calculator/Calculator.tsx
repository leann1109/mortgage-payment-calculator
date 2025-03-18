import React, { useState } from "react";
import { InputTextfield } from "../InputTextfield/InputTextfield";
import { formatToTwoDecimalPlaces } from "../../utils/helper";
import calculator from "../../assets/images/icon-calculator.svg";
import "./Calculator.css";

type CalculatorProps = {
  setMonthlyRepayment: (value: string) => void;
  setTotalRepayment: (value: string) => void;
};

export const Calculator = ({
  setMonthlyRepayment,
  setTotalRepayment,
}: CalculatorProps) => {
  const [mortgageAmount, setMortgageAmount] = useState<number | string>("");
  const [mortgageTerm, setMortgageTerm] = useState<number | string>("");
  const [interestRate, setInterestRate] = useState<number | string>("");
  const [mortgageType, setMortgageType] = useState("");
  const [error, setError] = useState(false);

  const formattedMortgageAmount = mortgageAmount.toString().replace(/,/g, "");
  const monthlyInterestRate = Number(interestRate) / 100 / 12;
  const calculateMonths = Number(mortgageTerm) * 12;

  const updateRepayments = (monthlyPayments: number) => {
    const formattedMonthlyPayments =
      formatToTwoDecimalPlaces(monthlyPayments).toString();

    const formattedTotalRepayment = formatToTwoDecimalPlaces(
      monthlyPayments * calculateMonths
    ).toString();
    setMonthlyRepayment(formattedMonthlyPayments);
    setTotalRepayment(formattedTotalRepayment);
  };

  const calculateRepayment = () => {
    const monthlyPayments =
      (Number(formattedMortgageAmount) * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -calculateMonths));

    updateRepayments(monthlyPayments);
  };

  const calculateInterestOnly = () => {
    const monthlyPayments =
      Number(formattedMortgageAmount) * monthlyInterestRate;

    updateRepayments(monthlyPayments);
  };

  const calculate = () => {
    if (mortgageType === "repayment") {
      return calculateRepayment();
    } else {
      return calculateInterestOnly();
    }
  };

  const clearAll = () => {
    setMortgageAmount("");
    setMortgageTerm("");
    setInterestRate("");
    setMortgageType("");
    setMonthlyRepayment("0");
    setTotalRepayment("0");
    setError(false);
  };

  const checkInput = () => {
    if (
      mortgageAmount === "" ||
      mortgageTerm === "" ||
      interestRate === "" ||
      mortgageType === ""
    ) {
      setError(true);
    } else {
      setError(false);
      calculate();
    }
  };

  return (
    <section className="calculator-section">
      <div className="calculator-header-container">
        <h1 className="heading-text">Mortgage Calculator</h1>
        <button className="clear-button" onClick={clearAll}>
          Clear All
        </button>
      </div>

      <form className="calculator-form">
        <InputTextfield
          title="Mortgage Amount"
          value={mortgageAmount}
          setValue={setMortgageAmount}
          index={0}
          error={error}
          setError={setError}
        />

        <div className="mortgage-interest-container">
          <InputTextfield
            title="Mortgage Term"
            value={mortgageTerm}
            setValue={setMortgageTerm}
            index={1}
            error={error}
            setError={setError}
          />

          <InputTextfield
            title="Interest Rate"
            value={interestRate}
            setValue={setInterestRate}
            index={2}
            error={error}
            setError={setError}
          />
        </div>

        <div className="mortgage-type-container">
          <label
            id="mortgage-type"
            className="input-title"
            htmlFor="mortgage-type-repayment"
          >
            Mortgage Type
          </label>
          <div
            className={`radio-container ${
              mortgageType === "repayment" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              id="mortgage-type-repayment"
              name="mortgage-type"
              value="repayment"
              checked={mortgageType === "repayment"}
              className="custom-radio"
              required
              onChange={(e) => setMortgageType(e.target.value)}
            />
            <label
              htmlFor="mortgage-type-repayment"
              className="radio-label"
              onClick={() => setMortgageType("repayment")}
            >
              Repayment
            </label>
          </div>

          <div
            className={`radio-container ${
              mortgageType === "interest" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              id="mortgage-type-interest"
              name="mortgage-type"
              value="interest"
              checked={mortgageType === "interest"}
              className="custom-radio"
              required
              onChange={(e) => setMortgageType(e.target.value)}
            />
            <label
              htmlFor="mortgage-type-interest"
              className="radio-label"
              onClick={() => setMortgageType("interest")}
            >
              Interest Only
            </label>
          </div>
          {error && mortgageType === "" ? (
            <p className="error-text">This field is required</p>
          ) : (
            ""
          )}
        </div>
      </form>

      <button className="calculate-button" onClick={checkInput}>
        <img src={calculator} alt="calculator" className="calculator-icon" />
        Calculate Repayments
      </button>
    </section>
  );
};
