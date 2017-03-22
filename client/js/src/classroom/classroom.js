import resource from '../resource';
import {delegate, getFormData} from '../helper';

let $list = document.querySelector(".classroomList"),
    $addForm = document.forms.classroomAdd;

// получить из бд и показать
function showList() {
    return resource.list("classroom")
        .then((classrooms) => {
            classrooms.map((item) => item.json = JSON.stringify(item));
            $list.innerHTML = ScheduleApp.templates.classroom.list({items: classrooms});
        });
}

// добавить аудиторию в бд
function addClassroom(classroomData) {
    return resource.create("classroom", classroomData)
        .then((result) => {
            if (result.error) {
                throw new Error(result.error);
            }
        });
}

// редактировать аудиторию в бд
function editClassroom(id, classroomData) {
    return resource.update("classroom", id, classroomData)
        .then((result) => {
            if (result.error) {
                throw new Error(result.error);
            }
        })
}

// удалить аудиторию из бд
function removeClassroom(id) {
    return resource.remove("classroom", id)
        .then((result) => {
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
    let newClassroomData = getFormData(event.target),
        $saveBtn = event.target.elements.save;

    $saveBtn.disabled = true;
    editClassroom(newClassroomData.id, newClassroomData)
        .then(showList)
        .catch((error) => showError(error.message))
        .then(() => $saveBtn.disabled = false);

    event.preventDefault();
}

// обработка сабмита формы добавления
function addFormSubmitHandler(event) {
    let classroomData = getFormData($addForm),
        $addBtn = $addForm.elements.add;

    $addBtn.disabled = true;
    addClassroom(classroomData)
        .then(showList)
        .then(clearAddForm)
        .catch((error) => showError(error.message))
        .then(() => $addBtn.disabled = false);

    event.preventDefault();
}

// обработка клика на кнопку Удалить
function removeClickHandler(event) {
    let $deleteBtn = event.target,
        id = getItemId(event.target);

    $deleteBtn.disabled = true;
    removeClassroom(id)
        .then(() => $list.querySelector(`[data-id="${id}"]`).remove())
        .catch((error) => showError(error.message))
        .then(() => $deleteBtn.disabled = false);
}

// обработка клика на кнопку Редактировать
function showEditFormHandler(event) {
    let $classroomItem = event.target.closest(".classroom-item"),
        oldClassroomData = JSON.parse($classroomItem.dataset.classroom);

    let editFormContainer = ScheduleApp.templates.classroom.edit(oldClassroomData);

    $classroomItem.firstElementChild.insertAdjacentHTML('afterEnd', editFormContainer);
    $classroomItem.querySelector("form").addEventListener("submit", editFormSubmitHandler);
}

function init() {
    showList();

    $addForm.addEventListener("submit", addFormSubmitHandler);

    delegate($list, '.classroom-delete', 'click', removeClickHandler);
    delegate($list, '.classroom-edit', 'click', showEditFormHandler);
    delegate($list, '.classroom-edit-cancel', 'click', (event) => hideEditForm(event.target));
}

export default {init};