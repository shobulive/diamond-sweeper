import React, { Component } from 'react';
import './tableItem.css';
// import $ from 'jquery';
import diamond from './diamond.png';
import arrow from './arrow.png';
import question from './question.png';
export default class TableItem extends Component {
  state = {
    pressed: false,
    isDiamond: false
  };
  diamondPositions = this.props.diamondPositions.slice();
  diamondIndexInPosArray = this.diamondPositions.findIndex(
    d => d.r === this.props.row && d.c === this.props.col
  );
  resetBoxes() {
    if (!this.state.isDiamond && this.state.pressed) {
      this.setState({ pressed: false });
    }
  }
  componentDidMount() {
    if (
      this.props.diamondPositions.findIndex(
        pos => pos.r === this.props.row && pos.c === this.props.col
      ) !== -1
    ) {
      this.setState({ isDiamond: true });
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
          id={'button'}
          style={{
            background:
              (this.props.row % 2 === 0 && this.props.col % 2 === 1) ||
              (this.props.row % 2 === 1 && this.props.col % 2 === 0)
                ? '#cc9966'
                : '#ffbf00'
          }}
          onClick={() => {
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
              let minR = 8;
              let minC = 8;
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
              setTimeout(() => this.resetBoxes(), 4000);
            }
            setTimeout(
              () =>
                this.setState({ isDiamond }, () =>
                  this.setState({ pressed: true })
                ),
              0
            );
          }}
        >
          <img
            src={question}
            className="images"
            alt="question"
            style={{ opacity: 0.2 }}
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
