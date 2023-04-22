import { useState, useEffect } from "react";
import "./App.css";
import ParticlesBg from "particles-bg";
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { Navbar } from "./component/navbar/Navbar";
import Header from "./component/header/Header";
import InputField from "./component/inputField/InputField";
import FaceDetection from "./component/faceDetection/FaceDetection";
import Register from "./auth/register/Register";
import Signin from "./auth/signin/Signin";
function App() {
  const [input, setInput] = useState("");
  const [imageURL, setImageURL] = useState(input);
  const [isSignIn, setIsSignIn] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [box, setBox] = useState({});
  const [users, setUsers] = useState({
    id: "",
    name: "",
    email: "",
    entries: 0,
    join: "",
  });
  // const { id, name, email, password, entries, join } = user;
  const loadUser = (data) => {
    setUsers({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      join: data.join,
    });
  };
  const nav = useNavigate();
  const imagePredictionURL = () => {
    // Your PAT (Personal Access Token) can be found in the portal under Authentification
    const PAT = process.env.PAT;
    // Specify the correct user_id/app_id pairings
    // Since you're making inferences outside your app's scope
    const USER_ID = process.env.USER_ID;
    const APP_ID = "test";
    // Change these to whatever model and image URL you want to use
    const MODEL_ID = "face-detection";
    const MODEL_VERSION_ID = process.env.MODEL_VERSION_ID;
    const IMAGE_URL = input;

    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };

    // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
    // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
    // this will default to the latest version_id

    fetch(
      "https://api.clarifai.com/v2/models/" +
        MODEL_ID +
        "/versions/" +
        MODEL_VERSION_ID +
        "/outputs",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result) {
          axios
            .put("http://localhost:4000/image", { id: users.id })
            .then((count) => {
              console.log(count);
              setUsers({
                ...users,
                entries: count.data,
              });
            });
        }
        // console.log(result.outputs[0].data.regions[0].region_info.bounding_box)
        displayFaceBox(calculateFaceLocation(result));
      })

      .catch((error) => console.log("error", error));
  };

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = image.width;
    const height = image.height;
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    setBox(box);
  };

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };
  const handleClicked = (e) => {
    setImageURL(input);
    imagePredictionURL();

    e.preventDefault();
  };
  const handleSignIn = () => {
    setIsSignIn(!isSignIn);
  };
  const handleRegister = () => {
    // setIsRegister(!isRegister);
    nav("/");
  };
  const handleSignOut = () => {
    nav("/register");
  };
  return (
    <div className="App">
      <ParticlesBg num={200} type="cobweb" bg={true} />
      <Routes>
        <Route path="/" element={<Navbar handleSignOut={handleSignOut} />}>
          {isSignIn || isRegister ? (
            <Route
              path="/"
              element={
                <>
                  <Header name={users.name} entries={users.entries} />
                  <InputField
                    input={input}
                    handleInput={handleInputChange}
                    handleClicked={handleClicked}
                  />
                  <FaceDetection image={imageURL} box={box} />;
                </>
              }
            />
          ) : (
            <>
              <Route
                path="/"
                element={
                  <Signin loadUser={loadUser} handleSignIn={handleSignIn} />
                }
              />
              <Route
                path="/register"
                element={
                  <Register
                    loadUser={loadUser}
                    handleRegister={handleRegister}
                  />
                }
              />
            </>
          )}
        </Route>
      </Routes>
    </div>
  );
}

{
  /* <Routes>
  <Route path="/" element={<Navbar />}>
    <Route index element={<Category />} />
    <Route path="/sign-in" element={<Login />} />
    <Route path="/sign-up" element={<Signup />} />
    <Route path="/shop" element={<Shop />} />
  </Route>
</Routes>; */
}
export default App;
