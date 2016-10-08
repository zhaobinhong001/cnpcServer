Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
var currentSession = null;
'use strict';
angular.module('App', [
        'ngResource',
        'ui.router',
        'core.auth',

    ])
    .config(function ($stateProvider, $urlRouterProvider, $resourceProvider, $filterProvider) {


        $stateProvider
            .state('layout', {
                url: "",
                params: {'data': null},
                templateUrl: 'js/views/layout.html',
                controller: 'LayoutController',
                abstract: true
            })
            .state('homepage', {
                url: "/homepage",
                views: {
                    "content": {
                        templateUrl: 'js/views/home.html',
                        controller: function ($scope, $location, $state) {

                        }
                    }
                },
                //templateUrl: 'partials/homepage.html',
                //  templateUrl: 'js/views/tpl.home.html',
                parent: 'layout',
                controller: 'HomepageController'
            })

            .state('virtualCards', {
                url: "/virtualCards",
                views: {
                    "content": {
                        templateUrl: 'js/views/virtualCards.html',
                        controller: function ($scope, $location, $resource, $filter) {

                            $('#basic-datatable').dataTable({
                                "processing": true,
                                "serverSide": true,
                                "ajax": "api/web/queryCards",
                                "columns": [
                                    {
                                        title: "手机号", data: "phone"

                                    },
                                    {title: "身份证姓名", data: "idName"},
                                    {title: "身份证号", data: "idNumber"},
                                    {
                                        title: "卡号", data: "uuid"
                                    },
                                    {
                                        title: "开通时间", data: "createTime"
                                    },
                                    {
                                        title: "状态", data: "status", "render": function (data, type, full, meta) {
                                        if (data == 'ACTIVATED') {
                                            return "使用中"
                                        } else {
                                            return "已暂停"
                                        }
                                    }
                                    },
                                    {
                                        title: "操作", data: "id", "render": function (id, type, full, meta) {
                                        return "<button type=\"button\" class=\"btn btn-def\" onclick=\"window.location.href='details.html'\">查看详情 </button>" +
                                            "<button type=\"button\" class=\"btn btn-bul\" data-toggle=\"modal\" data-target=\"#myModal\">暂停使用</button>"
                                        //return "<button type='button' class='btn btn-default'><diy id='check_details'><a id=" + id + ">查看详情</a></diy></button>";
                                        // return "<button type='button' class='btn btn-default' ng-model='"+id+"' ng-click='details()'>查看详情</button>"
                                    }
                                    }
                                ],
                                "language": {
                                    "paginate": {
                                        "previous": "上一页",
                                        "next": "下一页"
                                    },
                                    "search": "搜索:",
                                    "sSearchPlaceholder": "客户姓名、证件号码、手机号、卡号",
                                    "emptyTable": "无数据",
                                    "info": "显示 _START_ 至 _END_ 总共 _TOTAL_ 条",
                                    "lengthMenu": "显示_MENU_条目",
                                    "zeroRecords": "没有符合条件的记录",
                                    "infoEmpty": "显示 0 至 0 总共 0 记录",
                                    "infoFiltered": "(从_MAX_条记录中过滤)"
                                }
                            });

                        }
                    }
                },
                parent: 'layout',
                controller: 'AccountController',
                resolve: {
                    result_data_child: function ($q, $timeout)//,CommonService)
                    {
                        //return resolve_homepage($q,CommonService)
                        var deferred = $q.defer();
                        $timeout(function () {
                            deferred.resolve("from a child");
                        }, 500);
                        return deferred.promise;
                    }
                }
            })

            .state('reports', {
                url: "/reports",
                views: {
                    "content": {
                        templateUrl: 'js/views/reports.html',
                        controller: function ($scope, $location, $resource) {
                            var table = $('#basic-datatable').dataTable({
                                "processing": true,
                                "serverSide": true,
                                "ajax": "api/web/queryReports",
                                "columns": [
                                    {
                                        title: "id", data: "id"
                                    },
                                    {
                                        title: "开通电子加油卡量", data: "openCardNum"
                                    },
                                    {
                                        title: "未充值数量", data: "noChange"
                                    },
                                    {
                                        title: "未消费数量", data: "noPay"
                                    },
                                    {
                                        title: "日期", data: "day"
                                    }
                                ],
                                "language": {
                                    "paginate": {
                                        "previous": "上一页",
                                        "next": "下一页"
                                    },
                                    "search": "搜索:",
                                    "sSearchPlaceholder": "",
                                    "emptyTable": "无数据",
                                    "info": "显示 _START_ 至 _END_ 总共 _TOTAL_ 条",
                                    "lengthMenu": "显示_MENU_条目",
                                    "zeroRecords": "没有符合条件的记录",
                                    "infoEmpty": "显示 0 至 0 总共 0 记录",
                                    "infoFiltered": "(从_MAX_条记录中过滤)"
                                }
                            });
                            var table2 = $('#basic-datatable2').dataTable({
                                "processing": true,
                                "serverSide": true,
                                "ajax": "api/web/queryReports",
                                "columns": [
                                    {
                                        title: "消费总金额", data: "paySum"
                                    },
                                    {
                                        title: "消费笔数", data: "payNum"
                                    },
                                    {
                                        title: "消费人数", data: "payUserNum"
                                    },
                                    {
                                        title: "消费均价(元/笔)", data: "payOneNum"
                                    },
                                    {
                                        title: "日期", data: "day"
                                    },
                                ],
                                "language": {
                                    "paginate": {
                                        "previous": "上一页",
                                        "next": "下一页"
                                    },
                                    "search": "搜索:",
                                    "sSearchPlaceholder": "",
                                    "emptyTable": "无数据",
                                    "info": "显示 _START_ 至 _END_ 总共 _TOTAL_ 条",
                                    "lengthMenu": "显示_MENU_条目",
                                    "zeroRecords": "没有符合条件的记录",
                                    "infoEmpty": "显示 0 至 0 总共 0 记录",
                                    "infoFiltered": "(从_MAX_条记录中过滤)"
                                }
                            });
//                            var reports = $resource('/api/angular/reports', null, {
//                                report: {method: 'POST'}
//                            });
//                            var reports = new reports();
//                            reports.$report(function (result) {
//                                    console.log("--->" + JSON.stringify(result));
//
//
//                                    $scope.table = $('#basic-datatable').DataTable({
//                                        "data": result.data,
//                                        "order": [[1, 'desc']],
//
//                                        // ajax:  JSON.stringify(result),
//                                        "rowId": 'id',
//                                        "columns": [
//                                            {title: "日期", data: "time"},
//                                            {
//                                                title: "用户来源", data: "customer_source",
//                                                "render": function (customer_source) {
//                                                    if (customer_source == null) {
//                                                        return "平台"
//                                                    }
//                                                }
//                                            },
//                                            {title: "远程开户数", data: "type1"},
//                                            {title: "手机银行签约", data: "type2"},
//                                            {title: "短信动帐提醒签约", data: "type3"},
//                                            {title: "理财产品购买签约", data: "type4"},
//
//                                        ],
//                                        "language": {
//                                            "paginate": {
//                                                "previous": "上一页",
//                                                "next": "下一页"
//                                            },
//                                            "search": "搜索:",
//                                            "emptyTable": "无数据",
//                                            "info": "显示 _START_ 至 _END_ 总共 _TOTAL_ 条",
//                                            "lengthMenu": "显示_MENU_条目",
//                                            "zeroRecords": "没有符合条件的记录",
//                                            "infoEmpty": "显示 0 至 0 总共 0 记录",
//                                            "infoFiltered": "(从_MAX_条记录中过滤)"
//                                        }
//                                    });
//                                    $scope.search = function () {
//
//                                        var datestart = $scope.datestart;
//                                        var dateto = $scope.dateto;
//                                        console.log(datestart + dateto);
//                                        var search = $resource('/api/angular/:action', {action: '@action'}, {
//                                            reportsearch: {method: 'POST', params: {action: 'search'}}
//                                        });
//                                        var search = new search();
//                                        search.start_time = datestart;
//                                        search.end_time = dateto;
//                                        search.$reportsearch(function (data) {
//                                            console.log("。。。。。。。。。。____>" + JSON.stringify(data));
//
//
//                                            var tablerows = $('#basic-datatable-rows');
//
//                                            $scope.table.clear();   // If the new data is meant to completely replace.
//                                            $scope.table.rows.add(data.data).draw();
//                                            tablerows.html(data);   // What is this for?
//                                            $('#basic-datatable').show();
//
//                                        })
//
//
//                                    }
//
////
////
//                                    $scope.exportData = function () {
//                                        var blob = new Blob([document.getElementById('exportable').innerHTML], {
//                                            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
//                                        });
//                                        saveAs(blob, "Report.xls");
//                                    };
//
////
////                                    $scope.search = function () {
////
////                                        console.log("................come to search............");
////
////                                    };
//
//                                    //
//                                }
//                            )


                        }
                    }
                },
                parent: 'layout',
                controller: 'AccountController',
                resolve: {
                    result_data_child: function ($q, $timeout)//,CommonService)
                    {
                        //return resolve_homepage($q,CommonService)
                        var deferred = $q.defer();
                        $timeout(function () {
                            deferred.resolve("from a child");
                        }, 500);
                        return deferred.promise;
                    }
                }

            })
            .state('orders', {
                url: "/orders",
                views: {
                    "content": {
                        templateUrl: 'js/views/orders.html',
                        controller: function ($scope, $location, $resource) {
                            var table = $('#basic-datatable').dataTable({
                                "processing": true,
                                "serverSide": true,
                                "ajax": "api/web/queryOrders",
                                "columns": [
                                    {
                                        title: "交易序列号", data: "tranid"
                                    },
                                    {
                                        title: "加油站", data: "optname"
                                    },
                                    {
                                        title: "加油用户", data: "idnamephone"
                                    },
                                    {
                                        title: "加油量(L)", data: "oilnum"
                                    },
                                    {
                                        title: "消费金额(元)", data: "fee"
                                    },
                                    {
                                        title: "更新时间", data: "updatedate"
                                    },
                                    {
                                        title: "状态", data: "resultstr"
                                    },
                                    {
                                        title: "操作", data: "id", "render": function (id, type, full, meta) {
                                        return "<button type='button' class='btn btn-default'><diy id='check_details'><a id=" + id + ">查看详情</a></diy></button>";
                                        // return "<button type='button' class='btn btn-default' ng-model='"+id+"' ng-click='details()'>查看详情</button>"
                                    }
                                    }
                                ],
                                "language": {
                                    "paginate": {
                                        "previous": "上一页",
                                        "next": "下一页"
                                    },
                                    "search": "搜索:",
                                    "sSearchPlaceholder": "",
                                    "emptyTable": "无数据",
                                    "info": "显示 _START_ 至 _END_ 总共 _TOTAL_ 条",
                                    "lengthMenu": "显示_MENU_条目",
                                    "zeroRecords": "没有符合条件的记录",
                                    "infoEmpty": "显示 0 至 0 总共 0 记录",
                                    "infoFiltered": "(从_MAX_条记录中过滤)"
                                }
                            });
                        }
                    }
                },
                parent: 'layout',
                controller: 'AccountController',
                resolve: {
                    result_data_child: function ($q, $timeout)//,CommonService)
                    {
                        //return resolve_homepage($q,CommonService)
                        var deferred = $q.defer();
                        $timeout(function () {
                            deferred.resolve("from a child");
                        }, 500);
                        return deferred.promise;
                    }
                }

            })
            .state('power', {
                url: "/power",
                views: {
                    "content": {
                        templateUrl: 'js/views/power.html'
                    }
                },
                parent: 'layout'

            })
            .state('registerAccount', {
                url: "/registerAccount",
                views: {

                    "content": {
                        templateUrl: 'js/views/registerAccount.html',
                        controller: function ($scope, $location) {

                            //$scope.btnDismiss = function () {
                            //    $scope.name = '';
                            //    $scope.number = '';
                            //    $scope.phone = '';
                            //    $scope.pensionNo = '';
                            //    return $scope;
                            //}
                            //
                            //$scope.submitForm = function (isValid) {
                            //
                            //    // check to make sure the form is completely valid
                            //    if (isValid) {
                            //
                            //        Account.register({
                            //            idName: $scope.name,
                            //            idNumber: $scope.number,
                            //            phone: $scope.phone,
                            //            pensionNo: $scope.pensionNo,
                            //            fileId: $('#fileId').val()
                            //        }, function (result) {
                            //
                            //            $scope.status = result.status;
                            //            if ($scope.status != 200) {
                            //                $scope.error = result.data.message;
                            //            } else {
                            //
                            //                $scope.activeCode = result.data.activeCode;
                            //                $scope.pwd = result.data.pwd;
                            //                // $scope.myModal.modal()
                            //                $('#myModal').modal();
                            //
                            //            }
                            //
                            //        });
                            //        //alert('our form is amazing');
                            //    }
                            //};
                        }
                    }
                },
                parent: 'layout',
                controller: 'AccountController'

            })
            .state('auth', {
                url: "/auth",
                //templateUrl: 'partials/homepage.html',
                templateUrl: 'js/auth/auth.template.html',
                controller: 'AuthController'
            })
            .state("updateUserPwd", {
                url: "/updateUserPwd",
                views: {
                    "content": {
                        templateUrl: 'js/views/updateUserPwd.html',
                        controller: function ($scope, $location, $state) {
                            //var id = currentSession.user.data.userid;
                            //var pwd = currentSession.user.data.userpwd;
                            //$('#updateUserpwdInfoViewModal').modal({backdrop: 'static', keyboard: false});
                            //$scope.saveUserPwd = function () {
                            //    // alert(pwd)
                            //    var newUserPwdA = $scope.newUserPwdA;
                            //    var newUserPwdB = $scope.newUserPwdB;
                            //
                            //    if ($scope.userpwd == null || newUserPwdA == null || newUserPwdB == null) {
                            //        alert("密码不可为空！")
                            //    } else {
                            //        var userpwd = $.sha256($scope.userpwd)
                            //        if (newUserPwdA == newUserPwdB) {
                            //            if (userpwd == pwd) {
                            //                var newpwd = $.sha256(newUserPwdA)
                            //                console.log("============" + newpwd)
                            //                User.updateUserpwd({id: id, pwd: newpwd}, function (result) {
                            //                    $scope.status = result.status;
                            //                    // alert($scope.status )
                            //                    if ($scope.status != 200) {
                            //                        $scope.error = result.data.message;
                            //                        alert(result.data.message)
                            //                    } else {
                            //                        $scope.activeCode = result.data.activeCode;
                            //                        $('#myModal').modal({backdrop: 'static', keyboard: false});
                            //                        $('#updateUserpwdInfoViewModal').modal('hide')//.remove();
                            //                    }
                            //                })
                            //            } else {
                            //                alert("原始密码不正确，请重新填写！")
                            //            }
                            //        } else {
                            //            alert("新密码不一致，请重新填写！")
                            //        }
                            //    }
                            //}
                            //$scope.btnDismiss = function () {
                            //    $state.go("auth");
                            //}
                        }
                    }
                },
                parent: 'layout'

            })

    })

    .controller('HomepageController', function ($scope, $state) {
        $scope.state = $state.current;
    })
    .controller('LayoutController', function ($scope, $state, $stateParams) {
        var result = $stateParams.data;
        if (result != null) {
            $scope.menus = result.data.data;
        }
        $scope.$on('onMenuRepeatLast', function (scope, element, attrs) {
            //work your magic
            console.log("onMenuRepeatLast");


            /*$('.dropdown-menu').click(function(event){
             event.stopPropagation();
             });*/


            /********************************
             Toggle Aside Menu
             ********************************/

            $(document).on('click', '.navbar-toggle', function () {

                $('aside.left-panel').toggleClass('collapsed');

            });


            /********************************
             Aside Navigation Menu
             ********************************/

            $("aside.left-panel nav.navigation > ul > li:has(ul) > a").click(function () {

                if ($("aside.left-panel").hasClass('collapsed') == false || $(window).width() < 768) {


                    $("aside.left-panel nav.navigation > ul > li > ul").slideUp(300);
                    $("aside.left-panel nav.navigation > ul > li").removeClass('active');

                    if (!$(this).next().is(":visible")) {

                        $(this).next().slideToggle(300, function () {
                            $("aside.left-panel:not(.collapsed)").getNiceScroll().resize();
                        });
                        $(this).closest('li').addClass('active');
                    }

                    return false;

                }

            });


            /********************************
             popover
             ********************************/
            if ($.isFunction($.fn.popover)) {
                $('.popover-btn').popover();
            }


            /********************************
             tooltip
             ********************************/
            if ($.isFunction($.fn.tooltip)) {
                $('.tooltip-btn').tooltip()
            }


            /********************************
             NanoScroll - fancy scroll bar
             ********************************/
            if ($.isFunction($.fn.niceScroll)) {
                $(".nicescroll").niceScroll({

                    cursorcolor: '#9d9ea5',
                    cursorborderradius: '0px'

                });
            }


            if ($.isFunction($.fn.niceScroll)) {
                $("aside.left-panel:not(.collapsed)").niceScroll({
                    cursorcolor: '#8e909a',
                    cursorborder: '0px solid #fff',
                    cursoropacitymax: '0.5',
                    cursorborderradius: '0px'
                });
            }


            /********************************
             Input Mask
             ********************************/
            if ($.isFunction($.fn.inputmask)) {
                $(".inputmask").inputmask();
            }


            /********************************
             TagsInput
             ********************************/
            if ($.isFunction($.fn.tagsinput)) {
                $('.tagsinput').tagsinput();
            }


            /********************************
             Chosen Select
             ********************************/
            if ($.isFunction($.fn.chosen)) {
                $('.chosen-select').chosen();
                $('.chosen-select-deselect').chosen({allow_single_deselect: true});
            }


            /********************************
             DateTime Picker
             ********************************/
            if ($.isFunction($.fn.datetimepicker)) {
                $('#datetimepicker').datetimepicker();
                $('#datepicker').datetimepicker({pickTime: false});
                $('#timepicker').datetimepicker({pickDate: false});

                $('#datetimerangepicker1').datetimepicker();
                $('#datetimerangepicker2').datetimepicker();
                $("#datetimerangepicker1").on("dp.change", function (e) {
                    $('#datetimerangepicker2').data("DateTimePicker").setMinDate(e.date);
                });
                $("#datetimerangepicker2").on("dp.change", function (e) {
                    $('#datetimerangepicker1').data("DateTimePicker").setMaxDate(e.date);
                });
            }


            /********************************
             wysihtml5
             ********************************/
            if ($.isFunction($.fn.wysihtml5)) {
                $('.wysihtml').wysihtml5();
            }


            /********************************
             wysihtml5
             ********************************/
            if ($.isFunction($.fn.ckeditor)) {
                CKEDITOR.disableAutoInline = true;
                $('#ckeditor').ckeditor();
                $('.inlineckeditor').ckeditor();
            }


            /********************************
             Scroll To Top
             ********************************/
            $('.scrollToTop').click(function () {
                $('html, body').animate({scrollTop: 0}, 800);
                return false;
            });

        });
        //if (!checkLogin(currentSession)) {
        //    $state.go("auth");
        //    return
        //}
        $scope.state = $state.current;
        //   $scope.result_data = result_data;
    })
    .controller('AuthController', function ($scope, $state, Auth) {

        $scope.login = function () {
            var pwd = $scope.password;
            var password = $.sha256(pwd);
            var data = {'username': $scope.username, 'password': password};
            Auth.login(data, function (result) {
                $scope.status = result.status;
                if (result.status == 200) {
                    currentSession = {}
                    currentSession.user = result.data;
                    $state.go("homepage", {data: result})//
                } else {
                    $scope.error = result.data.message;
                }
            });


        }
    })


    .config(['$urlRouterProvider',
        function ($urlRouterProvider) {
            $urlRouterProvider.otherwise('/homepage');
        }
    ])
    .directive('customer', function () {
        return {
            templateUrl: 'js/views/customer.html'
        };
    })
    .directive('customerphotos', function () {
        return {
            templateUrl: 'js/views/customer-photos.html'
        };
    })
    .directive('customerconnects', function () {
        return {
            templateUrl: 'js/views/customer-connects.html'
        };
    })
    .directive('customerscreenshots', function () {
        return {
            templateUrl: 'js/views/customer-screenshots.html'
        };
    })
    .directive('customerSnapshots', function () {
        return {
            templateUrl: 'js/views/customer-snapshots.html'
        };
    })
    .directive('customerProfessional', function () {
        return {
            templateUrl: 'js/views/customer-professional.html'
        };
    })
    .directive('customercompare', function () {
        return {
            templateUrl: 'js/views/customer-compare.html'
        };
    })
    .directive('businessType', function () {
        return {
            templateUrl: 'js/views/business-type.html'
        };
    })
    .directive('userLogin', function () {

        return {
            templateUrl: 'js/views/user-login.html',
            controller: function ($scope, $location) {
                if (currentSession != null) {
                    $scope.aa = currentSession.user.data.username
                }
            }
        };
    })
    .directive('onLastRepeat', function () {
        return function (scope, element, attrs) {
            if (scope.$last) setTimeout(function () {
                scope.$emit('onMenuRepeatLast', element, attrs);
            }, 1);
        };
    })
    .filter('dateformat', function () {
        return function (input) {
            //alert(input);
            input = input || '';
            if (input == '') {
                return '';
            }
            input = new Date(input);
            var out = input.getFullYear() + '年' + (input.getMonth() + 1) + '月' + input.getDate() + '日';
            return out;
        };
    })
    .filter('timeformat', function () {
        return function (input) {
            //alert(input);
            input = input || '';
            if (input == '') {
                return '';
            }
            input = new Date(input);
            var out = input.getHours() + '点' + input.getMinutes() + '分' + input.getSeconds() + '秒';
            return out;
        };
    })
    .filter('decimal', function () {
        return function (input, count) {
            // alert(input);
            count = 2;
            input = input || '';
            if (input == '') {
                return '';
            }
            var vv = Math.pow(10, count);
            return Math.round(input * vv) / vv;
        };
    });
function checkLogin(currentSession) {
    if (currentSession == null || currentSession.user == null) {
        return false;
    } else {
        return true;
    }
}
