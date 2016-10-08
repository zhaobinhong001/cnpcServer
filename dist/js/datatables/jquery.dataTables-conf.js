
$(document).ready(function() {
	/************************************
	Basic Data Table
	************************************/
    $('#basic-datatable').dataTable(
        {
            /*"ajax": {
                "url":"/example/resourcesrver_processing_customCUrl.php",
                "data": function ( d ) {
                    //添加额外的参数传给服务器
                    d.startDate = '2013-01-01';
                    d.endDate = '2013-12-01';
                }},*/
            /*  "processing": true,
             "serverSide": true,*/
            "language": {
                "sProcessing": "处理中...",
                "sLengthMenu": "显示 _MENU_ 项结果",
                "sZeroRecords": "没有匹配结果",
                "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
                "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
                "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
                "sInfoPostFix": "",
                "sSearch": "搜索:",
                "sUrl": "",
                "sEmptyTable": "表中数据为空",
                "sLoadingRecords": "载入中...",
                "sInfoThousands": ",",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "上页",
                    "sNext": "下页",
                    "sLast": "末页"
                },
                "oAria": {
                    "sSortAscending": ": 以升序排列此列",
                    "sSortDescending": ": 以降序排列此列"
                }
            }/*,
         "dom":
         "<'row'<'span9'l<'#mytoolbox'>><'span3'f>r>"+
         "t"+
         "<'row'<'span6'i><'span6'p>>"  ,
         */
            /*,initComplete:initComplete*/
        }

    );






	/************************************
	Toggle Column
	************************************/
	var toggleColumnTable = $('#toggleColumn-datatable').DataTable();
 
    $('a.toggle-vis').on( 'click', function (e) {
        e.preventDefault();
 
        // Get the column API object
        var column = toggleColumnTable.column( $(this).attr('data-column') );
 
        // Toggle the visibility
        column.visible( ! column.visible() );
    });
	

	
	
	
	
	/* Formatting function for row details - modify as you need */
	function format ( d ) {
		// `d` is the original data object for the row
		return '<table class="extra-info">'+
			'<tr>'+
				'<td>Full name:</td>'+
				'<td>'+d.name+'</td>'+
			'</tr>'+
			'<tr>'+
				'<td>Extension number:</td>'+
				'<td>'+d.extn+'</td>'+
			'</tr>'+
			'<tr>'+
				'<td>Extra info:</td>'+
				'<td>And any further details here (images etc)...</td>'+
			'</tr>'+
		'</table>';
	}
 

    var table = $('#hiddendta-datatable').DataTable( {
        "ajax": "assets/js/plugins/datatables/objects.txt",
        "columns": [
            {
                "class":          'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": '<a class="btn btn-link"><i class="fa fa-plus-square"></i></a>'
            },
            { "data": "name" },
            { "data": "position" },
            { "data": "office" },
            { "data": "salary" }
        ],
        "order": [[1, 'asc']]
    } );
     
    // Add event listener for opening and closing details
    $('#hiddendta-datatable tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    } );

	
	
	
});