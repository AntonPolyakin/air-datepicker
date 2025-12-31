import defaults from './defaults';
import {
    copyDate,
    createDate,
    createElement,
    deepCopy,
    deepMerge,
    getDecade,
    getEl,
    getParsedDate,
    getWordBoundaryRegExp,
    insertAfter,
    isDateBigger,
    isDateSmaller,
    isSameDate,
    formatExpandedYear,
    getTimezoneOffset,
    getWeekYear,
    getWeek,
    getDayOfYear,
    ordinal,
    dateDifference,
    addDays
} from './utils';
import DatepickerBody from './datepickerBody';
import DatepickerNav from './datepickerNav';
import DatepickerButtons from './datepickerButtons';
import DatepickerTime from './datepickerTime';
import DatepickerKeyboard from './datepickerKeyboard';
import withEvents from './withEvents';
import consts from './consts';

import './datepickerVars.scss';
import './datepicker.scss';

let $datepickersContainer = '',
    $datepickerOverlay = '',
    containerBuilt = false,
    baseTemplate = '' +
        '<i class="air-datepicker--pointer"></i>' +
        '<div class="air-datepicker--navigation"></div>' +
        '<div class="air-datepicker--content"></div>';

export default class Datepicker {
    static defaults = defaults
    static version = '3.6.0'
    static defaultGlobalContainerId = 'air-datepicker-global-container'
    static buildGlobalContainer(id) {
        containerBuilt = true;

        $datepickersContainer = createElement({ className: id, id });
        getEl('body').appendChild($datepickersContainer);
    }
    constructor(el, opts) {
        this.$el = getEl(el);

        if (!this.$el) return;

        this.$datepicker = createElement({ className: 'air-datepicker' });
        this.opts = deepMerge({}, defaults, opts);
        this.$customContainer = this.opts.container ? getEl(this.opts.container) : false;
        this.$altField = getEl(this.opts.altField || false);


        let { view, startDate } = this.opts;

        if (!startDate) {
            this.opts.startDate = new Date();
        }

        if (this.$el.nodeName === 'INPUT') {
            this.elIsInput = true;
        }

        this.inited = false;
        this.visible = false;

        this.viewDate = createDate(this.opts.startDate);
        this.focusDate = false;
        this.initialReadonly = this.$el.getAttribute('readonly');
        this.customHide = false;
        this.currentView = view;
        this.selectedDates = [];
        this.disabledDates = new Set();
        this.isDestroyed = false;
        this.views = {};
        this.keys = [];
        this.rangeDateFrom = '';
        this.rangeDateTo = '';
        this.timepickerIsActive = false; // Need when autoClose and timepicker are both true
        this.treatAsInline = this.opts.inline || !this.elIsInput;

        this.init();
    }

    viewIndexes = [consts.days, consts.months, consts.years];

    init() {
        let {
            opts,
            treatAsInline,
            opts: {
                inline,
                isMobile,
                selectedDates,
                keyboardNav,
                onlyTimepicker
            }
        } = this;
        let $body = getEl('body');

        let shouldBuildGlobalContainer =
            // Check if global container still exist in DOM
            (!containerBuilt || containerBuilt && $datepickersContainer && !$body.contains($datepickersContainer))
            && !inline
            && this.elIsInput
            && !this.$customContainer;

        if (shouldBuildGlobalContainer) {
            Datepicker.buildGlobalContainer(Datepicker.defaultGlobalContainerId);
        }

        if (isMobile && !$datepickerOverlay && !treatAsInline) {
            this._createMobileOverlay();
        }

        this._handleLocale();
        this._bindSubEvents();
        this._createMinMaxDates();
        this._limitViewDateByMaxMinDates();

        if (this.elIsInput) {
            if (!inline) {
                this._bindEvents();
            }

            if (keyboardNav && !onlyTimepicker) {
                this.keyboardNav = new DatepickerKeyboard({ dp: this, opts });
            }
        }

        if (selectedDates) {
            this.selectDate(selectedDates, { silent: true });
        }

        if (this.opts.visible && !treatAsInline) {
            this.show();
        }

        if (isMobile && !treatAsInline) {
            this.$el.setAttribute('readonly', true);
        }

        if (treatAsInline) {
            this._createComponents();
        }
    }

    _createMobileOverlay() {
        $datepickerOverlay = createElement({ className: 'air-datepicker-overlay' });
        $datepickersContainer.appendChild($datepickerOverlay);
    }

    _createComponents() {
        let {
            opts,
            treatAsInline,
            opts: {
                inline,
                buttons,
                timepicker,
                position,
                classes,
                onlyTimepicker,
                isMobile,
            }
        } = this;
        let dp = this;

        this._buildBaseHtml();

        if (this.elIsInput) {
            if (!inline) {
                this._setPositionClasses(position);
            }
        }

        if (inline || !this.elIsInput) {
            this.$datepicker.classList.add('-inline-');
        }

        if (classes) {
            this.$datepicker.classList.add(...classes.split(' '));
        }

        if (onlyTimepicker) {
            this.$datepicker.classList.add('-only-timepicker-');
        }

        if (isMobile && !treatAsInline) {
            this._addMobileAttributes();
        }

        this.views[this.currentView] = new DatepickerBody({
            dp,
            type: this.currentView,
            opts
        });

        this.nav = new DatepickerNav({ dp, opts });

        if (timepicker) {
            this._addTimepicker();
        }

        if (buttons) {
            this._addButtons();
        }

        this.$content.appendChild(this.views[this.currentView].$el);
        this.$nav.appendChild(this.nav.$el);
    }

    _destroyComponents() {
        for (let view in this.views) {
            this.views[view].destroy();
        }
        this.views = {};
        this.nav.destroy();
        if (this.timepicker) {
            this.timepicker.destroy();
        }
    }

    _addMobileAttributes() {
        $datepickerOverlay.addEventListener('click', this._onClickOverlay);

        this.$datepicker.classList.add('-is-mobile-');
        this.$el.setAttribute('readonly', true);
    }

