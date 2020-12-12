import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    height:"100vh"
  },
  subRoot:{
    display: "flex",
    justifyContent:"space-around"
  },
  btnContainer: {
    background:"#ffff"
  },
  paper2: {
    width: "500px",
  },
  iconBtn: {
    width: "fit-content"
  },
  ul:{
    display: "flex",

  },
  btnCrud:{
    width:"40px",
    fontSize:"12px",
    margin: "0px 10px"
  }, 
  iconBtnTrash:{
    margin: "0px 20px 0px 0px",
    padding:"20px"
  }
}));
