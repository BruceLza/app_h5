export const storage = {
  set: function (key, data) {
    try {
      if (window.api) {
        // 有全局api对象时原生也存储一下
        api.setPrefs({key: key, value: JSON.stringify(data)})
      }
      return window.localStorage.setItem(key, window.JSON.stringify(data))
    } catch (err) {
      if (window.api) {
        // 有全局api对象时原生也存储一下
        api.setPrefs({key: key, value: data})
      }
      return window.localStorage.setItem(key, data)
    }
  },
  get: function (key) {
    if (window.api) {
      // 有全局api对象时用原生存储
      try {
        return JSON.parse(api.getPrefs({sync: true, key: key}))
      } catch (err) {
        return api.getPrefs({sync: true, key: key})
      }
    } else {
      // 没有全局api对象时
      try {
        return window.JSON.parse(window.localStorage.getItem(key))
      } catch (err) {
        return window.localStorage.getItem(key)
      }
    }
  },
  remove: function (key) {
    if (window.api) {
      api.removePrefs({key: key})
      window.localStorage.removeItem(key)
    } else {
      return window.localStorage.removeItem(key)
    }
  }
}
export function copyText (text) {
  return new Promise(function (resolve, reject) {
    // 复制链接
    var input = document.createElement('input')
    input.value = text
    document.body.appendChild(input)
    input.select()
    input.setSelectionRange(0, input.value.length)
    document.execCommand('Copy')
    document.body.removeChild(input)
    resolve()
  })
}
/*
* 使用inShare模块,在targetsdkversion 26版本上运行良好
* @param imgArr: 要分享的图片数组
* @param targetApp: 要分享的目标app
* */
export function useInShare (imgArr, targetApp) {
  return new Promise(function (resolve, reject) {
    var inShare = api.require('inShare')
    inShare.shareImgsTo({
      imgPaths: imgArr.join(','),
      sendPattern: 'ONLY',
      app: targetApp
    })
  })
}
