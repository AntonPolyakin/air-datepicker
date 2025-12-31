(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["AirDatepicker"] = factory();
	else
		root["AirDatepicker"] = factory();
})(this, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ Datepicker; }
});

;// ./src/locale/en.js
/* harmony default export */ var en = ({
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  today: 'Today',
  clear: 'Clear',
  dateFormat: 'MM/dd/yyyy',
  timeFormat: 'hh:mm aa',
  firstDay: 0
});
;// ./src/consts.js
/* harmony default export */ var consts = ({
  days: 'days',
  months: 'months',
  years: 'years',
  day: 'day',
  month: 'month',
  year: 'year',
  eventChangeViewDate: 'changeViewDate',
  eventChangeCurrentView: 'changeCurrentView',
  /**
   * @param {Boolean} [viewDateTransition] - should perform transition to new viewDate
   * if passed date is out current month/year/decade range
   */
  eventChangeFocusDate: 'changeFocusDate',
  /**
   * @param {String} action
   * @param {Date} date
   * @param {Boolean} [updateTime] - if true, then timepicker will take time from passed date and save it to instance
   * @param {Boolean} [silent] - if true, then onChange event wont be triggered
   */
  eventChangeSelectedDate: 'changeSelectedDate',
  eventChangeTime: 'changeTime',
  eventChangeLastSelectedDate: 'changeLastSelectedDate',
  actionSelectDate: 'selectDate',
  actionUnselectDate: 'unselectDate',
  cssClassWeekend: '-weekend-'
});
;// ./src/defaults.js


/* harmony default export */ var defaults = ({
  classes: '',
  inline: false,
  autoSize: true,
  locale: en,
  startDate: new Date(),
  firstDay: '',
  weekends: [6, 0],
  dateFormat: '',
  altField: '',
  altFieldDateFormat: 'T',
  toggleSelected: true,
  keyboardNav: true,
  selectedDates: false,
  container: '',
  isMobile: false,
  visible: false,
  position: 'bottom left',
  offset: 12,
  view: consts.days,
  minView: consts.days,
  showOtherMonths: true,
  selectOtherMonths: true,
  moveToOtherMonthsOnSelect: true,
  showOtherYears: true,
  selectOtherYears: true,
  moveToOtherYearsOnSelect: true,
  minDate: '',
  maxDate: '',
  disableNavWhenOutOfRange: true,
  multipleDates: false,
  // Boolean or Number
  multipleDatesSeparator: ', ',
  range: false,
  dynamicRange: true,
  buttons: false,
  monthsField: 'monthsShort',
  showEvent: 'focus',
  autoClose: false,
  fixedHeight: false,
  // navigation
  prevHtml: '<svg><path d="M 17,12 l -5,5 l 5,5"></path></svg>',
  nextHtml: '<svg><path d="M 14,12 l 5,5 l -5,5"></path></svg>',
  navTitles: {
    days: 'MMMM, <i>yyyy</i>',
    months: 'yyyy',
    years: 'yyyy1 - yyyy2'
  },
  timepicker: false,
  onlyTimepicker: false,
  dateTimeSeparator: ' ',
  timeFormat: '',
  minHours: 0,
  maxHours: 24,
  minMinutes: 0,
  maxMinutes: 59,
  hoursStep: 1,
  minutesStep: 1,
  onSelect: false,
  onChangeViewDate: false,
  onChangeView: false,
  onRenderCell: false,
  onShow: false,
  onHide: false,
  onClickDayName: false,
  minDays: 1,
  maxDays: 0
});
;// ./src/utils.js
/**
 * Finds DOM element
 * @param {HTMLElement, String} el
 * @param {Document|HTMLElement} [context=document]
 */

function getEl(el, context = document) {
  return typeof el === 'string' ? context['querySelector'](el) : el;
}

/**
 * Creates HTML DOM element
 * @param {String} [tagName] - element's tag name
 * @param {String} [className]
 * @param {String} [innerHtml]
 * @param {String} [id]
 * @param {Object} [attrs]
 * @returns {HTMLElement}
 */
function createElement({
  tagName = 'div',
  className = '',
  innerHtml = '',
  id = '',
  attrs = {}
} = {}) {
  let $element = document.createElement(tagName);
  if (className) $element.classList.add(...className.split(' '));
  if (id) $element.id = id;
  if (innerHtml) {
    $element.innerHTML = innerHtml;
  }
  if (attrs) {
    setAttribute($element, attrs);
  }
  return $element;
}

/**
 * Sets multiple attributes of element
 * @param {HTMLElement} el
 * @param {Object} attrs - attributes object
 * @returns {HTMLElement}
 */
function setAttribute(el, attrs) {
  for (let [name, value] of Object.entries(attrs)) {
    if (value === undefined) continue;
    el.setAttribute(name, value);
  }
  return el;
}

/**
 * Inserts newElement after targetElement
 * @param {HTMLElement} newElement - element to be inserted
 * @param {HTMLElement} targetElement - after which must be inserted
 * @return {HTMLElement} newElement
 */
function insertAfter(newElement, targetElement) {
  targetElement.parentNode.insertBefore(newElement, targetElement.nextSibling);
  return newElement;
}

/**
 * Makes object deep copy
 * @param {Object} obj
 * @return {Object}
 */
function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Calculates amount of days in passed date
 * @param {Date} date
 * @return {number}
 */
function getDaysCount(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

/**
 * Get detailed date parts for formatting
 *
 * @param {Date} date
 * @returns {{
 *   year: number,
 *   month: number,              // 0–11
 *   date: number,               // 1–31
 *   day: number,                // 0–6 (Sun–Sat)
 *
 *   hours: number,              // 0–23
 *   hours12: number,            // 1–12
 *   minutes: number,            // 0–59
 *   seconds: number,            // 0–59
 *   milliseconds: number,       // 0–999
 *
 *   fullMonth: string,          // 01–12
 *   fullDate: string,           // 01–31
 *   fullHours: string,          // 00–23
 *   fullHours12: string,        // 01–12
 *   fullMinutes: string,        // 00–59
 *   fullSeconds: string,        // 00–59
 *
 *   dayPeriod: 'am' | 'pm'
 * }}
 */
function getParsedDate(date) {
  let hours = date.getHours(),
    {
      hours: hours12,
      dayPeriod
    } = getDayPeriodFromHours24(hours);
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
    day: date.getDay(),
    hours,
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    milliseconds: date.getMilliseconds(),
    fullMonth: String(date.getMonth() + 1).padStart(2, '0'),
    fullDate: String(date.getDate()).padStart(2, '0'),
    fullHours: String(hours).padStart(2, '0'),
    fullHours12: String(hours12).padStart(2, '0'),
    fullMinutes: String(date.getMinutes()).padStart(2, '0'),
    fullSeconds: String(date.getSeconds()).padStart(2, '0'),
    hours12,
    dayPeriod
  };
}
function getDayPeriodFromHours24(hours) {
  let hours12 = hours % 12 === 0 ? 12 : hours % 12;
  let dayPeriod = hours > 11 ? 'pm' : 'am';
  return {
    dayPeriod,
    hours: hours12
  };
}

/**
 * Converts 1 -> 01
 * @param {Number} num
 * @return {String|Number}
 */
function getLeadingZeroNum(num) {
  return num < 10 ? '0' + num : num;
}

/**
 * Calculates current decade
 * @param {Date} date
 * @return {number[]} - array of two years, decade start - decade end
 */
function getDecade(date) {
  let firstYear = Math.floor(date.getFullYear() / 10) * 10;
  return [firstYear, firstYear + 9];
}

/**
 * Subtract days from date
 * @param {Date} date
 * @param {Number} days
 * @return {Date}
 */
function subDays(date, days) {
  let {
    year,
    month,
    date: _date
  } = getParsedDate(date);
  return new Date(year, month, _date - days);
}

/**
 * Class names' handler, inspired by https://github.com/JedWatson/classnames but very simplified
 * @param {String|Object} classes - class names, could contain strings or object
 */
function classNames(...classes) {
  let classNames = [];
  classes.forEach(c => {
    if (typeof c === 'object') {
      for (let cName in c) {
        if (c[cName]) {
          classNames.push(cName);
        }
      }
    } else if (c) {
      classNames.push(c);
    }
  });
  return classNames.join(' ');
}
function toggleClass(el, classes) {
  for (let className in classes) {
    if (classes[className]) {
      el.classList.add(className);
    } else {
      el.classList.remove(className);
    }
  }
}
function addClass(el, ...classes) {
  if (el.length) {
    el.forEach(node => {
      node.classList.add(...classes);
    });
  } else {
    el.classList.add(...classes);
  }
}
function removeClass(el, ...classes) {
  if (el.length) {
    el.forEach(node => {
      node.classList.remove(...classes);
    });
  } else {
    el.classList.remove(...classes);
  }
}

/**
 * Checks if passed dates are the same
 * @param {Date} date1
 * @param {Date} date2
 * @param {String} cellType - one of days|months|years
 * @return {boolean}
 */
