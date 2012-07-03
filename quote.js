$.ajax({
	url: "http://jamocreations.com/widgets/travel-quotes/get.php",
	dataType: 'xml',
	success: function(xml) {
		$('quote', xml).each(function() {
			$('#quote').html('&laquo;&nbsp;' + $(this).find('text').text() + '&nbsp;&raquo;');
			$('#author').html('&#8212;&nbsp;' + $(this).find('author').text());
		});
		
		$('blockquote').css({'opacity':'100'});
	},
	error: function(xhr, status, error) {
		$('#quote').html('&laquo;&nbsp;Could not download the quote: ' + error.toLowerCase() + '.&nbsp;&raquo;');
		$('#author').html('&#8212;&nbsp;The Debugger');
		
		$('blockquote').css({'opacity':'100'});
	}
});

chrome.management.getAll(function(extensions) {
	for(var i = 0; i < extensions.length; i++) {
		if(extensions[i].isApp && extensions[i].enabled) {
			$('#apps ul').append('<a href="#"><li id="' + extensions[i].id + '">' + extensions[i].name + '</li></a>');
		}
	}
	
	$('#apps li').click(function() { chrome.management.launchApp($(this).attr('id')); });
});

$('#apps').hide();
$('#apps-btn').click(function() { $('#apps').toggle(500); });
$('#apps-btn').css({ 'opacity':100 });