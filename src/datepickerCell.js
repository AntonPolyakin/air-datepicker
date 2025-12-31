import consts from './consts';
import {
    createElement,
    classNames,
    getParsedDate,
    isSameDate,
    isDateSmaller,
    isDateBigger,
    isDateBetween,
    dateDifference,
    addDays
} from './utils';

import './datepickerCell.scss';

export default class DatepickerCell {
    constructor({ type, date, dp, opts, body } = {}) {
        this.type = type;
        this.singleType = this.type.slice(0, -1); // days -> day etc.'`
        this.date = date;
        this.dp = dp;
        this.opts = opts;
        this.body = body;
        this.customData = false;

        this.init();
    }

    init() {
        let { onRenderCell } = this.opts;

        if (onRenderCell) {
            this.customData = onRenderCell({
                date: this.date,
                cellType: this.singleType,
                datepicker: this.dp,
            });
        }

        this._createElement();
        this._bindDatepickerEvents();

        if (this.customData?.disabled) {
            this.dp.disableDate(this.date);
        } else if (this.customData?.disabled === false) {
            this.dp.enableDate(this.date);
        }
    }

    _bindDatepickerEvents() {
        this.dp.on(consts.eventChangeSelectedDate, this.onChangeSelectedDate);
        this.dp.on(consts.eventChangeFocusDate, this.onChangeFocusDate);
    }

    unbindDatepickerEvents() {
        this.dp.off(consts.eventChangeSelectedDate, this.onChangeSelectedDate);
        this.dp.off(consts.eventChangeFocusDate, this.onChangeFocusDate);
    }

    _createElement() {
        let { year, month, fullMonth, date, fullDate } = getParsedDate(this.date);
        let extraAttrs = this.customData?.attrs || {};

        this.$cell = createElement({
            attrs: {
                'data-year': year,
                'data-month': month,
                'data-date': date,
                'data-iso-date': `${year}-${fullMonth}-${fullDate}`,
                ...extraAttrs,
            }
        });
        this.$cell.adpCell = this;
    }

    _getClassName() {
        let currentDate = new Date();
        let { selectOtherMonths, selectOtherYears } = this.opts;
        let { minDate, maxDate, isDateDisabled } = this.dp;
        let { day } = getParsedDate(this.date);
        let isOutOfMinMaxRange = this._isOutOfMinMaxRange();
        let isDisabled = isDateDisabled(this.date);

        let classNameCommon = classNames(
            'air-datepicker-cell',
            `-${this.singleType}-`, // days -> day etc.'`
            {
                '-current-': isSameDate(currentDate, this.date, this.type),
                '-min-date-': minDate && isSameDate(minDate, this.date, this.type),
                '-max-date-': maxDate && isSameDate(maxDate, this.date, this.type),
            }
        );
        let classNameType = '';

        switch (this.type) {
            case consts.days:
                classNameType = classNames({
                    '-weekend-': this.dp.isWeekend(day),
                    '-other-month-': this.isOtherMonth,
                    '-disabled-': this.isOtherMonth && !selectOtherMonths || isOutOfMinMaxRange || isDisabled
                });
                break;
            case consts.months:
                classNameType = classNames({
                    '-disabled-': isOutOfMinMaxRange
                });
                break;
            case consts.years:
                classNameType = classNames({
                    '-other-decade-': this.isOtherDecade,
                    '-disabled-': isOutOfMinMaxRange || (this.isOtherDecade && !selectOtherYears)
                });
                break;
        }

        return classNames(classNameCommon, classNameType, this.customData?.classes).split(' ');
    }

    _getHtml() {
        let { year, month, date } = getParsedDate(this.date);
        let { showOtherMonths, showOtherYears } = this.opts;

        if (this.customData?.html) {
            return this.customData.html;
        }

        switch (this.type) {
            case consts.days:
                return !showOtherMonths && this.isOtherMonth ? '' : date;
            case consts.months:
                return this.dp.locale[this.opts.monthsField][month];
            case consts.years:
                return !showOtherYears && this.isOtherDecade ? '' : year;
        }
    }

    _isOutOfMinMaxRange() {
        let { minDate, maxDate } = this.dp;
        let { type, date: cellDate } = this;
        let { month, year, date } = getParsedDate(cellDate);
        let isDay = type === consts.days;
        let isYear = type === consts.years;

        //Since in months cells date is set to the first day of month we should change it value to from min or max dates
        //to be able to mark cell as disabled correctly
        //Same goes to year cells
        let cellMinDate = minDate
            ? new Date(year, isYear ? minDate.getMonth() : month, isDay ? date : minDate.getDate())
            : false;
        let cellMaxDate = maxDate
            ? new Date(year, isYear ? maxDate.getMonth() : month, isDay ? date : maxDate.getDate())
            : false;

        if (minDate && maxDate) {
            return isDateSmaller(cellMinDate, minDate) || isDateBigger(cellMaxDate, maxDate);
        }

        if (minDate) {
            return isDateSmaller(cellMinDate, minDate);
        }

        if (maxDate) {
            return isDateBigger(cellMaxDate, maxDate);
        }
    }

    destroy() {
        this.unbindDatepickerEvents();
    }

    focus = () => {
        this.$cell.classList.add('-focus-');
        this.focused = true;
    }

    removeFocus = () => {
        this.$cell.classList.remove('-focus-');
        this.focused = false;
    }

    select = () => {
        this.$cell.classList.add('-selected-');
        this.selected = true;
    }