    _removeMobileAttributes() {
        $datepickerOverlay.removeEventListener('click', this._onClickOverlay);

        this.$datepicker.classList.remove('-is-mobile-');

        if (!this.initialReadonly && this.initialReadonly !== '') {
            this.$el.removeAttribute('readonly');
        }
    }

    _createMinMaxDates() {
        let { minDate, maxDate } = this.opts;

        this.minDate = minDate ? createDate(minDate) : false;
        this.maxDate = maxDate ? createDate(maxDate) : false;
    }

    _addTimepicker() {
        this.$timepicker = createElement({ className: 'air-datepicker--time' });
        this.$datepicker.appendChild(this.$timepicker);
        this.timepicker = new DatepickerTime({ dp: this, opts: this.opts });
        this.$timepicker.appendChild(this.timepicker.$el);
    }

    _addButtons() {
        this.$buttons = createElement({ className: 'air-datepicker--buttons' });
        this.$datepicker.appendChild(this.$buttons);
        this.buttons = new DatepickerButtons({ dp: this, opts: this.opts });
        this.$buttons.appendChild(this.buttons.$el);
    }

    _bindSubEvents() {
        this.on(consts.eventChangeSelectedDate, this._onChangeSelectedDate);
        this.on(consts.eventChangeFocusDate, this._onChangeFocusedDate);
        this.on(consts.eventChangeTime, this._onChangeTime);
    }

    _buildBaseHtml() {
        let { inline } = this.opts;

        if (this.elIsInput) {
            if (!inline) {
                this.$container.appendChild(this.$datepicker);
            } else {
                insertAfter(this.$datepicker, this.$el);
            }
        } else {
            this.$el.appendChild(this.$datepicker);
        }

        this.$datepicker.innerHTML = baseTemplate;

        this.$content = getEl('.air-datepicker--content', this.$datepicker);
        this.$pointer = getEl('.air-datepicker--pointer', this.$datepicker);
        this.$nav = getEl('.air-datepicker--navigation', this.$datepicker);
    }

    _handleLocale() {
        let { locale, dateFormat, firstDay, timepicker, onlyTimepicker, timeFormat, dateTimeSeparator } = this.opts;
        this.locale = deepCopy(locale);

        if (dateFormat) {
            this.locale.dateFormat = dateFormat;
        }
        // Allow to remove time from formatted string
        // e.g. if user wants to display mm:hh yyyy MMMM (time first) instead of hardcoded order - 'date time`
        if (timeFormat !== undefined && timeFormat !== '') {
            this.locale.timeFormat = timeFormat;
        }

        let { timeFormat: timeFormatValidated } = this.locale;

        if (firstDay !== '') {
            this.locale.firstDay = firstDay;
        }

        if (timepicker && typeof dateFormat !== 'function') {
            let separator = timeFormatValidated ? dateTimeSeparator : '';
            this.locale.dateFormat = [this.locale.dateFormat, (timeFormatValidated ? timeFormatValidated : '')].join(separator);
        }

        if (onlyTimepicker && typeof dateFormat !== 'function') {
            this.locale.dateFormat = this.locale.timeFormat;
        }
    }

    _setPositionClasses(pos) {
        if (typeof pos === 'function') {
            this.$datepicker.classList.add('-custom-position-');

            return;
        }

        pos = pos.split(' ');
        let main = pos[0],
            sec = pos[1],
            classes = `air-datepicker -${main}${(sec ? '-' + sec : '')}- -from-${main}-`;

        this.$datepicker.classList.add(...classes.split(' '));
    }

    _bindEvents() {
        this.$el.addEventListener(this.opts.showEvent, this._onFocus);
        this.$el.addEventListener('blur', this._onBlur);
        this.$datepicker.addEventListener('mousedown', this._onMouseDown);
        this.$datepicker.addEventListener('mouseup', this._onMouseUp);
        window.addEventListener('resize', this._onResize);
    }

    _limitViewDateByMaxMinDates() {
        let { viewDate, minDate, maxDate } = this;

        if (maxDate && isDateBigger(viewDate, maxDate)) {
            this.setViewDate(maxDate);
        }
        if (minDate && isDateSmaller(viewDate, minDate)) {
            this.setViewDate(minDate);
        }
    }

