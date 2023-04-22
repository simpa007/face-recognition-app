import React from "react";
import "./FaceDetection.css";
export default function FaceDetection({ image, box }) {
  return (
    <div className="container">
      <div className="image">
        <img
          id="inputimage"
          src={image}
          alt=""
          width="500px"
          height="auto"
          className="img"
        />
      </div>

      <div
        className="bounding_box"
        style={{
          border: "1px solid red",
          top: box.topRow,
          right: box.rightCol,
          bottom: box.bottomRow,
          left: box.leftCol,
        }}
      ></div>
    </div>
  );
}
