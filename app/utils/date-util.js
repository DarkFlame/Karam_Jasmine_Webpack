import angular from 'angular';

class DateUtil {
    constructor() {

    }

    getFirstDayOfMonth(date) {
        return new Date(date.getFullYear(),date.getMonth(),1);
    }

    isValid(d) {
        return Object.prototype.toString.call(d) === '[object Date]' && d.getTime() > 0;
    }

    setDateTimeToMidnight(date) {
        if (this.isValid(date)) {
            date.setHours(0,0,0,0);
        }
    }

    isSameDay(d1,d2) {
        return this.isSameYear(d1,d2) && this.isSameMonth(d1,d2) && d1.getDate() === d2.getDate();
    }

    isSameMonth(d1,d2) {
        return this.isSameYear(d1,d2) && d1.getMonth() === d2.getMonth();
    }

    isSameYear(d1,d2) {
        return d1.getFullYear() === d2.getFullYear();
    }

    //输入一个日期
    getWeeksOfMonth(date) {
        var weeks = [],
            week = [],
            nowMonth = date.getMonth(), //month返回0-11
            nowYear = date.getFullYear(),
            daysOfMonth = new Date(nowYear,nowMonth + 1,0).getDate(), //获取月的天数，比如获取2015年2月天数，new date(2015,2,0),第三个参数是0 new Date则构造出上月最后一天
            startDate = new Date(nowYear,nowMonth,1), //月第一天
            endDate = new Date(nowYear,nowMonth,daysOfMonth); //月最后一天
        //补齐
        endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));
        startDate.setDate(startDate.getDate() - startDate.getDay());
        //每页显示的日期6*7共42天
        var se = true;
        while ((endDate - startDate) / 86400000 + 1 < 42) {
            if (se) {
                endDate.setDate(endDate.getDate() + 7);
                se = false;
            } else {
                startDate.setDate(startDate.getDate() - 7);
                se = true;
            }
        }

        while (startDate <= endDate) {
            week.push(new Date(startDate));
            if (startDate.getDay() === 6) {
                weeks.push(week);
                week = [];
            }
            startDate.setDate(startDate.getDate() + 1);
        }

        return weeks;
    }

    addDays(d,days) {
        return new Date(d.getTime() + days * 24 * 60 * 60 * 1000);
    }

}

export default angular.module('ngMaterialX.dateUtil',[]).service('mdxDateUtil',DateUtil);