    formatDate(date = this.viewDate, string) {
        date = createDate(date);

        if (!(date instanceof Date)) return;

        let result = string,
            locale = this.locale,
            parsedDate = getParsedDate(date),
            dayPeriod = parsedDate.dayPeriod,
            decade = getDecade(date),
            replacer = Datepicker.replacer;

        const formats = {
            // Unix
            x: date.getTime(),
            X: Math.floor(date.getTime() / 1000),

            // Year
            Y: parsedDate.year,
            YY: String(parsedDate.year).slice(-2),
            YYYY: parsedDate.year,
            YYYYYY: formatExpandedYear(parsedDate.year),
            y: parsedDate.year > 0 ? parsedDate.year : 1 - parsedDate.year,

            // Era
            N: parsedDate.year > 0 ? 'AD' : 'BC',
            NN: parsedDate.year > 0 ? 'AD' : 'BC',
            NNN: parsedDate.year > 0 ? 'AD' : 'BC',
            NNNN: parsedDate.year > 0 ? 'Anno Domini' : 'Before Christ',
            NNNNN: parsedDate.year > 0 ? 'AD' : 'BC',

            // Month
            M: parsedDate.month + 1,
            Mo: ordinal(parsedDate.month + 1),
            MM: parsedDate.fullMonth,
            MMM: locale.monthsShort[parsedDate.month],
            MMMM: locale.months[parsedDate.month],

            // Quarter
            Q: Math.ceil((parsedDate.month + 1) / 3),
            Qo: ordinal(Math.ceil((parsedDate.month + 1) / 3)),

            // Day of month
            D: parsedDate.date,
            Do: ordinal(parsedDate.date),
            DD: parsedDate.fullDate,

            // Day of year
            DDD: getDayOfYear(date),
            DDDo: ordinal(getDayOfYear(date)),
            DDDD: String(getDayOfYear(date)).padStart(3, '0'),

            // Day of week
            d: parsedDate.day,
            do: ordinal(parsedDate.day),
            dd: locale.daysMin[parsedDate.day],
            ddd: locale.daysShort[parsedDate.day],
            dddd: locale.days[parsedDate.day],

            // ISO day
            E: parsedDate.day === 0 ? 7 : parsedDate.day,

            // Week
            w: getWeek(date),
            wo: ordinal(getWeek(date)),
            ww: String(getWeek(date)).padStart(2, '0'),

            W: getWeek(date),
            Wo: ordinal(getWeek(date)),
            WW: String(getWeek(date)).padStart(2, '0'),

            gg: String(getWeekYear(date)).slice(-2),
            gggg: getWeekYear(date),
            GG: String(getWeekYear(date)).slice(-2),
            GGGG: getWeekYear(date),

            // Hour
            H: parsedDate.hours,
            HH: parsedDate.fullHours,
            h: parsedDate.hours12,
            hh: parsedDate.fullHours12,
            k: parsedDate.hours === 0 ? 24 : parsedDate.hours,
            kk: String(parsedDate.hours === 0 ? 24 : parsedDate.hours).padStart(2, '0'),

            // Minute / Second
            m: parsedDate.minutes,
            mm: parsedDate.fullMinutes,
            s: parsedDate.seconds,
            ss: parsedDate.fullSeconds,

            // Fractional
            S: Math.floor(parsedDate.milliseconds / 100),
            SS: Math.floor(parsedDate.milliseconds / 10),
            SSS: parsedDate.milliseconds,

            // AM/PM
            A: parsedDate.dayPeriod.toUpperCase(),
            a: parsedDate.dayPeriod,

            // Timezone
            Z: getTimezoneOffset(date, true),
            ZZ: getTimezoneOffset(date, false)
        };

        const tokenAliases = {
            yyyy: 'YYYY',
            yy: 'YY'
        };

        function resolveToken(token, formats) {
            if (formats[token] !== undefined) {
                return token;
            }

            if (tokenAliases[token] && formats[tokenAliases[token]] !== undefined) {
                return tokenAliases[token];
            }

            return null;
        }

        const tokens = Object.keys(formats)
            .concat(Object.keys(tokenAliases))
            .sort((a, b) => b.length - a.length);

        for (const token of tokens) {
            const resolved = resolveToken(token, formats);
            if (!resolved) continue;

            const reg = getWordBoundaryRegExp(token);

            if (reg.test(result)) {
                result = replacer(result, reg, formats[resolved]);
            }
        }

        return result;
    }

    /**
     * Changes month, year, decade to next period
     */
    next = () => {
        let { year, month } = this.parsedViewDate;

        switch (this.currentView) {
            case consts.days:
                this.setViewDate(new Date(year, month + 1, 1));
                break;
            case consts.months:
                this.setViewDate(new Date(year + 1, month, 1));
                break;
            case consts.years:
                this.setViewDate(new Date(year + 10, 0, 1));
                break;
        }
    }

    /**
     * Changes month, year, decade to prev period
     */
    prev = () => {
        let { year, month } = this.parsedViewDate;

        switch (this.currentView) {
            case consts.days:
                this.setViewDate(new Date(year, month - 1, 1));
                break;
            case consts.months:
                this.setViewDate(new Date(year - 1, month, 1));
                break;
            case consts.years:
                this.setViewDate(new Date(year - 10, 0, 1));
                break;
        }
    }

    down(date) {
        this._handleUpDownActions(date, 'down');
    }

    up(date) {
        this._handleUpDownActions(date, 'up');
    }

