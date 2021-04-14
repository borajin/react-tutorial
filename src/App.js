import React, { Component } from "react";
import Wata from "./components/Wata";
import "./App.css";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";

import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    minWidth: 1080,
  },

  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class App extends Component {
  state = {
    watas: "",
    completed: 0,
  };

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then((res) => this.setState({ watas: res }))
      .catch((err) => console.log(err));
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  callApi = async () => {
    const response = await fetch("http://warchive.pythonanywhere.com/api");
    const body = await response.json();
    return body;
  };

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    const { classes } = this.props;
    return (  
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>아이디</TableCell>
              <TableCell>관리번호</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>제작</TableCell>
              <TableCell>대분류</TableCell>
              <TableCell>중분류</TableCell>
              <TableCell>장르</TableCell>
              <TableCell>키워드</TableCell>
              <TableCell>주의키워드</TableCell>
              <TableCell>플랫폼</TableCell>
              <TableCell>썸네일</TableCell>
              <TableCell>추가한사람</TableCell>
              <TableCell>수정일자</TableCell>
              <TableCell>삭제여부</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.watas ? (
              this.state.watas.wata_list.map((w) => {
                return (
                  <Wata
                    key={w.wata_id}
                    wata_id={w.wata_id}
                    manage_index={w.manage_index}
                    title={w.title}
                    creator={w.creator}
                    category={w.category}
                    sub_category={w.sub_category}
                    genre={w.genre}
                    keywords={w.keywords}
                    cautions={w.cautions}
                    platforms={w.platforms}
                    thumnail={w.thumnail}
                    adder={w.adder}
                    edit_date={w.edit_date}
                    isDelete={w.isDelete}
                  />
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress
                    className={classes.progress}
                    variant="determinate"
                    value={this.state.completed}
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
