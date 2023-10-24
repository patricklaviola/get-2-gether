import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./Login_SignUp/LoginForm.js";
import SignUpForm from "./Login_SignUp/SignUpForm";
import GroupDashboard from "./GroupDashboard.js";
import PersonalDashboard from "./PersonalDashboard";

import Nav from "./Nav";
import AddGroupMemberForm from "./AddGroupMemberForm";
import GroupForm from "./GroupForm";
import "./App.css";

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
            <Route exact path="/groups" element={<GroupForm />} />
            <Route exact path="/users/:id" element={<PersonalDashboard />}></Route>
            <Route exact path ="/group_members" element={<AddGroupMemberForm />} />
            <Route exact path="/groups/:id" element={<GroupDashboard />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