    /**
     * Selects date, if array is passed then selects dates one by one
     * @param {DateLike|Array<DateLike>} date
     * @param {object} [params] - extra parameters
     * @param {boolean} [params.updateTime] - should update timepicker's time from passed date
     * @param {boolean} [params.silent] - if true, then onChange and onBeforeSelect events won't be triggered
     * @return {Promise<void>} - returns promise, since input value updates asynchronously, after promise resolves, we need a promise to be able to get current input value
     * @example selectDate(new Date()).then(() => {console.log(dp.$el.value)})
     */
    selectDate(date, params = {}) {
        const { currentView, parsedViewDate, selectedDates } = this;
        const { updateTime, silent } = params;
        const {
            moveToOtherMonthsOnSelect,
            moveToOtherYearsOnSelect,
            multipleDates,
            range,
            autoClose,
            onBeforeSelect,
            minDays,
            maxDays
        } = this.opts;

        // New variable for setting the second date from the range
        if (this.allowExtendRange === undefined) {
            this.allowExtendRange = true; // Default true
        }

        const selectedDaysLen = selectedDates.length;
        let newViewDate;

        if (Array.isArray(date)) {
            date.forEach((d) => {
                this.selectDate(d, params);
            });
            return new Promise((resolve) => {
                setTimeout(resolve);
            });
        }

        date = createDate(date);
        if (!(date instanceof Date)) return;

        if (onBeforeSelect && !silent && !onBeforeSelect({ date, datepicker: this })) {
            return Promise.resolve();
        }

        // Checks if selected date is out of current month or decade
        // If so, change `viewDate`
        if (currentView === consts.days) {
            if (date.getMonth() !== parsedViewDate.month && moveToOtherMonthsOnSelect) {
                newViewDate = new Date(date.getFullYear(), date.getMonth(), 1);
            }
        }

        if (currentView === consts.years) {
            if (date.getFullYear() !== parsedViewDate.year && moveToOtherYearsOnSelect) {
                newViewDate = new Date(date.getFullYear(), 0, 1);
            }
        }

        if (newViewDate) {
            this.setViewDate(newViewDate);
        }

        if (multipleDates && !range) {
            if (selectedDaysLen === multipleDates) return;
            if (!this._checkIfDateIsSelected(date)) {
                selectedDates.push(date);
            }
        } else if (range) {
            // For range: selectedDates always must be an array of 2 dates 
            // [rangeDateFrom, rangeDateTo] - even if this is the same data

            switch (selectedDates.length) {
                case 0:
                    // No dates selected - starting a new range
                    this.rangeDateFrom = date;
                    this.rangeDateTo = null;
                    this.selectedDates = [date];
                    break;

                case 1:
                    // There is one selected date (start of range)
                    const firstDate = selectedDates[0];
                    const isSameDay = isSameDate(date, firstDate);

                    // Delete range by clicking on the same date again
                    if (isSameDay) {
                        // If minDays > 1, then always delete the range on the second click
                        if (minDays > 1) {
                            this.unselectDate(firstDate);
                            return Promise.resolve();
                        }
                        // If minDays = 1, check the state
                        else if (minDays === 1) {
                            // If the second date is already set (range of one date)
                            if (this.selectedDates.length === 2) {
                                // Delete the entire range
                                this.unselectDate(firstDate);
                                if (this.selectedDates[1]) {
                                    this.unselectDate(this.selectedDates[1]);
                                }
                                return Promise.resolve();
                            } else {
                                // Set a range of one date
                                this.rangeDateTo = date;
                                this.selectedDates = [firstDate, date];
                            }
                        }
                    } else {
                        // Normal second date selection
                        const rangeLength = Math.abs(dateDifference(date, firstDate)) + 1;

                        // Checking the minDays and maxDays limits
                        let isValidRange = true;

                        if (minDays && rangeLength < minDays) {
                            isValidRange = false;
                            if (!silent) {
                                console.log(`The range should not be less than ${minDays} days`);
                            }
                        }

                        if (maxDays && rangeLength > maxDays) {
                            isValidRange = false;
                            if (!silent) {
                                console.log(`The range should not exceed ${maxDays} days`);
                            }
                        }

                        if (!isValidRange) {
                            // If allowExtendRange = true, we try to find the nearest valid date
                            if (this.allowExtendRange && (rangeLength < minDays || rangeLength > maxDays)) {
                                // We are looking for the nearest acceptable date in the desired direction
                                let targetDate;
                                const isSecondDateAfterFirst = isDateBigger(date, firstDate);

                                if (rangeLength < minDays) {
                                    // Need to increase range to minDays
                                    targetDate = isSecondDateAfterFirst
                                        ? addDays(firstDate, minDays - 1)
                                        : addDays(firstDate, -(minDays - 1));
                                } else if (rangeLength > maxDays) {
                                    // The range needs to be reduced to maxDays
                                    targetDate = isSecondDateAfterFirst
                                        ? addDays(firstDate, maxDays - 1)
                                        : addDays(firstDate, -(maxDays - 1));
                                }

                                // Check that targetDate is not equal to the current date
                                if (targetDate && !isSameDate(targetDate, date)) {
                                    return this.selectDate(targetDate, { ...params, silent: true });
                                }
                            }

                            return Promise.resolve();
                        }

                        // All checks have been passed, we are setting the second date
                        this.rangeDateTo = date;

                        // Sort dates if the second date is earlier than the first.
                        if (isDateBigger(this.rangeDateFrom, this.rangeDateTo)) {
                            [this.rangeDateTo, this.rangeDateFrom] = [this.rangeDateFrom, this.rangeDateTo];
                        }

                        this.selectedDates = [this.rangeDateFrom, this.rangeDateTo];
                    }
                    break;

                case 2:
                    // There is already a full range
                    const isClickingOnFrom = isSameDate(date, this.rangeDateFrom);
                    const isClickingOnTo = isSameDate(date, this.rangeDateTo);

                    if (isClickingOnFrom || isClickingOnTo) {
                        // Click on an existing date range
                        if (minDays === 1 && isSameDate(this.rangeDateFrom, this.rangeDateTo)) {
                            // A range of one date - delete on the third click
                            this.unselectDate(this.rangeDateFrom);
                            this.unselectDate(this.rangeDateTo);
                        } else {
                            // Range of different dates - delete and start a new one
                            this.unselectDate(this.rangeDateFrom);
                            this.unselectDate(this.rangeDateTo);
                            // We start a new range from this date
                            this.rangeDateFrom = date;
                            this.rangeDateTo = null;
                            this.selectedDates = [date];
                        }
                    } else {
                        // Click on another date to start a new range.
                        this.rangeDateFrom = date;
                        this.rangeDateTo = null;
                        this.selectedDates = [date];
                    }
                    break;
            }
        } else {
            // No range mode
            this.selectedDates = [date];
        }

        this.trigger(consts.eventChangeSelectedDate, {
            action: consts.actionSelectDate,
            silent: params?.silent,
            date,
            updateTime
        });

        this._updateLastSelectedDate(date);

        if (autoClose && !this.timepickerIsActive && this.visible) {
            if (!multipleDates && !range) {
                this.hide();
            } else if (range && selectedDaysLen === 1) {
                this.hide();
            }
        }

        return new Promise((resolve) => {
            setTimeout(resolve);
        });
    }

