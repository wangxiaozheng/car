$(function(){
	$("#selectAll").formCheckBox();
	$("select").formSelect();
	
	
	$.ajax({
		type:"get",
		url:"json/data.json",
		dataType : "json",
		success  : function(data){
			var sample = data.sample;
			for (var i in sample) {
				var html = '<tr><td><input type="checkbox" name="list" /></td><td>' 
						 + sample[i].sampleNum
						 + '</td><td>' + sample[i].sampleName 
						 + '</td><td>' + sample[i].sampleType 
						 + '</td><td>' + sample[i].sampleDate 
						 + '</td><td>' + sample[i].sampleBuild
						 + '</td><td><a href="javascript:void(0)" class="edit">编辑</a><a href="javascript:void(0)" class="delete">删除</a></td></tr>';
				
				$(".table tbody").append(html);
				$("input[name=list]").formCheckBox();
			}
		},
		error    : function(){
			alert("暂无数据！")
		}
	}).done(function(){
		$(".loading").hide();
	});
	
	
	$(".table tbody").on("click","a.delete",function(){
		$(this).parents("tr").remove();
	});
	
	// 新增一条数据
	$(".add").on("click",function(){
		$(".mask_layer").show();
		$("#modal").removeClass("fadeout").addClass("fadein");
	});
	
	//关闭模态对话框
	$("#ok").on("click",function(){
		var sampleId = $("#sampleId").val(),
			sampleName = $("#sampleName").val(),
			sampleType = $("#sampleType").val(),
			sampleDate = $("#sampleDate").val(),
			sampleLibrary = $("#sampleLibrary").val();
	
		var html = '<tr><td><input type="checkbox" name="list"/></td><td>' + sampleId +
			'</td><td>' + sampleName +
			'</td><td>' + sampleType +
			'</td><td>' + sampleDate +
			'</td><td>' + sampleLibrary +
			'</td><td><a href="javascript:void(0)" class="edit">编辑</a><a href="javascript:void(0)" class="delete">删除</a></td></tr>';
	
		$(".table tbody").append(html);
		$(".table input:checkbox").formCheckBox();
		closeModal();
	});
	
	$(".search_btn").on("click",function(){
		$(".loading").show();
		var sampleNum = $("#sampleNum").val();
		//$(".table tbody tr").removeClass("curr");
		$(".table tbody").html("");

		var flag = false;
		$.ajax({
			type:"get",
			url:"json/data.json",
			dataType : "json",
			success  : function(data){
				var sample = data.sample;
				for (var i in sample) {
					if(sample[i].sampleNum == sampleNum){
						var html = '<tr><td><input type="checkbox" name="list" /></td><td>' 
							 + sample[i].sampleNum
							 + '</td><td>' + sample[i].sampleName 
							 + '</td><td>' + sample[i].sampleType 
							 + '</td><td>' + sample[i].sampleDate 
							 + '</td><td>' + sample[i].sampleBuild
							 + '</td><td><a href="javascript:void(0)" class="edit">编辑</a><a href="javascript:void(0)" class="delete">删除</a></td></tr>';
					
						$(".table tbody").append(html);
						//$(".table tbody tr").eq(i).addClass("curr");
						$("input[name=list]").formCheckBox();
	
						
						
						flag = true;
					}
				}
				
				if(!flag){
					alert("找不到数据！")
				}
				
			},
			error    : function(){
				alert("暂无数据！")
			}
		}).done(function(){
			$(".loading").hide();
		});
		
		
	});
	
	
	
})
function closeModal() {
	$(".mask_layer").hide();
	$("#modal").removeClass("fadein").addClass("fadeout");
}