function isSameDate(date1, date2, cellType = consts.days) {
  if (!date1 || !date2) return false;
  let d1 = getParsedDate(date1),
    d2 = getParsedDate(date2),
    conditions = {
      [consts.days]: d1.date === d2.date && d1.month === d2.month && d1.year === d2.year,
      [consts.months]: d1.month === d2.month && d1.year === d2.year,
      [consts.years]: d1.year === d2.year
    };
  return conditions[cellType];
}
function isDateBigger(date, comparedDate, loose) {
  let d1 = copyDate(date, false).getTime(),
    d2 = copyDate(comparedDate, false).getTime();
  return loose ? d1 >= d2 : d1 > d2;
}
function isDateSmaller(date, comparedDate) {
  return !isDateBigger(date, comparedDate, true);
}

/**
 * Copies date
 * @param {Date} date
 * @param {Boolean} [keepTime] - should keep the time in a new date or not
 * @return {Date}
 */
function copyDate(date, keepTime = true) {
  let newDate = new Date(date.getTime());
  if (typeof keepTime === 'boolean' && !keepTime) {
    resetTime(newDate);
  }
  return newDate;
}
function resetTime(date) {
  date.setHours(0, 0, 0, 0);
  return date;
}
function isDateBetween(date, dateFrom, dateTo) {
  return isDateBigger(date, dateFrom) && isDateSmaller(date, dateTo);
}

/**
 * Adds event listener to DOM element
 * @param {HTMLElement|HTMLCollection} el
 * @param {String} type
 * @param {Function} listener
 */
function addEventListener(el, type, listener) {
  if (el.length) {
    el.forEach(e => {
      e.addEventListener(type, listener);
    });
  } else {
    el.addEventListener(type, listener);
  }
}

/**
 * Finds closest DOM element to passed target. Similar to jQuery.closest()
 * @param {HTMLElement} target
 * @param {String} selector
 * @return {HTMLElement|Boolean}
 */
function closest(target, selector) {
  if (!target || target === document || target instanceof DocumentFragment) return false;
  if (target.matches(selector)) {
    return target;
  }
  return closest(target.parentNode, selector);
}

/**
 * Clamps number between min and max
 * @param {Number} val
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */
function clamp(val, min, max) {
  return val > max ? max : val < min ? min : val;
}

/**
 * Deep merge of objects or arrays, used to merge options
 * @param {object|array} target - target object or array
 * @param {object|array} objects - source objects
 * @return {object|array}
 */
function deepMerge(target, ...objects) {
  objects.filter(o => o).forEach(obj => {
    for (let [key, value] of Object.entries(obj)) {
      let arrayOrObject = value !== undefined ? (value === null || value === void 0 ? void 0 : value.toString()) === ('[object Object]' || 0) : false;
      if (arrayOrObject) {
        let targetType = target[key] !== undefined ? target[key].toString() : undefined,
          sourceType = value.toString(),
          initialValue = Array.isArray(value) ? [] : {};

        // If target and source types are different, e.g. we try to merge number with object,
        // then take source type
        target[key] = target[key] ? targetType !== sourceType ? initialValue : target[key] : initialValue;
        deepMerge(target[key], value);
      } else {
        target[key] = value;
      }
    }
  });
  return target;
}

/**
 * Checks if ISO date string consists only of numbers
 * @param {string} dateString
 * @returns {boolean}
 */
function dateStringIsDateOnly(dateString) {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
}

/**
 * Creates Date object from string or number. If passed param is instance of Date, then just returns it.
 * @param {number|string|Date} date
 * @return {Date | boolean}
 */
function createDate(date) {
  let resultDate = date;
  if (!(date instanceof Date)) {
    // If string is date-only string, we should add time to it
    // so created date will be in a local time
    // https://github.com/t1m0n/air-datepicker/issues/589
    if (typeof date === 'string' && dateStringIsDateOnly(date)) {
      date += 'T00:00:00';
    }
    resultDate = new Date(date);
  }
  if (isNaN(resultDate.getTime())) {
    console.log(`Unable to convert value "${date}" to Date object`);
    resultDate = false;
  }
  return resultDate;
}
function getWordBoundaryRegExp(sign) {
  let symbols = '\\s|\\.|-|/|\\\\|,|\\$|\\!|\\?|:|;';
  return new RegExp('(^|>|' + symbols + ')(' + sign + ')($|<|' + symbols + ')', 'g');
}
function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  return Math.floor(diff / 86400000);
}
function getWeek(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}
function getWeekYear(date) {
  const d = new Date(date);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  return d.getFullYear();
}
function getTimezoneOffset(date, colon = true) {
  const offset = -date.getTimezoneOffset();
  const sign = offset >= 0 ? '+' : '-';
  const abs = Math.abs(offset);
  const h = String(Math.floor(abs / 60)).padStart(2, '0');
  const m = String(abs % 60).padStart(2, '0');
  return colon ? `${sign}${h}:${m}` : `${sign}${h}${m}`;
}
function formatExpandedYear(year, len = 6) {
  const sign = year >= 0 ? '+' : '-';
  return sign + String(Math.abs(year)).padStart(len - 1, '0');
}
function addDays(date, days = 0) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
;
function dateDifference(date1, date2) {
  return Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / (1000 * 3600 * 24));
}
;
;// ./src/datepickerCell.js
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



