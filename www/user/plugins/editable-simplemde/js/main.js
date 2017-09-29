$(function () {

	id = "editable";

	if (document.getElementById(id)) {
		var saveURL = grav_page_route;
		var delay = 700;
		// Toggle between edit and preview mode: Edit mode (true); Preview mode (false)
		var mode = false;
		var simplemde = new SimpleMDE({
			element: document.getElementById(id),
			spellChecker: false,
			toolbar: ["bold", "italic", "heading", "|",
				"quote", "unordered-list", "ordered-list", "|",
				{
    		name: "linkCustom",
    		action: function (editor){
					simplemde.codemirror.replaceSelection("[]()");
					$("input[id='upload_file']").click();
		    },
		    className: "fa fa-link",
		    title: "Upload File / Insert Link"
				},
				{
	    		name: "imageCustom",
	    		action: function (editor){
						simplemde.codemirror.replaceSelection("![]()");
						$("input[id='upload_image']").click();
			    },
			    className: "fa fa-picture-o",
			    title: "Upload Image / Insert Link"
				},
				"table", "|", "undo", "redo"
			],
			forceSync: false,
			status: false
		});

		var markdown = simplemde.value();
		var originalMD5 = md5(markdown);
		preview(markdown);
		simplemde.codemirror.on("change", function() {
	    window.onbeforeunload = confirmExit;
		});
		// Add extra HTML elements
		$("<p class='simplemde_response_okay simplemde_response'><i class='fa fa-check fa fa-border'></i></p>").appendTo("body");
		$("<p class='simplemde_response_fail simplemde_response'><i class='fa fa-times fa fa-border'></i></p>").appendTo("body");
		// Add and configure image upload input field
		allowedImageExts = 'jpg,jpeg,png,gif,svg';
		allowedImageTypes = 'image/gif,image/x-gif,image/jpeg,image/pjpeg,image/png,image/x-png,image/svg+xml';
		$("<input type='file' id='upload_image' accept='"+allowedImageTypes+"' style='display: none;' />").appendTo("body");
		// Add and configure file upload input field
		allowedFileExts = 'css,doc,docx,gif,jpg,jpeg,png,mp3,mp4,pdf,ppt,pptx,svg,txt,xls,xlsx,zip';
		allowedFileTypes = 'application/msword,application/pdf,application/x-pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-excel,application/zip,text/css,text/plain,audio/mp3,video/mpeg,video/mp4,' + allowedImageTypes;
		$("<input type='file' id='upload_file' accept='"+allowedFileTypes+"' style='display: none;' />").appendTo("body");
	}

	$("input[id='upload_image']").change(function() {
		allowedExts = allowedImageExts;
		allowedTypes = allowedImageTypes.split(',');
		maxFileSize =  1024 * 1024 * 5; // 5MB
		var data = {
			action: 'fileUpload',
			page: grav_page_route
		};
		doUpload.call(this, saveURL, data, '![](filename)', allowedExts, allowedTypes, maxFileSize);
	});

	$("input[id='upload_file']").change(function() {
		allowedExts = allowedFileExts;
		allowedTypes = allowedFileTypes.split(',');
		maxFileSize = 1024 * 1024 * 5; // 5MB
		var data = {
			action: 'fileUpload',
			page: grav_page_route
		};
		doUpload.call(this, saveURL, data, '[filename](filename)', allowedExts, allowedTypes,	maxFileSize);
	});

	// Edit/Close button
	$("#edit_btn")
	  .css('cursor', 'pointer')
	  .click(
	    function(){
		  	if (mode) {
		  		// In Edit mode, so swith to Preview mode
		      $("div#editor_container").css('display', 'none');
		      preview(simplemde.value());
		      $("#edit_btn").html('<i class="fa fa-pencil fa-lg" aria-hidden="true"></i>&nbsp;&nbsp;Edit');
		      if (md5(simplemde.value()) === originalMD5) {
		      	$("#save_btn").css('display', 'none');
		      }
		    }
		    else {
		      // In Preview mode, so switch to Edit mode
		      $("div#editor_container").css('display', 'inline');
		      // Do a refresh to show the editor value
		      simplemde.codemirror.refresh();
		      $("#edit_btn").html('<i class="fa fa-times fa-lg" aria-hidden="true"></i>&nbsp;Close');
		      $("#save_btn").css('display', 'inline');
		      $('#html_container').empty();
		    };
		    mode = !mode;
	    }
	  )
	  .hover(
	    function(){
	      $(this).css('background', 'rgba(0,0,0,.1)');
	    },
	    function(){
	      $(this).css('background', '');
	    }
	  );

	// Save button
	$("#save_btn")
	  .css('cursor', 'pointer')
	  .click(
	    function(){
	    	save(simplemde.value());
	    }
	  )
	  .hover(
	    function(){
	      $(this).css('background', 'rgba(0,0,0,.1)');
	    },
	    function(){
	      $(this).css('background', '');
	    }
	  );

	// Check for modified markdown and warn user upon leaving the page
	// Does not work in all browsers!
	function confirmExit() {
  	if (md5(simplemde.value()) != originalMD5)
		  return;
  }

	function doUpload(saveURL, data, link, allowedExts, allowedTypes,	maxFileSize) {
		// Upload the file
		$(this).simpleUpload(saveURL, {
			data,
			allowedExts: allowedExts,
			allowedTypes: allowedTypes,
			maxFileSize: maxFileSize,
			start: function(file){
				//upload started
				console.log("upload started: "+file.name);
			},
			success: function(result){
				//upload successful
				simplemde.codemirror.undo();
				if (!result || result == 'false') {
					msg = "upload rejected by Grav";
					console.log(msg + ' (result = ' + result + ')');
					alert(msg);
				}
				else {
					// Insert image link
					link = link.replace(/filename/g, result);
					simplemde.codemirror.replaceSelection(link);
					console.log("upload successful!");
				}
				console.log(result);
			},
			error: function(error){
				//upload failed
				simplemde.codemirror.undo();
				msg = error.name + ": " + error.message;
				console.log(msg);
				alert(msg);
			}
		});
	};

	// Get the HTML content rendered by Grav
	function preview(markdown) {
		var data = {
			action: 'previewContent',
			page: grav_page_route,
			lang: "",
			content: markdown
		};
		$.ajax({
			type: "POST",
			url: saveURL,
			data: data,
			success: function(response)
			{
				$('#html_container').wrapInner(response);
			}
		});
	};

	function save(markdown) {
		var data = {
			action: 'saveContent',
			page: grav_page_route,
			lang: "",
			content: markdown
		};
		$.ajax({
			type: "POST",
			url: saveURL,
			data: data,
			success: function(response)
			{
				if (response.toLowerCase() === 'ok') {
					$('.simplemde_response_okay').css('color', '#0a0');
					$('.simplemde_response_okay').show();
					setTimeout(function() {
					  $('.simplemde_response_okay').fadeOut('fast');
					}, delay);
					originalMD5 = md5(markdown);
					if (!mode) {
						setTimeout(function() {
							$("#save_btn").css('display', 'none');
						}, delay);
					}
					window.onbeforeunload = null;
				}
				else {
					$('.simplemde_response_fail').css('color', '#a00');
					$('.simplemde_response_fail').show();
					setTimeout(function() {
					  $('.simplemde_response_fail').fadeOut('fast');
					}, delay);
				}
			}
		});
	};

});
