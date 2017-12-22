import './calendar.scss';
import angular from 'angular';

class CalendarController {
    /*@ngInject*/
    constructor($filter, $mdDateLocale, mdxDateUtil, $timeout, $scope) {

        this.dateLocale = $mdDateLocale;
        this.mdxDateUtil = mdxDateUtil;
        this.$scope = $scope;
        this.today = new Date();
        this.viewCount = this.viewCount || 1;
        this.views = [];
        this.weeks = [];
        this.selectPointer = this.selectPointer || 1; //0 结束  1 开始
        this.fixing = 0;

        $scope.$watch(() => {
            return this.views;
        }, () => {
            this.buildWeeks();
        }, true);

        var baseView = new Date();
        this.mode = this.mode || 'single'; //single / range
        if (this.mode === 'single') {
            this.date = this.date || null;
            if (this.date) {
                baseView = new Date(this.date);
            }
            $scope.$watch(() => {
                return $filter('date')(this.date, 'shortDate');
            }, () => {
                if (this.mdxDateUtil.isValid(this.date)) {
                    this.setViews(this.calcuViewOffset(this.date));
                    $scope.$emit('mdx-calendar-date-change', new Date(this.date));
                }
            });
        } else if (this.mode === 'range') {

            this.date = this.date || {};
            if (this.date.startDate) {
                baseView = new Date(this.date.startDate);
            }
            $scope.$watch(() => {
                return $filter('date')(this.date.startDate, 'shortDate');
            }, () => {
                if (!this.fixing) {
                    if (this.mdxDateUtil.isValid(this.date.startDate)) {
                        if (this.date.startDate > this.date.endDate) {
                            //开始日期大于结束日期,修正结束日期
                            this.fixing = 1;
                            this.date.endDate = new Date(this.date.startDate);
                        }
                        this.selectPointer = 0;

                        this.setViews(this.calcuViewOffset(this.date.startDate));
                        $scope.$emit('mdx-calendar-start-date-change', new Date(this.date.startDate));
                    }
                } else {
                    this.fixing = 0;
                }

            });
            $scope.$watch(() => {
                return $filter('date')(this.date.endDate, 'shortDate');
            }, () => {
                if (!this.fixing) {
                    if (this.mdxDateUtil.isValid(this.date.endDate)) {
                        if (this.date.endDate < this.date.startDate) {
                            this.fixing = 1;
                            this.date.startDate = new Date(this.date.endDate);
                            this.selectPointer = 0;
                            this.setViews(this.calcuViewOffset(this.date.startDate));
                            $scope.$emit('mdx-calendar-start-date-change', new Date(this.date.startDate));
                        } else {
                            this.selectPointer = 1;
                            this.setViews(this.calcuViewOffset(this.date.endDate));

                            $scope.$emit('mdx-calendar-end-date-change', new Date(this.date.endDate));
                        }
                    }
                } else {
                    this.fixing = 0;
                }

            });
        }
        for (let i = 0; i < this.viewCount; i++) {

            let view = new Date(baseView.getFullYear(), baseView.getMonth(), 1);
            view.setMonth(baseView.getMonth() + i);
            this.views.push(view);
        }

    }
    isEnabled(date){

        return (!this.minDate || date > this.minDate) && (!this.maxDate || date <= this.maxDate) && (!angular.isFunction(this.dateFilter) || this.dateFilter({$date:date}));

    }
    isInDateRange(date) {
        return (!this.minDate || date > this.minDate) && (!this.maxDate || date <= this.maxDate);
    }
    isInView(date) {
        let isIn = false;
        for (let i = 0; i < this.viewCount; i++) {
            isIn = this.isInMonth(date, this.views[i]);
            if (isIn) {
                break;
            }
        }
        return isIn;
    }
    isInMonth(date, view) {
        return this.mdxDateUtil.isSameMonth(date, view);
    }
    isToday(date) {
        return this.mdxDateUtil.isSameDay(this.today, date);
    }
    isRangedDate(date, view) {
        var ranged = false;
        if (this.mode === 'range' && this.isInMonth(date, view)) {
            if (this.date && this.date.startDate && this.date.endDate) {
                ranged = date > this.date.startDate && date < this.date.endDate;
            }
        }
        return ranged;
    }
    isSelectedDate(date, view) {
        var selected = false;
        if (this.date && this.isInMonth(date, view)) {
            if (this.mode === 'single') {
                selected = this.mdxDateUtil.isSameDay(this.date, date);
            } else if (this.mode === 'range') {
                if (!selected) {
                    if (this.date.startDate) {
                        selected = this.mdxDateUtil.isSameDay(this.date.startDate, date);
                    }
                }
                if (!selected) {
                    if (this.date.endDate) {
                        selected = this.mdxDateUtil.isSameDay(this.date.endDate, date);
                    }
                }
            }
        }
        return selected;
    }
    select(date) {
        this.mdxDateUtil.setDateTimeToMidnight(date);
        if (this.mode === 'single') {
            this.date = new Date(date);
        } else if (this.mode === 'range') {

            if (this.selectPointer % 2 === 0) {
                // 第二次
                this.date.endDate = new Date(date);
            } else {
                this.date.startDate = new Date(date);
            }
        }
    }
    prev() {
        this.setViews(-1);
    }
    next() {
        this.setViews(1);
    }
    calcuViewOffset(date) {
        let offset = 0;
        let l = 0;
        let r = 0;
        if (!this.isInView(date)) {
            l = (date.getFullYear() - this.views[0].getFullYear()) * 12 + (date.getMonth() - this.views[0].getMonth());
            r = (date.getFullYear() - this.views.slice(-1)[0].getFullYear()) * 12 + date.getMonth() - this.views.slice(-1)[0].getMonth();
            if (Math.abs(l) > Math.abs(r)) {
                offset = r;
            } else {
                offset = l;
            }
        }
        return offset;
    }
    setViews(offset) {
        if (offset !== 0) {
            for (let i = 0; i < this.viewCount; i++) {
                this.views[i].setMonth(this.views[i].getMonth() + offset);
            }
        }
    }
    buildWeeks() {
        this.weeks = [];
        for (let i = 0; i < this.viewCount; i++) {
            this.weeks.push(this.mdxDateUtil.getWeeksOfMonth(this.views[i]));
        }
    }

}
class CalendarDirective {
    constructor() {
        this.restrict = 'E';
        this.template = require('./index.html');
        this.scope = {
            mode: '@', //single/range
            date: '=?',
            view: '=?',
            viewCount: '=?',
            minDate: '=?',
            maxDate: '=?',
            dateFilter: '&?',
            selectPointer: '=?' //range时，外部可以设置selectPointer控制，本次设置start or end
        };

        this.bindToController = true;
        this.controllerAs = 'ctrl';
        this.controller = CalendarController;
    }

}

export default angular.module('ngMaterialX.calendar', []).run(
    /*@ngInject*/
    ($mdColors, mdxUtil) => {
        // mdxUtil.addCssRule('.mdx-calendar-ranged-date', `background-color:${$mdColors.getThemeColor('primary-500-0.08')}`);
        // mdxUtil.addCssRule('.mdx-calendar-date-today', `border:1px solid ${$mdColors.getThemeColor('primary-900')} !important`);
    }
).directive('mdxCalendar', () => new CalendarDirective());