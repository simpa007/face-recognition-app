import React from "react";
import "./Header.css";
export default function Header({ name, entries }) {
  return (
    <div className="header">
      <h3>
        {name}, your current rank is...
        <br />#{entries}
      </h3>
      <p>
        This magic brain will detect faces in your pictures. Give it a try...
      </p>
    </div>
  );
}
