/*
 * Copy Right: Tencent ISUX
 * Comments: 任务对象
 * Author: kundy
 * Date: 2016-04-13
 */


var TASK = function(){}
var TASK_TIMEOUT;
TASK.list = [];
TASK.init=function()
{
    TASK.TASK_INDEX = 0;//任务序号
    TASK.RUN_FLAG = 1;//任务是否正常执行
}
TASK.start=function()
{
    TASK.loop();
    setInterval(TASK.loop , TASK.TASK_INTERVAL);
}
TASK.reg=function(fun)//注册任务
{
    TASK.list.push(fun);
}
//循环任务
TASK.loop=function()
{
    if(!TASK.RUN_FLAG)return;
    if(TASK.TASK_INDEX == TASK.list.length){//所有任务结束
        TASK.TASK_INDEX=0;
        return;
    }

    TASK.list[TASK.TASK_INDEX](function(){//执行任务 
        clearTimeout(TASK_TIMEOUT);
        TASK.TASK_INDEX++;
        TASK.loop();
    });

    //设置超时间
    clearTimeout(TASK_TIMEOUT);
    TASK_TIMEOUT = setTimeout(function(){//任务超时
        console.log("[task timeout]")
        TASK.list[TASK.TASK_INDEX].end_cb();
    },TASK.TASK_TIMEOUT)
}

//暂停任务
TASK.puase=function()
{
    TASK.RUN_FLAG = 0;
}

//恢复任务
TASK.resume=function()
{
    TASK.RUN_FLAG = 1;
}
