// 设置cookie
export function setCookie (name, value, seconds) {
  // seconds有值就直接赋值，没有为0，这个根php不一样。
  seconds = seconds || 0
  var expires = ''
  // 设置cookie生存时间
  if (seconds !== 0) {
    var date = new Date()
    var expiresTime = new Date(date.getTime() + seconds * 1000)
    expires = '; expires=' + expiresTime.toGMTString()
  }
  document.cookie = name + '=' + value + expires
}
// 读取cookie
export function getCookie (name) {
  var arr, reg
  reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2])
  } else {
    return null
  }
}

// 清除cookie
export function clearCookie (name) {
  setCookie(name, '', -1)
}
