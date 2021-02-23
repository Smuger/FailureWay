import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import profileScreen from "./screens/ProfileScreen";
import ReportScreen from "./screens/ReportScreen";
import ServiceScreen from "./screens/ServiceScreen";
import CreateServiceScreen from "./screens/CreateServiceScreen";
import MessagesScreen from "./screens/MessagesScreen";
import ChatScreen from "./screens/ChatScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen} />
          <Route path="/profile" component={profileScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/service" component={CreateServiceScreen} />
          <Route path="/services/:id" component={ServiceScreen} />
          <Route path="/" component={HomeScreen} exact />
          <Route path="/report" component={ReportScreen} exact />
          <Route path="/messages" component={MessagesScreen} exact />
          <Route path="/messages/:id" component={ChatScreen} />
          <Route path="/search/:keyword" component={HomeScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
