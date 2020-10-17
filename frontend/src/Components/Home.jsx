import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import HomeIcon from "@material-ui/icons/Home";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: "40%",
    marginLeft: "60%",
  },
});
function Home() {
  const [regLog, setRegLog] = useState("/register");
  const history = useHistory();
  const classes = useStyles();

  const handleChange = (e, newregLog) => {
    setRegLog(newregLog);
    history.push(newregLog);
  };

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={regLog}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
        aria-label="icon label tabs example"
      >
        <Tab icon={<HomeIcon />} value="/register" label="Register" />
        <Tab icon={<LockOpenIcon />} value="/login" label="Login" />
      </Tabs>
    </Paper>
  );
}

export default Home;
