// This javascript is used to render htmlcontrol
// Please take note:
//(a) Form controls need to be in 2-dimensional array
//(b) Initialize the array to be object array for each main array
//(c) You can change the HTML markup to suits as your needs without changing the underlying logic


function RenderHTMLControl(array_of_controls)
{
	
	var y = $.parseJSON(array_of_controls);

	var formcontrols="<div><ul class=\"sortable list\" id=\"lhs\" style=\"list-style: none;padding-left: 0px;\">";
	
	for(var x=0;x<y.length;x++)
	{
		var obj = y[x];
		var id=obj[0];
		var captionname=obj[1];
		var csssettings=GetCSSSetting(obj[11],obj[12],obj[13]);
		var validation=obj[8];
		var datatype=obj[2];
		var numberofrows=3;
		var selection_option_array=obj[6];
		var tmpFormControls="";
		var selecttype="single";
		
		if(obj[3]=="textbox")
		{
			tmpFormControls="<li draggable=\"true\">"+TextBox(id,captionname,csssettings,validation,datatype)+"</li>";
		}
		else if(obj[3]=="dropdown")
		{
			tmpFormControls="<li  draggable=\"true\">"+DropDownList(id,captionname,selection_option_array,csssettings)+"</li>";
		}
		else if(obj[3]=="radiobutton")
		{
			tmpFormControls="<li  draggable=\"true\">"+RadioButton(id,captionname,selection_option_array,csssettings)+"</li>";
		}
		else if(obj[3]=="textarea")
		{
			tmpFormControls="<li  draggable=\"true\">"+TextArea(id,captionname,csssettings,numberofrows)+"</li>";
		}
		else if(obj[3]=="checkbox")
		{
			tmpFormControls="<li  draggable=\"true\">"+CheckBox(id,captionname,selection_option_array,csssettings,selecttype)+"</li>";
		}
		else
		{
			console.log("rendering failed!");
			}
			
			formcontrols=formcontrols+tmpFormControls;
	}
	

	return formcontrols+"</ul></div>";
}


//Below is textbox render method
function TextBox(id,captionname,csssettings,validation,datatype)
{
	
	if(datatype=="nvarchar")
	{
		var tmp="";
		if(validation=="email")
		{
			 tmp="<div class=\"form-group alert alert-warning\"> <label class=\"control-label\" for=\""+id+"\"><span class=\"glyphicon glyphicon-sort\"></span>&nbsp;"+captionname+"</label> <input type=\"text\" id=\""+id+"\" "+csssettings+"></div>";
		}
		else if(validation=="numeric")
		{
			 tmp="<div class=\"form-group alert alert-warning\"> <label class=\"control-label\" for=\""+id+"\"><span class=\"glyphicon glyphicon-sort\"></span>&nbsp;"+captionname+"</label> <input type=\"number\" id=\""+id+"\" "+csssettings+"></div>";
			}
			else if(validation=="regex")
			{
				 tmp="<div class=\"form-group alert alert-warning\"> <label class=\"control-label\" for=\""+id+"\"><span class=\"glyphicon glyphicon-sort\"></span>&nbsp;"+captionname+"</label> <input type=\"text\" id=\""+id+"\" "+csssettings+"></div>";
				}
				else if(validation=="password")
				{
				 tmp="<div class=\"form-group alert alert-warning\"> <label class=\"control-label\" for=\""+id+"\"><span class=\"glyphicon glyphicon-sort\"></span>&nbsp;"+captionname+"</label> <input type=\"password\" id=\""+id+"\" "+csssettings+"></div>";
				}
				else
				{
					tmp="<div class=\"form-group alert alert-warning\"> <label class=\"control-label\" for=\""+id+"\"><span class=\"glyphicon glyphicon-sort\"></span>&nbsp;"+captionname+"</label> <input type=\"text\" id=\""+id+"\" "+csssettings+"></div>";
					}
		return tmp;
	}
	else if(datatype=="integer")
	{
	var tmp="<div class=\"form-group alert alert-warning\"> <label class=\"control-label\" for=\""+id+"\">"+captionname+"</label> <input type=\"number\" id=\""+id+"\" "+csssettings+"></div>";
	return tmp;
	}
	else if(datatype=="bit")
	{
	var tmp="<div class=\"form-group alert alert-warning\"> <label class=\"control-label\" for=\""+id+"\"><span class=\"glyphicon glyphicon-sort\"></span>&nbsp;"+captionname+"</label> <input type=\"text\"  id=\""+id+"\" "+csssettings+"></div>";
	return tmp;
	}
	if(datatype=="blob")
	{
	var tmp="<div class=\"form-group alert alert-warning\"> <label class=\"control-label\" for=\""+id+"\"><span class=\"glyphicon glyphicon-sort\"></span>&nbsp;"+captionname+"</label> <input type=\"file\" id=\""+id+"\" "+csssettings+"></div>";
	return tmp;
	}
	else if(datatype=="nvarchar2")
	{
	var tmp="<div class=\"form-group alert alert-warning\"> <label class=\"control-label\" for=\""+id+"\"><span class=\"glyphicon glyphicon-sort\"></span>&nbsp;"+captionname+"</label> <input type=\"text\" id=\""+id+"\" "+csssettings+"></div>";
	return tmp;
	}
	else
	{
	var tmp="<div class=\"form-group alert alert-warning\"> <label class=\"control-label\" for=\""+id+"\"><span class=\"glyphicon glyphicon-sort\"></span>&nbsp;"+captionname+"</label> <input type=\"text\" id=\""+id+"\" "+csssettings+"></div>";
	return tmp;
	}
	
	
	}

