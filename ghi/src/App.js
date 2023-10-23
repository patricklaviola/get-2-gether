import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./Login_SignUp/LoginForm.js";
import SignUpForm from "./Login_SignUp/SignUpForm";
import GroupDashboard from "./GroupDashboard.js";
import Nav from "./Nav";
import "./App.css";
import CreateEventForm from "./Components/Events_/CreateEventModalForm.js";

function App() {
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  return (
    <div className="container">
      <BrowserRouter basename={basename}>
        <AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
          <Nav />
          <Routes>
            <Route exact path="/signup" element={<SignUpForm />}></Route>
            <Route exact path="/login" element={<LoginForm />}></Route>
            <Route exact path="/groups/:id" element={<GroupDashboard />}></Route>
            <Route exact path="/groups/{group_id}/events" element={<CreateEventForm />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
