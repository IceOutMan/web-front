require('./index.css')
var _mm = require('util/mm.js')
var templateIndex = require('./index.string')

//  内容导航侧边栏
var navSide = {
    option: {
        name: '',
        navList: [
            {name: 'user-center', desc: '个人中心', href: './user-center.html'},
            {name: 'order-list', desc: '我的订单', href: './order-list.html'},
            {name: 'pass-update', desc: '修改密码', href: './pass-update.html'},
            {name: 'about', desc: '关于MMALL', href: './about.html'}
        ]

    },
    init: function (option) {
        // 将参数传递的 option 合并到 this.option 对象中
        $.extend(this.option, option)
        this.renderNav();
        return this;
    },

    // 渲染导航菜单
    renderNav: function () {
        // 计算 active 数据
        for (var i = 0, iLength = this.option.navList.length; i < iLength; i++) {
            if (this.option.navList[i].name === this.option.name) {
                this.option.navList[i].isActive = true;
            }
        }

        // 渲染list 数据
        var navHtml = _mm.renderHtml(templateIndex, {
            navList: this.option.navList
        });

        //  html 放入容器
        $('.nav-side').html(navHtml);

    },
};

module.exports = navSide.init();

