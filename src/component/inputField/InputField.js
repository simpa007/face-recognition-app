import React, { useState } from "react";
import "./InputField.css";

export default function InputField({ handleClicked, handleInput, input }) {
  return (
    <div className="form-field">
      <form>
        <input
          type="text"
          className="input-field"
          onChange={handleInput}
          value={input}
        />
        <button type="submit" onClick={handleClicked}>
          Detect
        </button>
      </form>
    </div>
  );
}
