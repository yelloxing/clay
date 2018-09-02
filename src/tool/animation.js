var clock = {
	//当前正在运动的动画的tick函数堆栈
	timers: [],
	//唯一定时器的定时间隔
	interval: 13,
	//指定了动画时长duration默认值
	speeds: 400,
	//定时器ID
	timerId: null
};

// 提供间隔执行方法
clay.animation = function (doback, duration, callback) {
	clock.timer(function (deep) {
		//其中deep为0-1，表示改变的程度
		doback(deep);
	}, duration, callback);
};

//把tick函数推入堆栈
clock.timer = function (tick, duration, callback) {
	if (typeof tick !== 'function') {
		throw new Error('tick is required!');
	}
	duration = typeof duration === 'number' ? duration : clock.speeds;
	if (duration < 0) duration = -duration;
	clock.timers.push({
		"createTime": new Date(),
		"tick": tick,
		"duration": duration,
		"callback": callback
	});
	clock.start();
};

//开启唯一的定时器timerId
clock.start = function () {
	if (!clock.timerId) {
		clock.timerId = setInterval(clock.tick, clock.interval);
	}
};

//被定时器调用，遍历timers堆栈
clock.tick = function () {
	var createTime, flag, tick, callback, timer, duration, passTime, needStop, deep,
		timers = clock.timers;
	clock.timers = [];
	clock.timers.length = 0;
	for (flag = 0; flag < timers.length; flag++) {
		//初始化数据
		timer = timers[flag];
		createTime = timer.createTime;
		tick = timer.tick;
		duration = timer.duration;
		callback = timer.callback;
		needStop = false;

		//执行
		passTime = (+new Date() - createTime) / duration;
		if (passTime >= 1) {
			needStop = true;
		}
		passTime = passTime > 1 ? 1 : passTime;
		deep = passTime;
		tick(deep);
		if (passTime < 1) {
			//动画没有结束再添加
			clock.timers.push(timer);
		} else if (callback) {
			callback();
		}
	}
	if (clock.timers.length <= 0) {
		clock.stop();
	}
};

//停止定时器，重置timerId=null
clock.stop = function () {
	if (clock.timerId) {
		clearInterval(clock.timerId);
		clock.timerId = null;
	}
};
