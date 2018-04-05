import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import TableItem from './tableItem';
class App extends Component {
  diamondPositions = [
    { r: Math.floor(Math.random() * 8), c: Math.floor(Math.random() * 8) }
  ];
  componentWillMount() {
    while (this.diamondPositions.length < 8) {
      let r = Math.floor(Math.random() * 8);
      let c = Math.floor(Math.random() * 8);
      if (
        this.diamondPositions.findIndex(pos => pos.r === r && pos.c === c) ===
        -1
      ) {
        this.diamondPositions.push({ r, c });
      }
    }
  }

  _renderRowElements(row) {
    let rowElements = [];
    for (let i = 0; i < 8; i++) {
      rowElements.push(
        <td>
          <TableItem
            row={row}
            col={i}
            diamondPositions={this.diamondPositions}
            removeDiamondFromArray={() => {
              this.diamondPositions.splice(
                this.diamondPositions.findIndex(
                  diamond => diamond.r === row && diamond.c === i
                ),
                1
              );
            }}
          />
        </td>
      );
    }
    return rowElements;
  }
  _renderRows() {
    let row = [];
    for (let i = 0; i < 8; i++) {
      row.push(<tr>{this._renderRowElements(i)}</tr>);
    }
    return row;
  }
  _renderTable() {
    return (
      <table>
        <tbody>{this._renderRows()}</tbody>
      </table>
    );
  }
  render() {
    return (
      <body>
        <div className="container">
          <div className="jumbotron">
            <h1 style={{ textAlign: 'center' }}>Diamond Sweeper</h1>
          </div>
        </div>
        <div className="container" style={{ textAlign: 'center' }}>
          {this._renderTable()}
        </div>
      </body>
    );
  }
}

export default App;
