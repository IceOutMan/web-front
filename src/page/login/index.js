require('./index.css')

var _mm = require('util/mm.js')
var home = _mm.mmTest()
_mm.getUrlParam("test")
var html = '<div>{{name}}</div>'
var data = { name : 123 }
console.log(_mm.renderHtml(html, data))

_mm.request(
    {
        url : "/product/list.do?keyword=1",
        success : function(res){
            console.log(res)
        },
        error : function(errMsg){
            console.log(errMsg)
        }
    }
)
