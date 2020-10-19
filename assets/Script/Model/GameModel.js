import CellModel from "./CellModel"
import {
  CELL_TYPE,
  CELL_BASENUM,
  CELL_STATUS,
  GRID_WIDTH,
  GRID_HEIGHT,
  ANITIME,
} from "./ConstValue"

export default class GameModel {
  constructor() {
    this.cells = null
    this.cellBgs = null
    this.lastPos = cc.v2(-1, -1)
    this.cellTypeNum = 5
    this.cellCreateType = [] // 升成种类只在这个数组里面查找
  }

  init(cellTypeNum) {
    this.cells = []
    this.setCellTypeNum(cellTypeNum || this.cellTypeNum)
    for (var i = 1; i <= GRID_WIDTH; i++) {
      this.cells[i] = []
      for (var j = 1; j <= GRID_HEIGHT; j++) {
        this.cells[i][j] = new CellModel()
      }
    }

    for (var i = 1; i <= GRID_WIDTH; i++) {
      for (var j = 1; j <= GRID_HEIGHT; j++) {
        let flag = true
        while (flag) {
          flag = false
          this.cells[i][j].init(this.getRandomCellType())
          let result = this.checkPoint(j, i)[0]
          if (result.length > 2) {
            flag = true
          }
          this.cells[i][j].setXY(j, i)
          this.cells[i][j].setStartXY(j, i)
        }
      }
    }
  }
  setCellTypeNum(num) {
    console.log("num = ", num)
    this.cellTypeNum = num
    this.cellCreateType = []
    let createTypeList = this.cellCreateType
    for (let i = 1; i <= CELL_BASENUM; i++) {
      createTypeList.push(i)
    }
    for (let i = 0; i < createTypeList.length; i++) {
      let index = Math.floor(Math.random() * (CELL_BASENUM - i)) + i
      createTypeList[i],
        (createTypeList[index] = createTypeList[index]),
        createTypeList[i]
    }
  }
}