    removeSelect = () => {
        this.$cell.classList.remove('-selected-', '-range-from-', '-range-to-');
        this.selected = false;
    }

    _handleRangeStatus() {
        const { maxDays, minDays } = this.opts;
        const { selectedDates, focusDate, rangeDateFrom, rangeDateTo } = this.dp;
        const selectedDatesLen = selectedDates.length;

        this.$cell.classList.remove('-range-from-', '-range-to-', '-in-range-');

        if (!selectedDatesLen) return;

        let from = rangeDateFrom;
        let to = rangeDateTo;
        let date = this.date;
        let type = this.type;

        const diff = dateDifference;
        const add = addDays;
        const bigger = isDateBigger;
        const less = isDateSmaller;
        const same = isSameDate;

        // If only one date is selected and there is a focal date
        if (selectedDatesLen === 1 && focusDate) {
            const selectedDate = selectedDates[0];
            const focusedDate = focusDate;
            const selectedDateIsBeforeFocus = bigger(focusedDate, selectedDate);

            // We define the start and end points of the time range
            from = selectedDateIsBeforeFocus ? selectedDate : focusedDate;
            to = selectedDateIsBeforeFocus ? focusedDate : selectedDate;

            // We calculate the length of the desired range
            const desiredRangeLength = diff(to, from) + 1;

            // Adjust the range according to the restrictions
            if (maxDays && desiredRangeLength > maxDays) {
                // Limit by maxDays
                if (selectedDateIsBeforeFocus) {
                    // Focus to the right of the selected date
                    to = add(from, maxDays - 1);
                } else {
                    // Focus to the left of the selected date
                    from = add(to, -(maxDays - 1));
                }
            } else if (minDays && desiredRangeLength < minDays) {
                // Expanding to minDays
                if (selectedDateIsBeforeFocus) {
                    // Focus to the right of the selected date
                    to = add(from, minDays - 1);
                } else {
                    // Focus to the left of the selected date
                    from = add(to, -(minDays - 1));
                }
            }

            // If after adjusting we go beyond the focal date
            // (for example, the focus was too far away and we truncated it by maxDays)
            // we need to make sure the focal date is still within the range
            // or at its boundary

            // Calculate the final length of the range
            const finalRangeLength = diff(to, from) + 1;

            // Let's check if it's possible to set a range of this length.
            if (minDays && finalRangeLength < minDays) {
                // Cannot show range less than minDays
                from = null;
                to = null;
            } else if (maxDays && finalRangeLength > maxDays) {
                // It is not possible to show a range greater than maxDays
                from = null;
                to = null;
            }
        }

        let classes = {
            '-in-range-': false,
            '-range-from-': false,
            '-range-to-': false
        };

        if (from && to) {
            // Check if the current date is within the range
            const isInRange = bigger(date, from) && less(date, to);

            // Check if the current date is the start of a range
            const isRangeFrom = same(date, from, type);

            // Check if the current date is the end of a range
            const isRangeTo = same(date, to, type);

            // Installing classes
            classes['-in-range-'] = isInRange;
            classes['-range-from-'] = isRangeFrom;
            classes['-range-to-'] = isRangeTo;
        } else if (from && !to) {
            // Only the starting point is selected
            classes['-range-from-'] = same(date, from, type);
        } else if (!from && to) {
            // Only the end point is selected
            classes['-range-to-'] = same(date, to, type);
        }

        // Adding classes to an element
        Object.keys(classes).forEach(className => {
            if (classes[className]) {
                this.$cell.classList.add(className);
            }
        });
    }

    _handleSelectedStatus() {
        let selected = this.dp._checkIfDateIsSelected(this.date, this.type);
        if (selected) {
            this.select();
        } else if (!selected && this.selected) {
            this.removeSelect();
        }
    }

    _handleInitialFocusStatus() {
        let datesAreSame = isSameDate(this.dp.focusDate, this.date, this.type);

        if (datesAreSame) {
            this.focus();
            if (this.dp.lastDateInRange) {
                delete this.dp.lastDateInRange;
            }
        }
    }

    _handleClasses() {
        this.$cell.setAttribute('class', '');
        this._handleInitialFocusStatus();
        if (this.dp.hasSelectedDates) {
            this._handleSelectedStatus();
            if (this.dp.opts.range && this.type === consts.days) {
                this._handleRangeStatus();
            }
        }
        this.$cell.classList.add(...this._getClassName());
    }

    get isDisabled() {
        return this.$cell.matches('.-disabled-');
    }

    get isOtherMonth() {
        return this.dp.isOtherMonth(this.date);
    }

    get isOtherDecade() {
        return this.dp.isOtherDecade(this.date);
    }

    onChangeSelectedDate = () => {
        if (this.isDisabled) return;

        this._handleSelectedStatus();
        if (this.dp.opts.range && this.type === consts.days) {
            this._handleRangeStatus();
        }
    }

    onChangeFocusDate = (date) => {
        if (!date) {
            if (this.focused) {
                this.removeFocus();
            }
            return;
        }

        let datesAreSame = isSameDate(date, this.date, this.type);

        if (datesAreSame) {
            this.focus();
        } else if (!datesAreSame && this.focused) {
            this.removeFocus();
        }

        if (this.dp.opts.range && this.type === consts.days) {
            this._handleRangeStatus();
        }
    }

    render = () => {
        this.$cell.innerHTML = this._getHtml();

        this._handleClasses();

        return this.$cell;
    }
}
