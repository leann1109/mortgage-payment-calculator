import React from "react";
import empty from "../../assets/images/illustration-empty.svg";
import { formatNumberWithCommas } from "../../utils/helper";
import "./Results.css";

type ResultsProps = {
  monthlyRepayment: string;
  totalRepayment: string;
};

export const Results = ({ monthlyRepayment, totalRepayment }: ResultsProps) => {
  const NoResult = () => {
    return (
      <div className="no-result">
        <img src={empty} alt="calculator-money" />
        <h2 className="heading-text">Results shown here</h2>
        <p className="no-result-text">
          Complete the form and click “calculate repayments” to see what your
          monthly repayments would be.
        </p>
      </div>
    );
  };

  return (
    <section className="results-section">
      {monthlyRepayment === "0" && totalRepayment === "0" ? (
        <NoResult />
      ) : (
        <>
          <h2 className="heading-text">Your results</h2>

          <p className="results-description">
            Your results are shown below based on the information you provided.
            To adjust the results, edit the form and click “calculate
            repayments” again.
          </p>

          <div>
            <div className="result-container lime-bg"></div>
            <div className="result-container">
              <div className="payment-container">
                <p className="payment-text">Your monthly repayments</p>
                <p className="payment-amount monthly">
                  ${formatNumberWithCommas(monthlyRepayment)}
                </p>
              </div>

              <div className="payment-container">
                <p className="payment-text">Total you'll repay over the term</p>
                <p className="payment-amount total">
                  ${formatNumberWithCommas(totalRepayment)}
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      <p className="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge">
          Frontend Mentor
        </a>
        . Coded by <a href="https://github.com/leann1109">Lean Obregon</a>.
      </p>
    </section>
  );
};