    unselectDate(date) {
        let _this = this;
        let selectedDates = _this.selectedDates || [];
        date = createDate(date);
        if (!(date instanceof Date)) return false;

        const { minDays, maxDays, range } = _this.opts;

        if (range) {
            // For range mode: remove the entire date from selectedDates
            const newSelectedDates = selectedDates.filter(curDate =>
                !isSameDate(curDate, date)
            );

            // Updating selectedDates
            _this.selectedDates = newSelectedDates;

            // Update rangeDateFrom and rangeDateTo based on the remaining dates
            if (newSelectedDates.length === 0) {
                _this.rangeDateFrom = '';
                _this.rangeDateTo = '';
                _this._updateLastSelectedDate(false);
            } else if (newSelectedDates.length === 1) {
                _this.rangeDateFrom = newSelectedDates[0];
                _this.rangeDateTo = '';
                _this._updateLastSelectedDate(newSelectedDates[0]);
            } else if (newSelectedDates.length === 2) {
                _this.rangeDateFrom = newSelectedDates[0];
                _this.rangeDateTo = newSelectedDates[1];

                // sort if necessary.
                if (isDateBigger(_this.rangeDateFrom, _this.rangeDateTo)) {
                    [_this.rangeDateTo, _this.rangeDateFrom] = [_this.rangeDateFrom, _this.rangeDateTo];
                    _this.selectedDates = [_this.rangeDateFrom, _this.rangeDateTo];
                }

                _this._updateLastSelectedDate(newSelectedDates[1]);
            }

            _this.trigger(consts.eventChangeSelectedDate, {
                action: consts.actionUnselectDate,
                date
            });
            return true;
        } else {
            // No range mode
            return selectedDates.some(function (curDate, i) {
                if (isSameDate(curDate, date)) {
                    // if maxDays === 1 && range → remove both dates
                    if (maxDays === 1 && range) {
                        selectedDates.splice(i, 2);
                    } else {
                        selectedDates.splice(i, 1);
                    }

                    // Apply minDays logic
                    if (selectedDates.length >= minDays) {
                        selectedDates = selectedDates.slice();
                    } else {
                        selectedDates = [];
                    }

                    // Reset range & lastSelectedDate
                    if (!selectedDates.length) {
                        _this.rangeDateFrom = '';
                        _this.rangeDateTo = '';
                        _this._updateLastSelectedDate(false);
                    } else {
                        _this.rangeDateFrom = selectedDates[0] || '';
                        _this.rangeDateTo =
                            range && selectedDates.length > 1
                                ? selectedDates[1]
                                : '';
                        _this._updateLastSelectedDate(
                            selectedDates[selectedDates.length - 1]
                        );
                    }

                    _this.trigger(consts.eventChangeSelectedDate, {
                        action: consts.actionUnselectDate,
                        date
                    });
                    return true;
                }
                return false;
            });
        }
    }

    replaceDate(selectedDate, newDate) {
        let date = this.selectedDates.find((d) => {
            return isSameDate(d, selectedDate, this.currentView);
        });
        let index = this.selectedDates.indexOf(date);

        if (index < 0) return;

        // Add check if same date exists, if so don't trigger change events
        if (isSameDate(this.selectedDates[index], newDate, this.currentView)) {
            return;
        }

        this.selectedDates[index] = newDate;

        this.trigger(consts.eventChangeSelectedDate, {
            action: consts.actionSelectDate,
            date: newDate,
            updateTime: true
        });

        this._updateLastSelectedDate(newDate);
    }

    /**
     * Clears all selected dates
     * @param {boolean} params.silent  - trigger or not user onSelect event
     */
    clear(params = {}) {
        this.selectedDates = [];
        this.rangeDateFrom = false;
        this.rangeDateTo = false;
        this.lastSelectedDate = false;

        this.trigger(consts.eventChangeSelectedDate, { action: consts.actionUnselectDate, silent: params.silent });

        return new Promise((resolve) => {
            setTimeout(resolve);
        });
    }

    show() {
        let { onShow, isMobile } = this.opts;
        this._cancelScheduledCall();

        if (!this.visible && !this.hideAnimation) {
            this._createComponents();
        }

        this.setPosition(this.opts.position);

        this.$datepicker.classList.add('-active-');
        this.visible = true;

        if (onShow) {
            this._scheduleCallAfterTransition(onShow);
        }

        if (isMobile) {
            this._showMobileOverlay();
        }
    }

    hide() {
        let { onHide, isMobile } = this.opts;
        let hasTransition = this._hasTransition();

        this.visible = false;
        this.hideAnimation = true;

        this.$datepicker.classList.remove('-active-');

        if (this.customHide) {
            this.customHide();
        }

        if (this.elIsInput) {
            this.$el.blur();
        }

        this._scheduleCallAfterTransition((isAnimationCompleted) => {
            if (
                !this.customHide &&
                ((isAnimationCompleted && hasTransition) ||
                    (!isAnimationCompleted && !hasTransition))
            ) {
                this._finishHide();
            }
            onHide && onHide(isAnimationCompleted);
        });

        if (isMobile) {
            $datepickerOverlay.classList.remove('-active-');
        }
    }

    _finishHide = () => {
        this.hideAnimation = false;
        this._destroyComponents();
        this.$container.removeChild(this.$datepicker);
    }

    setPosition = (position, isViewChange = false) => {
        position = position || this.opts.position;

        if (typeof position === 'function') {
            this.customHide = position({
                $datepicker: this.$datepicker,
                $target: this.$el,
                $pointer: this.$pointer,
                isViewChange,
                done: this._finishHide
            });
            return;
        }

        let { isMobile } = this.opts;

        let vpDims = this.$el.getBoundingClientRect(),
            dims = this.$el.getBoundingClientRect(),
            $dpOffset = this.$datepicker.offsetParent,
            $elOffset = this.$el.offsetParent,
            selfDims = this.$datepicker.getBoundingClientRect(),
            pos = position.split(' '),
            top = 0,
            left = 0,
            scrollTop = window.scrollY,
            scrollLeft = window.scrollX,
            offset = this.opts.offset,
            main = pos[0],
            secondary = pos[1];

        if (isMobile) {
            this.$datepicker.style.cssText = 'left: 50%; top: 50%';
            return;
        }

        // If datepicker's container is the same with target element
        if ($dpOffset === $elOffset && $dpOffset !== document.body) {
            dims = {
                top: this.$el.offsetTop,
                left: this.$el.offsetLeft,
                width: vpDims.width,
                height: this.$el.offsetHeight
            };

            scrollTop = 0;
            scrollLeft = 0;
        }

        // If dp container is different from target offset parent
        // and dp offset parent has position not static (default case)
        if ($dpOffset !== $elOffset && $dpOffset !== document.body) {
            let dpOffsetDims = $dpOffset.getBoundingClientRect();

            dims = {
                top: vpDims.top - dpOffsetDims.top,
                left: vpDims.left - dpOffsetDims.left,
                width: vpDims.width,
                height: vpDims.height
            };

            scrollTop = 0;
            scrollLeft = 0;
        }

        switch (main) {
            case 'top':
                top = -selfDims.height - offset;
                break;
            case 'right':
                left = dims.width + offset;
                break;
            case 'bottom':
                top = dims.height + offset;
                break;
            case 'left':
                left = -selfDims.width - offset;
                break;
        }

        switch (secondary) {
            case 'top':
                top = 0;
                break;
            case 'right':
                left = dims.width - selfDims.width;
                break;
            case 'bottom':
                top = dims.height - selfDims.height;
                break;
            case 'left':
                left = 0;
                break;
            case 'center':
                if (/left|right/.test(main)) {
                    top = dims.top + dims.height / 2 - selfDims.height / 2;
                } else {
                    left = dims.left + dims.width / 2 - selfDims.width / 2;
                }
        }

        this.$datepicker.style.cssText = `left: ${left + scrollLeft}px; top: ${top + scrollTop}px`;
    }

