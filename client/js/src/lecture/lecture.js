import resource from '../resource';
import {delegate, getFormData, getTime, formatDate} from '../helper';

let schoolList = [],
    classroomList = [],
    $list = document.querySelector(".lectureList"),
    $addFormContainer = document.querySelector(".lecture-add-container"),
    $addForm = null;

// получить лекции из БД и показать
function showList() {
    return resource.list("lecture")
        .then((lectures) => {
            lectures.map((item) => {
                item.json = JSON.stringify(item);
                item.date = formatDate(item.start);
                item.startTime = getTime(item.start);
                item.finishTime = getTime(item.finish);
                item.schoolList = item.school.map((item) => item.name).join(", ");
                return item;
            });
            $list.innerHTML = ScheduleApp.templates.lecture.list({items: lectures});
        });
}

// добавить лекцию в бд
function addLecture(lectureData) {
    return resource.create('lecture', lectureData)
        .then((result) => {
            if (result.error) {
                throw new Error(result.error);
            }
        });
}

// удалить лекию из бд
function removeLecture(lectureId) {
    return resource.remove('lecture', lectureId)
        .then((result) => {
            if (result.error) {
                throw new Error(result.error);
            }
        });
}

// изменить лекцию в бд
function editLecture(lectureId, lectureData) {
    return resource.update("lecture", lectureId, lectureData)
        .then((result) => {
            if (result.error) {
                throw new Error(result.error);
            }
        })
}

// создать форму добавления лекции
function createAddForm() {
    $addFormContainer.innerHTML = ScheduleApp.templates.lecture.add({school: schoolList, classroom: classroomList});
    return document.forms.lectureAdd;
}

// создать список options
function createOptions(list, selectedValues) {
    let options = [];

    if (!Array.isArray(selectedValues)) {
        selectedValues = [selectedValues];
    }

    list.forEach((item) => {
        let option = Object.assign({}, item);
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
    lectureData.start = `${lectureData.date}T${lectureData.start}:00`;
    lectureData.finish = `${lectureData.date}T${lectureData.finish}:00`;

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

    let lectureData = getFormData($addForm);
    let $addBtn = $addForm.elements.add;
    lectureData = prepareDataBeforeSaving(lectureData);

    if (validate(lectureData) === true) {
        $addBtn.disabled = true;
        addLecture(lectureData)
            .then(clearAddForm)
            .then(showList)
            .catch((error) => showError(error.message))
            .then(() => $addBtn.disabled = false);
    }
}

// обработка клика на кнопку Удалить
function deleteHandler(event) {
    let lectureId = getItemId(event.target);
    let $deleteBtn = event.target;

    $deleteBtn.disabled = true;
    removeLecture(lectureId)
        .then(() => $list.querySelector(`[data-id="${lectureId}"]`).remove())
        .catch((error) => showError(error.message))
        .then(() => $deleteBtn.disabled = false);

    event.preventDefault();
}

// обработка сабмита формы редактирования лекции
function editFormSubmitHandler(event) {
    let newLectureData = getFormData(event.target);
    let $editBtn = event.target.elements.save;
    newLectureData = prepareDataBeforeSaving(newLectureData);
    $editBtn.disabled = true;

    if (validate(newLectureData) === true) {
        editLecture(newLectureData.id, newLectureData)
            .then(showList)
            .catch((error) => showError(error))
            .then(() => $editBtn.disabled = false);
    }

    event.preventDefault();
}

// обработка клика на кнопку Редактировать
function showEditFormHandler(event) {
    let $lectureItem = event.target.closest(".lecture-item");

    // подготовка данных к шаблонизации
    let lectureData = JSON.parse($lectureItem.dataset.lecture);
    let lectureSchool = lectureData.school.map((item) => item._id);

    lectureData.date = lectureData.start.substring(0, 10);
    lectureData.startTime = getTime(lectureData.start);
    lectureData.finishTime = getTime(lectureData.finish);
    lectureData.schoolList = createOptions(schoolList, lectureSchool);
    lectureData.classroomList = createOptions(classroomList, lectureData.classroom._id);

    // рендер формы
    let editFormHtml = ScheduleApp.templates.lecture.edit(lectureData);
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

    Promise.all([
        resource.list("school"),
        resource.list("classroom"),
    ]).then((results) => {
        schoolList = results[0];
        classroomList = results[1];

        $addForm = createAddForm();
        $addForm.addEventListener("submit", addFormSubmitHandler);
    });

    delegate($list, '.lecture-delete', 'click', deleteHandler);
    delegate($list, '.lecture-edit', 'click', showEditFormHandler);
    delegate($list, '.lecture-edit-cancel', 'click', hideEditFormHandler);
}

export default {init};