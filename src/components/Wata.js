import React, { Component } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

class Wata extends Component {
  render() {
    return (
      <TableRow>
        <TableCell>{this.props.wata_id}</TableCell>
        <TableCell>{this.props.manage_index}</TableCell>
        <TableCell>{this.props.title}</TableCell>
        <TableCell>{this.props.creator}</TableCell>
        <TableCell>{this.props.category}</TableCell>
        <TableCell>{this.props.sub_category}</TableCell>
        <TableCell>{this.props.genre}</TableCell>
        <TableCell>{this.props.keywords.map(k => {
          return k + "/";
        })}
        </TableCell>
        <TableCell>{this.props.cautions.map(c => {
          return c + "/";
        })}
        </TableCell>
        <TableCell>{this.props.platforms.map(p => {
          return <a herf={p.url}>{p.name}</a>;
        })}
        </TableCell>
        <TableCell><img src={this.props.thumnail} /></TableCell>
        <TableCell>{this.props.adder}</TableCell>
        <TableCell>{this.props.edit_date}</TableCell>
        <TableCell>{this.props.isDelete}</TableCell>
      </TableRow>
    );
  }
}

export default Wata;
