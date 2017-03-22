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

	var _resource = __webpack_require__(7);

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
	    addSchool(schoolData).then(showList).catch(function (error) {
	        return showError(error.message);
	    }).then(function () {
	        $addBtn.disabled = false;
	        $addForm.reset();
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
/* 2 */,
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

	var _resource = __webpack_require__(7);

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

	var _resource = __webpack_require__(7);

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
	    lectureData.start = lectureData.date + 'T' + lectureData.start + ':00';
	    lectureData.finish = lectureData.date + 'T' + lectureData.finish + ':00';

	    return lectureData;
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

	var _resource = __webpack_require__(7);

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

	// обработать сабмит формы фильтрации
	function filterSubmitHandler(event) {
	    var form = event.target,
	        filterBtn = form.elements.filter,
	        query = {};

	    filterBtn.disabled = true;

	    [].forEach.call(form.elements, function (element) {
	        if (element !== filterBtn) {
	            var value = form.elements[element.name].value;
	            if (value) {
	                query[element.name] = value;
	            }
	        }
	    });

	    if (query.to) {
	        var date = new Date(query.to);
	        query.to = Date.parse(date.getFullYear() + '-' + (0, _helper.leadZero)(date.getMonth() + 1) + '-' + (0, _helper.leadZero)(date.getDate()) + ' 23:59:59');
	    }

	    showList(query).then(function () {
	        filterBtn.disabled = false;
	    });

	    event.preventDefault();
	}

	function init() {
	    showList();

	    showFilter().then(function () {
	        var $filterForm = $filterContainer.querySelector("form");
	        $filterForm.addEventListener("submit", filterSubmitHandler);
	    });
	}

	exports.default = { init: init };

/***/ }),
/* 7 */
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

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDg4YjIwODg3MzdlMGE4NjI2MWYyIiwid2VicGFjazovLy9jbGllbnQvanMvc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vY2xpZW50L2pzL3NyYy9zY2hvb2wvc2Nob29sLmpzIiwid2VicGFjazovLy9jbGllbnQvanMvc3JjL2hlbHBlci5qcyIsIndlYnBhY2s6Ly8vY2xpZW50L2pzL3NyYy9jbGFzc3Jvb20vY2xhc3Nyb29tLmpzIiwid2VicGFjazovLy9jbGllbnQvanMvc3JjL2xlY3R1cmUvbGVjdHVyZS5qcyIsIndlYnBhY2s6Ly8vY2xpZW50L2pzL3NyYy9zY2hlZHVsZS9zY2hlZHVsZS5qcyIsIndlYnBhY2s6Ly8vY2xpZW50L2pzL3NyYy9yZXNvdXJjZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA4OGIyMDg4NzM3ZTBhODYyNjFmMiIsImltcG9ydCBzY2hvb2wgZnJvbSAnLi9zY2hvb2wvc2Nob29sJztcbmltcG9ydCBjbGFzc3Jvb20gZnJvbSAnLi9jbGFzc3Jvb20vY2xhc3Nyb29tJztcbmltcG9ydCBsZWN0dXJlIGZyb20gJy4vbGVjdHVyZS9sZWN0dXJlJztcbmltcG9ydCBzY2hlZHVsZSBmcm9tICcuL3NjaGVkdWxlL3NjaGVkdWxlJztcblxuZXhwb3J0IHtzY2hvb2wsIGNsYXNzcm9vbSwgbGVjdHVyZSwgc2NoZWR1bGV9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBjbGllbnQvanMvc3JjL2FwcC5qcyIsImltcG9ydCByZXNvdXJjZSBmcm9tICcuLi9yZXNvdXJjZSc7XG5pbXBvcnQge2RlbGVnYXRlLCBnZXRGb3JtRGF0YX0gZnJvbSAnLi4vaGVscGVyJztcblxubGV0ICRsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zY2hvb2xMaXN0XCIpLFxuICAgICRhZGRGb3JtID0gZG9jdW1lbnQuZm9ybXMuc2Nob29sQWRkO1xuXG4vLyDQv9C+0LvRg9GH0LjRgtGMINC40Lcg0LHQtCDQuCDQv9C+0LrQsNC30LDRgtGMINGB0L/QuNGB0L7QuiDRiNC60L7Qu1xuZnVuY3Rpb24gc2hvd0xpc3QoKSB7XG4gICAgcmV0dXJuIHJlc291cmNlLmxpc3QoXCJzY2hvb2xcIilcbiAgICAgICAgLnRoZW4oKHNjaG9vbHMpID0+IHtcbiAgICAgICAgICAgIHNjaG9vbHMubWFwKChpdGVtKSA9PiBpdGVtLmpzb24gPSBKU09OLnN0cmluZ2lmeShpdGVtKSk7XG4gICAgICAgICAgICAkbGlzdC5pbm5lckhUTUwgPSBTY2hlZHVsZUFwcC50ZW1wbGF0ZXMuc2Nob29sLmxpc3Qoe2l0ZW1zOiBzY2hvb2xzfSk7XG4gICAgICAgIH0pO1xufVxuXG4vLyDQtNC+0LHQsNCy0LjRgtGMINGI0LrQvtC70YMg0LIg0LHQtFxuZnVuY3Rpb24gYWRkU2Nob29sKHNjaG9vbERhdGEpIHtcbiAgICByZXR1cm4gcmVzb3VyY2UuY3JlYXRlKFwic2Nob29sXCIsIHNjaG9vbERhdGEpXG4gICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzdWx0LmVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG59XG5cbi8vINGA0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMINGI0LrQvtC70YMg0LIg0LHQtFxuZnVuY3Rpb24gZWRpdFNjaG9vbChpZCwgc2Nob29sRGF0YSkge1xuICAgIHJldHVybiByZXNvdXJjZS51cGRhdGUoXCJzY2hvb2xcIiwgaWQsIHNjaG9vbERhdGEpXG4gICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzdWx0LmVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG59XG5cbi8v0YPQtNCw0LvQuNGC0Ywg0YjQutC+0LvRgyDQuNC3INCR0JRcbmZ1bmN0aW9uIHJlbW92ZVNjaG9vbChpZCkge1xuICAgIHJldHVybiByZXNvdXJjZS5yZW1vdmUoXCJzY2hvb2xcIiwgaWQpXG4gICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzdWx0LmVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG59XG5cbi8v0YPQsdGA0LDRgtGMINGE0L7RgNC80YMg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xuZnVuY3Rpb24gaGlkZUVkaXRGb3JtKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LmNsb3Nlc3QoXCIuc2Nob29sLWVkaXQtZm9ybVwiKS5yZW1vdmUoKTtcbn1cblxuLy8g0L/QvtC60LDQt9Cw0YLRjCDQvtGI0LjQsdC60YNcbmZ1bmN0aW9uIHNob3dFcnJvcihtc2cpIHtcbiAgICBhbGVydChtc2cpO1xufVxuXG4vL9C/0L7Qu9GD0YfQuNGC0YwgaWQg0YjQutC+0LvRiyDQv9C+IGRhdGEt0LDRgtGA0LjQsdGD0YLRg1xuZnVuY3Rpb24gZ2V0SXRlbUlkKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudC5jbG9zZXN0KFwiLnNjaG9vbC1pdGVtXCIpLmRhdGFzZXQuaWQ7XG59XG5cbi8vINC+0LHRgNCw0LHQvtGC0LrQsCDQvtGC0L/RgNCw0LLQutC4INGE0L7RgNC80Ysg0YDQtdC00LDQutGC0LjRgNC+0LLQsNC90LjRj1xuZnVuY3Rpb24gZWRpdEZvcm1TdWJtaXRIYW5kbGVyKGV2ZW50KSB7XG4gICAgbGV0IGVkaXRGb3JtID0gZXZlbnQudGFyZ2V0LFxuICAgICAgICBlZGl0QnRuID0gZWRpdEZvcm0uZWxlbWVudHMuc2F2ZSxcbiAgICAgICAgbmV3U2Nob29sRGF0YSA9IGdldEZvcm1EYXRhKGVkaXRGb3JtKTtcblxuICAgIGVkaXRCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgIGVkaXRTY2hvb2wobmV3U2Nob29sRGF0YS5pZCwgbmV3U2Nob29sRGF0YSlcbiAgICAgICAgLnRoZW4oc2hvd0xpc3QpXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHNob3dFcnJvcihlcnJvci5tZXNzYWdlKSlcbiAgICAgICAgLnRoZW4oKCkgPT4gZWRpdEJ0bi5kaXNhYmxlZCA9IGZhbHNlKTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59XG5cbi8vINC+0LHRgNCw0LHQvtGC0LrQsCDQvtGC0L/RgNCw0LLQutC4INGE0L7RgNC80Ysg0LTQvtCx0LDQstC70LXQvdC40Y9cbmZ1bmN0aW9uIGFkZEZvcm1TdWJtaXRIYW5kbGVyKGV2ZW50KSB7XG4gICAgbGV0IHNjaG9vbERhdGEgPSBnZXRGb3JtRGF0YSgkYWRkRm9ybSksXG4gICAgICAgICRhZGRCdG4gPSAkYWRkRm9ybS5lbGVtZW50cy5hZGRTY2hvb2xCdG47XG5cbiAgICAkYWRkQnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICBhZGRTY2hvb2woc2Nob29sRGF0YSlcbiAgICAgICAgLnRoZW4oc2hvd0xpc3QpXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHNob3dFcnJvcihlcnJvci5tZXNzYWdlKSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgJGFkZEJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgJGFkZEZvcm0ucmVzZXQoKTtcbiAgICAgICAgfSk7XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG4vLyDQvtCx0YDQsNCx0L7RgtC60LAg0LrQu9C40LrQsCDQvdCwINC60L3QvtC/0LrRgyDRg9C00LDQu9C40YLRjFxuZnVuY3Rpb24gcmVtb3ZlQ2xpY2tIYW5kbGVyKGV2ZW50KSB7XG4gICAgbGV0ICRkZWxldGVCdG4gPSBldmVudC50YXJnZXQsXG4gICAgICAgIGlkID0gZ2V0SXRlbUlkKGV2ZW50LnRhcmdldCk7XG5cbiAgICAkZGVsZXRlQnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICByZW1vdmVTY2hvb2woaWQpXG4gICAgICAgIC50aGVuKCgpID0+ICRsaXN0LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWlkPVwiJHtpZH1cIl1gKS5yZW1vdmUoKSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gc2hvd0Vycm9yKGVycm9yLm1lc3NhZ2UpKVxuICAgICAgICAudGhlbigoKSA9PiAkZGVsZXRlQnRuLmRpc2FibGVkID0gZmFsc2UpO1xufVxuXG4vL9C/0L7QutCw0LfQsNGC0Ywg0YTQvtGA0LzRgyDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPINGI0LrQvtC70YtcbmZ1bmN0aW9uIHNob3dFZGl0Rm9ybUhhbmRsZXIoZXZlbnQpIHtcbiAgICBsZXQgJHNjaG9vbEl0ZW0gPSBldmVudC50YXJnZXQuY2xvc2VzdChcIi5zY2hvb2wtaXRlbVwiKSxcbiAgICAgICAgb2xkU2Nob29sRGF0YSA9IEpTT04ucGFyc2UoJHNjaG9vbEl0ZW0uZGF0YXNldC5zY2hvb2wpO1xuXG4gICAgbGV0IGVkaXRGb3JtQ29udGFpbmVyID0gU2NoZWR1bGVBcHAudGVtcGxhdGVzLnNjaG9vbC5lZGl0KG9sZFNjaG9vbERhdGEpO1xuXG4gICAgJHNjaG9vbEl0ZW0uZmlyc3RFbGVtZW50Q2hpbGQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlckVuZCcsIGVkaXRGb3JtQ29udGFpbmVyKTtcbiAgICAkc2Nob29sSXRlbS5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGVkaXRGb3JtU3VibWl0SGFuZGxlcik7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgc2hvd0xpc3QoKTtcblxuICAgICRhZGRGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgYWRkRm9ybVN1Ym1pdEhhbmRsZXIpO1xuXG4gICAgZGVsZWdhdGUoJGxpc3QsICcuc2Nob29sLWRlbGV0ZScsICdjbGljaycsIHJlbW92ZUNsaWNrSGFuZGxlcik7XG4gICAgZGVsZWdhdGUoJGxpc3QsICcuc2Nob29sLWVkaXQnLCAnY2xpY2snLCBzaG93RWRpdEZvcm1IYW5kbGVyKTtcbiAgICBkZWxlZ2F0ZSgkbGlzdCwgJy5zY2hvb2wtZWRpdC1jYW5jZWwnLCAnY2xpY2snLCAoZXZlbnQpID0+IGhpZGVFZGl0Rm9ybShldmVudC50YXJnZXQpKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge2luaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBjbGllbnQvanMvc3JjL3NjaG9vbC9zY2hvb2wuanMiLCJleHBvcnQgZnVuY3Rpb24gZGVsZWdhdGUoY29udGFpbmVyLCBzZWxlY3RvciwgZXZlbnQsIGhhbmRsZXIpIHtcbiAgICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGUudGFyZ2V0Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICBoYW5kbGVyLmFwcGx5KGUudGFyZ2V0LCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGb3JtRGF0YShmb3JtKSB7XG4gICAgcmV0dXJuIFtdLnJlZHVjZS5jYWxsKFxuICAgICAgICBmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LCB0ZXh0YXJlYSwgc2VsZWN0JyksXG4gICAgICAgIChyZXN1bHQsIGZvcm1FbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBpZiAoZm9ybUVsZW1lbnQubXVsdGlwbGUgJiYgZm9ybUVsZW1lbnQub3B0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbHVlcyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZm9ybUVsZW1lbnQub3B0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgb3B0aW9uID0gZm9ybUVsZW1lbnQub3B0aW9uc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYob3B0aW9uLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMucHVzaChvcHRpb24udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdFtmb3JtRWxlbWVudC5uYW1lXSA9IHZhbHVlcztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W2Zvcm1FbGVtZW50Lm5hbWVdID0gZm9ybUVsZW1lbnQudmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LCB7fVxuICAgICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsZWFkWmVybyhudW0pIHtcbiAgICByZXR1cm4gbnVtIDwgMTAgPyAnMCcgKyBudW0gOiBudW07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUaW1lKGRhdGUpIHtcbiAgICBpZiAodHlwZW9mIGRhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcbiAgICB9XG4gICAgZGF0ZS5zZXRIb3VycyhkYXRlLmdldEhvdXJzKCksIGRhdGUuZ2V0TWludXRlcygpICsgZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpKTtcbiAgICByZXR1cm4gbGVhZFplcm8oZGF0ZS5nZXRIb3VycygpKSArIFwiOlwiICsgbGVhZFplcm8oZGF0ZS5nZXRNaW51dGVzKCkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlKSB7XG4gICAgaWYgKHR5cGVvZiBkYXRlID09PSAnc3RyaW5nJykge1xuICAgICAgICBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XG4gICAgfVxuXG4gICAgbGV0IHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCksXG4gICAgICAgIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMSxcbiAgICAgICAgZGF5ID0gZGF0ZS5nZXREYXRlKCk7XG5cbiAgICByZXR1cm4gW2xlYWRaZXJvKGRheSksIGxlYWRaZXJvKG1vbnRoKSwgeWVhcl0uam9pbignLicpO1xufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBjbGllbnQvanMvc3JjL2hlbHBlci5qcyIsImltcG9ydCByZXNvdXJjZSBmcm9tICcuLi9yZXNvdXJjZSc7XG5pbXBvcnQge2RlbGVnYXRlLCBnZXRGb3JtRGF0YX0gZnJvbSAnLi4vaGVscGVyJztcblxubGV0ICRsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jbGFzc3Jvb21MaXN0XCIpLFxuICAgICRhZGRGb3JtID0gZG9jdW1lbnQuZm9ybXMuY2xhc3Nyb29tQWRkO1xuXG4vLyDQv9C+0LvRg9GH0LjRgtGMINC40Lcg0LHQtCDQuCDQv9C+0LrQsNC30LDRgtGMXG5mdW5jdGlvbiBzaG93TGlzdCgpIHtcbiAgICByZXR1cm4gcmVzb3VyY2UubGlzdChcImNsYXNzcm9vbVwiKVxuICAgICAgICAudGhlbigoY2xhc3Nyb29tcykgPT4ge1xuICAgICAgICAgICAgY2xhc3Nyb29tcy5tYXAoKGl0ZW0pID0+IGl0ZW0uanNvbiA9IEpTT04uc3RyaW5naWZ5KGl0ZW0pKTtcbiAgICAgICAgICAgICRsaXN0LmlubmVySFRNTCA9IFNjaGVkdWxlQXBwLnRlbXBsYXRlcy5jbGFzc3Jvb20ubGlzdCh7aXRlbXM6IGNsYXNzcm9vbXN9KTtcbiAgICAgICAgfSk7XG59XG5cbi8vINC00L7QsdCw0LLQuNGC0Ywg0LDRg9C00LjRgtC+0YDQuNGOINCyINCx0LRcbmZ1bmN0aW9uIGFkZENsYXNzcm9vbShjbGFzc3Jvb21EYXRhKSB7XG4gICAgcmV0dXJuIHJlc291cmNlLmNyZWF0ZShcImNsYXNzcm9vbVwiLCBjbGFzc3Jvb21EYXRhKVxuICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzdWx0LmVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3VsdC5lcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xufVxuXG4vLyDRgNC10LTQsNC60YLQuNGA0L7QstCw0YLRjCDQsNGD0LTQuNGC0L7RgNC40Y4g0LIg0LHQtFxuZnVuY3Rpb24gZWRpdENsYXNzcm9vbShpZCwgY2xhc3Nyb29tRGF0YSkge1xuICAgIHJldHVybiByZXNvdXJjZS51cGRhdGUoXCJjbGFzc3Jvb21cIiwgaWQsIGNsYXNzcm9vbURhdGEpXG4gICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzdWx0LmVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbn1cblxuLy8g0YPQtNCw0LvQuNGC0Ywg0LDRg9C00LjRgtC+0YDQuNGOINC40Lcg0LHQtFxuZnVuY3Rpb24gcmVtb3ZlQ2xhc3Nyb29tKGlkKSB7XG4gICAgcmV0dXJuIHJlc291cmNlLnJlbW92ZShcImNsYXNzcm9vbVwiLCBpZClcbiAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3VsdC5lcnJvcikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyZXN1bHQuZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbn1cblxuLy8g0YHQv9GA0Y/RgtCw0YLRjCDRhNC+0YDQvNGDINGA0LXQtNCw0LrRgtC40YDQvtCy0LDQvdC40Y8g0LDRg9C00LjRgtC+0YDQuNC4XG5mdW5jdGlvbiBoaWRlRWRpdEZvcm0oZWxlbWVudCkge1xuICAgIGVsZW1lbnQuY2xvc2VzdChcIi5jbGFzc3Jvb20tZWRpdC1mb3JtXCIpLnJlbW92ZSgpO1xufVxuXG4vLyDQv9C+0LrQsNC30LDRgtGMINC+0YjQuNCx0LrRg1xuZnVuY3Rpb24gc2hvd0Vycm9yKG1zZykge1xuICAgIGFsZXJ0KG1zZyk7XG59XG5cbi8vINC/0L7Qu9GD0YfQuNGC0YwgaWRcbmZ1bmN0aW9uIGdldEl0ZW1JZChlbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuY2xvc2VzdChcIi5jbGFzc3Jvb20taXRlbVwiKS5kYXRhc2V0LmlkO1xufVxuXG4vLyDQvtGH0LjRgdGC0LjRgtGMINGE0L7RgNC80YMg0LTQvtCx0LDQstC70LXQvdC40Y9cbmZ1bmN0aW9uIGNsZWFyQWRkRm9ybSgpIHtcbiAgICAkYWRkRm9ybS5yZXNldCgpO1xufVxuXG4vLyDQvtCx0YDQsNCx0L7RgtC60LAg0YHQsNCx0LzQuNGC0LAg0YTQvtGA0LzRiyDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPXG5mdW5jdGlvbiBlZGl0Rm9ybVN1Ym1pdEhhbmRsZXIoZXZlbnQpIHtcbiAgICBsZXQgbmV3Q2xhc3Nyb29tRGF0YSA9IGdldEZvcm1EYXRhKGV2ZW50LnRhcmdldCksXG4gICAgICAgICRzYXZlQnRuID0gZXZlbnQudGFyZ2V0LmVsZW1lbnRzLnNhdmU7XG5cbiAgICAkc2F2ZUJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgZWRpdENsYXNzcm9vbShuZXdDbGFzc3Jvb21EYXRhLmlkLCBuZXdDbGFzc3Jvb21EYXRhKVxuICAgICAgICAudGhlbihzaG93TGlzdClcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gc2hvd0Vycm9yKGVycm9yLm1lc3NhZ2UpKVxuICAgICAgICAudGhlbigoKSA9PiAkc2F2ZUJ0bi5kaXNhYmxlZCA9IGZhbHNlKTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59XG5cbi8vINC+0LHRgNCw0LHQvtGC0LrQsCDRgdCw0LHQvNC40YLQsCDRhNC+0YDQvNGLINC00L7QsdCw0LLQu9C10L3QuNGPXG5mdW5jdGlvbiBhZGRGb3JtU3VibWl0SGFuZGxlcihldmVudCkge1xuICAgIGxldCBjbGFzc3Jvb21EYXRhID0gZ2V0Rm9ybURhdGEoJGFkZEZvcm0pLFxuICAgICAgICAkYWRkQnRuID0gJGFkZEZvcm0uZWxlbWVudHMuYWRkO1xuXG4gICAgJGFkZEJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgYWRkQ2xhc3Nyb29tKGNsYXNzcm9vbURhdGEpXG4gICAgICAgIC50aGVuKHNob3dMaXN0KVxuICAgICAgICAudGhlbihjbGVhckFkZEZvcm0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHNob3dFcnJvcihlcnJvci5tZXNzYWdlKSlcbiAgICAgICAgLnRoZW4oKCkgPT4gJGFkZEJ0bi5kaXNhYmxlZCA9IGZhbHNlKTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59XG5cbi8vINC+0LHRgNCw0LHQvtGC0LrQsCDQutC70LjQutCwINC90LAg0LrQvdC+0L/QutGDINCj0LTQsNC70LjRgtGMXG5mdW5jdGlvbiByZW1vdmVDbGlja0hhbmRsZXIoZXZlbnQpIHtcbiAgICBsZXQgJGRlbGV0ZUJ0biA9IGV2ZW50LnRhcmdldCxcbiAgICAgICAgaWQgPSBnZXRJdGVtSWQoZXZlbnQudGFyZ2V0KTtcblxuICAgICRkZWxldGVCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgIHJlbW92ZUNsYXNzcm9vbShpZClcbiAgICAgICAgLnRoZW4oKCkgPT4gJGxpc3QucXVlcnlTZWxlY3RvcihgW2RhdGEtaWQ9XCIke2lkfVwiXWApLnJlbW92ZSgpKVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiBzaG93RXJyb3IoZXJyb3IubWVzc2FnZSkpXG4gICAgICAgIC50aGVuKCgpID0+ICRkZWxldGVCdG4uZGlzYWJsZWQgPSBmYWxzZSk7XG59XG5cbi8vINC+0LHRgNCw0LHQvtGC0LrQsCDQutC70LjQutCwINC90LAg0LrQvdC+0L/QutGDINCg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMXG5mdW5jdGlvbiBzaG93RWRpdEZvcm1IYW5kbGVyKGV2ZW50KSB7XG4gICAgbGV0ICRjbGFzc3Jvb21JdGVtID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoXCIuY2xhc3Nyb29tLWl0ZW1cIiksXG4gICAgICAgIG9sZENsYXNzcm9vbURhdGEgPSBKU09OLnBhcnNlKCRjbGFzc3Jvb21JdGVtLmRhdGFzZXQuY2xhc3Nyb29tKTtcblxuICAgIGxldCBlZGl0Rm9ybUNvbnRhaW5lciA9IFNjaGVkdWxlQXBwLnRlbXBsYXRlcy5jbGFzc3Jvb20uZWRpdChvbGRDbGFzc3Jvb21EYXRhKTtcblxuICAgICRjbGFzc3Jvb21JdGVtLmZpcnN0RWxlbWVudENoaWxkLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJFbmQnLCBlZGl0Rm9ybUNvbnRhaW5lcik7XG4gICAgJGNsYXNzcm9vbUl0ZW0ucXVlcnlTZWxlY3RvcihcImZvcm1cIikuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBlZGl0Rm9ybVN1Ym1pdEhhbmRsZXIpO1xufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIHNob3dMaXN0KCk7XG5cbiAgICAkYWRkRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGFkZEZvcm1TdWJtaXRIYW5kbGVyKTtcblxuICAgIGRlbGVnYXRlKCRsaXN0LCAnLmNsYXNzcm9vbS1kZWxldGUnLCAnY2xpY2snLCByZW1vdmVDbGlja0hhbmRsZXIpO1xuICAgIGRlbGVnYXRlKCRsaXN0LCAnLmNsYXNzcm9vbS1lZGl0JywgJ2NsaWNrJywgc2hvd0VkaXRGb3JtSGFuZGxlcik7XG4gICAgZGVsZWdhdGUoJGxpc3QsICcuY2xhc3Nyb29tLWVkaXQtY2FuY2VsJywgJ2NsaWNrJywgKGV2ZW50KSA9PiBoaWRlRWRpdEZvcm0oZXZlbnQudGFyZ2V0KSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gY2xpZW50L2pzL3NyYy9jbGFzc3Jvb20vY2xhc3Nyb29tLmpzIiwiaW1wb3J0IHJlc291cmNlIGZyb20gJy4uL3Jlc291cmNlJztcbmltcG9ydCB7ZGVsZWdhdGUsIGdldEZvcm1EYXRhLCBnZXRUaW1lLCBmb3JtYXREYXRlfSBmcm9tICcuLi9oZWxwZXInO1xuXG5sZXQgc2Nob29sTGlzdCA9IFtdLFxuICAgIGNsYXNzcm9vbUxpc3QgPSBbXSxcbiAgICAkbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGVjdHVyZUxpc3RcIiksXG4gICAgJGFkZEZvcm1Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxlY3R1cmUtYWRkLWNvbnRhaW5lclwiKSxcbiAgICAkYWRkRm9ybSA9IG51bGw7XG5cbi8vINC/0L7Qu9GD0YfQuNGC0Ywg0LvQtdC60YbQuNC4INC40Lcg0JHQlCDQuCDQv9C+0LrQsNC30LDRgtGMXG5mdW5jdGlvbiBzaG93TGlzdCgpIHtcbiAgICByZXR1cm4gcmVzb3VyY2UubGlzdChcImxlY3R1cmVcIilcbiAgICAgICAgLnRoZW4oKGxlY3R1cmVzKSA9PiB7XG4gICAgICAgICAgICBsZWN0dXJlcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgICBpdGVtLmpzb24gPSBKU09OLnN0cmluZ2lmeShpdGVtKTtcbiAgICAgICAgICAgICAgICBpdGVtLmRhdGUgPSBmb3JtYXREYXRlKGl0ZW0uc3RhcnQpO1xuICAgICAgICAgICAgICAgIGl0ZW0uc3RhcnRUaW1lID0gZ2V0VGltZShpdGVtLnN0YXJ0KTtcbiAgICAgICAgICAgICAgICBpdGVtLmZpbmlzaFRpbWUgPSBnZXRUaW1lKGl0ZW0uZmluaXNoKTtcbiAgICAgICAgICAgICAgICBpdGVtLnNjaG9vbExpc3QgPSBpdGVtLnNjaG9vbC5tYXAoKGl0ZW0pID0+IGl0ZW0ubmFtZSkuam9pbihcIiwgXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkbGlzdC5pbm5lckhUTUwgPSBTY2hlZHVsZUFwcC50ZW1wbGF0ZXMubGVjdHVyZS5saXN0KHtpdGVtczogbGVjdHVyZXN9KTtcbiAgICAgICAgfSk7XG59XG5cbi8vINC00L7QsdCw0LLQuNGC0Ywg0LvQtdC60YbQuNGOINCyINCx0LRcbmZ1bmN0aW9uIGFkZExlY3R1cmUobGVjdHVyZURhdGEpIHtcbiAgICByZXR1cm4gcmVzb3VyY2UuY3JlYXRlKCdsZWN0dXJlJywgbGVjdHVyZURhdGEpXG4gICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzdWx0LmVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG59XG5cbi8vINGD0LTQsNC70LjRgtGMINC70LXQutC40Y4g0LjQtyDQsdC0XG5mdW5jdGlvbiByZW1vdmVMZWN0dXJlKGxlY3R1cmVJZCkge1xuICAgIHJldHVybiByZXNvdXJjZS5yZW1vdmUoJ2xlY3R1cmUnLCBsZWN0dXJlSWQpXG4gICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IocmVzdWx0LmVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG59XG5cbi8vINC40LfQvNC10L3QuNGC0Ywg0LvQtdC60YbQuNGOINCyINCx0LRcbmZ1bmN0aW9uIGVkaXRMZWN0dXJlKGxlY3R1cmVJZCwgbGVjdHVyZURhdGEpIHtcbiAgICByZXR1cm4gcmVzb3VyY2UudXBkYXRlKFwibGVjdHVyZVwiLCBsZWN0dXJlSWQsIGxlY3R1cmVEYXRhKVxuICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzdWx0LmVycm9yKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHJlc3VsdC5lcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG59XG5cbi8vINGB0L7Qt9C00LDRgtGMINGE0L7RgNC80YMg0LTQvtCx0LDQstC70LXQvdC40Y8g0LvQtdC60YbQuNC4XG5mdW5jdGlvbiBjcmVhdGVBZGRGb3JtKCkge1xuICAgICRhZGRGb3JtQ29udGFpbmVyLmlubmVySFRNTCA9IFNjaGVkdWxlQXBwLnRlbXBsYXRlcy5sZWN0dXJlLmFkZCh7c2Nob29sOiBzY2hvb2xMaXN0LCBjbGFzc3Jvb206IGNsYXNzcm9vbUxpc3R9KTtcbiAgICByZXR1cm4gZG9jdW1lbnQuZm9ybXMubGVjdHVyZUFkZDtcbn1cblxuLy8g0YHQvtC30LTQsNGC0Ywg0YHQv9C40YHQvtC6IG9wdGlvbnNcbmZ1bmN0aW9uIGNyZWF0ZU9wdGlvbnMobGlzdCwgc2VsZWN0ZWRWYWx1ZXMpIHtcbiAgICBsZXQgb3B0aW9ucyA9IFtdO1xuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHNlbGVjdGVkVmFsdWVzKSkge1xuICAgICAgICBzZWxlY3RlZFZhbHVlcyA9IFtzZWxlY3RlZFZhbHVlc107XG4gICAgfVxuXG4gICAgbGlzdC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGxldCBvcHRpb24gPSBPYmplY3QuYXNzaWduKHt9LCBpdGVtKTtcbiAgICAgICAgaWYgKHNlbGVjdGVkVmFsdWVzLmluZGV4T2Yob3B0aW9uLl9pZCkgIT09IC0xKSB7XG4gICAgICAgICAgICBvcHRpb24uc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIG9wdGlvbnMucHVzaChvcHRpb24pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG9wdGlvbnM7XG59XG5cbi8vINC/0L7Qu9GD0YfQuNGC0YwgaWRcbmZ1bmN0aW9uIGdldEl0ZW1JZChlbGVtZW50KSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuY2xvc2VzdChcIi5sZWN0dXJlLWl0ZW1cIikuZGF0YXNldC5pZDtcbn1cblxuLy8g0L/QvtC60LDQt9Cw0YLRjCDQvtGI0LjQsdC60YNcbmZ1bmN0aW9uIHNob3dFcnJvcihtc2cpIHtcbiAgICBhbGVydChtc2cpO1xufVxuXG4vLyDQv9C+0LTQs9C+0YLQvtCy0LjRgtGMINC00LDQvdC90YvQtSDQv9C10YDQtdC0INGB0L7RhdGA0LDQvdC10L3QuNC10LxcbmZ1bmN0aW9uIHByZXBhcmVEYXRhQmVmb3JlU2F2aW5nKGxlY3R1cmVEYXRhKSB7XG4gICAgbGVjdHVyZURhdGEuc3RhcnQgPSBgJHtsZWN0dXJlRGF0YS5kYXRlfVQke2xlY3R1cmVEYXRhLnN0YXJ0fTowMGA7XG4gICAgbGVjdHVyZURhdGEuZmluaXNoID0gYCR7bGVjdHVyZURhdGEuZGF0ZX1UJHtsZWN0dXJlRGF0YS5maW5pc2h9OjAwYDtcblxuICAgIHJldHVybiBsZWN0dXJlRGF0YTtcbn1cblxuLy8g0L/RgNC+0LLQtdGA0LjRgtGMINC00LDQvdC90YvQtVxuZnVuY3Rpb24gdmFsaWRhdGUobGVjdHVyZURhdGEpIHtcbiAgICBpZiAoIURhdGUucGFyc2UobGVjdHVyZURhdGEuZGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuIHNob3dFcnJvcign0J3QtdC60L7RgNGA0LXQutGC0L3QviDQstCy0LXQtNC10L3QsCDQtNCw0YLQsCwg0YTQvtGA0LzQsNGCOiBZWVlZLU1NLUREJyk7XG4gICAgfVxuXG4gICAgaWYgKCFEYXRlLnBhcnNlKGxlY3R1cmVEYXRhLnN0YXJ0KSB8fCAhRGF0ZS5wYXJzZShsZWN0dXJlRGF0YS5maW5pc2gpKSB7XG4gICAgICAgIHJldHVybiBzaG93RXJyb3IoJ9Cd0LXQutC+0YDRgNC10LrRgtC90L4g0LLQstC10LTQtdC90L4g0LLRgNC10LzRjywg0YTQvtGA0LzQsNGCOiBISDptbScpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xufVxuXG4vLyDQvtGH0LjRgdGC0LjRgtGMINGE0L7RgNC80YMg0LTQvtCx0LDQstC70LXQvdC40Y9cbmZ1bmN0aW9uIGNsZWFyQWRkRm9ybSgpIHtcbiAgICAkYWRkRm9ybS5yZXNldCgpO1xufVxuXG4vLyDQvtCx0YDQsNCx0L7RgtC60LAg0YHQsNCx0LzQuNGC0LAg0YTQvtGA0LzRiyDQtNC+0LHQsNCy0LvQtdC90LjRjyDQu9C10LrRhtC40LhcbmZ1bmN0aW9uIGFkZEZvcm1TdWJtaXRIYW5kbGVyKGV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGxldCBsZWN0dXJlRGF0YSA9IGdldEZvcm1EYXRhKCRhZGRGb3JtKTtcbiAgICBsZXQgJGFkZEJ0biA9ICRhZGRGb3JtLmVsZW1lbnRzLmFkZDtcbiAgICBsZWN0dXJlRGF0YSA9IHByZXBhcmVEYXRhQmVmb3JlU2F2aW5nKGxlY3R1cmVEYXRhKTtcblxuICAgIGlmICh2YWxpZGF0ZShsZWN0dXJlRGF0YSkgPT09IHRydWUpIHtcbiAgICAgICAgJGFkZEJ0bi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgIGFkZExlY3R1cmUobGVjdHVyZURhdGEpXG4gICAgICAgICAgICAudGhlbihjbGVhckFkZEZvcm0pXG4gICAgICAgICAgICAudGhlbihzaG93TGlzdClcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHNob3dFcnJvcihlcnJvci5tZXNzYWdlKSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+ICRhZGRCdG4uZGlzYWJsZWQgPSBmYWxzZSk7XG4gICAgfVxufVxuXG4vLyDQvtCx0YDQsNCx0L7RgtC60LAg0LrQu9C40LrQsCDQvdCwINC60L3QvtC/0LrRgyDQo9C00LDQu9C40YLRjFxuZnVuY3Rpb24gZGVsZXRlSGFuZGxlcihldmVudCkge1xuICAgIGxldCBsZWN0dXJlSWQgPSBnZXRJdGVtSWQoZXZlbnQudGFyZ2V0KTtcbiAgICBsZXQgJGRlbGV0ZUJ0biA9IGV2ZW50LnRhcmdldDtcblxuICAgICRkZWxldGVCdG4uZGlzYWJsZWQgPSB0cnVlO1xuICAgIHJlbW92ZUxlY3R1cmUobGVjdHVyZUlkKVxuICAgICAgICAudGhlbigoKSA9PiAkbGlzdC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1pZD1cIiR7bGVjdHVyZUlkfVwiXWApLnJlbW92ZSgpKVxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiBzaG93RXJyb3IoZXJyb3IubWVzc2FnZSkpXG4gICAgICAgIC50aGVuKCgpID0+ICRkZWxldGVCdG4uZGlzYWJsZWQgPSBmYWxzZSk7XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG4vLyDQvtCx0YDQsNCx0L7RgtC60LAg0YHQsNCx0LzQuNGC0LAg0YTQvtGA0LzRiyDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPINC70LXQutGG0LjQuFxuZnVuY3Rpb24gZWRpdEZvcm1TdWJtaXRIYW5kbGVyKGV2ZW50KSB7XG4gICAgbGV0IG5ld0xlY3R1cmVEYXRhID0gZ2V0Rm9ybURhdGEoZXZlbnQudGFyZ2V0KTtcbiAgICBsZXQgJGVkaXRCdG4gPSBldmVudC50YXJnZXQuZWxlbWVudHMuc2F2ZTtcbiAgICBuZXdMZWN0dXJlRGF0YSA9IHByZXBhcmVEYXRhQmVmb3JlU2F2aW5nKG5ld0xlY3R1cmVEYXRhKTtcbiAgICAkZWRpdEJ0bi5kaXNhYmxlZCA9IHRydWU7XG5cbiAgICBpZiAodmFsaWRhdGUobmV3TGVjdHVyZURhdGEpID09PSB0cnVlKSB7XG4gICAgICAgIGVkaXRMZWN0dXJlKG5ld0xlY3R1cmVEYXRhLmlkLCBuZXdMZWN0dXJlRGF0YSlcbiAgICAgICAgICAgIC50aGVuKHNob3dMaXN0KVxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcikgPT4gc2hvd0Vycm9yKGVycm9yKSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+ICRlZGl0QnRuLmRpc2FibGVkID0gZmFsc2UpO1xuICAgIH1cblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59XG5cbi8vINC+0LHRgNCw0LHQvtGC0LrQsCDQutC70LjQutCwINC90LAg0LrQvdC+0L/QutGDINCg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMXG5mdW5jdGlvbiBzaG93RWRpdEZvcm1IYW5kbGVyKGV2ZW50KSB7XG4gICAgbGV0ICRsZWN0dXJlSXRlbSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLmxlY3R1cmUtaXRlbVwiKTtcblxuICAgIC8vINC/0L7QtNCz0L7RgtC+0LLQutCwINC00LDQvdC90YvRhSDQuiDRiNCw0LHQu9C+0L3QuNC30LDRhtC40LhcbiAgICBsZXQgbGVjdHVyZURhdGEgPSBKU09OLnBhcnNlKCRsZWN0dXJlSXRlbS5kYXRhc2V0LmxlY3R1cmUpO1xuICAgIGxldCBsZWN0dXJlU2Nob29sID0gbGVjdHVyZURhdGEuc2Nob29sLm1hcCgoaXRlbSkgPT4gaXRlbS5faWQpO1xuXG4gICAgbGVjdHVyZURhdGEuZGF0ZSA9IGxlY3R1cmVEYXRhLnN0YXJ0LnN1YnN0cmluZygwLCAxMCk7XG4gICAgbGVjdHVyZURhdGEuc3RhcnRUaW1lID0gZ2V0VGltZShsZWN0dXJlRGF0YS5zdGFydCk7XG4gICAgbGVjdHVyZURhdGEuZmluaXNoVGltZSA9IGdldFRpbWUobGVjdHVyZURhdGEuZmluaXNoKTtcbiAgICBsZWN0dXJlRGF0YS5zY2hvb2xMaXN0ID0gY3JlYXRlT3B0aW9ucyhzY2hvb2xMaXN0LCBsZWN0dXJlU2Nob29sKTtcbiAgICBsZWN0dXJlRGF0YS5jbGFzc3Jvb21MaXN0ID0gY3JlYXRlT3B0aW9ucyhjbGFzc3Jvb21MaXN0LCBsZWN0dXJlRGF0YS5jbGFzc3Jvb20uX2lkKTtcblxuICAgIC8vINGA0LXQvdC00LXRgCDRhNC+0YDQvNGLXG4gICAgbGV0IGVkaXRGb3JtSHRtbCA9IFNjaGVkdWxlQXBwLnRlbXBsYXRlcy5sZWN0dXJlLmVkaXQobGVjdHVyZURhdGEpO1xuICAgICRsZWN0dXJlSXRlbS5maXJzdEVsZW1lbnRDaGlsZC5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyRW5kJywgZWRpdEZvcm1IdG1sKTtcblxuICAgICRsZWN0dXJlSXRlbS5xdWVyeVNlbGVjdG9yKCdmb3JtJykuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBlZGl0Rm9ybVN1Ym1pdEhhbmRsZXIpO1xuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbn1cblxuLy8g0YPQtNCw0LvQuNGC0Ywg0YTQvtGA0LzRgyDRgNC10LTQsNC60YLQuNGA0L7QstCw0L3QuNGPINC70LXQutGG0LjQuFxuZnVuY3Rpb24gaGlkZUVkaXRGb3JtSGFuZGxlcihldmVudCkge1xuICAgIGV2ZW50LnRhcmdldC5jbG9zZXN0KFwiLmxlY3R1cmUtZWRpdC1mb3JtXCIpLnJlbW92ZSgpO1xufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICAgIHNob3dMaXN0KCk7XG5cbiAgICBQcm9taXNlLmFsbChbXG4gICAgICAgIHJlc291cmNlLmxpc3QoXCJzY2hvb2xcIiksXG4gICAgICAgIHJlc291cmNlLmxpc3QoXCJjbGFzc3Jvb21cIiksXG4gICAgXSkudGhlbigocmVzdWx0cykgPT4ge1xuICAgICAgICBzY2hvb2xMaXN0ID0gcmVzdWx0c1swXTtcbiAgICAgICAgY2xhc3Nyb29tTGlzdCA9IHJlc3VsdHNbMV07XG5cbiAgICAgICAgJGFkZEZvcm0gPSBjcmVhdGVBZGRGb3JtKCk7XG4gICAgICAgICRhZGRGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgYWRkRm9ybVN1Ym1pdEhhbmRsZXIpO1xuICAgIH0pO1xuXG4gICAgZGVsZWdhdGUoJGxpc3QsICcubGVjdHVyZS1kZWxldGUnLCAnY2xpY2snLCBkZWxldGVIYW5kbGVyKTtcbiAgICBkZWxlZ2F0ZSgkbGlzdCwgJy5sZWN0dXJlLWVkaXQnLCAnY2xpY2snLCBzaG93RWRpdEZvcm1IYW5kbGVyKTtcbiAgICBkZWxlZ2F0ZSgkbGlzdCwgJy5sZWN0dXJlLWVkaXQtY2FuY2VsJywgJ2NsaWNrJywgaGlkZUVkaXRGb3JtSGFuZGxlcik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtpbml0fTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gY2xpZW50L2pzL3NyYy9sZWN0dXJlL2xlY3R1cmUuanMiLCJpbXBvcnQgcmVzb3VyY2UgZnJvbSAnLi4vcmVzb3VyY2UnO1xuaW1wb3J0IHtnZXRUaW1lLCBmb3JtYXREYXRlLCBsZWFkWmVyb30gZnJvbSAnLi4vaGVscGVyJztcblxubGV0ICRsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sZWN0dXJlTGlzdFwiKSxcbiAgICAkZmlsdGVyQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5maWx0ZXJcIik7XG5cbi8vINC/0L7QutCw0LfQsNGC0Ywg0YHQv9C40YHQvtC6INC70LXQutGG0LjQuVxuZnVuY3Rpb24gc2hvd0xpc3QocXVlcnkpIHtcbiAgICByZXR1cm4gcmVzb3VyY2UubGlzdChcImxlY3R1cmVcIiwgcXVlcnkpXG4gICAgICAgIC50aGVuKChsZWN0dXJlcykgPT4ge1xuICAgICAgICAgICAgbGVjdHVyZXMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgaXRlbS5kYXRlID0gZm9ybWF0RGF0ZShpdGVtLnN0YXJ0KTtcbiAgICAgICAgICAgICAgICBpdGVtLnN0YXJ0VGltZSA9IGdldFRpbWUoaXRlbS5zdGFydCk7XG4gICAgICAgICAgICAgICAgaXRlbS5maW5pc2hUaW1lID0gZ2V0VGltZShpdGVtLmZpbmlzaCk7XG4gICAgICAgICAgICAgICAgaXRlbS5zY2hvb2xMaXN0ID0gaXRlbS5zY2hvb2wubWFwKChpdGVtKSA9PiBpdGVtLm5hbWUpLmpvaW4oXCIsIFwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJGxpc3QuaW5uZXJIVE1MID0gU2NoZWR1bGVBcHAudGVtcGxhdGVzLnNjaGVkdWxlKHtpdGVtczogbGVjdHVyZXN9KTtcbiAgICAgICAgfSk7XG59XG5cbi8vINC/0L7QutCw0LfQsNGC0Ywg0YTQuNC70YzRgtGAXG5mdW5jdGlvbiBzaG93RmlsdGVyKCkge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgIHJlc291cmNlLmxpc3QoXCJzY2hvb2xcIiksXG4gICAgICAgIHJlc291cmNlLmxpc3QoXCJjbGFzc3Jvb21cIiksXG4gICAgXSkudGhlbigocmVzdWx0cykgPT4ge1xuICAgICAgICAkZmlsdGVyQ29udGFpbmVyLmlubmVySFRNTCA9IFNjaGVkdWxlQXBwLnRlbXBsYXRlcy5maWx0ZXIoe1xuICAgICAgICAgICAgc2Nob29sTGlzdDogcmVzdWx0c1swXSxcbiAgICAgICAgICAgIGNsYXNzcm9vbUxpc3Q6IHJlc3VsdHNbMV1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbi8vINC+0LHRgNCw0LHQvtGC0LDRgtGMINGB0LDQsdC80LjRgiDRhNC+0YDQvNGLINGE0LjQu9GM0YLRgNCw0YbQuNC4XG5mdW5jdGlvbiBmaWx0ZXJTdWJtaXRIYW5kbGVyKGV2ZW50KSB7XG4gICAgbGV0IGZvcm0gPSBldmVudC50YXJnZXQsXG4gICAgICAgIGZpbHRlckJ0biA9IGZvcm0uZWxlbWVudHMuZmlsdGVyLFxuICAgICAgICBxdWVyeSA9IHt9O1xuXG4gICAgZmlsdGVyQnRuLmRpc2FibGVkID0gdHJ1ZTtcblxuICAgIFtdLmZvckVhY2guY2FsbChmb3JtLmVsZW1lbnRzLCAoZWxlbWVudCkgPT4ge1xuICAgICAgICBpZiAoZWxlbWVudCAhPT0gZmlsdGVyQnRuKSB7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBmb3JtLmVsZW1lbnRzW2VsZW1lbnQubmFtZV0udmFsdWU7XG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBxdWVyeVtlbGVtZW50Lm5hbWVdID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChxdWVyeS50bykge1xuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKHF1ZXJ5LnRvKTtcbiAgICAgICAgcXVlcnkudG8gPSBEYXRlLnBhcnNlKGAke2RhdGUuZ2V0RnVsbFllYXIoKX0tJHtsZWFkWmVybyhkYXRlLmdldE1vbnRoKCkgKyAxKX0tJHtsZWFkWmVybyhkYXRlLmdldERhdGUoKSl9IDIzOjU5OjU5YCk7XG4gICAgfVxuXG4gICAgc2hvd0xpc3QocXVlcnkpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGZpbHRlckJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gICAgc2hvd0xpc3QoKTtcblxuICAgIHNob3dGaWx0ZXIoKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBsZXQgJGZpbHRlckZvcm0gPSAkZmlsdGVyQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpO1xuICAgICAgICAgICAgJGZpbHRlckZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmaWx0ZXJTdWJtaXRIYW5kbGVyKVxuICAgICAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge2luaXR9O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBjbGllbnQvanMvc3JjL3NjaGVkdWxlL3NjaGVkdWxlLmpzIiwiY29uc3QgQVBJX1BSRUZJWCA9IFwiL2FwaVwiO1xuY29uc3QgREVGQVVMVF9QUkVGSVggPSB7XCJDb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04XCJ9O1xuXG5mdW5jdGlvbiBnZXRRdWVyeVN0cmluZyhwYXJhbXMpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMocGFyYW1zKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJhbXNba2V5XSkpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJhbXNba2V5XS5tYXAoZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoa2V5KSArIFwiW109XCIgKyBlbmNvZGVVUklDb21wb25lbnQodmFsKTtcbiAgICAgICAgICAgIH0pLmpvaW4oJyYnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudChwYXJhbXNba2V5XSk7XG4gICAgfSkuam9pbihcIiZcIik7XG59XG5cbmZ1bmN0aW9uIGxpc3QodHlwZSwgcGFyYW1zKSB7XG4gICAgbGV0IHF1ZXJ5ID0gJyc7XG5cbiAgICBpZiAocGFyYW1zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcXVlcnkgPSBcIj9cIiArIGdldFF1ZXJ5U3RyaW5nKHBhcmFtcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZldGNoKEFQSV9QUkVGSVggKyBcIi9cIiArIHR5cGUgKyBcIi9cIiArIHF1ZXJ5LCB7XG4gICAgICAgIG1ldGhvZDogXCJnZXRcIlxuICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGUodHlwZSwgZGF0YSkge1xuICAgIHJldHVybiBmZXRjaChBUElfUFJFRklYICsgXCIvXCIgKyB0eXBlICsgXCIvXCIsIHtcbiAgICAgICAgbWV0aG9kOiBcInBvc3RcIixcbiAgICAgICAgaGVhZGVyczogREVGQVVMVF9QUkVGSVgsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpXG4gICAgfSkudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZSh0eXBlLCBpZCwgZGF0YSkge1xuICAgIHJldHVybiBmZXRjaChBUElfUFJFRklYICsgXCIvXCIgKyB0eXBlICsgXCIvXCIgKyBpZCwge1xuICAgICAgICBtZXRob2Q6IFwicHV0XCIsXG4gICAgICAgIGhlYWRlcnM6IERFRkFVTFRfUFJFRklYLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShkYXRhKVxuICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpO1xufVxuXG5mdW5jdGlvbiByZW1vdmUodHlwZSwgaWQpIHtcbiAgICByZXR1cm4gZmV0Y2goQVBJX1BSRUZJWCArIFwiL1wiICsgdHlwZSArIFwiL1wiICsgaWQsIHtcbiAgICAgICAgbWV0aG9kOiBcImRlbGV0ZVwiXG4gICAgfSkudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtsaXN0LCBjcmVhdGUsIHVwZGF0ZSwgcmVtb3ZlfTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gY2xpZW50L2pzL3NyYy9yZXNvdXJjZS5qcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDdENBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUFBO0FBQ0E7Ozs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7OztBQ0xBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBR0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM1SEE7QUFRQTtBQXFCQTtBQUlBO0FBUUE7QUF6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUdBOzs7Ozs7Ozs7Ozs7O0FDbERBO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBR0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM5SEE7QUFDQTs7O0FBQUE7QUFDQTs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbk5BO0FBQ0E7OztBQUFBO0FBQ0E7OztBQUNBO0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBRUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFJQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUlBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFFQTtBQUFBO0FBQ0E7QUFDQTs7OzsiLCJzb3VyY2VSb290IjoiIn0=