class DatepickerCell {
  constructor({
    type,
    date: _date,
    dp,
    opts,
    body
  } = {}) {
    _defineProperty(this, "focus", () => {
      this.$cell.classList.add('-focus-');
      this.focused = true;
    });
    _defineProperty(this, "removeFocus", () => {
      this.$cell.classList.remove('-focus-');
      this.focused = false;
    });
    _defineProperty(this, "select", () => {
      this.$cell.classList.add('-selected-');
      this.selected = true;
    });
    _defineProperty(this, "removeSelect", () => {
      this.$cell.classList.remove('-selected-', '-range-from-', '-range-to-');
      this.selected = false;
    });
    _defineProperty(this, "onChangeSelectedDate", () => {
      if (this.isDisabled) return;
      this._handleSelectedStatus();
      if (this.dp.opts.range && this.type === consts.days) {
        this._handleRangeStatus();
      }
    });
    _defineProperty(this, "onChangeFocusDate", date => {
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
    });
    _defineProperty(this, "render", () => {
      this.$cell.innerHTML = this._getHtml();
      this._handleClasses();
      return this.$cell;
    });
    this.type = type;
    this.singleType = this.type.slice(0, -1); // days -> day etc.'`
    this.date = _date;
    this.dp = dp;
    this.opts = opts;
    this.body = body;
    this.customData = false;
    this.init();
  }
  init() {
    var _this$customData, _this$customData2;
    let {
      onRenderCell
    } = this.opts;
    if (onRenderCell) {
      this.customData = onRenderCell({
        date: this.date,
        cellType: this.singleType,
        datepicker: this.dp
      });
    }
    this._createElement();
    this._bindDatepickerEvents();
    if ((_this$customData = this.customData) !== null && _this$customData !== void 0 && _this$customData.disabled) {
      this.dp.disableDate(this.date);
    } else if (((_this$customData2 = this.customData) === null || _this$customData2 === void 0 ? void 0 : _this$customData2.disabled) === false) {
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
    var _this$customData3;
    let {
      year,
      month,
      fullMonth,
      date,
      fullDate
    } = getParsedDate(this.date);
    let extraAttrs = ((_this$customData3 = this.customData) === null || _this$customData3 === void 0 ? void 0 : _this$customData3.attrs) || {};
    this.$cell = createElement({
      attrs: {
        'data-year': year,
        'data-month': month,
        'data-date': date,
        'data-iso-date': `${year}-${fullMonth}-${fullDate}`,
        ...extraAttrs
      }
    });
    this.$cell.adpCell = this;
  }
  _getClassName() {
    var _this$customData4;
    let currentDate = new Date();
    let {
      selectOtherMonths,
      selectOtherYears
    } = this.opts;
    let {
      minDate,
      maxDate,
      isDateDisabled
    } = this.dp;
    let {
      day
    } = getParsedDate(this.date);
    let isOutOfMinMaxRange = this._isOutOfMinMaxRange();
    let isDisabled = isDateDisabled(this.date);
    let classNameCommon = classNames('air-datepicker-cell', `-${this.singleType}-`,
    // days -> day etc.'`
    {
      '-current-': isSameDate(currentDate, this.date, this.type),
      '-min-date-': minDate && isSameDate(minDate, this.date, this.type),
      '-max-date-': maxDate && isSameDate(maxDate, this.date, this.type)
    });
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
          '-disabled-': isOutOfMinMaxRange || this.isOtherDecade && !selectOtherYears
        });
        break;
    }
    return classNames(classNameCommon, classNameType, (_this$customData4 = this.customData) === null || _this$customData4 === void 0 ? void 0 : _this$customData4.classes).split(' ');
  }
  _getHtml() {
    var _this$customData5;
    let {
      year,
      month,
      date
    } = getParsedDate(this.date);
    let {
      showOtherMonths,
      showOtherYears
    } = this.opts;
    if ((_this$customData5 = this.customData) !== null && _this$customData5 !== void 0 && _this$customData5.html) {
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
    let {
      minDate,
      maxDate
    } = this.dp;
    let {
      type,
      date: cellDate
    } = this;
    let {
      month,
      year,
      date
    } = getParsedDate(cellDate);
    let isDay = type === consts.days;
    let isYear = type === consts.years;

    //Since in months cells date is set to the first day of month we should change it value to from min or max dates
    //to be able to mark cell as disabled correctly
    //Same goes to year cells
    let cellMinDate = minDate ? new Date(year, isYear ? minDate.getMonth() : month, isDay ? date : minDate.getDate()) : false;
    let cellMaxDate = maxDate ? new Date(year, isYear ? maxDate.getMonth() : month, isDay ? date : maxDate.getDate()) : false;
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
  _handleRangeStatus() {
    const {
      maxDays,
      minDays
    } = this.opts;
    const {
      selectedDates,
      focusDate,
      rangeDateFrom,
      rangeDateTo
    } = this.dp;
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
}
;// ./src/datepickerBody.js
function datepickerBody_defineProperty(e, r, t) { return (r = datepickerBody_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function datepickerBody_toPropertyKey(t) { var i = datepickerBody_toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function datepickerBody_toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




let templates = {
  [consts.days]: '' + '<div class="air-datepicker-body--day-names"></div>' + `<div class="air-datepicker-body--cells -${consts.days}-"></div>`,
  [consts.months]: `<div class="air-datepicker-body--cells -${consts.months}-"></div>`,
  [consts.years]: `<div class="air-datepicker-body--cells -${consts.years}-"></div>`
};
const cellClassName = '.air-datepicker-cell';
class DatepickerBody {
  constructor({
    dp,
    type,
    opts
  }) {
    datepickerBody_defineProperty(this, "handleClick", e => {
      let $cell = e.target.closest(cellClassName);
      let cell = $cell.adpCell;
      if (cell.isDisabled) return;
      if (!this.dp.isMinViewReached) {
        this.dp.down();
        return;
      }
      let date = this.dp.lastDateInRange ? this.dp.lastDateInRange : cell.date;
      let alreadySelectedDate = this.dp._checkIfDateIsSelected(date, cell.type);
      if (alreadySelectedDate) {
        this.dp._handleAlreadySelectedDates(alreadySelectedDate, date);
      } else {
        this.dp.selectDate(date);
      }
    });
    datepickerBody_defineProperty(this, "handleDayNameClick", e => {
      let index = e.target.getAttribute('data-day-index');
      this.opts.onClickDayName({
        dayIndex: Number(index),
        datepicker: this.dp
      });
    });
    datepickerBody_defineProperty(this, "onChangeCurrentView", view => {
      if (view !== this.type) {
        this.hide();
      } else {
        this.show();
        this.render();
      }
    });
    datepickerBody_defineProperty(this, "onMouseOverCell", e => {
      let $cell = closest(e.target, cellClassName);
      this.dp.setFocusDate($cell ? $cell.adpCell.date : false);
    });
    datepickerBody_defineProperty(this, "onMouseOutCell", () => {
      this.dp.setFocusDate(false);
    });
    datepickerBody_defineProperty(this, "onClickBody", e => {
      let {
        onClickDayName
      } = this.opts;
      let target = e.target;
      if (target.closest(cellClassName)) {
        this.handleClick(e);
      }
      if (onClickDayName && target.closest('.air-datepicker-body--day-name')) {
        this.handleDayNameClick(e);
      }
    });
    datepickerBody_defineProperty(this, "onMouseDown", e => {
      this.pressed = true;
      let $cell = closest(e.target, cellClassName),
        cell = $cell && $cell.adpCell;
      if (isSameDate(cell.date, this.dp.rangeDateFrom)) {
        this.rangeFromFocused = true;
      }
      if (isSameDate(cell.date, this.dp.rangeDateTo)) {
        this.rangeToFocused = true;
      }
    });
    datepickerBody_defineProperty(this, "onMouseMove", e => {
      if (!this.pressed || !this.dp.isMinViewReached) return;
      e.preventDefault();
      let $cell = closest(e.target, cellClassName),
        cell = $cell && $cell.adpCell,
        {
          selectedDates,
          rangeDateTo,
          rangeDateFrom
        } = this.dp;
      if (!cell || cell.isDisabled) return;
      let {
        date
      } = cell;

      // Allow user to change selected range
      if (selectedDates.length === 2) {
        // Add hours and minute to new selected date, to update time sliders properly
        if (this.rangeFromFocused && !isDateBigger(date, rangeDateTo)) {
          let {
            hours,
            minutes
          } = getParsedDate(rangeDateFrom);
          date.setHours(hours);
          date.setMinutes(minutes);
          this.dp.rangeDateFrom = date;
          this.dp.replaceDate(rangeDateFrom, date);
        }
        if (this.rangeToFocused && !isDateSmaller(date, rangeDateFrom)) {
          let {
            hours,
            minutes
          } = getParsedDate(rangeDateTo);
          date.setHours(hours);
          date.setMinutes(minutes);
          this.dp.rangeDateTo = date;
          this.dp.replaceDate(rangeDateTo, date);
        }
      }
    });
    datepickerBody_defineProperty(this, "onMouseUp", () => {
      this.pressed = false;
      this.rangeFromFocused = false;
      this.rangeToFocused = false;
    });
    datepickerBody_defineProperty(this, "onChangeViewDate", (date, oldViewDate) => {
      // Handle only visible views
      if (!this.isVisible) return;
      let decade1 = getDecade(date),
        decade2 = getDecade(oldViewDate);

      // Prevent unnecessary cell rendering when going up or down to next view
      switch (this.dp.currentView) {
        case consts.days:
          if (isSameDate(date, oldViewDate, consts.months)) {
            return;
          }
          break;
        case consts.months:
          if (isSameDate(date, oldViewDate, consts.years)) {
            return;
          }
          break;
        case consts.years:
          if (decade1[0] === decade2[0] && decade1[1] === decade2[1]) {
            return;
          }
          break;
      }
      this.render();
    });
    datepickerBody_defineProperty(this, "render", () => {
      this.destroyCells();
      this._generateCells();
      this.cells.forEach(c => {
        this.$cells.appendChild(c.render());
      });
    });
    this.dp = dp;
    this.type = type;
    this.opts = opts;
    this.cells = [];
    this.$el = '';
    this.pressed = false;
    this.isVisible = true;
    this.init();
  }
  init() {
    this._buildBaseHtml();
    if (this.type === consts.days) {
      this.renderDayNames();
    }
    this.render();
    this._bindEvents();
    this._bindDatepickerEvents();
  }
  _bindEvents() {
    let {
      range,
      dynamicRange
    } = this.opts;
    addEventListener(this.$el, 'mouseover', this.onMouseOverCell);
    addEventListener(this.$el, 'mouseout', this.onMouseOutCell);
    addEventListener(this.$el, 'click', this.onClickBody);
    if (range && dynamicRange) {
      addEventListener(this.$el, 'mousedown', this.onMouseDown);
      addEventListener(this.$el, 'mousemove', this.onMouseMove);
      addEventListener(window.document, 'mouseup', this.onMouseUp);
    }
  }
  _bindDatepickerEvents() {
    this.dp.on(consts.eventChangeViewDate, this.onChangeViewDate);
    this.dp.on(consts.eventChangeCurrentView, this.onChangeCurrentView);
  }
  _buildBaseHtml() {
    this.$el = createElement({
      className: `air-datepicker-body -${this.type}-`,
      innerHtml: templates[this.type]
    });
    this.$names = getEl('.air-datepicker-body--day-names', this.$el);
    this.$cells = getEl('.air-datepicker-body--cells', this.$el);
  }
  _getDayNamesHtml(firstDay = this.dp.locale.firstDay) {
    let html = '',
      isWeekend = this.dp.isWeekend,
      {
        onClickDayName
      } = this.opts,
      curDay = firstDay,
      totalDays = 7,
      i = 0;
    while (i < totalDays) {
      let day = curDay % totalDays;
      let className = classNames('air-datepicker-body--day-name', {
        [consts.cssClassWeekend]: isWeekend(day),
        '-clickable-': !!onClickDayName
      });
      let dayName = this.dp.locale.daysMin[day];
      html += `<div class="${className}" data-day-index='${day}'>${dayName}</div>`;
      i++;
      curDay++;
    }
    return html;
  }
  renderDayNames() {
    this.$names.innerHTML = this._getDayNamesHtml();
  }
  _generateCell(date) {
    let {
      type,
      dp,
      opts
    } = this;
    return new DatepickerCell({
      type,
      dp,
      opts,
      date,
      body: this
    });
  }
  _generateCells() {
    const getDates = DatepickerBody.getDatesFunction(this.type);
    getDates(this.dp, date => {
      this.cells.push(this._generateCell(date));
    });
  }
  show() {
    this.isVisible = true;
    this.$el.classList.remove('-hidden-');
  }
  hide() {
    this.isVisible = false;
    this.$el.classList.add('-hidden-');
  }
  destroyCells() {
    this.cells.forEach(c => c.destroy());
    this.cells = [];
    this.$cells.innerHTML = '';
  }
  destroy() {
    this.destroyCells();
    this.dp.off(consts.eventChangeViewDate, this.onChangeViewDate);
    this.dp.off(consts.eventChangeCurrentView, this.onChangeCurrentView);
  }
  static getDaysDates(dp, cb) {
    let {
        viewDate,
        opts: {
          fixedHeight
        },
        locale: {
          firstDay
        }
      } = dp,
      totalMonthDays = getDaysCount(viewDate),
      {
        year,
        month
      } = getParsedDate(viewDate),
      firstMonthDay = new Date(year, month, 1),
      lastMonthDay = new Date(year, month, totalMonthDays),
      daysFromPrevMonth = firstMonthDay.getDay() - firstDay,
      daysFromNextMonth = 6 - lastMonthDay.getDay() + firstDay;
    daysFromPrevMonth = daysFromPrevMonth < 0 ? daysFromPrevMonth + 7 : daysFromPrevMonth;
    daysFromNextMonth = daysFromNextMonth > 6 ? daysFromNextMonth - 7 : daysFromNextMonth;
    let firstRenderDate = subDays(firstMonthDay, daysFromPrevMonth),
      totalRenderDays = totalMonthDays + daysFromPrevMonth + daysFromNextMonth,
      firstRenderDayDate = firstRenderDate.getDate(),
      {
        year: renderYear,
        month: renderMonth
      } = getParsedDate(firstRenderDate),
      i = 0;
    if (fixedHeight) {
      totalRenderDays = 42 - daysFromPrevMonth;
    }
    const dates = [];
    while (i < totalRenderDays) {
      let date = new Date(renderYear, renderMonth, firstRenderDayDate + i);
      if (cb) {
        cb(date);
      }
      dates.push(date);
      i++;
    }
    return dates;
  }
  static getMonthsDates(dp, cb) {
    let totalMonths = 12,
      {
        year
      } = dp.parsedViewDate,
      currentMonth = 0,
      dates = [];
    while (currentMonth < totalMonths) {
      const date = new Date(year, currentMonth);
      dates.push(date);
      if (cb) {
        cb(date);
      }
      currentMonth++;
    }
    return dates;
  }
  static getYearsDates(dp, cb) {
    let decade = getDecade(dp.viewDate),
      firstYear = decade[0] - 1,
      lastYear = decade[1] + 1,
      year = firstYear,
      dates = [];
    while (year <= lastYear) {
      const date = new Date(year, 0);
      dates.push(date);
      if (cb) {
        cb(date);
      }
      year++;
    }
    return dates;
  }
  static getDatesFunction(viewType = consts.days) {
    return {
      [consts.days]: DatepickerBody.getDaysDates,
      [consts.months]: DatepickerBody.getMonthsDates,
      [consts.years]: DatepickerBody.getYearsDates
    }[viewType];
  }
}
;// ./src/datepickerNav.js
function datepickerNav_defineProperty(e, r, t) { return (r = datepickerNav_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function datepickerNav_toPropertyKey(t) { var i = datepickerNav_toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function datepickerNav_toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



class DatepickerNav {
  constructor({
    dp,
    opts
  }) {
    datepickerNav_defineProperty(this, "onClickNav", e => {
      let $item = closest(e.target, '.air-datepicker-nav--action');
      if (!$item) return;
      let actionName = $item.dataset.action;
      this.dp[actionName]();
    });
    datepickerNav_defineProperty(this, "onChangeViewDate", () => {
      this.render();
      this._resetNavStatus();
      this.handleNavStatus();
    });
    datepickerNav_defineProperty(this, "onChangeCurrentView", () => {
      this.render();
      this._resetNavStatus();
      this.handleNavStatus();
    });
    datepickerNav_defineProperty(this, "onClickNavTitle", () => {
      if (this.dp.isFinalView) return;
      this.dp.up();
    });
    datepickerNav_defineProperty(this, "update", () => {
      let {
        prevHtml,
        nextHtml
      } = this.opts;
      this.$prev.innerHTML = prevHtml;
      this.$next.innerHTML = nextHtml;
      this._resetNavStatus();
      this.render();
      this.handleNavStatus();
    });
    datepickerNav_defineProperty(this, "renderDelay", () => {
      setTimeout(this.render);
    });
    datepickerNav_defineProperty(this, "render", () => {
      this.$title.innerHTML = this._getTitle();
      toggleClass(this.$title, {
        '-disabled-': this.dp.isFinalView
      });
    });
    this.dp = dp;
    this.opts = opts;
    this.init();
  }
  init() {
    this._createElement();
    this._buildBaseHtml();
    this._defineDOM();
    this.render();
    this.handleNavStatus();
    this._bindEvents();
    this._bindDatepickerEvents();
  }
  _defineDOM() {
    this.$title = getEl('.air-datepicker-nav--title', this.$el);
    this.$prev = getEl('[data-action="prev"]', this.$el);
    this.$next = getEl('[data-action="next"]', this.$el);
  }
  _bindEvents() {
    this.$el.addEventListener('click', this.onClickNav);
    this.$title.addEventListener('click', this.onClickNavTitle);
  }
  _bindDatepickerEvents() {
    this.dp.on(consts.eventChangeViewDate, this.onChangeViewDate);
    this.dp.on(consts.eventChangeCurrentView, this.onChangeCurrentView);
    if (this.isNavIsFunction) {
      // Wait till time is added to date
      this.dp.on(consts.eventChangeSelectedDate, this.renderDelay);
      if (this.dp.opts.timepicker) {
        this.dp.on(consts.eventChangeTime, this.render);
      }
    }
  }
  destroy() {
    this.dp.off(consts.eventChangeViewDate, this.onChangeViewDate);
    this.dp.off(consts.eventChangeCurrentView, this.onChangeCurrentView);
    if (this.isNavIsFunction) {
      this.dp.off(consts.eventChangeSelectedDate, this.renderDelay);
      if (this.dp.opts.timepicker) {
        this.dp.off(consts.eventChangeTime, this.render);
      }
    }
  }
  _createElement() {
    this.$el = createElement({
      tagName: 'nav',
      className: 'air-datepicker-nav'
    });
  }
  _getTitle() {
    let {
      dp,
      opts
    } = this;
    let template = opts.navTitles[dp.currentView];
    if (typeof template === 'function') {
      return template(dp);
    }
    return dp.formatDate(dp.viewDate, template);
  }
  handleNavStatus() {
    let {
      disableNavWhenOutOfRange
    } = this.opts;
    let {
      minDate,
      maxDate
    } = this.dp;
    if (!(minDate || maxDate) || !disableNavWhenOutOfRange) return;
    let {
      year,
      month
    } = this.dp.parsedViewDate;
    let minDateParsed = minDate ? getParsedDate(minDate) : false;
    let maxDateParsed = maxDate ? getParsedDate(maxDate) : false;
    switch (this.dp.currentView) {
      case consts.days:
        if (minDate && minDateParsed.month >= month && minDateParsed.year >= year) {
          this._disableNav('prev');
        }
        if (maxDate && maxDateParsed.month <= month && maxDateParsed.year <= year) {
          this._disableNav('next');
        }
        break;
      case consts.months:
        if (minDate && minDateParsed.year >= year) {
          this._disableNav('prev');
        }
        if (maxDate && maxDateParsed.year <= year) {
          this._disableNav('next');
        }
        break;
      case consts.years:
        {
          let decade = getDecade(this.dp.viewDate);
          if (minDate && minDateParsed.year >= decade[0]) {
            this._disableNav('prev');
          }
          if (maxDate && maxDateParsed.year <= decade[1]) {
            this._disableNav('next');
          }
          break;
        }
    }
  }
  _disableNav(actionName) {
    getEl('[data-action="' + actionName + '"]', this.$el).classList.add('-disabled-');
  }
  _resetNavStatus() {
    removeClass(this.$el.querySelectorAll('.air-datepicker-nav--action'), '-disabled-');
  }
  _buildBaseHtml() {
    let {
      prevHtml,
      nextHtml
    } = this.opts;
    this.$el.innerHTML = '' + `<div class="air-datepicker-nav--action" data-action="prev">${prevHtml}</div>` + '<div class="air-datepicker-nav--title"></div>' + `<div class="air-datepicker-nav--action" data-action="next">${nextHtml}</div>`;
  }
  get isNavIsFunction() {
    let {
      navTitles
    } = this.opts;
    return Object.keys(navTitles).find(view => {
      return typeof navTitles[view] === 'function';
    });
  }
}
;// ./src/buttonPresets.js
/* harmony default export */ var buttonPresets = ({
  today: {
    content: dp => dp.locale.today,
    onClick: dp => dp.setViewDate(new Date())
  },
  clear: {
    content: dp => dp.locale.clear,
    onClick: dp => dp.clear()
  }
});
;// ./src/datepickerButtons.js



class DatepickerButtons {
  constructor({
    dp,
    opts
  }) {
    this.dp = dp;
    this.opts = opts;
    this.init();
  }
  init() {
    this.createElement();
    this.render();
  }
  createElement() {
    this.$el = createElement({
      className: 'air-datepicker-buttons'
    });
  }
  destroy() {
    this.$el.parentNode.removeChild(this.$el);
  }
  clearHtml() {
    this.$el.innerHTML = '';
    return this;
  }
  generateButtons() {
    let {
      buttons
    } = this.opts;
    if (!Array.isArray(buttons)) {
      buttons = [buttons];
    }
    buttons.forEach(b => {
      let data = b;
      if (typeof b === 'string' && buttonPresets[b]) {
        data = buttonPresets[b];
      }
      let button = this.createButton(data);
      if (data.onClick) {
        this.attachEventToButton(button, data.onClick);
      }
      this.$el.appendChild(button);
    });
  }
  attachEventToButton(button, onClick) {
    button.addEventListener('click', () => {
      onClick(this.dp);
    });
  }

  /**
   * Creates datepicker button HTML element
   * @param {String|Function} content - button content
   * @param {String} [className]
   * @param {String} [tagName=button]
   * @param {Object} [attrs]
   * @return HTMLElement
   */
  createButton({
    content,
    className,
    tagName = 'button',
    attrs = {}
  }) {
    let _content = typeof content === 'function' ? content(this.dp) : content;
    return createElement({
      tagName,
      innerHtml: `<span tabindex='-1'>${_content}</span>`,
      className: classNames('air-datepicker-button', className),
      attrs
    });
  }
  render() {
    this.generateButtons();
  }
}
;// ./src/datepickerTime.js
function datepickerTime_defineProperty(e, r, t) { return (r = datepickerTime_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function datepickerTime_toPropertyKey(t) { var i = datepickerTime_toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function datepickerTime_toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




/**
 * Timepicker
 *
 * How does it work:
 * Timepicker has its own hour and minute values. At the start they will be equal to current time, or to min/max date values.
 * When user selects date, timepicker add its values to the date (when consts.eventChangeSelectedDate is triggered).
 * When lastSelectedDate is changed (e.g. when user clicks on already selected date in multiple dates mode or in range mode)
 * then hour and minute values are taken from this date and stored in a timepicker instance.
 *
 */
class DatepickerTime {
  constructor({
    opts,
    dp
  } = {}) {
    datepickerTime_defineProperty(this, "toggleTimepickerIsActive", value => {
      this.dp.timepickerIsActive = value;
    });
    datepickerTime_defineProperty(this, "onChangeSelectedDate", ({
      date,
      updateTime = false
    }) => {
      if (!date) return;

      // Check if date is minDate or maxDate and set timepicker's time to corresponding values
      this.setMinMaxTime(date);
      this.setCurrentTime(updateTime ? date : false);
      this.addTimeToDate(date);
    });
    datepickerTime_defineProperty(this, "onChangeLastSelectedDate", date => {
      if (!date) return;
      this.setTime(date);
      this.render();
    });
    datepickerTime_defineProperty(this, "onChangeInputRange", e => {
      let $target = e.target,
        name = $target.getAttribute('name');
      this[name] = $target.value;
      this.updateText();
      this.dp.trigger(consts.eventChangeTime, {
        hours: this.hours,
        minutes: this.minutes
      });
    });
    datepickerTime_defineProperty(this, "onMouseEnterLeave", e => {
      let name = e.target.getAttribute('name'),
        $el = this.$minutesText;
      if (name === 'hours') {
        $el = this.$hoursText;
      }
      $el.classList.toggle('-focus-');
    });
    datepickerTime_defineProperty(this, "onFocus", () => {
      this.toggleTimepickerIsActive(true);
    });
    datepickerTime_defineProperty(this, "onBlur", () => {
      this.toggleTimepickerIsActive(false);
    });
    this.opts = opts;
    this.dp = dp;
    let {
      timeFormat
    } = this.dp.locale;
    if (timeFormat && (timeFormat.match(getWordBoundaryRegExp('h')) || timeFormat.match(getWordBoundaryRegExp('hh')))) {
      this.ampm = true;
    }
    this.init();
  }
  init() {
    this.setTime(this.dp.lastSelectedDate || this.dp.viewDate);
    this.createElement();
    this.buildHtml();
    this.defineDOM();
    this.render();
    this.bindDatepickerEvents();
    this.bindDOMEvents();
  }
  bindDatepickerEvents() {
    this.dp.on(consts.eventChangeSelectedDate, this.onChangeSelectedDate);
    this.dp.on(consts.eventChangeLastSelectedDate, this.onChangeLastSelectedDate);
  }
  bindDOMEvents() {
    let changeEvent = 'input';
    if (navigator.userAgent.match(/trident/gi)) {
      changeEvent = 'change';
    }
    addEventListener(this.$ranges, changeEvent, this.onChangeInputRange);
    addEventListener(this.$ranges, 'mouseenter', this.onMouseEnterLeave);
    addEventListener(this.$ranges, 'mouseleave', this.onMouseEnterLeave);
    addEventListener(this.$ranges, 'focus', this.onFocus);
    addEventListener(this.$ranges, 'mousedown', this.onFocus);
    addEventListener(this.$ranges, 'blur', this.onBlur);
  }
  createElement() {
    this.$el = createElement({
      className: classNames('air-datepicker-time', {
        '-am-pm-': this.dp.ampm
      })
    });
  }
  destroy() {
    this.dp.off(consts.eventChangeSelectedDate, this.onChangeSelectedDate);
    this.dp.off(consts.eventChangeLastSelectedDate, this.onChangeLastSelectedDate);
    this.$el.parentNode.removeChild(this.$el);
  }
  buildHtml() {
    let {
      ampm,
      hours,
      displayHours,
      minutes,
      minHours,
      minMinutes,
      maxHours,
      maxMinutes,
      dayPeriod,
      opts: {
        hoursStep,
        minutesStep
      }
    } = this;
    this.$el.innerHTML = '' + '<div class="air-datepicker-time--current">' + `   <span class="air-datepicker-time--current-hours">${getLeadingZeroNum(displayHours)}</span>` + '   <span class="air-datepicker-time--current-colon">:</span>' + `   <span class="air-datepicker-time--current-minutes">${getLeadingZeroNum(minutes)}</span>` + `   ${ampm ? `<span class='air-datepicker-time--current-ampm'>${dayPeriod}</span>` : ''}` + '</div>' + '<div class="air-datepicker-time--sliders">' + '   <div class="air-datepicker-time--row">' +
    // eslint-disable-next-line max-len
    `      <input type="range" name="hours" value="${hours}" min="${minHours}" max="${maxHours}" step="${hoursStep}"/>` + '   </div>' + '   <div class="air-datepicker-time--row">' +
    // eslint-disable-next-line max-len
    `      <input type="range" name="minutes" value="${minutes}" min="${minMinutes}" max="${maxMinutes}" step="${minutesStep}"/>` + '   </div>' + '</div>';
  }
  defineDOM() {
    let getElWithContext = selector => getEl(selector, this.$el);
    this.$ranges = this.$el.querySelectorAll('[type="range"]');
    this.$hours = getElWithContext('[name="hours"]');
    this.$minutes = getElWithContext('[name="minutes"]');
    this.$hoursText = getElWithContext('.air-datepicker-time--current-hours');
    this.$minutesText = getElWithContext('.air-datepicker-time--current-minutes');
    this.$ampm = getElWithContext('.air-datepicker-time--current-ampm');
  }
  setTime(date) {
    this.setMinMaxTime(date);
    this.setCurrentTime(date);
  }
  addTimeToDate(date) {
    if (!date) return;
    date.setHours(this.hours);
    date.setMinutes(this.minutes);
  }
  setMinMaxTime(date) {
    this.setMinMaxTimeFromOptions();
    if (date) {
      let {
        minDate,
        maxDate
      } = this.dp;
      if (minDate && isSameDate(date, minDate)) {
        this.setMinTimeFromMinDate(minDate);
      }
      if (maxDate && isSameDate(date, maxDate)) {
        this.setMaxTimeFromMaxDate(maxDate);
      }
    }
  }
  setCurrentTime(date) {
    let {
      hours,
      minutes
    } = date ? getParsedDate(date) : this;
    this.hours = clamp(hours, this.minHours, this.maxHours);
    this.minutes = clamp(minutes, this.minMinutes, this.maxMinutes);
  }
  setMinMaxTimeFromOptions() {
    let maxHoursPossible = 23,
      maxMinutesPossible = 59,
      {
        minHours,
        minMinutes,
        maxHours,
        maxMinutes
      } = this.opts;
    this.minHours = clamp(minHours, 0, maxHoursPossible);
    this.minMinutes = clamp(minMinutes, 0, maxMinutesPossible);
    this.maxHours = clamp(maxHours, 0, maxHoursPossible);
    this.maxMinutes = clamp(maxMinutes, 0, maxMinutesPossible);
  }
  setMinTimeFromMinDate(date) {
    let {
      lastSelectedDate
    } = this.dp;
    this.minHours = date.getHours();
    if (lastSelectedDate && lastSelectedDate.getHours() > date.getHours()) {
      this.minMinutes = this.opts.minMinutes;
    } else {
      this.minMinutes = date.getMinutes();
    }
  }
  setMaxTimeFromMaxDate(date) {
    let {
      lastSelectedDate
    } = this.dp;
    this.maxHours = date.getHours();
    if (lastSelectedDate && lastSelectedDate.getHours() < date.getHours()) {
      this.maxMinutes = this.opts.maxMinutes;
    } else {
      this.maxMinutes = date.getMinutes();
    }
  }
  updateSliders() {
    setAttribute(this.$hours, {
      min: this.minHours,
      max: this.maxHours
    }).value = this.hours;
    setAttribute(this.$minutes, {
      min: this.minMinutes,
      max: this.maxMinutes
    }).value = this.minutes;
  }
  updateText() {
    this.$hoursText.innerHTML = getLeadingZeroNum(this.displayHours);
    this.$minutesText.innerHTML = getLeadingZeroNum(this.minutes);
    if (this.ampm) {
      this.$ampm.innerHTML = this.dayPeriod;
    }
  }
  set hours(val) {
    this._hours = val;
    let {
      hours,
      dayPeriod
    } = getDayPeriodFromHours24(val);
    this.displayHours = this.ampm ? hours : val;
    this.dayPeriod = dayPeriod;
  }
  get hours() {
    return this._hours;
  }
  render() {
    this.updateSliders();
    this.updateText();
  }
}
;// ./src/datepickerKeyboard.js
function datepickerKeyboard_defineProperty(e, r, t) { return (r = datepickerKeyboard_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function datepickerKeyboard_toPropertyKey(t) { var i = datepickerKeyboard_toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function datepickerKeyboard_toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }


class DatepickerKeyboard {
  constructor({
    dp: _dp,
    opts: _opts
  }) {
    datepickerKeyboard_defineProperty(this, "pressedKeys", new Set());
    datepickerKeyboard_defineProperty(this, "hotKeys", new Map([[[['Control', 'ArrowRight'], ['Control', 'ArrowUp']], dateParts => dateParts.month++], [[['Control', 'ArrowLeft'], ['Control', 'ArrowDown']], dateParts => dateParts.month--], [[['Shift', 'ArrowRight'], ['Shift', 'ArrowUp']], dateParts => dateParts.year++], [[['Shift', 'ArrowLeft'], ['Shift', 'ArrowDown']], dateParts => dateParts.year--], [[['Alt', 'ArrowRight'], ['Alt', 'ArrowUp']], dateParts => dateParts.year += 10], [[['Alt', 'ArrowLeft'], ['Alt', 'ArrowDown']], dateParts => dateParts.year -= 10], [['Control', 'Shift', 'ArrowUp'], (dateParts, dp) => dp.up()]]));
    datepickerKeyboard_defineProperty(this, "handleHotKey", combination => {
      let fn = this.hotKeys.get(combination),
        dateParts = getParsedDate(this.getInitialFocusDate());
      fn(dateParts, this.dp);
      let {
        year,
        month,
        date
      } = dateParts;
      let totalDaysInNextMonth = getDaysCount(new Date(year, month));
      if (totalDaysInNextMonth < date) {
        date = totalDaysInNextMonth;
      }
      let newFocusedDate = this.dp.getClampedDate(new Date(year, month, date));
      this.dp.setFocusDate(newFocusedDate, {
        viewDateTransition: true
      });
    });
    /**
     * Checks if one of hot key is pressed. If so, then returns array of matched combinations
      * @return {boolean | Array}
     */
    datepickerKeyboard_defineProperty(this, "isHotKeyPressed", () => {
      let hotKeyIsPressed = false;
      let pressedKeysLength = this.pressedKeys.size;
      let isAllKeysArePressed = key => this.pressedKeys.has(key);
      for (let [combinations] of this.hotKeys) {
        if (hotKeyIsPressed) break;
        if (Array.isArray(combinations[0])) {
          combinations.forEach(combination => {
            if (hotKeyIsPressed || pressedKeysLength !== combination.length) return;
            hotKeyIsPressed = combination.every(isAllKeysArePressed) && combinations;
          });
        } else {
          if (pressedKeysLength !== combinations.length) continue;
          hotKeyIsPressed = combinations.every(isAllKeysArePressed) && combinations;
        }
      }
      return hotKeyIsPressed;
    });
    datepickerKeyboard_defineProperty(this, "isArrow", keyCode => {
      return keyCode >= 37 && keyCode <= 40;
    });
    datepickerKeyboard_defineProperty(this, "onKeyDown", e => {
      if (!this.dp.visible && !this.dp.treatAsInline) return;
      let {
        key,
        which
      } = e;
      let {
        dp,
        dp: {
          focusDate
        },
        opts
      } = this;
      this.registerKey(key);
      let pressedHotKey = this.isHotKeyPressed();
      if (pressedHotKey) {
        e.preventDefault();
        this.handleHotKey(pressedHotKey);
        return;
      }
      if (this.isArrow(which)) {
        e.preventDefault();
        this.focusNextCell(key);
        return;
      }
      if (key === 'Enter') {
        if (dp.currentView !== opts.minView) {
          dp.down();
          return;
        }
        if (focusDate) {
          let alreadySelectedDate = dp._checkIfDateIsSelected(focusDate);
          if (!alreadySelectedDate) {
            dp.selectDate(focusDate);
          } else {
            dp._handleAlreadySelectedDates(alreadySelectedDate, focusDate);
          }
          return;
        }
      }
      if (key === 'Escape') {
        this.dp.hide();
      }
    });
    datepickerKeyboard_defineProperty(this, "onKeyUp", e => {
      this.removeKey(e.key);
    });
    this.dp = _dp;
    this.opts = _opts;
    this.init();
  }
  init() {
    this.bindKeyboardEvents();
  }
  bindKeyboardEvents() {
    let {
      $el
    } = this.dp;
    $el.addEventListener('keydown', this.onKeyDown);
    $el.addEventListener('keyup', this.onKeyUp);
  }
  destroy() {
    let {
      $el
    } = this.dp;
    $el.removeEventListener('keydown', this.onKeyDown);
    $el.removeEventListener('keyup', this.onKeyUp);
    this.hotKeys = null;
    this.pressedKeys = null;
  }
  getInitialFocusDate() {
    let {
      focusDate,
      currentView,
      selectedDates,
      parsedViewDate: {
        year,
        month
      }
    } = this.dp;
    let potentialFocused = focusDate || selectedDates[selectedDates.length - 1];
    if (!potentialFocused) {
      switch (currentView) {
        case consts.days:
          potentialFocused = new Date(year, month, new Date().getDate());
          break;
        case consts.months:
          potentialFocused = new Date(year, month, 1);
          break;
        case consts.years:
          potentialFocused = new Date(year, 0, 1);
          break;
      }
    }
    return potentialFocused;
  }
  focusNextCell(keyName) {
    let initialFocusDate = this.getInitialFocusDate(),
      {
        currentView
      } = this.dp,
      {
        days,
        months,
        years
      } = consts,
      parsedFocusDate = getParsedDate(initialFocusDate),
      y = parsedFocusDate.year,
      m = parsedFocusDate.month,
      d = parsedFocusDate.date;
    switch (keyName) {
      case 'ArrowLeft':
        currentView === days ? d -= 1 : '';
        currentView === months ? m -= 1 : '';
        currentView === years ? y -= 1 : '';
        break;
      case 'ArrowUp':
        currentView === days ? d -= 7 : '';
        currentView === months ? m -= 3 : '';
        currentView === years ? y -= 4 : '';
        break;
      case 'ArrowRight':
        currentView === days ? d += 1 : '';
        currentView === months ? m += 1 : '';
        currentView === years ? y += 1 : '';
        break;
      case 'ArrowDown':
        currentView === days ? d += 7 : '';
        currentView === months ? m += 3 : '';
        currentView === years ? y += 4 : '';
        break;
    }
    let newFocusedDate = this.dp.getClampedDate(new Date(y, m, d));
    this.dp.setFocusDate(newFocusedDate, {
      viewDateTransition: true
    });
  }
  registerKey(keyName) {
    this.pressedKeys.add(keyName);
  }
  removeKey(keyName) {
    this.pressedKeys.delete(keyName);
  }
}
;// ./src/withEvents.js
let events = {
  on(eventName, handler) {
    if (!this.__events) {
      this.__events = {};
    }
    if (!this.__events[eventName]) {
      this.__events[eventName] = [handler];
    } else {
      this.__events[eventName].push(handler);
    }
  },
  off(eventName, handler) {
    if (!this.__events) return;
    if (!this.__events[eventName]) return;
    this.__events[eventName] = this.__events[eventName].filter(h => h !== handler);
  },
  removeAllEvents() {
    this.__events = {};
  },
  trigger(eventName, ...args) {
    if (!this.__events) return;
    if (!this.__events[eventName]) return;
    this.__events[eventName].forEach(handler => {
      handler(...args);
    });
  }
};
/* harmony default export */ function withEvents(target) {
  Object.assign(target, events);
}
;// ./src/datepicker.js
function datepicker_defineProperty(e, r, t) { return (r = datepicker_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function datepicker_toPropertyKey(t) { var i = datepicker_toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function datepicker_toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }











let $datepickersContainer = '',
  $datepickerOverlay = '',
  containerBuilt = false,
  baseTemplate = '' + '<i class="air-datepicker--pointer"></i>' + '<div class="air-datepicker--navigation"></div>' + '<div class="air-datepicker--content"></div>';
class Datepicker {
  static buildGlobalContainer(id) {
    containerBuilt = true;
    $datepickersContainer = createElement({
      className: id,
      id
    });
    getEl('body').appendChild($datepickersContainer);
  }
  constructor(el, _opts) {
    datepicker_defineProperty(this, "viewIndexes", [consts.days, consts.months, consts.years]);
    /**
     * Changes month, year, decade to next period
     */
    datepicker_defineProperty(this, "next", () => {
      let {
        year,
        month
      } = this.parsedViewDate;
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
    });
    /**
     * Changes month, year, decade to prev period
     */
    datepicker_defineProperty(this, "prev", () => {
      let {
        year,
        month
      } = this.parsedViewDate;
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
    });
    datepicker_defineProperty(this, "_finishHide", () => {
      this.hideAnimation = false;
      this._destroyComponents();
      this.$container.removeChild(this.$datepicker);
    });
    datepicker_defineProperty(this, "setPosition", (position, isViewChange = false) => {
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
      let {
        isMobile
      } = this.opts;
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
    });
    datepicker_defineProperty(this, "_setInputValue", () => {
      let {
          opts,
          $altField,
          locale: {
            dateFormat
          }
        } = this,
        {
          altFieldDateFormat,
          altField
        } = opts;
      if (altField && $altField) {
        $altField.value = this._getInputValue(altFieldDateFormat);
      }
      this.$el.value = this._getInputValue(dateFormat);
      this.$el.dispatchEvent(new Event('change'));
    });
    datepicker_defineProperty(this, "_getInputValue", dateFormat => {
      let {
          selectedDates,
          opts
        } = this,
        {
          multipleDates,
          multipleDatesSeparator
        } = opts;
      if (!selectedDates.length) return '';
      let formatIsFunction = typeof dateFormat === 'function';
      let value = formatIsFunction ? dateFormat(multipleDates ? selectedDates : selectedDates[0]) : selectedDates.map(date => {
        return this.formatDate(date, dateFormat);
      });
      value = formatIsFunction ? value : value.join(multipleDatesSeparator);
      return value;
    });
    /**
     * Checks if date is already selected, returns selected date if finds one
     * Returns selected date, need for timepicker
     * @param {Date} date
     * @param {String} cellType - days, months, years
     * @return {boolean|Date}
     * @private
     */
    datepicker_defineProperty(this, "_checkIfDateIsSelected", (date, cellType = consts.days) => {
      let alreadySelectedDate = false;
      this.selectedDates.some(selectedDate => {
        let same = isSameDate(date, selectedDate, cellType);
        alreadySelectedDate = same && selectedDate;
        return same;
      });
      return alreadySelectedDate;
    });
    datepicker_defineProperty(this, "_scheduleCallAfterTransition", cb => {
      this._cancelScheduledCall();
      cb && cb(false);
      this._onTransitionEnd = () => {
        cb && cb(true);
      };
      this.$datepicker.addEventListener('transitionend', this._onTransitionEnd, {
        once: true
      });
    });
    datepicker_defineProperty(this, "_cancelScheduledCall", () => {
      this.$datepicker.removeEventListener('transitionend', this._onTransitionEnd);
    });
    /**
     * Sets new view date of datepicker
     * @param {DateLike} date
     */
    datepicker_defineProperty(this, "setViewDate", date => {
      date = createDate(date);
      if (!(date instanceof Date)) return;
      if (isSameDate(date, this.viewDate)) return;
      let oldViewDate = this.viewDate;
      this.viewDate = date;
      let {
        onChangeViewDate
      } = this.opts;
      if (onChangeViewDate) {
        let {
          month,
          year
        } = this.parsedViewDate;
        onChangeViewDate({
          month,
          year,
          decade: this.curDecade
        });
      }
      this.trigger(consts.eventChangeViewDate, date, oldViewDate);
    });
    /**
     * Sets new focusDate
     * @param {Date} date
     * @param {Object} [params]
     * @param {Boolean} params.viewDateTransition
     */
    datepicker_defineProperty(this, "setFocusDate", (date, params = {}) => {
      if (date) {
        date = createDate(date);
        if (!(date instanceof Date)) return;
      }
      this.focusDate = date;
      this.trigger(consts.eventChangeFocusDate, date, params);
    });
    /**
     * Sets new datepicker view
     * @param {ViewType} view
     * @param [params]
     * @param [params.silent] {boolean}
     */
    datepicker_defineProperty(this, "setCurrentView", (view, params = {}) => {
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
    });
    /**
     * Updates lastSelectedDate param and triggers corresponding event
     * @param {Date|Boolean} date - date or empty
     */
    datepicker_defineProperty(this, "_updateLastSelectedDate", date => {
      this.lastSelectedDate = date;
      this.trigger(consts.eventChangeLastSelectedDate, date);
    });
    datepicker_defineProperty(this, "destroy", () => {
      if (this.isDestroyed) return;
      let {
        showEvent,
        isMobile
      } = this.opts;
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
    });
    /**
     * Updates datepicker state
     * @param newOpts
     * @param [params]
     * @param [params.silent] {boolean} - if true then callbacks won't be triggered
     */
    datepicker_defineProperty(this, "update", (newOpts = {}, params = {}) => {
      let prevOpts = deepMerge({}, this.opts);
      let {
        silent
      } = params;
      deepMerge(this.opts, newOpts);
      let {
        timepicker,
        buttons,
        range,
        selectedDates,
        isMobile
      } = this.opts;
      let shouldUpdateDOM = this.visible || this.treatAsInline;
      this._createMinMaxDates();
      this._limitViewDateByMaxMinDates();
      this._handleLocale();
      if (selectedDates) {
        this.selectedDates = [];
        this.selectDate(selectedDates, {
          silent
        });
      }
      if (newOpts.view) {
        this.setCurrentView(newOpts.view, {
          silent
        });
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
    });
    /**
     * Disables dates
     * @param dates {DateLike | Array<DateLike>} - dates to disable
     * @param [_enable] {Boolean} - for internal use, if true, then instead of disabling date its enabling it
     */
    datepicker_defineProperty(this, "disableDate", (dates, _enable) => {
      let datesToHandle = Array.isArray(dates) ? dates : [dates];
      datesToHandle.forEach(date => {
        let trueDate = createDate(date);
        if (!trueDate) return;
        let method = _enable ? 'delete' : 'add';
        this.disabledDates[method](this.formatDate(trueDate, 'yyyy-MM-dd'));
        let cell = this.getCell(trueDate, this.currentViewSingular);
        if (!cell) return;
        cell.adpCell.render();
      }, []);
    });
    /**
     * Enable disabled dates
     * @param dates {DateLike | Array<DateLike>} - dates to enable
     */
    datepicker_defineProperty(this, "enableDate", dates => {
      this.disableDate(dates, true);
    });
    /**
     * Checks if date is disabled
     * @param date {DateLike}
     */
    datepicker_defineProperty(this, "isDateDisabled", date => {
      let trueDate = createDate(date);
      return this.disabledDates.has(this.formatDate(trueDate, 'yyyy-MM-dd'));
    });
    //  Utils
    // -------------------------------------------------
    datepicker_defineProperty(this, "isOtherMonth", date => {
      let {
        month
      } = getParsedDate(date);
      return month !== this.parsedViewDate.month;
    });
    datepicker_defineProperty(this, "isOtherYear", date => {
      let {
        year
      } = getParsedDate(date);
      return year !== this.parsedViewDate.year;
    });
    datepicker_defineProperty(this, "isOtherDecade", date => {
      let {
        year
      } = getParsedDate(date);
      let [firstDecadeYear, lastDecadeYear] = getDecade(this.viewDate);
      return year < firstDecadeYear || year > lastDecadeYear;
    });
    //  Subscription events
    // -------------------------------------------------
    datepicker_defineProperty(this, "_onChangeSelectedDate", ({
      silent
    }) => {
      // Use timeout here for wait for all changes that could be made to selected date (e.g. timepicker adds time)
      setTimeout(() => {
        this._setInputValue();
        if (this.opts.onSelect && !silent) {
          this._triggerOnSelect();
        }
      });
    });
    datepicker_defineProperty(this, "_onChangeFocusedDate", (date, {
      viewDateTransition
    } = {}) => {
      if (!date) return;
      let shouldPerformTransition = false;
      if (viewDateTransition) {
        shouldPerformTransition = this.isOtherMonth(date) || this.isOtherYear(date) || this.isOtherDecade(date);
      }
      if (shouldPerformTransition) {
        this.setViewDate(date);
      }
      if (this.opts.onFocus) {
        this.opts.onFocus({
          datepicker: this,
          date
        });
      }
    });
    datepicker_defineProperty(this, "_onChangeTime", ({
      hours,
      minutes
    }) => {
      let today = new Date();
      let {
        lastSelectedDate,
        opts: {
          onSelect
        }
      } = this;
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
    });
    datepicker_defineProperty(this, "_onFocus", e => {
      if (!this.visible) {
        this.show();
      }
    });
    datepicker_defineProperty(this, "_onBlur", e => {
      if (!this.inFocus && this.visible && !this.opts.isMobile) {
        this.hide();
      }
    });
    datepicker_defineProperty(this, "_onMouseDown", e => {
      this.inFocus = true;
    });
    datepicker_defineProperty(this, "_onMouseUp", e => {
      this.inFocus = false;
      this.$el.focus();
    });
    datepicker_defineProperty(this, "_onResize", () => {
      if (this.visible && typeof this.opts.position !== 'function') {
        this.setPosition();
      }
    });
    datepicker_defineProperty(this, "_onClickOverlay", () => {
      if (this.visible) {
        this.hide();
      }
    });
    /**
     * Returns all dates that are currently should be shown in calendar
     * @param {ViewType} viewType
     * @returns {*}
     */
    datepicker_defineProperty(this, "getViewDates", (viewType = consts.days) => {
      const dates = DatepickerBody.getDatesFunction(viewType);
      return dates(this);
    });
    datepicker_defineProperty(this, "isWeekend", day => {
      return this.opts.weekends.includes(day);
    });
    /**
     * Clamps passed date between min and max date
     * @param {Date} date
     */
    datepicker_defineProperty(this, "getClampedDate", date => {
      let {
          minDate,
          maxDate
        } = this,
        newDate = date;
      if (maxDate && isDateBigger(date, maxDate)) {
        newDate = maxDate;
      } else if (minDate && isDateSmaller(date, minDate)) {
        newDate = minDate;
      }
      return newDate;
    });
    this.$el = getEl(el);
    if (!this.$el) return;
    this.$datepicker = createElement({
      className: 'air-datepicker'
    });
    this.opts = deepMerge({}, defaults, _opts);
    this.$customContainer = this.opts.container ? getEl(this.opts.container) : false;
    this.$altField = getEl(this.opts.altField || false);
    let {
      view: _view,
      startDate
    } = this.opts;
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
    this.currentView = _view;
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
    (!containerBuilt || containerBuilt && $datepickersContainer && !$body.contains($datepickersContainer)) && !inline && this.elIsInput && !this.$customContainer;
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
        this.keyboardNav = new DatepickerKeyboard({
          dp: this,
          opts
        });
      }
    }
    if (selectedDates) {
      this.selectDate(selectedDates, {
        silent: true
      });
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
    $datepickerOverlay = createElement({
      className: 'air-datepicker-overlay'
    });
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
        isMobile
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
    this.nav = new DatepickerNav({
      dp,
      opts
    });
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
    let {
      minDate,
      maxDate
    } = this.opts;
    this.minDate = minDate ? createDate(minDate) : false;
    this.maxDate = maxDate ? createDate(maxDate) : false;
  }
  _addTimepicker() {
    this.$timepicker = createElement({
      className: 'air-datepicker--time'
    });
    this.$datepicker.appendChild(this.$timepicker);
    this.timepicker = new DatepickerTime({
      dp: this,
      opts: this.opts
    });
    this.$timepicker.appendChild(this.timepicker.$el);
  }
  _addButtons() {
    this.$buttons = createElement({
      className: 'air-datepicker--buttons'
    });
    this.$datepicker.appendChild(this.$buttons);
    this.buttons = new DatepickerButtons({
      dp: this,
      opts: this.opts
    });
    this.$buttons.appendChild(this.buttons.$el);
  }
  _bindSubEvents() {
    this.on(consts.eventChangeSelectedDate, this._onChangeSelectedDate);
    this.on(consts.eventChangeFocusDate, this._onChangeFocusedDate);
    this.on(consts.eventChangeTime, this._onChangeTime);
  }
  _buildBaseHtml() {
    let {
      inline
    } = this.opts;
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
    let {
      locale,
      dateFormat,
      firstDay,
      timepicker,
      onlyTimepicker,
      timeFormat,
      dateTimeSeparator
    } = this.opts;
    this.locale = deepCopy(locale);
    if (dateFormat) {
      this.locale.dateFormat = dateFormat;
    }
    // Allow to remove time from formatted string
    // e.g. if user wants to display mm:hh yyyy MMMM (time first) instead of hardcoded order - 'date time`
    if (timeFormat !== undefined && timeFormat !== '') {
      this.locale.timeFormat = timeFormat;
    }
    let {
      timeFormat: timeFormatValidated
    } = this.locale;
    if (firstDay !== '') {
      this.locale.firstDay = firstDay;
    }
    if (timepicker && typeof dateFormat !== 'function') {
      let separator = timeFormatValidated ? dateTimeSeparator : '';
      this.locale.dateFormat = [this.locale.dateFormat, timeFormatValidated ? timeFormatValidated : ''].join(separator);
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
      classes = `air-datepicker -${main}${sec ? '-' + sec : ''}- -from-${main}-`;
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
    let {
      viewDate,
      minDate,
      maxDate
    } = this;
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
    const tokens = Object.keys(formats).concat(Object.keys(tokenAliases)).sort((a, b) => b.length - a.length);
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
    const {
      currentView,
      parsedViewDate,
      selectedDates
    } = this;
    const {
      updateTime,
      silent
    } = params;
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
      date.forEach(d => {
        this.selectDate(d, params);
      });
      return new Promise(resolve => {
        setTimeout(resolve);
      });
    }
    date = createDate(date);
    if (!(date instanceof Date)) return;
    if (onBeforeSelect && !silent && !onBeforeSelect({
      date,
      datepicker: this
    })) {
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
                  targetDate = isSecondDateAfterFirst ? addDays(firstDate, minDays - 1) : addDays(firstDate, -(minDays - 1));
                } else if (rangeLength > maxDays) {
                  // The range needs to be reduced to maxDays
                  targetDate = isSecondDateAfterFirst ? addDays(firstDate, maxDays - 1) : addDays(firstDate, -(maxDays - 1));
                }

                // Check that targetDate is not equal to the current date
                if (targetDate && !isSameDate(targetDate, date)) {
                  return this.selectDate(targetDate, {
                    ...params,
                    silent: true
                  });
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
      silent: params === null || params === void 0 ? void 0 : params.silent,
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
    return new Promise(resolve => {
      setTimeout(resolve);
    });
  }
  unselectDate(date) {
    let _this = this;
    let selectedDates = _this.selectedDates || [];
    date = createDate(date);
    if (!(date instanceof Date)) return false;
    const {
      minDays,
      maxDays,
      range
    } = _this.opts;
    if (range) {
      // For range mode: remove the entire date from selectedDates
      const newSelectedDates = selectedDates.filter(curDate => !isSameDate(curDate, date));

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
            _this.rangeDateTo = range && selectedDates.length > 1 ? selectedDates[1] : '';
            _this._updateLastSelectedDate(selectedDates[selectedDates.length - 1]);
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
    let date = this.selectedDates.find(d => {
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
    this.trigger(consts.eventChangeSelectedDate, {
      action: consts.actionUnselectDate,
      silent: params.silent
    });
    return new Promise(resolve => {
      setTimeout(resolve);
    });
  }
  show() {
    let {
      onShow,
      isMobile
    } = this.opts;
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
    let {
      onHide,
      isMobile
    } = this.opts;
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
    this._scheduleCallAfterTransition(isAnimationCompleted => {
      if (!this.customHide && (isAnimationCompleted && hasTransition || !isAnimationCompleted && !hasTransition)) {
        this._finishHide();
      }
      onHide && onHide(isAnimationCompleted);
    });
    if (isMobile) {
      $datepickerOverlay.classList.remove('-active-');
    }
  }
  _triggerOnSelect() {
    let dates = [],
      formattedDates = [],
      datepicker = this,
      {
        selectedDates,
        locale,
        opts: {
          onSelect,
          multipleDates,
          range
        }
      } = datepicker,
      isMultiple = multipleDates || range,
      formatIsFunction = typeof locale.dateFormat === 'function';
    if (selectedDates.length) {
      dates = selectedDates.map(copyDate);
      formattedDates = formatIsFunction ? multipleDates ? locale.dateFormat(dates) : dates.map(date => locale.dateFormat(date)) : dates.map(date => this.formatDate(date, locale.dateFormat));
    }
    onSelect({
      date: isMultiple ? dates : dates[0],
      formattedDate: isMultiple ? formattedDates : formattedDates[0],
      datepicker
    });
  }
  _handleAlreadySelectedDates(alreadySelectedDate, cellDate) {
    let {
      selectedDates,
      rangeDateFrom,
      rangeDateTo
    } = this;
    let {
      range,
      toggleSelected
    } = this.opts;
    let selectedDatesLen = selectedDates.length;
    let isFunc = typeof toggleSelected === 'function';
    let shouldToggle = isFunc ? toggleSelected({
      datepicker: this,
      date: cellDate
    }) : toggleSelected;
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
  /**
   * Finds cell HTML element
   * @param {DateLike} cellDate
   * @param {CellType} cellType
   * @return {HTMLElement | null}
   */
  getCell(cellDate, cellType = consts.day) {
    cellDate = createDate(cellDate);
    if (!(cellDate instanceof Date)) return;
    let {
      year,
      month,
      date
    } = getParsedDate(cellDate);
    let yearQuery = `[data-year="${year}"]`,
      monthQuery = `[data-month="${month}"]`,
      dayQuery = `[data-date="${date}"]`;
    let resultQuery = {
      [consts.day]: `${yearQuery}${monthQuery}${dayQuery}`,
      [consts.month]: `${yearQuery}${monthQuery}`,
      [consts.year]: `${yearQuery}`
    };

    // Can find cells only if calendar is visible and current view is initialized
    if (!this.views[this.currentView]) {
      return undefined;
    }
    return this.views[this.currentView].$el.querySelector(resultQuery[cellType]);
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
  static replacer(str, reg, data) {
    return str.replace(reg, function (match, p1, p2, p3) {
      return p1 + data + p3;
    });
  }
}
datepicker_defineProperty(Datepicker, "defaults", defaults);
datepicker_defineProperty(Datepicker, "version", '3.6.0');
datepicker_defineProperty(Datepicker, "defaultGlobalContainerId", 'air-datepicker-global-container');
withEvents(Datepicker.prototype);
__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});