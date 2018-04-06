import React, { Component } from 'react';
import './styles/tableItem.css';
import { diamond, arrow, question } from './assets';
import { SIZE } from './constants';
export default class TableItem extends Component {
  state = {
    pressed: false,
    isDiamond: false
  };
  _resetCurrentTile() {
    if (!this.state.isDiamond && this.state.pressed) {
      this.setState({ pressed: false });
    }
  }
  left = <img src={arrow} className="images" alt="arrowL" />;
  right = <img src={arrow} className="images right" alt="arrowR" />;
  up = <img src={arrow} className="images up" alt="arrowU" />;
  down = <img src={arrow} className="images down" alt="arrowD" />;
  render() {
    if (!this.state.pressed)
      return (
        <button
          className="button"
          id={`button${this.props.row}${this.props.col}`}
          style={{
            background:
              (this.props.row % 2 === 0 && this.props.col % 2 === 1) ||
              (this.props.row % 2 === 1 && this.props.col % 2 === 0)
                ? '#cc9966'
                : '#ffbf00'
          }}
          onClick={() => {
            document.getElementById(
              `button${this.props.row}${this.props.col}`
            ).className =
              'button-rotate';
            this.props.decrementCounter();
            let isDiamond = false;
            let nearestNeighbour;
            if (
              this.props.diamondPositions.findIndex(
                pos => pos.r === this.props.row && pos.c === this.props.col
              ) !== -1
            ) {
              isDiamond = true;
            } else {
              let minR = SIZE;
              let minC = SIZE;
              this.props.diamondPositions.forEach(diamond => {
                if (
                  (Math.abs(diamond.r - this.props.row) +
                    Math.abs(diamond.c - this.props.col)) /
                    2 <
                  (minC + minR) / 2
                ) {
                  minR = Math.abs(diamond.r - this.props.row);
                  minC = Math.abs(diamond.c - this.props.col);
                  nearestNeighbour = diamond;
                }
              });
              if (
                Math.abs(nearestNeighbour.r - this.props.row) <
                  Math.abs(nearestNeighbour.c - this.props.col) ||
                nearestNeighbour.r === this.props.row
              ) {
                if (nearestNeighbour.c - this.props.col < 0)
                  this.setState({ nextDirection: this.right });
                else this.setState({ nextDirection: this.left });
              } else {
                if (nearestNeighbour.r - this.props.row > 0)
                  this.setState({ nextDirection: this.down });
                else this.setState({ nextDirection: this.up });
              }
            }
            if (isDiamond) {
              this.props.removeDiamondFromArray();
            } else {
              setTimeout(() => this._resetCurrentTile(), 4000);
            }
            setTimeout(
              () =>
                this.setState({ isDiamond }, () => {
                  this.setState({ pressed: true });
                  document.getElementById(
                    `button${this.props.row}${this.props.col}`
                  ).className =
                    'button';
                }),
              700
            );
          }}
        >
          <img
            src={question}
            className="images"
            alt="question"
            style={{ opacity: 0.4 }}
          />
        </button>
      );
    if (this.state.isDiamond)
      return (
        <div className="display-value-diamond">
          <img src={diamond} className="images" alt="diamond" />
        </div>
      );
    return <div className={`display-value`}>{this.state.nextDirection}</div>;
  }
}
