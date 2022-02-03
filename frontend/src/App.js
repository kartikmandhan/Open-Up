import React, { useEffect } from "react";
import Account from "./components/Account/Account";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "./style.css";
import Discussions from "./components/Discussions/Discussions";
const { Header, Footer } = Layout;
const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
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
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
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

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Router>
        <Switch>
          {isAuthenticated ? (
            <>
              <Route path="/" exact>
                <Header style={styles.header}>
                  <h4>OPEN-UP</h4>
                  <div style={styles.headerRight}>
                    <Account />
                  </div>
                </Header>
                <div style={styles.content}>
                  <h1 className="mt-5">Log in successfull</h1>
                </div>
              </Route>
              <Route path="/discussions" exact>
                <Discussions />
              </Route>
            </>
          ) : (
            <Route path="/nonauthenticated">
              <h3>Please login using the "Authenticate" button</h3>
            </Route>
          )}
        </Switch>
      </Router>
      <Footer style={{ textAlign: "center" }}>
        Copyright 111903039 111903023
      </Footer>
    </Layout>
  );
}

export default App;
