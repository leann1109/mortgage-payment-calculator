import React from "react";
import { formatNumberWithCommas } from "../../utils/helper";
import "./InputTextfield.css";

type InputTextfieldProps = {
  title: string;
  value: number | string;
  setValue: (value: number | string) => void;
  index: number;
  error: boolean;
  setError: (value: boolean) => void;
};

export const InputTextfield = ({
  title,
  value,
  setValue,
  index,
  error,
}: InputTextfieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value.replace(/,/g, "");

    if (title === "Mortgage Amount") {
      if (rawValue === "" || /^[0-9]*\.?[0-9]{0,2}$/.test(rawValue)) {
        setValue(formatNumberWithCommas(rawValue));
      }
    } else if (title === "Mortgage Term") {
      if (rawValue === "" || /^[0-9]{0,3}$/.test(rawValue)) {
        setValue(rawValue);
      }
    } else {
      if (rawValue === "" || /^[0-9]{0,3}.?[0-9]{0,2}$/.test(rawValue)) {
        setValue(rawValue);
      }
    }
  };

  const inputId = title.replace(" ", "-").toLowerCase();

  return (
    <div className="input-container">
      <label htmlFor={inputId} className="input-label">
        {title}
      </label>
      <div
        className={`input-wrapper ${index > 0 ? "reverse" : ""} ${
          error && value === "" ? "error" : ""
        }`}
      >
        {title === "Mortgage Amount" ? (
          <span
            className={`symbol currency ${
              error && value === "" ? "error" : ""
            }`}
          >
            $
          </span>
        ) : title === "Mortgage Term" ? (
          <span className={`symbol ${error && value === "" ? "error" : ""}`}>
            years
          </span>
        ) : (
          <span className={`symbol ${error && value === "" ? "error" : ""}`}>
            %
          </span>
        )}
        <input
          required
          type="text"
          id={inputId}
          name={inputId}
          className={`input-textfield ${error && value === "" ? "error" : ""}`}
          value={
            value === ""
              ? ""
              : title === "Interest Rate"
              ? value
              : formatNumberWithCommas(value.toString())
          }
          onChange={handleChange}
        />
      </div>
      {error && value === "" ? (
        <p className="error-text">This field is required</p>
      ) : (
        ""
      )}
    </div>
  );
};
