function getimgs() {
}
function getcookie(name) {
    var allcookies = document.cookie;
    var start = allcookies.indexOf(name + '=');
    if (start == -1)
        return null;
    start += name.length + 1;
    var end = allcookies.indexOf(';', start);
    if (end == -1)
        end = allcookies.length;
    var cookieval = allcookies.substring(start, end);
    return decodeURI(cookieval);
}
function myonsubmit() {
    return true;
}
function escapeHTML(str) {
    var div = document.createElement('div');
    var text = document.createTextNode(str);
    div.appendChild(text);
    return div.innerHTML;
}
//# sourceMappingURL=site.js.map