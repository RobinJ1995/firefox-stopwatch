function Stopwatch ()
{
	this.timeStart = new Date ();
	this.timeStop = new Date ();
	this.autoUpdateEnabled = false;
	this.autoUpdateElement = undefined;
	this.autoUpdateInterval = 10;
	
	this.start = function ()
	{
		if (! this.isRunning ())
		{
			var date = new Date ();
			this.timeStart = new Date (date.getTime () - this.getMilliseconds ());
			
			this.timeStop = undefined;
		}
	}
	
	this.stop = function ()
	{
		if (this.isRunning ())
			this.timeStop = new Date ();
	}
	
	this.reset = function ()
	{
		this.timeStart = new Date ();
		this.timeStop = (this.isRunning () ? undefined : new Date ());
	}
	
	this.getMilliseconds = function ()
	{
		var stop = (this.isRunning () ? new Date () : this.timeStop);
		var diff = stop.getTime () - this.timeStart.getTime ();
		
		return diff;
	}
	
	this.getTime = this.getMilliseconds;
	
	this.getSeconds = function ()
	{
		var diff = Math.round (this.getMilliseconds () / 1000);
		
		return diff;
	}
	
	this.getDate = function ()
	{
		var diff = new Date (this.getMilliseconds ());
		
		return diff;
	}
	
	this.getFormatted = function (format)
	{
		var formatting = (format === undefined ? 'd?:H?:M:S.N' : format);
		var date = this.getDate ();
		
		var days = date.getUTCDate () - 1;
		var hours = date.getUTCHours ()
		var minutes = date.getUTCMinutes ();
		var seconds = date.getUTCSeconds ();
		var milliseconds = date.getUTCMilliseconds ();
		
		var str = formatting;
		
		str = str.replace ('D', prependZeroes (days, 2));
		str = str.replace ('H', prependZeroes (hours, 2));
		str = str.replace ('M', prependZeroes (minutes, 2));
		str = str.replace ('S', prependZeroes (seconds, 2));
		str = str.replace ('N', prependZeroes (milliseconds, 3));
		
		str = str.replace ('d', days);
		str = str.replace ('h', hours);
		str = str.replace ('m', minutes);
		str = str.replace ('s', seconds);
		str = str.replace ('n', milliseconds);
		
		str = replaceAll (str, '00?', '');
		str = replaceAll (str, '0?', '');
		str = replaceAll (str, '?', '');
		
		str = trimAll (str, ':');
		
		return str;
	}
	
	this.isRunning = function ()
	{
		var status = (this.timeStop === undefined ? true : false);
		
		return status;
	}
	
	this.getRunning = this.isRunning;
	
	this.getStatus = function ()
	{
		var status = (this.isRunning () ? 'running' : 'stopped');
		
		return status;
	}
	
	this.enableAutoUpdate = function ()
	{
		if (this.autoUpdateElement === undefined)
		{
			throw ('autoUpdateElement not set');
		}
		else
		{
			this.autoUpdateEnabled = true;
			var that = this;
			setTimeout
			(
				function ()
				{
					that.runAutoUpdate (that)
				},
				this.autoUpdateInterval
			);
		}
	}
	
	this.disableAutoUpdate = function ()
	{
		this.autoUpdateEnabled = false;
	}
	
	this.setAutoUpdateElement = function (element, enable, interval)
	{
		this.autoUpdateElement = document.getElementById (element);
		
		if (interval !== undefined)
			this.autoUpdateInterval = interval;
		
		if (enable)
			this.enableAutoUpdate ();
	}
	
	this.runAutoUpdate = function (that)
	{
		if (that.autoUpdateEnabled)
		{
			that.autoUpdateElement.innerHTML = that.getFormatted ();
			setTimeout
			(
				function ()
				{
					that.runAutoUpdate (that)
				},
				that.autoUpdateInterval
			);
		}
	}
	
	/* Private */
	function prependZeroes (number, n)
	{
		var str = String (number);
		while (str.length < n)
			str = '0' + str;
		
		return str;
	}
	
	function replaceAll (str, search, replace)
	{
		while (str.indexOf (search) !== -1)
			str = str.replace (search, replace);
		
		return str;
	}
	
	function trimAll (str, trimChar)
	{
		if (trimChar === undefined)
			trimChar = ' ';
		
		while (str.indexOf (trimChar) === 0)
			str = str.substr (1);
		while (str.lastIndexOf (trimChar) === str.length - 1)
			str = str.substr (0, str.length - 1);
		
		return str;
	}
}