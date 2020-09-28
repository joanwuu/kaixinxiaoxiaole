import AudioUtils from "../Utils/AudioUtils"

cc.Class({
  extends: cc.Component,

  properties: {
    loadingBar: {
      type: cc.ProgressBar,
      default: null,
    },
    loadingText: {
      type: cc.Label,
      default: null,
    },
    loginButton: {
      type: cc.Button,
      default: null,
    },
    worldSceneBGM: {
      type: cc.AudioClip,
      default: null,
    },
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.gameSceneBGMAudioId = cc.audioEngine.play(this.worldSceneBGM, true, 1)
  },

  start() {},

  onLogin: function () {
    this.loadingBar.node.active = true
    this.loginButton.node.active = false
    this.loadingBar.progress = 0

    cc.director.preloadScene(
      "Game",
      this.onProgress.bind(this),
      function () {}.bind(this)
    )
  },

  onProgress: function (completedCount, totalCount, item) {
    this.loadingBar.progress = completedCount / totalCount
    this.loadingText.string =
      Math.floor((100 * completedCount) / totalCount) + "%"
  },

  onDestroy: function () {
    cc.audioEngine.stop(this.gameSceneBGMAudioId)
  },
})
