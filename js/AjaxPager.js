/**
 * Created by wang.ding on 2016/11/7.
 */
(function () {
    //AjaxPager数据层上的分页  只负责请求数据
    //功能描述：从服务器端获取上一页，下一页或者指定页的数据（数据格式json）

    //服务器返回的JSON文件格式规定
    // {
    //     "totalCount":100,       //数据总数
    //     "rows":[
    //     {"cms_title":"Title","cms_data":"2009-9-9"},     //数据库中的一行信息
    //     {"cms_title":"Title","cms_data":"2009-9-9"}
    //     ]
    // }
    //            设置分页大小
    //current      当前页码
    //pageCount   总页数
//args{
// handler function 回调函数（将指定数据渲染显示在页面中）
// proxy    URL      服务器脚本位置
//pageSize   Number   分页
// cols      String   获取的表中的列名(用逗号分隔)
// order     String   对哪个列进行排序（可选）
// dir       ASC/DESC 排序方向
//urlParam    Hashmap 额外的参数}






})();