//Below is drop-down render method
function DropDownList(id,captionname,selection_option_array,csssettings)
{

	
	var tmp="<div class='form-group alert alert-warning'><label><span class=\"glyphicon glyphicon-sort\"></span>&nbsp;"+captionname+"</label><select id=\""+id+"\""+csssettings+">";
	selection_option_array=selection_option_array.split('\n');
	
	if(selection_option_array.length==0)
	{
		tmp=tmp+"<option value=\"no\">No Value Defined</option></select></div><br>";
		return tmp;
		}else
		{
			var optiontmp="";
			for(var x=0;x<selection_option_array.length;x++)
			{
					var option=selection_option_array[x].split(';');
					if(option.length==2)
					{
						optiontmp=optiontmp+"<option value='"+option[0]+"'>"+option[1]+"</option>";
					}
			}
			
			return tmp+optiontmp+"</select></div><br>"
		}
		
	
	
	}
	
	//Below is radiobutton render method
function RadioButton(id,captionname,selection_option_array,csssettings)
{

	
	var tmp="<div id=\""+id+"\" class=\"form-group alert alert-warning\"><label><span class=\"glyphicon glyphicon-sort\"></span>&nbsp;"+captionname+"</label><div class=\"form-control\" style=\"height: 100%;\">";
	selection_option_array=selection_option_array.split('\n');
	//console.log(selection_option_array);
	//console.log(selection_option_array.length);
	if(selection_option_array.length==0)
	{
		tmp=tmp+"<div class=\"radio\"><label><input type=\"radio\" name=\"optionsRadios\" id=\"optionsRadios1\" value=\"option1\" checked=\"\">Options Not Available</label></div>";
		return tmp+"</div></div>";
		}else
		{
			var optiontmp="";
			for(var x=0;x<selection_option_array.length;x++)
			{
					var option=selection_option_array[x].replace(/\n|\r/g, "").split(';');
					if(option.length==2)
					{
						tmp=tmp+"<div class=\"radio\"><label><input type=\"radio\" name=\""+id+"\" id=\""+option[0]+"\" value=\""+option[1]+"\">"+option[0]+"</label></div>";
					}
			}
			
			 

			return tmp+optiontmp+"</div></div><br>"
		}
		
	
	
	}
	
	//Below is radiobutton render method
function CheckBox(id,captionname,selection_option_array,csssettings,selecttype)
{
	
	
	var tmp="<div id=\""+id+"\" class=\"form-group alert alert-warning\"> <label><span class=\"glyphicon glyphicon-sort\"></span>&nbsp;"+captionname+"</label><div class=\"form-control\" style=\"height: 100%;\">";
	selection_option_array=selection_option_array.split('\n');

	if(selection_option_array.length==0)
	{
		tmp=tmp+"<div class=\"checkbox\"> <label> <input type=\"checkbox\" value=\"\">Option Not Available</label> </div>";
		return tmp+"</div></div><br>";
		}else
		{
			var optiontmp="";
			for(var x=0;x<selection_option_array.length;x++)
			{
					var option=selection_option_array[x].split(';');
					if(option.length==2)
					{
						tmp=tmp+"<div class=\"checkbox\"> <label> <input id='"+id+"' type=\"checkbox\" value=\""+option[1]+"\">"+option[0]+"</label> </div>";
					}
			}
			
			if(selecttype=="single")
			{
				return tmp+optiontmp+"</div></div>";
			}
			else
			{
				return tmp+optiontmp+"</div></div><br>"
				}
		}
		
	
	
	}
	
	//Below is textbox render method
function TextArea(id,captionname,csssettings,numberofrows)
{
	return "<div class=\"form-group alert alert-warning\"><label><span class=\"glyphicon glyphicon-sort\"></span>&nbsp;"+captionname+"</label><textarea id='"+id+"' "+csssettings+" rows=\""+numberofrows+"\"></textarea></div>";
	
}
	
	function GetCSSSetting(customcssstyle,customcssflag,customcssclass)
	{
		if(customcssflag==0 && customcssstyle!="")
		{
			return "style='"+customcssstyle+"'";
			}
			else if(customcssflag==0 && customcssstyle=="")
			{
				return "class='form-control'";
				}
				else if(customcssflag==1 && customcssclass!="")
				{
					return "class='"+customcssclass+"'";
					}
					else
					{
						return "class='form-control'";
						}
		
		}
