// Form navigation by keyboard
const Navigation = {
  // keys
  ARROW: {LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40},
  TAB: 9,
  _navigationMap: [],        // a mapping from position (x, y) to element id (_elementId) of every question.
  _reverseNavigationMap: {}, // a reverse mapping from element id to position, for quick search of positions.

  /**
   * Set up or update the navigation map of all active fields
   * @param lfData the LFormsData object of a form
   */
  setupNavigationMap(lfData) {
    let items = lfData.itemList,
        posX = 0, posY = 0;
    this._navigationMap = [];
    this._reverseNavigationMap = {};
    for (let i=0, iLen=items.length; i<iLen; i++) {
      // not in horizontal tables
      if (!items[i]._inHorizontalTable && !items[i].header) {
        // TODO: if it is not a hidden target fields of skip logic rules

        posX = 0; // set x to 0
        this._navigationMap.push([items[i]._elementId]);
        this._reverseNavigationMap[items[i]._elementId] = {x: posX, y: posY};
        posY += 1; // have added a row
      }
      // in horizontal tables and it is a table header
      else if (items[i]._horizontalTableHeader) {
        let tableKey = [items[i].linkId + items[i]._parentItem._idPath];
        let tableInfo = lfData._horizontalTableInfo[tableKey];
        // it is the first table header
        if (tableInfo && tableInfo.tableStartIndex === i) {
          for (let j= 0, jLen = tableInfo.tableRows.length; j < jLen; j++) {
            let tableRowMap = [];
            let tableRow = tableInfo.tableRows[j];
            posX = 0; // new row, set x to 0
            for (let k= 0, kLen = tableRow.cells.length; k < kLen; k++) {
              let cellItem = tableRow.cells[k];
              tableRowMap.push(cellItem._elementId);
              this._reverseNavigationMap[cellItem._elementId] = {x: posX, y: posY};
              posX += 1; // have added a field in the row
            }
            this._navigationMap.push(tableRowMap);
            posY += 1; // have added a row
          }
          // move i to the item right after the horizontal table
          i = tableInfo.tableEndIndex;
        }
      }
      // non header items in horizontal tables are handled above
    }
  },


  /**
   * Find a field's position in navigationMap from its element id
   * @param id the ID of the currently focused DOM element
   * @returns {*} the position in the navigation map array of the currently focused DOM element
   */
  getCurrentPosition(id) {
    return id ? this._reverseNavigationMap[id] : null;
  },


  /**
   * Find the next field to get focus
   * @param kCode code value of a keyboard key
   * @param id the ID of the currently focused DOM element
   * @returns {*}
   */
  getNextFieldId(kCode, id) {
    let nextPos, nextId;
    // if the current position is known
    let curPos = this.getCurrentPosition(id);
    if (curPos) {
      switch(kCode) {
        // Move left
        case this.ARROW.LEFT: {
          // move left one step
          if (curPos.x > 0) {
            nextPos = {
              x: curPos.x - 1,
              y: curPos.y
            };
          }
          // on the leftmost already, move to the end of upper row if there's an upper row
          else if (curPos.y > 0) {
            nextPos = {
              x: this._navigationMap[curPos.y - 1].length - 1,
              y: curPos.y - 1
            };
          }
          // else, it is already the field on the left top corner. do nothing
          break;
        }
        // Move right
        case this.ARROW.RIGHT: {
          // move right one step
          if (curPos.x < this._navigationMap[curPos.y].length - 1) {
            nextPos = {
              x: curPos.x + 1,
              y: curPos.y
            };
          }
          // on the rightmost already, move to the beginning of lower row if there's a lower row
          else if (curPos.y < this._navigationMap.length - 1) {
            nextPos = {
              x: 0,
              y: curPos.y + 1 };
          }
          // else it is already the field on the right bottom corner. do nothing
          break;
        }
        // Move up
        case this.ARROW.UP: {
          // move up one step
          if (curPos.y > 0) {
            // if upper row does not have a field at the same column
            // choose the rightmost field
            let nearbyX = curPos.x;
            if (nearbyX >= this._navigationMap[curPos.y - 1].length) {
              nearbyX = this._navigationMap[curPos.y - 1].length - 1;
            }
            // set new position
            nextPos = {
              x: nearbyX,
              y: curPos.y - 1
            };
          }
          break;
        }
        // Move down
        case this.ARROW.DOWN: {
          // move up one step
          if (curPos.y < this._navigationMap.length - 1) {
            // if lower row does not have a field at the same column
            // choose the rightmost field
            let nearbyX = curPos.x;
            if (nearbyX >= this._navigationMap[curPos.y + 1].length) {
              nearbyX = this._navigationMap[curPos.y + 1].length - 1;
            }
            // set new position
            nextPos = {
              x: nearbyX,
              y: curPos.y + 1
            };
          }
          break;
        }
      } // end of switch
      if (nextPos) {
        nextId = this._navigationMap[nextPos.y][nextPos.x];
      }
    }
    return nextId;
  }
};
export default Navigation;