    _setInputValue = () => {
        let { opts, $altField, locale: { dateFormat } } = this,
            { altFieldDateFormat, altField } = opts;

        if (altField && $altField) {
            $altField.value = this._getInputValue(altFieldDateFormat);
        }

        this.$el.value = this._getInputValue(dateFormat);
        this.$el.dispatchEvent(new Event('change'));
    }

    _getInputValue = (dateFormat) => {
        let { selectedDates, opts } = this,
            { multipleDates, multipleDatesSeparator } = opts;

        if (!selectedDates.length) return '';

        let formatIsFunction = typeof dateFormat === 'function';

        let value = formatIsFunction
            ? dateFormat(multipleDates ? selectedDates : selectedDates[0])
            : selectedDates.map((date) => {
                return this.formatDate(date, dateFormat);
            });

        value = formatIsFunction
            ? value
            : value.join(multipleDatesSeparator);

        return value;
    }

    _triggerOnSelect() {
        let dates = [],
            formattedDates = [],
            datepicker = this,
            { selectedDates, locale, opts: { onSelect, multipleDates, range } } = datepicker,
            isMultiple = multipleDates || range,
            formatIsFunction = typeof locale.dateFormat === 'function';

        if (selectedDates.length) {
            dates = selectedDates.map(copyDate);
            formattedDates = formatIsFunction
                ? multipleDates
                    ? locale.dateFormat(dates)
                    : dates.map(date => locale.dateFormat(date))
                : dates.map(date => this.formatDate(date, locale.dateFormat));
        }

        onSelect({
            date: isMultiple ? dates : dates[0],
            formattedDate: isMultiple ? formattedDates : formattedDates[0],
            datepicker
        });
    }

    /**
     * Checks if date is already selected, returns selected date if finds one
     * Returns selected date, need for timepicker
     * @param {Date} date
     * @param {String} cellType - days, months, years
     * @return {boolean|Date}
     * @private
     */
    _checkIfDateIsSelected = (date, cellType = consts.days) => {
        let alreadySelectedDate = false;

        this.selectedDates.some((selectedDate) => {
            let same = isSameDate(date, selectedDate, cellType);
            alreadySelectedDate = same && selectedDate;
            return same;
        });

        return alreadySelectedDate;
    }

    _handleAlreadySelectedDates(alreadySelectedDate, cellDate) {
        let { selectedDates, rangeDateFrom, rangeDateTo } = this;
        let { range, toggleSelected } = this.opts;
        let selectedDatesLen = selectedDates.length;
        let isFunc = typeof toggleSelected === 'function';
        let shouldToggle = isFunc ? toggleSelected({ datepicker: this, date: cellDate }) : toggleSelected;
        let datesAreSame = Boolean(range && selectedDatesLen === 1 && alreadySelectedDate);
        // If range=true and user selects same date, then add new instance of same date to selectedDates
        // to be able to change time independently on both dates
        let cellDateCopy = datesAreSame ? copyDate(cellDate) : cellDate;

        if (range) {
            if (!shouldToggle) {
                // Add possibility to select same date when range is true
                if (selectedDatesLen !== 2) {
                    this.selectDate(cellDateCopy);
                }
                // Don't change lastSelectedDate if we have 2 same selected dates
                if (selectedDatesLen === 2 && isSameDate(rangeDateFrom, rangeDateTo)) {
                    return;
                }
            } else {
                if (this.selectedDates.length != 2) {
                    this.selectDate(cellDateCopy);
                    shouldToggle = false;
                } else {
                    this.unselectDate(cellDateCopy);
                    this.unselectDate(alreadySelectedDate);
                }
            }
        }

        if (shouldToggle) {
            this.unselectDate(cellDateCopy);
        } else {
            // Change last selected date to be able to change time when clicking on this cell
            this._updateLastSelectedDate(datesAreSame ? cellDateCopy : alreadySelectedDate);
        }
    }

    _handleUpDownActions(date, dir) {
        let maxViewIndex = 2,
            minViewIndex = 0;

        date = createDate(date || this.focusDate || this.viewDate);

        if (!(date instanceof Date)) return;

        let nextView = dir === 'up' ? this.viewIndex + 1 : this.viewIndex - 1;
        if (nextView > maxViewIndex) nextView = maxViewIndex;
        if (nextView < minViewIndex) nextView = minViewIndex;

        this.setViewDate(new Date(date.getFullYear(), date.getMonth(), 1));
        this.setCurrentView(this.viewIndexes[nextView]);
    }

    _scheduleCallAfterTransition = (cb) => {
        this._cancelScheduledCall();

        cb && cb(false);

        this._onTransitionEnd = () => {
            cb && cb(true);
        };

        this.$datepicker.addEventListener('transitionend', this._onTransitionEnd, { once: true });
    }

    _cancelScheduledCall = () => {
        this.$datepicker.removeEventListener('transitionend', this._onTransitionEnd);
    }

    /**
     * Sets new view date of datepicker
     * @param {DateLike} date
     */
    setViewDate = (date) => {
        date = createDate(date);

        if (!(date instanceof Date)) return;

        if (isSameDate(date, this.viewDate)) return;
        let oldViewDate = this.viewDate;
        this.viewDate = date;
        let { onChangeViewDate } = this.opts;

        if (onChangeViewDate) {
            let { month, year } = this.parsedViewDate;
            onChangeViewDate({
                month,
                year,
                decade: this.curDecade
            });
        }

        this.trigger(consts.eventChangeViewDate, date, oldViewDate);
    }

