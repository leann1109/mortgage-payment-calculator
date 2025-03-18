import React, { useState } from "react";
import { Calculator } from "./components/Calculator/Calculator";
import { Results } from "./components/Results/Results";
import "./App.css";

export const App = () => {
  const [monthlyRepayment, setMonthlyRepayment] = useState<string>("0");
  const [totalRepayment, setTotalRepayment] = useState<string>("0");

  return (
    <div className="App">
      <Calculator
        setMonthlyRepayment={setMonthlyRepayment}
        setTotalRepayment={setTotalRepayment}
      />
      <Results
        monthlyRepayment={monthlyRepayment}
        totalRepayment={totalRepayment}
      />
    </div>
  );
};
