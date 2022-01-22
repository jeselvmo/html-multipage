export function getQueryString(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = window.location.search.substring(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  } else {
    return null;
  }
}