    /**
     * Sets new focusDate
     * @param {Date} date
     * @param {Object} [params]
     * @param {Boolean} params.viewDateTransition
     */
    setFocusDate = (date, params = {}) => {
        if (date) {
            date = createDate(date);

            if (!(date instanceof Date)) return;
        }

        this.focusDate = date;

        this.trigger(consts.eventChangeFocusDate, date, params);
    }

    /**
     * Sets new datepicker view
     * @param {ViewType} view
     * @param [params]
     * @param [params.silent] {boolean}
     */
    setCurrentView = (view, params = {}) => {
        if (!this.viewIndexes.includes(view)) return;

        this.currentView = view;

        if (this.elIsInput && this.visible) {
            this.setPosition(undefined, true);
        }

        // Trigger inner event before new view is inited, to avoid multiple render calls in datepicker body
        this.trigger(consts.eventChangeCurrentView, view);

        if (!this.views[view]) {
            let newView = this.views[view] = new DatepickerBody({
                dp: this,
                opts: this.opts,
                type: view
            });

            if (this.shouldUpdateDOM) {
                this.$content.appendChild(newView.$el);
            }
        }

        // Trigger user event after, to be able to use datepicker api on rendered view
        if (this.opts.onChangeView && !params.silent) {
            this.opts.onChangeView(view);
        }
    }

    /**
     * Updates lastSelectedDate param and triggers corresponding event
     * @param {Date|Boolean} date - date or empty
     */
    _updateLastSelectedDate = (date) => {
        this.lastSelectedDate = date;
        this.trigger(consts.eventChangeLastSelectedDate, date);
    }

    /**
     * Finds cell HTML element
     * @param {DateLike} cellDate
     * @param {CellType} cellType
     * @return {HTMLElement | null}
     */
    getCell(cellDate, cellType = consts.day) {
        cellDate = createDate(cellDate);

        if (!(cellDate instanceof Date)) return;

        let { year, month, date } = getParsedDate(cellDate);

        let yearQuery = `[data-year="${year}"]`,
            monthQuery = `[data-month="${month}"]`,
            dayQuery = `[data-date="${date}"]`;

        let resultQuery = {
            [consts.day]: `${yearQuery}${monthQuery}${dayQuery}`,
            [consts.month]: `${yearQuery}${monthQuery}`,
            [consts.year]: `${yearQuery}`,
        };

        // Can find cells only if calendar is visible and current view is initialized
        if (!this.views[this.currentView]) {
            return undefined;
        }

        return this.views[this.currentView].$el.querySelector(resultQuery[cellType]);
    }

    destroy = () => {
        if (this.isDestroyed) return;

        let { showEvent, isMobile } = this.opts;

        let parent = this.$datepicker.parentNode;
        if (parent) {
            parent.removeChild(this.$datepicker);
        }

        this.$el.removeEventListener(showEvent, this._onFocus);
        this.$el.removeEventListener('blur', this._onBlur);
        window.removeEventListener('resize', this._onResize);
        if (isMobile) {
            this._removeMobileAttributes();
        }

        if (this.keyboardNav) {
            this.keyboardNav.destroy();
        }

        this.views = null;
        this.nav = null;

        this.$datepicker = null;
        this.opts = {};
        this.$customContainer = null;

        this.viewDate = null;
        this.focusDate = null;
        this.selectedDates = [];
        this.rangeDateFrom = null;
        this.rangeDateTo = null;

        this.isDestroyed = true;
    }

    /**
     * Updates datepicker state
     * @param newOpts
     * @param [params]
     * @param [params.silent] {boolean} - if true then callbacks won't be triggered
     */
    update = (newOpts = {}, params = {}) => {
        let prevOpts = deepMerge({}, this.opts);
        let { silent } = params;

        deepMerge(this.opts, newOpts);

        let { timepicker, buttons, range, selectedDates, isMobile } = this.opts;
        let shouldUpdateDOM = this.visible || this.treatAsInline;

        this._createMinMaxDates();
        this._limitViewDateByMaxMinDates();
        this._handleLocale();

        if (selectedDates) {
            this.selectedDates = [];
            this.selectDate(selectedDates, { silent });
        }

        if (newOpts.view) {
            this.setCurrentView(newOpts.view, { silent });
        }

        this._setInputValue();

        if (prevOpts.range && !range) {
            this.rangeDateTo = false;
            this.rangeDateFrom = false;
        } else if (!prevOpts.range && range) {
            if (this.selectedDates.length) {
                this.rangeDateFrom = this.selectedDates[0];
                this.rangeDateTo = this.selectedDates[1];
            }
        }

        if (prevOpts.timepicker && !timepicker) {
            shouldUpdateDOM && this.timepicker.destroy();
            this.timepicker = false;
            this.$timepicker.parentNode.removeChild(this.$timepicker);
        } else if (!prevOpts.timepicker && timepicker) {
            this._addTimepicker();
        }

        if (!prevOpts.buttons && buttons) {
            this._addButtons();
        } else if (prevOpts.buttons && !buttons) {
            this.buttons.destroy();
            this.$buttons.parentNode.removeChild(this.$buttons);
        } else {
            if (shouldUpdateDOM && prevOpts.buttons && buttons) {
                this.buttons.clearHtml().render();
            }
        }

        if (!prevOpts.isMobile && isMobile) {
            if (!this.treatAsInline && !$datepickerOverlay) {
                this._createMobileOverlay();
            }
            this._addMobileAttributes();
            if (this.visible) {
                this._showMobileOverlay();
            }
        } else if (prevOpts.isMobile && !isMobile) {
            this._removeMobileAttributes();

            if (this.visible) {
                $datepickerOverlay.classList.remove('-active-');
                if (typeof this.opts.position !== 'function') {
                    this.setPosition();
                }
            }
        }

        if (!shouldUpdateDOM) return;

        this.nav.update();
        this.views[this.currentView].render();
        if (this.currentView === consts.days) {
            this.views[this.currentView].renderDayNames();
        }
    }

