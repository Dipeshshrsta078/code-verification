import "./App.css";

import CodeVerification from "./views/CodeVerification";
import Success from "./views/Success";

import { useContext } from "react";
import { VerifiedContext } from "./context/VerificationContext";

function App() {
  const verificationContext = useContext(VerifiedContext);
  return (
    <>{verificationContext.isVerified ? <Success /> : <CodeVerification />}</>
  );
}

export default App;
