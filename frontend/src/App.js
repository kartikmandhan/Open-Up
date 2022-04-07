import React, { useEffect } from "react";
import Account from "./components/Account/Account";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "./style.css";
import Discussions from "./components/Discussions/Discussions";
import Main from "./components/Main";
import CommentPage from "./components/CommentPage";
import Profile from "./components/profile/Profile";
import logo from "./assets/logo.png";
import hero from "./assets/hero.svg";
const { Header, Footer } = Layout;
const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    padding: "10px",
    backgroundColor: "#15202b",
    color: "white",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
    backgroundColor: "#15202b",
    color: "white",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
    marginRight: "20px",
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    width: "100vw",
    userSelect: "none",
    backgroundColor: "#15202b",
    color: "white",
  },
};

function App() {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();
  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);
  // console.log(isAuthenticated);
  return (
    <Layout style={{ height: "100%", overflow: "auto" }}>
      <Router>
        <Switch>
          {isAuthenticated ? (
            <>
              <Route path="/" exact>
                <div style={styles.wrapper}>
                  <Main />
                </div>
              </Route>
              <Route path="/discussions" exact>
                <Discussions />
              </Route>
              <Route
                path="/post/:postId"
                exact
                component={(props) => (
                  <div style={styles.wrapper}>
                    <CommentPage {...props} />
                  </div>
                )}
              />
              <Route path="/profile" exact component={(props) => <Profile />} />
            </>
          ) : (
            <Route path="/">
              <Header style={styles.header}>
                <div>
                  <img
                    className="img-fluid"
                    style={{ width: "9rem" }}
                    src={logo}
                    alt="logo"
                  />
                </div>
                <div style={styles.headerRight}>
                  <Account />
                </div>
              </Header>
              <img
                className="img-fluid"
                style={{
                  width: "600px",
                  height: "600px",
                  position: "absolute",
                  right: "5%",
                  top: "20%",
                }}
                src={hero}
                alt="hero"
              />
              <div
                style={{
                  position: "absolute",
                  left: "5%",
                  top: "20%",
                }}
              >
                <img
                  className="img-fluid"
                  style={{
                    height: "300px",
                  }}
                  src={logo}
                  alt="logo"
                />
                <h3 style={{ color: "#55C096" }}>
                  A place where{" "}
                  <span style={{ color: "#E9D985" }}>"What?"</span> matters more
                  than <span style={{ color: "#E9D985" }}>"Who?"</span>
                </h3>
              </div>

              <Footer
                style={{
                  backgroundColor: "#15202b",
                  color: "white",
                  position: "absolute",
                  bottom: "5%",
                  left: "36%",
                }}
              >
                Copyright 111903039 111903023
              </Footer>
            </Route>
          )}
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
