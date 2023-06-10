require('./index.css')

var _mm = require('util/mm.js')

//  导航
var header = {
    init: function () {
        this.bindEvent();
        return this;
    },
    bindEvent: function () {
        // 点击搜索按钮后，作搜索提交
        var _this = this;
        $('#search-btn').click(function () {
            _this.searchSubmit();
        });

        //  输入回撤后，作搜索提交
        $('#search-input').keyup(function(e){
            // 13 是回车键
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        });
    },
    onLoad: function () {
        // keyword 存在，则回填输入框
        var keyword = _mm.getUrlParam('keyword');
        if (keyword) {
            $('#search-input').val(keyword);
        }
    },

    // 搜索的提交
    searchSubmit: function () {
        var keyword = $.trim($('#search-input').val());
        if (keyword) {
            // 如果提交的时候有 keyword， 正常跳转到list
            window.location.href = './list.html?keyword=' + keyword;
        } else {
            // 如果 keyword 为空，直接返回首页
            // _mm.goHome();
        }

    },

};

module.exports = header.init();

