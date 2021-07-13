import React, { useState, createContext, Component } from "react";
import "./app.scss";
import data from "./data";

const EmailContext = createContext();

const EmailProvider = (props) => {
  const [step, setStep] = useState("GMail");
  const onChange = (input) => () => {
    setStep(input);
  };

  const [folder, setFolder] = useState("Inbox");
  const onFolderChange = (input) => () => {
    setFolder(input);
  };

  const [toggle, setToggle] = useState("0%");
  const toggleTray = () => {
    if (toggle === "0%") {
      setToggle("-50%");
    } else {
      setToggle("0%");
    }
  };

  const state = {
    step: step,
    folder: folder,
    toggle: toggle,
  };

  const funct = {
    onChange: onChange,
    onFolderChange: onFolderChange,
    toggleTray: toggleTray,
  };

  return (
    <EmailContext.Provider value={{ state: state, funct: funct }}>
      {props.children}
    </EmailContext.Provider>
  );
};

const App = () => {
  //const [theme, setTheme] = useState("dark-theme");

  // const onTheme = () => {
  //   if (theme === "dark-theme") {
  //     setTheme("light-theme");
  //   } else {
  //     setTheme("dark-theme");
  //   }
  // };

  return (
    <EmailProvider>
      <div className="body">
        <div className="wrapper">
          <div className="container">
            <Nav />
            <AccountSwitch />
          </div>
        </div>
      </div>
    </EmailProvider>
  );
};

export default App;

const Nav = () => {
  const List = () => {
    return data.map((folders) => {
      return (
        <EmailContext.Consumer>
          {(context) => {
            const { funct, state } = context;
            return (
              <React.Fragment>
                <div className="box">
                  <i className="far fa-envelope"></i> {folders.title}
                </div>
                {folders.content.map((account) => {
                  if (account[1]) {
                    let active = "";
                    if (state.folder === account) {
                      active = "active";
                    } else {
                      active = "";
                    }
                    return (
                      <div
                        className={`content ${active}`}
                        onClick={funct.onFolderChange(account)}
                      >
                        <div className="top">
                          <span className="title">{account}</span>
                        </div>
                      </div>
                    );
                  } else {
                    let active = "";
                    if (state.step === account.account) {
                      active = "active";
                    } else {
                      active = "";
                    }
                    return (
                      <div
                        className={`content ${active}`}
                        onClick={funct.onChange(account.account)}
                      >
                        <div className="top">
                          <span className="title">{account.account}</span>
                          <span className="count">{account.count}</span>
                        </div>
                        <span className="sub">{account.email}</span>
                      </div>
                    );
                  }
                })}
                <br />
              </React.Fragment>
            );
          }}
        </EmailContext.Consumer>
      );
    });
  };
  return (
    <EmailContext.Consumer>
      {(context) => {
        const { funct, state } = context;
        return (
          <React.Fragment>
            <div className="trayButton" onClick={funct.toggleTray}>
              <i className="fas fa-bars"></i>
            </div>
            <div className="nav" id="nav" style={{ left: state.toggle }}>
              <div className="user">
                <i className="far fa-user-circle"></i> User
                <div className="trayButtonO" onClick={funct.toggleTray}>
                  <i className="fas fa-bars"></i>
                </div>
              </div>
              <div className="navContainer">
                <List />
              </div>
            </div>
          </React.Fragment>
        );
      }}
    </EmailContext.Consumer>
  );
};

const AccountSwitch = () => (
  <EmailContext.Consumer>
    {(context) => {
      const { funct, state } = context;
      switch (state.step) {
        case "GMail": {
          const account = data[0].content[0];
          return (
            <React.Fragment>
              <EmailList account={account} folder={state.folder} />
            </React.Fragment>
          );
        }

        case "Xampl": {
          const account = data[0].content[1];
          return (
            <React.Fragment>
              <EmailList account={account} folder={state.folder} />
            </React.Fragment>
          );
        }

        default: {
          const account = "";
          return (
            <React.Fragment>
              <EmailList account={account} folder={state.folder} />
            </React.Fragment>
          );
        }
      }
    }}
  </EmailContext.Consumer>
);

const EmailList = ({ account, folder }) => {
  let email;
  let Emails, Detail;
  if (account !== "") {
    Emails = () => {
      //failed attempt at changing email based on folders
      for (var idx = 0; idx <= account.emails.length; idx++) {
        if ((account.emails[idx].folder = folder)) {
          email = account.emails[idx];
          //initial loop code
          var eml = [];
          for (var i = 1; i <= email.count; i++) {
            let active = "";
            if (i === 3) {
              active = "active";
            }
            eml.push(
              <div className={`email ${active}`}>
                <span className="icon">
                  <span className="ico">{email.from.charAt(0)}</span>
                </span>
                <span className="detail">
                  <span className="from">{email.from}</span>
                  <span className="title">{email.title}</span>
                  <span className="description">{email.description}</span>
                </span>
                <span className="time">{email.time}</span>
              </div>
            );
          }
          return eml;
        }
      }
    };

    Detail = () => {
      return (
        <React.Fragment>
          <div className="secTop"></div>
          <div className="secTop">
            <span>
              <i className="fas fa-reply"></i> Reply
            </span>
            <span>
              <i className="fas fa-reply-all"></i> Reply All
            </span>
            <span>
              <i className="fas fa-share"></i> Forward
            </span>
            <span>
              <i className="fas fa-archive"></i>
            </span>
            <span>
              <i className="far fa-trash-alt"></i>
            </span>
            <span>
              <i className="fas fa-ellipsis-h"></i>
            </span>
          </div>
          <div className="secTitle">
            <span>{email.title}</span>
          </div>
          <div className="emailContainer">
            <div className="email">
              <div className="topContainer">
                <span className="senderContainer">
                  <span className="ico">{email.from.charAt(0)}</span>
                  <div className="senderDetail">
                    <span className="sender">{email.from}</span>
                    <span className="emailadd">{email.email}</span>
                    <span className="time">{email.time}</span>
                  </div>
                </span>
                <span className="open">
                  {" "}
                  <i className="far fa-window-restore"></i>
                </span>
              </div>
            </div>
            <p>
              <span className="to">to:{account.email}</span>
              <br />
              Dear Lorem,
              <br />
              {email.description}
            </p>
          </div>
        </React.Fragment>
      );
    };
  } else {
    Emails = () => "";
    Detail = () => "";
  }

  return (
    <React.Fragment>
      <div className="list" id="list">
        <div className="secTop"></div>
        <div className="secTop">
          <div className="search">
            <input type="text" placeholder="search"></input>
            <i className="fas fa-search"></i>
          </div>
          <span>
            <i className="fas fa-redo-alt"></i>
            <i className="fas fa-tasks"></i>
          </span>
        </div>
        <div className="secTitle">
          <span>Inbox</span>
          <span className="sort">
            All <i className="fas fa-chevron-down"></i>
          </span>
        </div>
        <div className="emailListContainer">
          <Emails />
        </div>
      </div>
      <div className="detail">
        <Detail />
      </div>
    </React.Fragment>
  );
};
