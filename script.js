var stopwatch;
var infoI = 0;
var foxtailBgPositionX = 0;

window.onload = function ()
{
	stopwatch = new Stopwatch ();
	stopwatch.setAutoUpdateElement ('time', true);
	
	setInterval (foxtailCycle, 100);
	
	bindOnClick ('controlStart', function ()
		{
			enableButton ('controlStop');
			disableButton ('controlStart');
			
			stopwatch.start ();
		}
	);
	bindOnClick ('controlStop', function ()
		{
			disableButton ('controlStop');
			enableButton ('controlStart');
			
			stopwatch.stop ();
		}
	);
	bindOnClick ('controlReset', function ()
		{
			stopwatch.reset ();
		}
	);
	bindOnClick ('controlPin', function ()
		{
			var time = stopwatch.getFormatted ('d?:H:M:S.N');
			var table = document.getElementById ('info');
			var date = new Date ();
			
			infoI++;
			table.innerHTML += '<p><span class="x">' + infoI + '</span><span class="z">' + date.toLocaleTimeString () + '</span><span class="y">' + time + '</span>';
			
			table.scrollTop = table.scrollHeight;
			
			enableButton ('controlClear');
		}
	);
	bindOnClick ('controlClear', function ()
		{
			var table = document.getElementById ('info');
			table.innerHTML = '';
			infoI = 0;
			
			disableButton ('controlClear');
		}
	);
}

function foxtailCycle ()
{
	var foxtail = document.getElementById ('foxtail');
	foxtailBgPositionX += 156;
	if (foxtailBgPositionX >= 7020)
		foxtailBgPositionX = 0;
	
	foxtail.style.backgroundPosition = foxtailBgPositionX + 'px 0px';
}

function bindOnClick (element, func)
{
	document.getElementById (element).onclick = func;
}

function enableButton (element)
{
	var button = document.getElementById (element);
	button.className = replaceAll (button.className, 'buttonDisabled', '');
}

function disableButton (element)
{
	var button = document.getElementById (element);
	button.className  += ' buttonDisabled';
}

function replaceAll (str, search, replace)
{
	while (str.indexOf (search) !== -1)
		str = str.replace (search, replace);
	
	return str;
}
