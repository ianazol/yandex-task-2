var App =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.schedule = exports.lecture = exports.classroom = exports.school = undefined;

	var _school = __webpack_require__(1);

	var _school2 = _interopRequireDefault(_school);

	var _classroom = __webpack_require__(4);

	var _classroom2 = _interopRequireDefault(_classroom);

	var _lecture = __webpack_require__(5);

	var _lecture2 = _interopRequireDefault(_lecture);

	var _schedule = __webpack_require__(6);

	var _schedule2 = _interopRequireDefault(_schedule);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.school = _school2.default;
	exports.classroom = _classroom2.default;
	exports.lecture = _lecture2.default;
		exports.schedule = _schedule2.default;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _resource = __webpack_require__(2);

	var _resource2 = _interopRequireDefault(_resource);

	var _helper = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var $list = document.querySelector(".schoolList"),
	    $addForm = document.forms.schoolAdd;

	// получить из бд и показать список школ
	function showList() {
	    return _resource2.default.list("school").then(function (schools) {
	        schools.map(function (item) {
	            return item.json = JSON.stringify(item);
	        });
	        $list.innerHTML = ScheduleApp.templates.school.list({ items: schools });
	    });
	}

	// добавить школу в бд
	function addSchool(schoolData) {
	    return _resource2.default.create("school", schoolData).then(function (result) {
	        if (result.error) {
	            throw new Error(result.error);
	        }
	    });
	}

	// редактировать школу в бд
	function editSchool(id, schoolData) {
	    return _resource2.default.update("school", id, schoolData).then(function (result) {
	        if (result.error) {
	            throw new Error(result.error);
	        }
	    });
	}

	//удалить школу из БД
	function removeSchool(id) {
	    return _resource2.default.remove("school", id).then(function (result) {
	        if (result.error) {
	            throw new Error(result.error);
	        }
	    });
	}

	//убрать форму редактирования
	function hideEditForm(element) {
	    element.closest(".school-edit-form").remove();
	}

	// показать ошибку
	function showError(msg) {
	    alert(msg);
	}

	//получить id школы по data-атрибуту
	function getItemId(element) {
	    return element.closest(".school-item").dataset.id;
	}

	// обработка отправки формы редактирования
	function editFormSubmitHandler(event) {
	    var editForm = event.target,
	        editBtn = editForm.elements.save,
	        newSchoolData = (0, _helper.getFormData)(editForm);

	    editBtn.disabled = true;
	    editSchool(newSchoolData.id, newSchoolData).then(showList).catch(function (error) {
	        return showError(error.message);
	    }).then(function () {
	        return editBtn.disabled = false;
	    });

	    event.preventDefault();
	}

	// обработка отправки формы добавления
	function addFormSubmitHandler(event) {
	    var schoolData = (0, _helper.getFormData)($addForm),
	        $addBtn = $addForm.elements.addSchoolBtn;

	    $addBtn.disabled = true;
	    addSchool(schoolData).then(showList).then(function () {
	        return $addForm.reset();
	    }).catch(function (error) {
	        return showError(error.message);
	    }).then(function () {
	        return $addBtn.disabled = false;
	    });

	    event.preventDefault();
	}

	// обработка клика на кнопку удалить
	function removeClickHandler(event) {
	    var $deleteBtn = event.target,
	        id = getItemId(event.target);

	    $deleteBtn.disabled = true;
	    removeSchool(id).then(function () {
	        return $list.querySelector('[data-id="' + id + '"]').remove();
	    }).catch(function (error) {
	        return showError(error.message);
	    }).then(function () {
	        return $deleteBtn.disabled = false;
	    });
	}

	//показать форму редактирования школы
	function showEditFormHandler(event) {
	    var $schoolItem = event.target.closest(".school-item"),
	        oldSchoolData = JSON.parse($schoolItem.dataset.school);

	    var editFormContainer = ScheduleApp.templates.school.edit(oldSchoolData);

	    $schoolItem.firstElementChild.insertAdjacentHTML('afterEnd', editFormContainer);
	    $schoolItem.querySelector("form").addEventListener("submit", editFormSubmitHandler);
	}

	function init() {
	    showList();

	    $addForm.addEventListener("submit", addFormSubmitHandler);

	    (0, _helper.delegate)($list, '.school-delete', 'click', removeClickHandler);
	    (0, _helper.delegate)($list, '.school-edit', 'click', showEditFormHandler);
	    (0, _helper.delegate)($list, '.school-edit-cancel', 'click', function (event) {
	        return hideEditForm(event.target);
	    });
	}

	exports.default = { init: init };

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var API_PREFIX = "/api";
	var DEFAULT_PREFIX = { "Content-type": "application/json; charset=UTF-8" };

	function getQueryString(params) {
	    return Object.keys(params).map(function (key) {
	        if (Array.isArray(params[key])) {
	            return params[key].map(function (val) {
	                return encodeURIComponent(key) + "[]=" + encodeURIComponent(val);
	            }).join('&');
	        }
	        return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
	    }).join("&");
	}

	function list(type, params) {
	    var query = '';

	    if (params !== undefined) {
	        query = "?" + getQueryString(params);
	    }

	    return fetch(API_PREFIX + "/" + type + "/" + query, {
	        method: "get"
	    }).then(function (response) {
	        return response.json();
	    });
	}

	function create(type, data) {
	    return fetch(API_PREFIX + "/" + type + "/", {
	        method: "post",
	        headers: DEFAULT_PREFIX,
	        body: JSON.stringify(data)
	    }).then(function (response) {
	        return response.json();
	    });
	}

	function update(type, id, data) {
	    return fetch(API_PREFIX + "/" + type + "/" + id, {
	        method: "put",
	        headers: DEFAULT_PREFIX,
	        body: JSON.stringify(data)
	    }).then(function (response) {
	        return response.json();
	    });
	}

	function remove(type, id) {
	    return fetch(API_PREFIX + "/" + type + "/" + id, {
	        method: "delete"
	    }).then(function (response) {
	        return response.json();
	    });
	}

	exports.default = { list: list, create: create, update: update, remove: remove };

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.delegate = delegate;
	exports.getFormData = getFormData;
	exports.leadZero = leadZero;
	exports.getTime = getTime;
	exports.formatDate = formatDate;
	function delegate(container, selector, event, handler) {
	    container.addEventListener(event, function (e) {
	        if (e.target.matches(selector)) {
	            handler.apply(e.target, arguments);
	        }
	    });
	}

	function getFormData(form) {
	    return [].reduce.call(form.querySelectorAll('input, textarea, select'), function (result, formElement) {
	        if (formElement.multiple && formElement.options.length > 0) {
	            var values = [];
	            for (var i = 0; i < formElement.options.length; i++) {
	                var option = formElement.options[i];
	                if (option.selected) {
	                    values.push(option.value);
	                }
	            }
	            result[formElement.name] = values;
	        } else {
	            result[formElement.name] = formElement.value;
	        }
	        return result;
	    }, {});
	}

	function leadZero(num) {
	    return num < 10 ? '0' + num : num;
	}

	function getTime(date) {
	    if (typeof date === 'string') {
	        date = new Date(date);
	    }
	    date.setHours(date.getHours(), date.getMinutes() + date.getTimezoneOffset());
	    return leadZero(date.getHours()) + ":" + leadZero(date.getMinutes());
	}

	function formatDate(date) {
	    if (typeof date === 'string') {
	        date = new Date(date);
	    }

	    var year = date.getFullYear(),
	        month = date.getMonth() + 1,
	        day = date.getDate();

	    return [leadZero(day), leadZero(month), year].join('.');
	}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _resource = __webpack_require__(2);

	var _resource2 = _interopRequireDefault(_resource);

	var _helper = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var $list = document.querySelector(".classroomList"),
	    $addForm = document.forms.classroomAdd;

	// получить из бд и показать
	function showList() {
	    return _resource2.default.list("classroom").then(function (classrooms) {
	        classrooms.map(function (item) {
	            return item.json = JSON.stringify(item);
	        });
	        $list.innerHTML = ScheduleApp.templates.classroom.list({ items: classrooms });
	    });
	}

	// добавить аудиторию в бд
	function addClassroom(classroomData) {
	    return _resource2.default.create("classroom", classroomData).then(function (result) {
	        if (result.error) {
	            throw new Error(result.error);
	        }
	    });
	}

	// редактировать аудиторию в бд
	function editClassroom(id, classroomData) {
	    return _resource2.default.update("classroom", id, classroomData).then(function (result) {
	        if (result.error) {
	            throw new Error(result.error);
	        }
	    });
	}

	// удалить аудиторию из бд
	function removeClassroom(id) {
	    return _resource2.default.remove("classroom", id).then(function (result) {
	        if (result.error) {
	            throw new Error(result.error);
	        }
	    });
	}

	// спрятать форму редактирования аудитории
	function hideEditForm(element) {
	    element.closest(".classroom-edit-form").remove();
	}

	// показать ошибку
	function showError(msg) {
	    alert(msg);
	}

	// получить id
	function getItemId(element) {
	    return element.closest(".classroom-item").dataset.id;
	}

	// очистить форму добавления
	function clearAddForm() {
	    $addForm.reset();
	}

	// обработка сабмита формы редактирования
	function editFormSubmitHandler(event) {
	    var newClassroomData = (0, _helper.getFormData)(event.target),
	        $saveBtn = event.target.elements.save;

	    $saveBtn.disabled = true;
	    editClassroom(newClassroomData.id, newClassroomData).then(showList).catch(function (error) {
	        return showError(error.message);
	    }).then(function () {
	        return $saveBtn.disabled = false;
	    });

	    event.preventDefault();
	}

	// обработка сабмита формы добавления
	function addFormSubmitHandler(event) {
	    var classroomData = (0, _helper.getFormData)($addForm),
	        $addBtn = $addForm.elements.add;

	    $addBtn.disabled = true;
	    addClassroom(classroomData).then(showList).then(clearAddForm).catch(function (error) {
	        return showError(error.message);
	    }).then(function () {
	        return $addBtn.disabled = false;
	    });

	    event.preventDefault();
	}

	// обработка клика на кнопку Удалить
	function removeClickHandler(event) {
	    var $deleteBtn = event.target,
	        id = getItemId(event.target);

	    $deleteBtn.disabled = true;
	    removeClassroom(id).then(function () {
	        return $list.querySelector('[data-id="' + id + '"]').remove();
	    }).catch(function (error) {
	        return showError(error.message);
	    }).then(function () {
	        return $deleteBtn.disabled = false;
	    });
	}

	// обработка клика на кнопку Редактировать
	function showEditFormHandler(event) {
	    var $classroomItem = event.target.closest(".classroom-item"),
	        oldClassroomData = JSON.parse($classroomItem.dataset.classroom);

	    var editFormContainer = ScheduleApp.templates.classroom.edit(oldClassroomData);

	    $classroomItem.firstElementChild.insertAdjacentHTML('afterEnd', editFormContainer);
	    $classroomItem.querySelector("form").addEventListener("submit", editFormSubmitHandler);
	}

	function init() {
	    showList();

	    $addForm.addEventListener("submit", addFormSubmitHandler);

	    (0, _helper.delegate)($list, '.classroom-delete', 'click', removeClickHandler);
	    (0, _helper.delegate)($list, '.classroom-edit', 'click', showEditFormHandler);
	    (0, _helper.delegate)($list, '.classroom-edit-cancel', 'click', function (event) {
	        return hideEditForm(event.target);
	    });
	}

	exports.default = { init: init };

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _resource = __webpack_require__(2);

	var _resource2 = _interopRequireDefault(_resource);

	var _helper = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var schoolList = [],
	    classroomList = [],
	    $list = document.querySelector(".lectureList"),
	    $addFormContainer = document.querySelector(".lecture-add-container"),
	    $addForm = null;

	// получить лекции из БД и показать
	function showList() {
	    return _resource2.default.list("lecture").then(function (lectures) {
	        lectures.map(function (item) {
	            item.json = JSON.stringify(item);
	            item.date = (0, _helper.formatDate)(item.start);
	            item.startTime = (0, _helper.getTime)(item.start);
	            item.finishTime = (0, _helper.getTime)(item.finish);
	            item.schoolList = item.school.map(function (item) {
	                return item.name;
	            }).join(", ");
	            return item;
	        });
	        $list.innerHTML = ScheduleApp.templates.lecture.list({ items: lectures });
	    });
	}

	// добавить лекцию в бд
	function addLecture(lectureData) {
	    return _resource2.default.create('lecture', lectureData).then(function (result) {
	        if (result.error) {
	            throw new Error(result.error);
	        }
	    });
	}

	// удалить лекию из бд
	function removeLecture(lectureId) {
	    return _resource2.default.remove('lecture', lectureId).then(function (result) {
	        if (result.error) {
	            throw new Error(result.error);
	        }
	    });
	}

	// изменить лекцию в бд
	function editLecture(lectureId, lectureData) {
	    return _resource2.default.update("lecture", lectureId, lectureData).then(function (result) {
	        if (result.error) {
	            throw new Error(result.error);
	        }
	    });
	}

	// создать форму добавления лекции
	function createAddForm() {
	    $addFormContainer.innerHTML = ScheduleApp.templates.lecture.add({ school: schoolList, classroom: classroomList });
	    return document.forms.lectureAdd;
	}

	// создать список options
	function createOptions(list, selectedValues) {
	    var options = [];

	    if (!Array.isArray(selectedValues)) {
	        selectedValues = [selectedValues];
	    }

	    list.forEach(function (item) {
	        var option = Object.assign({}, item);
	        if (selectedValues.indexOf(option._id) !== -1) {
	            option.selected = true;
	        }
	        options.push(option);
	    });

	    return options;
	}

	// получить id
	function getItemId(element) {
	    return element.closest(".lecture-item").dataset.id;
	}

	// показать ошибку
	function showError(msg) {
	    alert(msg);
	}

	// подготовить данные перед сохранением
	function prepareDataBeforeSaving(lectureData) {
	    return Object.assign({}, lectureData, {
	        start: lectureData.date + 'T' + lectureData.start + ':00',
	        finish: lectureData.date + 'T' + lectureData.finish + ':00'
	    });
	}

	// проверить данные
	function validate(lectureData) {
	    if (!Date.parse(lectureData.date)) {
	        return showError('Некорректно введена дата, формат: YYYY-MM-DD');
	    }

	    if (!Date.parse(lectureData.start) || !Date.parse(lectureData.finish)) {
	        return showError('Некорректно введено время, формат: HH:mm');
	    }

	    return true;
	}

	// очистить форму добавления
	function clearAddForm() {
	    $addForm.reset();
	}

	// обработка сабмита формы добавления лекции
	function addFormSubmitHandler(event) {
	    event.preventDefault();

	    var lectureData = (0, _helper.getFormData)($addForm);
	    var $addBtn = $addForm.elements.add;
	    lectureData = prepareDataBeforeSaving(lectureData);

	    if (validate(lectureData) === true) {
	        $addBtn.disabled = true;
	        addLecture(lectureData).then(clearAddForm).then(showList).catch(function (error) {
	            return showError(error.message);
	        }).then(function () {
	            return $addBtn.disabled = false;
	        });
	    }
	}

	// обработка клика на кнопку Удалить
	function deleteHandler(event) {
	    var lectureId = getItemId(event.target);
	    var $deleteBtn = event.target;

	    $deleteBtn.disabled = true;
	    removeLecture(lectureId).then(function () {
	        return $list.querySelector('[data-id="' + lectureId + '"]').remove();
	    }).catch(function (error) {
	        return showError(error.message);
	    }).then(function () {
	        return $deleteBtn.disabled = false;
	    });

	    event.preventDefault();
	}

	// обработка сабмита формы редактирования лекции
	function editFormSubmitHandler(event) {
	    var newLectureData = (0, _helper.getFormData)(event.target);
	    var $editBtn = event.target.elements.save;
	    newLectureData = prepareDataBeforeSaving(newLectureData);
	    $editBtn.disabled = true;

	    if (validate(newLectureData) === true) {
	        editLecture(newLectureData.id, newLectureData).then(showList).catch(function (error) {
	            return showError(error);
	        }).then(function () {
	            return $editBtn.disabled = false;
	        });
	    }

	    event.preventDefault();
	}

	// обработка клика на кнопку Редактировать
	function showEditFormHandler(event) {
	    var $lectureItem = event.target.closest(".lecture-item");

	    // подготовка данных к шаблонизации
	    var lectureData = JSON.parse($lectureItem.dataset.lecture);
	    var lectureSchool = lectureData.school.map(function (item) {
	        return item._id;
	    });

	    lectureData.date = lectureData.start.substring(0, 10);
	    lectureData.startTime = (0, _helper.getTime)(lectureData.start);
	    lectureData.finishTime = (0, _helper.getTime)(lectureData.finish);
	    lectureData.schoolList = createOptions(schoolList, lectureSchool);
	    lectureData.classroomList = createOptions(classroomList, lectureData.classroom._id);

	    // рендер формы
	    var editFormHtml = ScheduleApp.templates.lecture.edit(lectureData);
	    $lectureItem.firstElementChild.insertAdjacentHTML('afterEnd', editFormHtml);

	    $lectureItem.querySelector('form').addEventListener("submit", editFormSubmitHandler);

	    event.preventDefault();
	}

	// удалить форму редактирования лекции
	function hideEditFormHandler(event) {
	    event.target.closest(".lecture-edit-form").remove();
	}

	function init() {
	    showList();

	    Promise.all([_resource2.default.list("school"), _resource2.default.list("classroom")]).then(function (results) {
	        schoolList = results[0];
	        classroomList = results[1];

	        $addForm = createAddForm();
	        $addForm.addEventListener("submit", addFormSubmitHandler);
	    });

	    (0, _helper.delegate)($list, '.lecture-delete', 'click', deleteHandler);
	    (0, _helper.delegate)($list, '.lecture-edit', 'click', showEditFormHandler);
	    (0, _helper.delegate)($list, '.lecture-edit-cancel', 'click', hideEditFormHandler);
	}

	exports.default = { init: init };

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _resource = __webpack_require__(2);

	var _resource2 = _interopRequireDefault(_resource);

	var _helper = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var $list = document.querySelector(".lectureList"),
	    $filterContainer = document.querySelector(".filter");

	// показать список лекций
	function showList(query) {
	    return _resource2.default.list("lecture", query).then(function (lectures) {
	        lectures.map(function (item) {
	            item.date = (0, _helper.formatDate)(item.start);
	            item.startTime = (0, _helper.getTime)(item.start);
	            item.finishTime = (0, _helper.getTime)(item.finish);
	            item.schoolList = item.school.map(function (item) {
	                return item.name;
	            }).join(", ");
	            return item;
	        });
	        $list.innerHTML = ScheduleApp.templates.schedule({ items: lectures });
	    });
	}

	// показать фильтр
	function showFilter() {
	    return Promise.all([_resource2.default.list("school"), _resource2.default.list("classroom")]).then(function (results) {
	        $filterContainer.innerHTML = ScheduleApp.templates.filter({
	            schoolList: results[0],
	            classroomList: results[1]
	        });
	    });
	}

	// получить данные с формы фильтрации
	function getFilterValues(form) {
	    var query = {};
	    [].forEach.call(form.elements, function (element) {
	        if (element.type !== 'submit') {
	            var value = form.elements[element.name].value;
	            if (value) {
	                query[element.name] = value;
	            }
	        }
	    });

	    return query;
	}

	// обработать сабмит формы фильтрации
	function filterSubmitHandler(event) {
	    event.preventDefault();

	    var form = event.target,
	        filterBtn = form.elements.filter;

	    var query = getFilterValues(form);

	    if (query.from && !Date.parse(query.from) || query.to && !Date.parse(query.to)) {
	        return alert('Некорректно введена дата, формат: YYYY-MM-DD');
	    }

	    if (query.to) {
	        var date = new Date(query.to);
	        var dateWithEndOfDay = new Date(date.getTime() + 24 * 60 * 60000 - 1);
	        query.to = Date.parse(dateWithEndOfDay);
	    }

	    filterBtn.disabled = true;
	    showList(query).then(function () {
	        filterBtn.disabled = false;
	    });
	}

	function init() {
	    showList();

	    showFilter().then(function () {
	        var $filterForm = $filterContainer.querySelector("form");
	        $filterForm.addEventListener("submit", filterSubmitHandler);
	    });
	}

	exports.default = { init: init };

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIGRhYTI1NTUzMjBlMDY3Y2NlNGUyIiwid2VicGFjazovLy9jbGllbnQvanMvc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vY2xpZW50L2pzL3NyYy9zY2hvb2wvc2Nob29sLmpzIiwid2VicGFjazovLy9jbGllbnQvanMvc3JjL3Jlc291cmNlLmpzIiwid2VicGFjazovLy9jbGllbnQvanMvc3JjL2hlbHBlci5qcyIsIndlYnBhY2s6Ly8vY2xpZW50L2pzL3NyYy9jbGFzc3Jvb20vY2xhc3Nyb29tLmpzIiwid2VicGFjazovLy9jbGllbnQvanMvc3JjL2xlY3R1cmUvbGVjdHVyZS5qcyIsIndlYnBhY2s6Ly8vY2xpZW50L2pzL3NyYy9zY2hlZHVsZS9zY2hlZHVsZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkYWEyNTU1MzIwZTA2N2NjZTRlMiIsImltcG9ydCBzY2hvb2wgZnJvbSAnLi9zY2hvb2wvc2Nob29sJztcbmltcG9ydCBjbGFzc3Jvb20gZnJvbSAnLi9jbGFzc3Jvb20vY2xhc3Nyb29tJztcbmltcG9ydCBsZWN0dXJlIGZyb20gJy4vbGVjdHVyZS9sZWN0dXJlJztcbmltcG9ydCBzY2hlZHVsZSBmcm9tICcuL3NjaGVkdWxlL3NjaGVkdWxlJztcblxuZXhwb3J0IHtzY2hvb2wsIGNsYXNzcm9vbSwgbGVjdHVyZSwgc2NoZWR1bGV9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBjbGllbnQvanMvc3JjL2FwcC5qcyIsImltcG9ydCByZXNvdXJjZSBmcm9tICcuLi9yZXNvdXJjZSc7XG5pbXBvcnQge2RlbGVnYXRlLCBnZXRGb3JtRGF0YX0gZnJvbSAnLi4vaGVscGVyJztcblxubGV0ICRsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zY2hvb2xMaXN0XCIpLFxuICAgICRhZGRGb3JtID0gZG9jdW1lbnQuZm9ybXMuc2Nob29sQWRkO1xuXG4vLyDQv9C+0LvRg9GH0LjRgtGMINC40Lcg0LHQtCDQuCDQv9C+0LrQsNC30LDRgtGMINGB0L/QuNGB0L7QuiDRiNC60L7Qu1xuZnVuY3Rpb24gc2hvd0xpc3QoKSB7XG4gICAgcmV0dXJuIHJlc291cmNlLmxpc3QoXCJzY2hvb2xcIilcbiAgICAgICAgLnRoZW4oKHNjaG9vbHMpID0+IHtcbiAgICAgICAgICAgIHNjaG9vbHMubWFwKChpdGVtKSA9PiBpdGVtLmpzb24gPSBKU09OLnN0cmluZ2lmeShpdGVtKSk7XG4gICAgICAgICAgICAkbGlzdC5pbm5lckhUTUwgPSBTY2hlZHVsZUFwcC50ZW1wbGF0ZXMuc2Nob29sLmxpc3Qoe2l0ZW1zOiBzY2hvb2xzfSk7XG4gICAgICAgIH0pO1xufVxuXG4vLyDQtNC+0LHQsNCy0LjRgtGMINGI0LrQvtC70YMg0LIg0LHQtFxuZnVuY3Rpb24gYWRkU2Nob29sKHNjaG9vbERhdGEpIHtcbiAgICByZXR1cm4gcmVzb3VyY2UuY3JlYXRlKFwic2Nob29sXCIsIHNjaG9vbERhdGEpXG4gICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzdWx0LmVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG59XG5cbi8vINGA0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMINGI0LrQvtC70YMg0LIg0LHQtFxuZnVuY3Rpb24gZWRpdFNjaG9vbChpZCwgc2Nob29sRGF0YSkge1xuICAgIHJldHVybiByZXNvdXJjZS51cGRhdGUoXCJzY2hvb2xcIiwgaWQsIHNjaG9vbERhdGEpXG4gICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzdWx0LmVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG59XG5cbi8v0YPQtNCw0LvQuNGC0Ywg0YjQutC+0LvRgyDQuNC3INCR0JRcbmZ1bmN0aW9uIHJlbW92ZVNjaG9vbChpZCkge1xuICAgIHJldHVybiByZXNvdXJjZS5yZW1vdmUoXCJzY2hvb2xcIiwgaWQpXG4gICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzdWx0LmVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG59XG5cbi8v0YPQsdGA0LDRgtGMINGE0L7RgNC80YMg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xuZnVuY3Rpb24gaGlkZUVkaXRGb3JtKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LmNsb3Nlc3QoXCIuc2Nob29sLWVkaXQtZm9ybVwiKS5yZW1vdmUoKTtcbn1cblxuLy8g0L/QvtC60LDQt9Cw0YLRjCDQvtGI0LjQsdC60YNcbmZ1bmN0aW9uIHNob3dFcnJvcihtc2cpIHtcbiAgICBhbGVydChtc2cpO1xufVxuXG4vL9C/0L7Qu9GD0YfQuNGC0YwgaWQg0YjQutC+0LvRiyDQv9C+IGRhdGEt0LDRgtGA0LjQsdGD0YLRg1xuZnVuY3Rpb24gZ2V0SXRlbUlkKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudC5jbG9zZXN0KFwiLnNjaG9vbC1pdGVtXCIpLmRhdGFzZXQuaWQ7XG59XG5cbi8vINC+0LHRgNCw0LHQvtGC0LrQsCDQvtGC0L/RgNCw0LLQutC4INGE0L7RgNC80Ysg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xuZnVuY3Rpb24gZWRpdEZvcm1TdWJtaXRIYW5kbGVyKGV2ZW50KSB7XG4gICAgbGV0IGVkaXRGb3JtID0gZXZlbnQudGFyZ2V0LFxuICAgICAgICBlZGl0QnRuID0gZWRpdEZvcm0uZWxlbWVudHMuc2F2ZSxcbiAgICAgICAgbmV3U2Nob29sRGF0YSA9IGdldEZvcm1EYXRhKGVkaXRGb3JtKTtcblxuICAgIGVkaXRCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgIGVkaXRTY2hvb2wobmV3U2Nob29sRGF0YS5pZCwgbmV3U2Nob29sRGF0YSlcbiAgICAgICAgLnRoZW4oc2hvd0xpc3QpXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHNob3dFcnJvcihlcnJvci5tZXNzYWdlKSlcbiAgICAgICAgLnRoZW4oKCkgPT4gZWRpdEJ0bi5kaXNhYmxlZCA9IGZhbHNlKTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59XG5cbi8vINC+0LHRgNCw0LHQvtGC0LrQsCDQvtGC0L/RgNCw0LLQutC4INGE0L7RgNC80Ysg0LTQvtCx0LDQstC70LXQvdC40Y9cbmZ1bmN0aW9uIGFkZEZvcm1TdWJtaXRIYW5kbGVyKGV2ZW50KSB7XG4gICAgbGV0IHNjaG9vbERhdGEgPSBnZXRGb3JtRGF0YSgkYWRkRm9ybSksXG4gICAgICAgICRhZGRCdG4gPSAkYWRkRm9ybS5lbGVtZW50cy5hZGRTY2hvb2xCdG47XG5cbiAgICAkYWRkQnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICBhZGRTY2hvb2woc2Nob29sRGF0YSlcbiAgICAgICAgLnRoZW4oc2hvd0xpc3QpXG4gICAgICAgIC50aGVuKCgpID0+ICRhZGRGb3JtLnJlc2V0KCkpXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHNob3dFcnJvcihlcnJvci5tZXNzYWdlKSlcbiAgICAgICAgLnRoZW4oKCkgPT4gJGFkZEJ0bi5kaXNhYmxlZCA9IGZhbHNlKTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59XG5cbi8vINC+0LHRgNCw0LHQvtGC0LrQsCDQutC70LjQutCwINC90LAg0LrQvdC+0L/QutGDINGD0LTQsNC70LjRgtGMXG5mdW5jdGlvbiByZW1vdmVDbGlja0hhbmRsZXIoZXZlbnQpIHtcbiAgICBsZXQgJGRlbGV0ZUJ0biA9IGV2ZW50LnRhcmdldCxcbiAgICAgICAgaWQgPSBnZXRJdGVtSWQoZXZlbnQudGFyZ2V0KTtcblxuICAgICRkZWxldGVCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgIHJlbW92ZVNjaG9vbChpZClcbiAgICAgICAgLnRoZW4oKCkgPT4gJGxpc3QucXVlcnlTZWxlY3RvcihgW2RhdGEtaWQ9XCIke2lkfVwiXWApLnJlbW92ZSgpKVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiBzaG93RXJyb3IoZXJyb3IubWVzc2FnZSkpXG4gICAgICAgIC50aGVuKCgpID0+ICRkZWxldGVCdG4uZGlzYWJsZWQgPSBmYWxzZSk7XG59XG5cbi8v0L/QvtC60LDQt9Cw0YLRjCDRhNC+0YDQvNGDINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y8g0YjQutC+0LvRi1xuZnVuY3Rpb24gc2hvd0VkaXRGb3JtSGFuZGxlcihldmVudCkge1xuICAgIGxldCAkc2Nob29sSXRlbSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLnNjaG9vbC1pdGVtXCIpLFxuICAgICAgICBvbGRTY2hvb2xEYXRhID0gSlNPTi5wYXJzZSgkc2Nob29sSXRlbS5kYXRhc2V0LnNjaG9vbCk7XG5cbiAgICBsZXQgZWRpdEZvcm1Db250YWluZXIgPSBTY2hlZHVsZUFwcC50ZW1wbGF0ZXMuc2Nob29sLmVkaXQob2xkU2Nob29sRGF0YSk7XG5cbiAgICAkc2Nob29sSXRlbS5maXJzdEVsZW1lbnRDaGlsZC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyRW5kJywgZWRpdEZvcm1Db250YWluZXIpO1xuICAgICRzY2hvb2xJdGVtLnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZWRpdEZvcm1TdWJtaXRIYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBzaG93TGlzdCgpO1xuXG4gICAgJGFkZEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBhZGRGb3JtU3VibWl0SGFuZGxlcik7XG5cbiAgICBkZWxlZ2F0ZSgkbGlzdCwgJy5zY2hvb2wtZGVsZXRlJywgJ2NsaWNrJywgcmVtb3ZlQ2xpY2tIYW5kbGVyKTtcbiAgICBkZWxlZ2F0ZSgkbGlzdCwgJy5zY2hvb2wtZWRpdCcsICdjbGljaycsIHNob3dFZGl0Rm9ybUhhbmRsZXIpO1xuICAgIGRlbGVnYXRlKCRsaXN0LCAnLnNjaG9vbC1lZGl0LWNhbmNlbCcsICdjbGljaycsIChldmVudCkgPT4gaGlkZUVkaXRGb3JtKGV2ZW50LnRhcmdldCkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7aW5pdH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGNsaWVudC9qcy9zcmMvc2Nob29sL3NjaG9vbC5qcyIsImNvbnN0IEFQSV9QUkVGSVggPSBcIi9hcGlcIjtcbmNvbnN0IERFRkFVTFRfUFJFRklYID0ge1wiQ29udGVudC10eXBlXCI6IFwiYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOFwifTtcblxuZnVuY3Rpb24gZ2V0UXVlcnlTdHJpbmcocGFyYW1zKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHBhcmFtcykubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGFyYW1zW2tleV0pKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyYW1zW2tleV0ubWFwKGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyBcIltdPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbCk7XG4gICAgICAgICAgICB9KS5qb2luKCcmJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQocGFyYW1zW2tleV0pO1xuICAgIH0pLmpvaW4oXCImXCIpO1xufVxuXG5mdW5jdGlvbiBsaXN0KHR5cGUsIHBhcmFtcykge1xuICAgIGxldCBxdWVyeSA9ICcnO1xuXG4gICAgaWYgKHBhcmFtcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHF1ZXJ5ID0gXCI/XCIgKyBnZXRRdWVyeVN0cmluZyhwYXJhbXMpO1xuICAgIH1cblxuICAgIHJldHVybiBmZXRjaChBUElfUFJFRklYICsgXCIvXCIgKyB0eXBlICsgXCIvXCIgKyBxdWVyeSwge1xuICAgICAgICBtZXRob2Q6IFwiZ2V0XCJcbiAgICB9KS50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlKHR5cGUsIGRhdGEpIHtcbiAgICByZXR1cm4gZmV0Y2goQVBJX1BSRUZJWCArIFwiL1wiICsgdHlwZSArIFwiL1wiLCB7XG4gICAgICAgIG1ldGhvZDogXCJwb3N0XCIsXG4gICAgICAgIGhlYWRlcnM6IERFRkFVTFRfUFJFRklYLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKVxuICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGUodHlwZSwgaWQsIGRhdGEpIHtcbiAgICByZXR1cm4gZmV0Y2goQVBJX1BSRUZJWCArIFwiL1wiICsgdHlwZSArIFwiL1wiICsgaWQsIHtcbiAgICAgICAgbWV0aG9kOiBcInB1dFwiLFxuICAgICAgICBoZWFkZXJzOiBERUZBVUxUX1BSRUZJWCxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoZGF0YSlcbiAgICB9KS50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlKHR5cGUsIGlkKSB7XG4gICAgcmV0dXJuIGZldGNoKEFQSV9QUkVGSVggKyBcIi9cIiArIHR5cGUgKyBcIi9cIiArIGlkLCB7XG4gICAgICAgIG1ldGhvZDogXCJkZWxldGVcIlxuICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7bGlzdCwgY3JlYXRlLCB1cGRhdGUsIHJlbW92ZX07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGNsaWVudC9qcy9zcmMvcmVzb3VyY2UuanMiLCJleHBvcnQgZnVuY3Rpb24gZGVsZWdhdGUoY29udGFpbmVyLCBzZWxlY3RvciwgZXZlbnQsIGhhbmRsZXIpIHtcbiAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICBoYW5kbGVyLmFwcGx5KGUudGFyZ2V0LCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGb3JtRGF0YShmb3JtKSB7XG4gICAgcmV0dXJuIFtdLnJlZHVjZS5jYWxsKFxuICAgICAgICBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LCB0ZXh0YXJlYSwgc2VsZWN0JyksXG4gICAgICAgIChyZXN1bHQsIGZvcm1FbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZm9ybUVsZW1lbnQubXVsdGlwbGUgJiYgZm9ybUVsZW1lbnQub3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlcyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZm9ybUVsZW1lbnQub3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0gZm9ybUVsZW1lbnQub3B0aW9uc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChvcHRpb24udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdFtmb3JtRWxlbWVudC5uYW1lXSA9IHZhbHVlcztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W2Zvcm1FbGVtZW50Lm5hbWVdID0gZm9ybUVsZW1lbnQudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LCB7fVxuICAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsZWFkWmVybyhudW0pIHtcbiAgICByZXR1cm4gbnVtIDwgMTAgPyAnMCcgKyBudW0gOiBudW07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUaW1lKGRhdGUpIHtcbiAgICBpZiAodHlwZW9mIGRhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICB9XG4gICAgZGF0ZS5zZXRIb3VycyhkYXRlLmdldEhvdXJzKCksIGRhdGUuZ2V0TWludXRlcygpICsgZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpKTtcbiAgICByZXR1cm4gbGVhZFplcm8oZGF0ZS5nZXRIb3VycygpKSArIFwiOlwiICsgbGVhZFplcm8oZGF0ZS5nZXRNaW51dGVzKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlKSB7XG4gICAgaWYgKHR5cGVvZiBkYXRlID09PSAnc3RyaW5nJykge1xuICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgfVxuXG4gICAgbGV0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMSxcbiAgICAgICAgZGF5ID0gZGF0ZS5nZXREYXRlKCk7XG5cbiAgICByZXR1cm4gW2xlYWRaZXJvKGRheSksIGxlYWRaZXJvKG1vbnRoKSwgeWVhcl0uam9pbignLicpO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBjbGllbnQvanMvc3JjL2hlbHBlci5qcyIsImltcG9ydCByZXNvdXJjZSBmcm9tICcuLi9yZXNvdXJjZSc7XG5pbXBvcnQge2RlbGVnYXRlLCBnZXRGb3JtRGF0YX0gZnJvbSAnLi4vaGVscGVyJztcblxubGV0ICRsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jbGFzc3Jvb21MaXN0XCIpLFxuICAgICRhZGRGb3JtID0gZG9jdW1lbnQuZm9ybXMuY2xhc3Nyb29tQWRkO1xuXG4vLyDQv9C+0LvRg9GH0LjRgtGMINC40Lcg0LHQtCDQuCDQv9C+0LrQsNC30LDRgtGMXG5mdW5jdGlvbiBzaG93TGlzdCgpIHtcbiAgICByZXR1cm4gcmVzb3VyY2UubGlzdChcImNsYXNzcm9vbVwiKVxuICAgICAgICAudGhlbigoY2xhc3Nyb29tcykgPT4ge1xuICAgICAgICAgICAgY2xhc3Nyb29tcy5tYXAoKGl0ZW0pID0+IGl0ZW0uanNvbiA9IEpTT04uc3RyaW5naWZ5KGl0ZW0pKTtcbiAgICAgICAgICAgICRsaXN0LmlubmVySFRNTCA9IFNjaGVkdWxlQXBwLnRlbXBsYXRlcy5jbGFzc3Jvb20ubGlzdCh7aXRlbXM6IGNsYXNzcm9vbXN9KTtcbiAgICAgICAgfSk7XG59XG5cbi8vINC00L7QsdCw0LLQuNGC0Ywg0LDRg9C00LjRgtC+0YDQuNGOINCyINCx0LRcbmZ1bmN0aW9uIGFkZENsYXNzcm9vbShjbGFzc3Jvb21EYXRhKSB7XG4gICAgcmV0dXJuIHJlc291cmNlLmNyZWF0ZShcImNsYXNzcm9vbVwiLCBjbGFzc3Jvb21EYXRhKVxuICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzdWx0LmVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3VsdC5lcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xufVxuXG4vLyDRgNC10LTQsNC60YLQuNGA0L7QstCw0YLRjCDQsNGD0LTQuNGC0L7RgNC40Y4g0LIg0LHQtFxuZnVuY3Rpb24gZWRpdENsYXNzcm9vbShpZCwgY2xhc3Nyb29tRGF0YSkge1xuICAgIHJldHVybiByZXNvdXJjZS51cGRhdGUoXCJjbGFzc3Jvb21cIiwgaWQsIGNsYXNzcm9vbURhdGEpXG4gICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzdWx0LmVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbn1cblxuLy8g0YPQtNCw0LvQuNGC0Ywg0LDRg9C00LjRgtC+0YDQuNGOINC40Lcg0LHQtFxuZnVuY3Rpb24gcmVtb3ZlQ2xhc3Nyb29tKGlkKSB7XG4gICAgcmV0dXJuIHJlc291cmNlLnJlbW92ZShcImNsYXNzcm9vbVwiLCBpZClcbiAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5lcnJvcikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXN1bHQuZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbn1cblxuLy8g0YHQv9GA0Y/RgtCw0YLRjCDRhNC+0YDQvNGDINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y8g0LDRg9C00LjRgtC+0YDQuNC4XG5mdW5jdGlvbiBoaWRlRWRpdEZvcm0oZWxlbWVudCkge1xuICAgIGVsZW1lbnQuY2xvc2VzdChcIi5jbGFzc3Jvb20tZWRpdC1mb3JtXCIpLnJlbW92ZSgpO1xufVxuXG4vLyDQv9C+0LrQsNC30LDRgtGMINC+0YjQuNCx0LrRg1xuZnVuY3Rpb24gc2hvd0Vycm9yKG1zZykge1xuICAgIGFsZXJ0KG1zZyk7XG59XG5cbi8vINC/0L7Qu9GD0YfQuNGC0YwgaWRcbmZ1bmN0aW9uIGdldEl0ZW1JZChlbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuY2xvc2VzdChcIi5jbGFzc3Jvb20taXRlbVwiKS5kYXRhc2V0LmlkO1xufVxuXG4vLyDQvtGH0LjRgdGC0LjRgtGMINGE0L7RgNC80YMg0LTQvtCx0LDQstC70LXQvdC40Y9cbmZ1bmN0aW9uIGNsZWFyQWRkRm9ybSgpIHtcbiAgICAkYWRkRm9ybS5yZXNldCgpO1xufVxuXG4vLyDQvtCx0YDQsNCx0L7RgtC60LAg0YHQsNCx0LzQuNGC0LAg0YTQvtGA0LzRiyDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXG5mdW5jdGlvbiBlZGl0Rm9ybVN1Ym1pdEhhbmRsZXIoZXZlbnQpIHtcbiAgICBsZXQgbmV3Q2xhc3Nyb29tRGF0YSA9IGdldEZvcm1EYXRhKGV2ZW50LnRhcmdldCksXG4gICAgICAgICRzYXZlQnRuID0gZXZlbnQudGFyZ2V0LmVsZW1lbnRzLnNhdmU7XG5cbiAgICAkc2F2ZUJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgZWRpdENsYXNzcm9vbShuZXdDbGFzc3Jvb21EYXRhLmlkLCBuZXdDbGFzc3Jvb21EYXRhKVxuICAgICAgICAudGhlbihzaG93TGlzdClcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gc2hvd0Vycm9yKGVycm9yLm1lc3NhZ2UpKVxuICAgICAgICAudGhlbigoKSA9PiAkc2F2ZUJ0bi5kaXNhYmxlZCA9IGZhbHNlKTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59XG5cbi8vINC+0LHRgNCw0LHQvtGC0LrQsCDRgdCw0LHQvNC40YLQsCDRhNC+0YDQvNGLINC00L7QsdCw0LLQu9C10L3QuNGPXG5mdW5jdGlvbiBhZGRGb3JtU3VibWl0SGFuZGxlcihldmVudCkge1xuICAgIGxldCBjbGFzc3Jvb21EYXRhID0gZ2V0Rm9ybURhdGEoJGFkZEZvcm0pLFxuICAgICAgICAkYWRkQnRuID0gJGFkZEZvcm0uZWxlbWVudHMuYWRkO1xuXG4gICAgJGFkZEJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgYWRkQ2xhc3Nyb29tKGNsYXNzcm9vbURhdGEpXG4gICAgICAgIC50aGVuKHNob3dMaXN0KVxuICAgICAgICAudGhlbihjbGVhckFkZEZvcm0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHNob3dFcnJvcihlcnJvci5tZXNzYWdlKSlcbiAgICAgICAgLnRoZW4oKCkgPT4gJGFkZEJ0bi5kaXNhYmxlZCA9IGZhbHNlKTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59XG5cbi8vINC+0LHRgNCw0LHQvtGC0LrQsCDQutC70LjQutCwINC90LAg0LrQvdC+0L/QutGDINCj0LTQsNC70LjRgtGMXG5mdW5jdGlvbiByZW1vdmVDbGlja0hhbmRsZXIoZXZlbnQpIHtcbiAgICBsZXQgJGRlbGV0ZUJ0biA9IGV2ZW50LnRhcmdldCxcbiAgICAgICAgaWQgPSBnZXRJdGVtSWQoZXZlbnQudGFyZ2V0KTtcblxuICAgICRkZWxldGVCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgIHJlbW92ZUNsYXNzcm9vbShpZClcbiAgICAgICAgLnRoZW4oKCkgPT4gJGxpc3QucXVlcnlTZWxlY3RvcihgW2RhdGEtaWQ9XCIke2lkfVwiXWApLnJlbW92ZSgpKVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiBzaG93RXJyb3IoZXJyb3IubWVzc2FnZSkpXG4gICAgICAgIC50aGVuKCgpID0+ICRkZWxldGVCdG4uZGlzYWJsZWQgPSBmYWxzZSk7XG59XG5cbi8vINC+0LHRgNCw0LHQvtGC0LrQsCDQutC70LjQutCwINC90LAg0LrQvdC+0L/QutGDINCg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMXG5mdW5jdGlvbiBzaG93RWRpdEZvcm1IYW5kbGVyKGV2ZW50KSB7XG4gICAgbGV0ICRjbGFzc3Jvb21JdGVtID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCIuY2xhc3Nyb29tLWl0ZW1cIiksXG4gICAgICAgIG9sZENsYXNzcm9vbURhdGEgPSBKU09OLnBhcnNlKCRjbGFzc3Jvb21JdGVtLmRhdGFzZXQuY2xhc3Nyb29tKTtcblxuICAgIGxldCBlZGl0Rm9ybUNvbnRhaW5lciA9IFNjaGVkdWxlQXBwLnRlbXBsYXRlcy5jbGFzc3Jvb20uZWRpdChvbGRDbGFzc3Jvb21EYXRhKTtcblxuICAgICRjbGFzc3Jvb21JdGVtLmZpcnN0RWxlbWVudENoaWxkLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJFbmQnLCBlZGl0Rm9ybUNvbnRhaW5lcik7XG4gICAgJGNsYXNzcm9vbUl0ZW0ucXVlcnlTZWxlY3RvcihcImZvcm1cIikuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBlZGl0Rm9ybVN1Ym1pdEhhbmRsZXIpO1xufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIHNob3dMaXN0KCk7XG5cbiAgICAkYWRkRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGFkZEZvcm1TdWJtaXRIYW5kbGVyKTtcblxuICAgIGRlbGVnYXRlKCRsaXN0LCAnLmNsYXNzcm9vbS1kZWxldGUnLCAnY2xpY2snLCByZW1vdmVDbGlja0hhbmRsZXIpO1xuICAgIGRlbGVnYXRlKCRsaXN0LCAnLmNsYXNzcm9vbS1lZGl0JywgJ2NsaWNrJywgc2hvd0VkaXRGb3JtSGFuZGxlcik7XG4gICAgZGVsZWdhdGUoJGxpc3QsICcuY2xhc3Nyb29tLWVkaXQtY2FuY2VsJywgJ2NsaWNrJywgKGV2ZW50KSA9PiBoaWRlRWRpdEZvcm0oZXZlbnQudGFyZ2V0KSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gY2xpZW50L2pzL3NyYy9jbGFzc3Jvb20vY2xhc3Nyb29tLmpzIiwiaW1wb3J0IHJlc291cmNlIGZyb20gJy4uL3Jlc291cmNlJztcbmltcG9ydCB7ZGVsZWdhdGUsIGdldEZvcm1EYXRhLCBnZXRUaW1lLCBmb3JtYXREYXRlfSBmcm9tICcuLi9oZWxwZXInO1xuXG5sZXQgc2Nob29sTGlzdCA9IFtdLFxuICAgIGNsYXNzcm9vbUxpc3QgPSBbXSxcbiAgICAkbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGVjdHVyZUxpc3RcIiksXG4gICAgJGFkZEZvcm1Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxlY3R1cmUtYWRkLWNvbnRhaW5lclwiKSxcbiAgICAkYWRkRm9ybSA9IG51bGw7XG5cbi8vINC/0L7Qu9GD0YfQuNGC0Ywg0LvQtdC60YbQuNC4INC40Lcg0JHQlCDQuCDQv9C+0LrQsNC30LDRgtGMXG5mdW5jdGlvbiBzaG93TGlzdCgpIHtcbiAgICByZXR1cm4gcmVzb3VyY2UubGlzdChcImxlY3R1cmVcIilcbiAgICAgICAgLnRoZW4oKGxlY3R1cmVzKSA9PiB7XG4gICAgICAgICAgICBsZWN0dXJlcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtLmpzb24gPSBKU09OLnN0cmluZ2lmeShpdGVtKTtcbiAgICAgICAgICAgICAgICBpdGVtLmRhdGUgPSBmb3JtYXREYXRlKGl0ZW0uc3RhcnQpO1xuICAgICAgICAgICAgICAgIGl0ZW0uc3RhcnRUaW1lID0gZ2V0VGltZShpdGVtLnN0YXJ0KTtcbiAgICAgICAgICAgICAgICBpdGVtLmZpbmlzaFRpbWUgPSBnZXRUaW1lKGl0ZW0uZmluaXNoKTtcbiAgICAgICAgICAgICAgICBpdGVtLnNjaG9vbExpc3QgPSBpdGVtLnNjaG9vbC5tYXAoKGl0ZW0pID0+IGl0ZW0ubmFtZSkuam9pbihcIiwgXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkbGlzdC5pbm5lckhUTUwgPSBTY2hlZHVsZUFwcC50ZW1wbGF0ZXMubGVjdHVyZS5saXN0KHtpdGVtczogbGVjdHVyZXN9KTtcbiAgICAgICAgfSk7XG59XG5cbi8vINC00L7QsdCw0LLQuNGC0Ywg0LvQtdC60YbQuNGOINCyINCx0LRcbmZ1bmN0aW9uIGFkZExlY3R1cmUobGVjdHVyZURhdGEpIHtcbiAgICByZXR1cm4gcmVzb3VyY2UuY3JlYXRlKCdsZWN0dXJlJywgbGVjdHVyZURhdGEpXG4gICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzdWx0LmVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG59XG5cbi8vINGD0LTQsNC70LjRgtGMINC70LXQutC40Y4g0LjQtyDQsdC0XG5mdW5jdGlvbiByZW1vdmVMZWN0dXJlKGxlY3R1cmVJZCkge1xuICAgIHJldHVybiByZXNvdXJjZS5yZW1vdmUoJ2xlY3R1cmUnLCBsZWN0dXJlSWQpXG4gICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzdWx0LmVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG59XG5cbi8vINC40LfQvNC10L3QuNGC0Ywg0LvQtdC60YbQuNGOINCyINCx0LRcbmZ1bmN0aW9uIGVkaXRMZWN0dXJlKGxlY3R1cmVJZCwgbGVjdHVyZURhdGEpIHtcbiAgICByZXR1cm4gcmVzb3VyY2UudXBkYXRlKFwibGVjdHVyZVwiLCBsZWN0dXJlSWQsIGxlY3R1cmVEYXRhKVxuICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzdWx0LmVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3VsdC5lcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG59XG5cbi8vINGB0L7Qt9C00LDRgtGMINGE0L7RgNC80YMg0LTQvtCx0LDQstC70LXQvdC40Y8g0LvQtdC60YbQuNC4XG5mdW5jdGlvbiBjcmVhdGVBZGRGb3JtKCkge1xuICAgICRhZGRGb3JtQ29udGFpbmVyLmlubmVySFRNTCA9IFNjaGVkdWxlQXBwLnRlbXBsYXRlcy5sZWN0dXJlLmFkZCh7c2Nob29sOiBzY2hvb2xMaXN0LCBjbGFzc3Jvb206IGNsYXNzcm9vbUxpc3R9KTtcbiAgICByZXR1cm4gZG9jdW1lbnQuZm9ybXMubGVjdHVyZUFkZDtcbn1cblxuLy8g0YHQvtC30LTQsNGC0Ywg0YHQv9C40YHQvtC6IG9wdGlvbnNcbmZ1bmN0aW9uIGNyZWF0ZU9wdGlvbnMobGlzdCwgc2VsZWN0ZWRWYWx1ZXMpIHtcbiAgICBsZXQgb3B0aW9ucyA9IFtdO1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHNlbGVjdGVkVmFsdWVzKSkge1xuICAgICAgICBzZWxlY3RlZFZhbHVlcyA9IFtzZWxlY3RlZFZhbHVlc107XG4gICAgfVxuXG4gICAgbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGxldCBvcHRpb24gPSBPYmplY3QuYXNzaWduKHt9LCBpdGVtKTtcbiAgICAgICAgaWYgKHNlbGVjdGVkVmFsdWVzLmluZGV4T2Yob3B0aW9uLl9pZCkgIT09IC0xKSB7XG4gICAgICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIG9wdGlvbnMucHVzaChvcHRpb24pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9wdGlvbnM7XG59XG5cbi8vINC/0L7Qu9GD0YfQuNGC0YwgaWRcbmZ1bmN0aW9uIGdldEl0ZW1JZChlbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuY2xvc2VzdChcIi5sZWN0dXJlLWl0ZW1cIikuZGF0YXNldC5pZDtcbn1cblxuLy8g0L/QvtC60LDQt9Cw0YLRjCDQvtGI0LjQsdC60YNcbmZ1bmN0aW9uIHNob3dFcnJvcihtc2cpIHtcbiAgICBhbGVydChtc2cpO1xufVxuXG4vLyDQv9C+0LTQs9C+0YLQvtCy0LjRgtGMINC00LDQvdC90YvQtSDQv9C10YDQtdC0INGB0L7RhdGA0LDQvdC10L3QuNC10LxcbmZ1bmN0aW9uIHByZXBhcmVEYXRhQmVmb3JlU2F2aW5nKGxlY3R1cmVEYXRhKSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGxlY3R1cmVEYXRhLCB7XG4gICAgICAgIHN0YXJ0OiBgJHtsZWN0dXJlRGF0YS5kYXRlfVQke2xlY3R1cmVEYXRhLnN0YXJ0fTowMGAsXG4gICAgICAgIGZpbmlzaDogYCR7bGVjdHVyZURhdGEuZGF0ZX1UJHtsZWN0dXJlRGF0YS5maW5pc2h9OjAwYFxuICAgIH0pO1xufVxuXG4vLyDQv9GA0L7QstC10YDQuNGC0Ywg0LTQsNC90L3Ri9C1XG5mdW5jdGlvbiB2YWxpZGF0ZShsZWN0dXJlRGF0YSkge1xuICAgIGlmICghRGF0ZS5wYXJzZShsZWN0dXJlRGF0YS5kYXRlKSkge1xuICAgICAgICByZXR1cm4gc2hvd0Vycm9yKCfQndC10LrQvtGA0YDQtdC60YLQvdC+INCy0LLQtdC00LXQvdCwINC00LDRgtCwLCDRhNC+0YDQvNCw0YI6IFlZWVktTU0tREQnKTtcbiAgICB9XG5cbiAgICBpZiAoIURhdGUucGFyc2UobGVjdHVyZURhdGEuc3RhcnQpIHx8ICFEYXRlLnBhcnNlKGxlY3R1cmVEYXRhLmZpbmlzaCkpIHtcbiAgICAgICAgcmV0dXJuIHNob3dFcnJvcign0J3QtdC60L7RgNGA0LXQutGC0L3QviDQstCy0LXQtNC10L3QviDQstGA0LXQvNGPLCDRhNC+0YDQvNCw0YI6IEhIOm1tJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG59XG5cbi8vINC+0YfQuNGB0YLQuNGC0Ywg0YTQvtGA0LzRgyDQtNC+0LHQsNCy0LvQtdC90LjRj1xuZnVuY3Rpb24gY2xlYXJBZGRGb3JtKCkge1xuICAgICRhZGRGb3JtLnJlc2V0KCk7XG59XG5cbi8vINC+0LHRgNCw0LHQvtGC0LrQsCDRgdCw0LHQvNC40YLQsCDRhNC+0YDQvNGLINC00L7QsdCw0LLQu9C10L3QuNGPINC70LXQutGG0LjQuFxuZnVuY3Rpb24gYWRkRm9ybVN1Ym1pdEhhbmRsZXIoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgbGV0IGxlY3R1cmVEYXRhID0gZ2V0Rm9ybURhdGEoJGFkZEZvcm0pO1xuICAgIGxldCAkYWRkQnRuID0gJGFkZEZvcm0uZWxlbWVudHMuYWRkO1xuICAgIGxlY3R1cmVEYXRhID0gcHJlcGFyZURhdGFCZWZvcmVTYXZpbmcobGVjdHVyZURhdGEpO1xuXG4gICAgaWYgKHZhbGlkYXRlKGxlY3R1cmVEYXRhKSA9PT0gdHJ1ZSkge1xuICAgICAgICAkYWRkQnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgYWRkTGVjdHVyZShsZWN0dXJlRGF0YSlcbiAgICAgICAgICAgIC50aGVuKGNsZWFyQWRkRm9ybSlcbiAgICAgICAgICAgIC50aGVuKHNob3dMaXN0KVxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gc2hvd0Vycm9yKGVycm9yLm1lc3NhZ2UpKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gJGFkZEJ0bi5kaXNhYmxlZCA9IGZhbHNlKTtcbiAgICB9XG59XG5cbi8vINC+0LHRgNCw0LHQvtGC0LrQsCDQutC70LjQutCwINC90LAg0LrQvdC+0L/QutGDINCj0LTQsNC70LjRgtGMXG5mdW5jdGlvbiBkZWxldGVIYW5kbGVyKGV2ZW50KSB7XG4gICAgbGV0IGxlY3R1cmVJZCA9IGdldEl0ZW1JZChldmVudC50YXJnZXQpO1xuICAgIGxldCAkZGVsZXRlQnRuID0gZXZlbnQudGFyZ2V0O1xuXG4gICAgJGRlbGV0ZUJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgcmVtb3ZlTGVjdHVyZShsZWN0dXJlSWQpXG4gICAgICAgIC50aGVuKCgpID0+ICRsaXN0LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWlkPVwiJHtsZWN0dXJlSWR9XCJdYCkucmVtb3ZlKCkpXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHNob3dFcnJvcihlcnJvci5tZXNzYWdlKSlcbiAgICAgICAgLnRoZW4oKCkgPT4gJGRlbGV0ZUJ0bi5kaXNhYmxlZCA9IGZhbHNlKTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59XG5cbi8vINC+0LHRgNCw0LHQvtGC0LrQsCDRgdCw0LHQvNC40YLQsCDRhNC+0YDQvNGLINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y8g0LvQtdC60YbQuNC4XG5mdW5jdGlvbiBlZGl0Rm9ybVN1Ym1pdEhhbmRsZXIoZXZlbnQpIHtcbiAgICBsZXQgbmV3TGVjdHVyZURhdGEgPSBnZXRGb3JtRGF0YShldmVudC50YXJnZXQpO1xuICAgIGxldCAkZWRpdEJ0biA9IGV2ZW50LnRhcmdldC5lbGVtZW50cy5zYXZlO1xuICAgIG5ld0xlY3R1cmVEYXRhID0gcHJlcGFyZURhdGFCZWZvcmVTYXZpbmcobmV3TGVjdHVyZURhdGEpO1xuICAgICRlZGl0QnRuLmRpc2FibGVkID0gdHJ1ZTtcblxuICAgIGlmICh2YWxpZGF0ZShuZXdMZWN0dXJlRGF0YSkgPT09IHRydWUpIHtcbiAgICAgICAgZWRpdExlY3R1cmUobmV3TGVjdHVyZURhdGEuaWQsIG5ld0xlY3R1cmVEYXRhKVxuICAgICAgICAgICAgLnRoZW4oc2hvd0xpc3QpXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiBzaG93RXJyb3IoZXJyb3IpKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gJGVkaXRCdG4uZGlzYWJsZWQgPSBmYWxzZSk7XG4gICAgfVxuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn1cblxuLy8g0L7QsdGA0LDQsdC+0YLQutCwINC60LvQuNC60LAg0L3QsCDQutC90L7Qv9C60YMg0KDQtdC00LDQutGC0LjRgNC+0LLQsNGC0YxcbmZ1bmN0aW9uIHNob3dFZGl0Rm9ybUhhbmRsZXIoZXZlbnQpIHtcbiAgICBsZXQgJGxlY3R1cmVJdGVtID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCIubGVjdHVyZS1pdGVtXCIpO1xuXG4gICAgLy8g0L/QvtC00LPQvtGC0L7QstC60LAg0LTQsNC90L3Ri9GFINC6INGI0LDQsdC70L7QvdC40LfQsNGG0LjQuFxuICAgIGxldCBsZWN0dXJlRGF0YSA9IEpTT04ucGFyc2UoJGxlY3R1cmVJdGVtLmRhdGFzZXQubGVjdHVyZSk7XG4gICAgbGV0IGxlY3R1cmVTY2hvb2wgPSBsZWN0dXJlRGF0YS5zY2hvb2wubWFwKChpdGVtKSA9PiBpdGVtLl9pZCk7XG5cbiAgICBsZWN0dXJlRGF0YS5kYXRlID0gbGVjdHVyZURhdGEuc3RhcnQuc3Vic3RyaW5nKDAsIDEwKTtcbiAgICBsZWN0dXJlRGF0YS5zdGFydFRpbWUgPSBnZXRUaW1lKGxlY3R1cmVEYXRhLnN0YXJ0KTtcbiAgICBsZWN0dXJlRGF0YS5maW5pc2hUaW1lID0gZ2V0VGltZShsZWN0dXJlRGF0YS5maW5pc2gpO1xuICAgIGxlY3R1cmVEYXRhLnNjaG9vbExpc3QgPSBjcmVhdGVPcHRpb25zKHNjaG9vbExpc3QsIGxlY3R1cmVTY2hvb2wpO1xuICAgIGxlY3R1cmVEYXRhLmNsYXNzcm9vbUxpc3QgPSBjcmVhdGVPcHRpb25zKGNsYXNzcm9vbUxpc3QsIGxlY3R1cmVEYXRhLmNsYXNzcm9vbS5faWQpO1xuXG4gICAgLy8g0YDQtdC90LTQtdGAINGE0L7RgNC80YtcbiAgICBsZXQgZWRpdEZvcm1IdG1sID0gU2NoZWR1bGVBcHAudGVtcGxhdGVzLmxlY3R1cmUuZWRpdChsZWN0dXJlRGF0YSk7XG4gICAgJGxlY3R1cmVJdGVtLmZpcnN0RWxlbWVudENoaWxkLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJFbmQnLCBlZGl0Rm9ybUh0bWwpO1xuXG4gICAgJGxlY3R1cmVJdGVtLnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGVkaXRGb3JtU3VibWl0SGFuZGxlcik7XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG4vLyDRg9C00LDQu9C40YLRjCDRhNC+0YDQvNGDINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y8g0LvQtdC60YbQuNC4XG5mdW5jdGlvbiBoaWRlRWRpdEZvcm1IYW5kbGVyKGV2ZW50KSB7XG4gICAgZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCIubGVjdHVyZS1lZGl0LWZvcm1cIikucmVtb3ZlKCk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgc2hvd0xpc3QoKTtcblxuICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgcmVzb3VyY2UubGlzdChcInNjaG9vbFwiKSxcbiAgICAgICAgcmVzb3VyY2UubGlzdChcImNsYXNzcm9vbVwiKSxcbiAgICBdKS50aGVuKChyZXN1bHRzKSA9PiB7XG4gICAgICAgIHNjaG9vbExpc3QgPSByZXN1bHRzWzBdO1xuICAgICAgICBjbGFzc3Jvb21MaXN0ID0gcmVzdWx0c1sxXTtcblxuICAgICAgICAkYWRkRm9ybSA9IGNyZWF0ZUFkZEZvcm0oKTtcbiAgICAgICAgJGFkZEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBhZGRGb3JtU3VibWl0SGFuZGxlcik7XG4gICAgfSk7XG5cbiAgICBkZWxlZ2F0ZSgkbGlzdCwgJy5sZWN0dXJlLWRlbGV0ZScsICdjbGljaycsIGRlbGV0ZUhhbmRsZXIpO1xuICAgIGRlbGVnYXRlKCRsaXN0LCAnLmxlY3R1cmUtZWRpdCcsICdjbGljaycsIHNob3dFZGl0Rm9ybUhhbmRsZXIpO1xuICAgIGRlbGVnYXRlKCRsaXN0LCAnLmxlY3R1cmUtZWRpdC1jYW5jZWwnLCAnY2xpY2snLCBoaWRlRWRpdEZvcm1IYW5kbGVyKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge2luaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBjbGllbnQvanMvc3JjL2xlY3R1cmUvbGVjdHVyZS5qcyIsImltcG9ydCByZXNvdXJjZSBmcm9tICcuLi9yZXNvdXJjZSc7XG5pbXBvcnQge2dldFRpbWUsIGZvcm1hdERhdGUsIGxlYWRaZXJvfSBmcm9tICcuLi9oZWxwZXInO1xuXG5sZXQgJGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxlY3R1cmVMaXN0XCIpLFxuICAgICRmaWx0ZXJDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZpbHRlclwiKTtcblxuLy8g0L/QvtC60LDQt9Cw0YLRjCDRgdC/0LjRgdC+0Log0LvQtdC60YbQuNC5XG5mdW5jdGlvbiBzaG93TGlzdChxdWVyeSkge1xuICAgIHJldHVybiByZXNvdXJjZS5saXN0KFwibGVjdHVyZVwiLCBxdWVyeSlcbiAgICAgICAgLnRoZW4oKGxlY3R1cmVzKSA9PiB7XG4gICAgICAgICAgICBsZWN0dXJlcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtLmRhdGUgPSBmb3JtYXREYXRlKGl0ZW0uc3RhcnQpO1xuICAgICAgICAgICAgICAgIGl0ZW0uc3RhcnRUaW1lID0gZ2V0VGltZShpdGVtLnN0YXJ0KTtcbiAgICAgICAgICAgICAgICBpdGVtLmZpbmlzaFRpbWUgPSBnZXRUaW1lKGl0ZW0uZmluaXNoKTtcbiAgICAgICAgICAgICAgICBpdGVtLnNjaG9vbExpc3QgPSBpdGVtLnNjaG9vbC5tYXAoKGl0ZW0pID0+IGl0ZW0ubmFtZSkuam9pbihcIiwgXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkbGlzdC5pbm5lckhUTUwgPSBTY2hlZHVsZUFwcC50ZW1wbGF0ZXMuc2NoZWR1bGUoe2l0ZW1zOiBsZWN0dXJlc30pO1xuICAgICAgICB9KTtcbn1cblxuLy8g0L/QvtC60LDQt9Cw0YLRjCDRhNC40LvRjNGC0YBcbmZ1bmN0aW9uIHNob3dGaWx0ZXIoKSB7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgcmVzb3VyY2UubGlzdChcInNjaG9vbFwiKSxcbiAgICAgICAgcmVzb3VyY2UubGlzdChcImNsYXNzcm9vbVwiKSxcbiAgICBdKS50aGVuKChyZXN1bHRzKSA9PiB7XG4gICAgICAgICRmaWx0ZXJDb250YWluZXIuaW5uZXJIVE1MID0gU2NoZWR1bGVBcHAudGVtcGxhdGVzLmZpbHRlcih7XG4gICAgICAgICAgICBzY2hvb2xMaXN0OiByZXN1bHRzWzBdLFxuICAgICAgICAgICAgY2xhc3Nyb29tTGlzdDogcmVzdWx0c1sxXVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuLy8g0L/QvtC70YPRh9C40YLRjCDQtNCw0L3QvdGL0LUg0YEg0YTQvtGA0LzRiyDRhNC40LvRjNGC0YDQsNGG0LjQuFxuZnVuY3Rpb24gZ2V0RmlsdGVyVmFsdWVzKGZvcm0pIHtcbiAgICBsZXQgcXVlcnkgPSB7fTtcbiAgICBbXS5mb3JFYWNoLmNhbGwoZm9ybS5lbGVtZW50cywgKGVsZW1lbnQpID0+IHtcbiAgICAgICAgaWYgKGVsZW1lbnQudHlwZSAhPT0gJ3N1Ym1pdCcpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGZvcm0uZWxlbWVudHNbZWxlbWVudC5uYW1lXS52YWx1ZTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHF1ZXJ5W2VsZW1lbnQubmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHF1ZXJ5O1xufVxuXG4vLyDQvtCx0YDQsNCx0L7RgtCw0YLRjCDRgdCw0LHQvNC40YIg0YTQvtGA0LzRiyDRhNC40LvRjNGC0YDQsNGG0LjQuFxuZnVuY3Rpb24gZmlsdGVyU3VibWl0SGFuZGxlcihldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBsZXQgZm9ybSA9IGV2ZW50LnRhcmdldCxcbiAgICAgICAgZmlsdGVyQnRuID0gZm9ybS5lbGVtZW50cy5maWx0ZXI7XG5cbiAgICBsZXQgcXVlcnkgPSBnZXRGaWx0ZXJWYWx1ZXMoZm9ybSk7XG5cbiAgICBpZiAoKHF1ZXJ5LmZyb20gJiYgIURhdGUucGFyc2UocXVlcnkuZnJvbSkpIHx8IChxdWVyeS50byAmJiAhRGF0ZS5wYXJzZShxdWVyeS50bykpKSB7XG4gICAgICAgIHJldHVybiBhbGVydCgn0J3QtdC60L7RgNGA0LXQutGC0L3QviDQstCy0LXQtNC10L3QsCDQtNCw0YLQsCwg0YTQvtGA0LzQsNGCOiBZWVlZLU1NLUREJyk7XG4gICAgfVxuXG4gICAgaWYgKHF1ZXJ5LnRvKSB7XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUocXVlcnkudG8pO1xuICAgICAgICBsZXQgZGF0ZVdpdGhFbmRPZkRheSA9IG5ldyBEYXRlKGRhdGUuZ2V0VGltZSgpICsgMjQqNjAqNjAwMDAgLSAxKTtcbiAgICAgICAgcXVlcnkudG8gPSBEYXRlLnBhcnNlKGRhdGVXaXRoRW5kT2ZEYXkpO1xuICAgIH1cblxuICAgIGZpbHRlckJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgc2hvd0xpc3QocXVlcnkpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGZpbHRlckJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBzaG93TGlzdCgpO1xuXG4gICAgc2hvd0ZpbHRlcigpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGxldCAkZmlsdGVyRm9ybSA9ICRmaWx0ZXJDb250YWluZXIucXVlcnlTZWxlY3RvcihcImZvcm1cIik7XG4gICAgICAgICAgICAkZmlsdGVyRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZpbHRlclN1Ym1pdEhhbmRsZXIpXG4gICAgICAgIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7aW5pdH07XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGNsaWVudC9qcy9zcmMvc2NoZWR1bGUvc2NoZWR1bGUuanMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3RDQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFBQTtBQUNBOzs7OztBQUNBO0FBQUE7QUFBQTtBQUFBOzs7Ozs7Ozs7Ozs7QUNMQTtBQUNBOzs7QUFBQTtBQUNBOzs7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUdBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzFIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFFQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUlBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBSUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUVBO0FBQUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMvQ0E7QUFRQTtBQXFCQTtBQUlBO0FBUUE7QUF6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUdBOzs7Ozs7Ozs7Ozs7O0FDbERBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM5SEE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbk5BO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=