    /**
     * Disables dates
     * @param dates {DateLike | Array<DateLike>} - dates to disable
     * @param [_enable] {Boolean} - for internal use, if true, then instead of disabling date its enabling it
     */
    disableDate = (dates, _enable) => {
        let datesToHandle = Array.isArray(dates) ? dates : [dates];

        datesToHandle.forEach((date) => {
            let trueDate = createDate(date);
            if (!trueDate) return;
            let method = _enable ? 'delete' : 'add';

            this.disabledDates[method](this.formatDate(trueDate, 'yyyy-MM-dd'));
            let cell = this.getCell(trueDate, this.currentViewSingular);

            if (!cell) return;
            cell.adpCell.render();
        }, []);
    }

    /**
     * Enable disabled dates
     * @param dates {DateLike | Array<DateLike>} - dates to enable
     */
    enableDate = (dates) => {
        this.disableDate(dates, true);
    }

    /**
     * Checks if date is disabled
     * @param date {DateLike}
     */
    isDateDisabled = (date) => {
        let trueDate = createDate(date);

        return this.disabledDates.has(this.formatDate(trueDate, 'yyyy-MM-dd'));
    }

    _showMobileOverlay() {
        $datepickerOverlay.classList.add('-active-');
    }

    _hasTransition() {
        let transition = window.getComputedStyle(this.$datepicker).getPropertyValue('transition-duration');
        let props = transition.split(', ');

        return props.reduce((sum, item) => {
            return parseFloat(item) + sum;
        }, 0) > 0;
    }

    //  Utils
    // -------------------------------------------------

    isOtherMonth = (date) => {
        let { month } = getParsedDate(date);

        return month !== this.parsedViewDate.month;
    }

    isOtherYear = (date) => {
        let { year } = getParsedDate(date);

        return year !== this.parsedViewDate.year;
    }

    isOtherDecade = (date) => {
        let { year } = getParsedDate(date);
        let [firstDecadeYear, lastDecadeYear] = getDecade(this.viewDate);

        return year < firstDecadeYear || year > lastDecadeYear;
    }

    //  Subscription events
    // -------------------------------------------------

    _onChangeSelectedDate = ({ silent }) => {
        // Use timeout here for wait for all changes that could be made to selected date (e.g. timepicker adds time)
        setTimeout(() => {
            this._setInputValue();
            if (this.opts.onSelect && !silent) {
                this._triggerOnSelect();
            }
        });
    }

    _onChangeFocusedDate = (date, { viewDateTransition } = {}) => {
        if (!date) return;
        let shouldPerformTransition = false;

        if (viewDateTransition) {
            shouldPerformTransition = this.isOtherMonth(date) || this.isOtherYear(date) || this.isOtherDecade(date);
        }

        if (shouldPerformTransition) {
            this.setViewDate(date);
        }

        if (this.opts.onFocus) {
            this.opts.onFocus({ datepicker: this, date });
        }

    }

    _onChangeTime = ({ hours, minutes }) => {
        let today = new Date();
        let { lastSelectedDate, opts: { onSelect } } = this;
        let targetDate = lastSelectedDate;

        if (!lastSelectedDate) {
            targetDate = today;
        }

        let $cell = this.getCell(targetDate, this.currentViewSingular);
        let cell = $cell && $cell.adpCell;

        if (cell && cell.isDisabled) return;

        targetDate.setHours(hours);
        targetDate.setMinutes(minutes);

        if (!lastSelectedDate) {
            this.selectDate(targetDate);
        } else {
            this._setInputValue();
            if (onSelect) {
                this._triggerOnSelect();
            }
        }
    }

    _onFocus = (e) => {
        if (!this.visible) {
            this.show();
        }
    }

    _onBlur = (e) => {
        if (!this.inFocus && this.visible && !this.opts.isMobile) {
            this.hide();
        }
    }

    _onMouseDown = (e) => {
        this.inFocus = true;
    }

    _onMouseUp = (e) => {
        this.inFocus = false;
        this.$el.focus();
    }

    _onResize = () => {
        if (this.visible && typeof this.opts.position !== 'function') {
            this.setPosition();
        }
    }

    _onClickOverlay = () => {
        if (this.visible) {
            this.hide();
        }
    }

    /**
     * Returns all dates that are currently should be shown in calendar
     * @param {ViewType} viewType
     * @returns {*}
     */
    getViewDates = (viewType = consts.days) => {
        const dates = DatepickerBody.getDatesFunction(viewType);
        return dates(this);
    }

    //  Helpers
    // -------------------------------------------------

    get shouldUpdateDOM() {
        return this.visible || this.treatAsInline;
    }

    get parsedViewDate() {
        return getParsedDate(this.viewDate);
    }

    get currentViewSingular() {
        return this.currentView.slice(0, -1);
    }

    get curDecade() {
        return getDecade(this.viewDate);
    }

    get viewIndex() {
        return this.viewIndexes.indexOf(this.currentView);
    }

    get isFinalView() {
        return this.currentView === consts.years;
    }

    get hasSelectedDates() {
        return this.selectedDates.length > 0;
    }

    get isMinViewReached() {
        return this.currentView === this.opts.minView || this.currentView === consts.days;
    }

    get $container() {
        return this.$customContainer || $datepickersContainer;
    }

    isWeekend = (day) => {
        return this.opts.weekends.includes(day);
    }

    /**
     * Clamps passed date between min and max date
     * @param {Date} date
     */
    getClampedDate = (date) => {
        let { minDate, maxDate } = this,
            newDate = date;

        if (maxDate && isDateBigger(date, maxDate)) {
            newDate = maxDate;
        } else if (minDate && isDateSmaller(date, minDate)) {
            newDate = minDate;
        }

        return newDate;
    }

    static replacer(str, reg, data) {
        return str.replace(reg, function (match, p1, p2, p3) {
            return p1 + data + p3;
        });
    }
}

withEvents(Datepicker.prototype);
