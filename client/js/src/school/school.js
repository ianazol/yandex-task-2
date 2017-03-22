import resource from '../resource';
import {delegate, getFormData} from '../helper';

let $list = document.querySelector(".schoolList"),
    $addForm = document.forms.schoolAdd;

// получить из бд и показать список школ
function showList() {
    return resource.list("school")
        .then((schools) => {
            schools.map((item) => item.json = JSON.stringify(item));
            $list.innerHTML = ScheduleApp.templates.school.list({items: schools});
        });
}

// добавить школу в бд
function addSchool(schoolData) {
    return resource.create("school", schoolData)
        .then((result) => {
            if (result.error) {
                throw new Error(result.error);
            }
        });
}

// редактировать школу в бд
function editSchool(id, schoolData) {
    return resource.update("school", id, schoolData)
        .then((result) => {
            if (result.error) {
                throw new Error(result.error);
            }
        });
}

//удалить школу из БД
function removeSchool(id) {
    return resource.remove("school", id)
        .then((result) => {
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
    let editForm = event.target,
        editBtn = editForm.elements.save,
        newSchoolData = getFormData(editForm);

    editBtn.disabled = true;
    editSchool(newSchoolData.id, newSchoolData)
        .then(showList)
        .catch((error) => showError(error.message))
        .then(() => editBtn.disabled = false);

    event.preventDefault();
}

// обработка отправки формы добавления
function addFormSubmitHandler(event) {
    let schoolData = getFormData($addForm),
        $addBtn = $addForm.elements.addSchoolBtn;

    $addBtn.disabled = true;
    addSchool(schoolData)
        .then(showList)
        .catch((error) => showError(error.message))
        .then(() => {
            $addBtn.disabled = false;
            $addForm.reset();
        });

    event.preventDefault();
}

// обработка клика на кнопку удалить
function removeClickHandler(event) {
    let $deleteBtn = event.target,
        id = getItemId(event.target);

    $deleteBtn.disabled = true;
    removeSchool(id)
        .then(() => $list.querySelector(`[data-id="${id}"]`).remove())
        .catch((error) => showError(error.message))
        .then(() => $deleteBtn.disabled = false);
}

//показать форму редактирования школы
function showEditFormHandler(event) {
    let $schoolItem = event.target.closest(".school-item"),
        oldSchoolData = JSON.parse($schoolItem.dataset.school);

    let editFormContainer = ScheduleApp.templates.school.edit(oldSchoolData);

    $schoolItem.firstElementChild.insertAdjacentHTML('afterEnd', editFormContainer);
    $schoolItem.querySelector("form").addEventListener("submit", editFormSubmitHandler);
}

function init() {
    showList();

    $addForm.addEventListener("submit", addFormSubmitHandler);

    delegate($list, '.school-delete', 'click', removeClickHandler);
    delegate($list, '.school-edit', 'click', showEditFormHandler);
    delegate($list, '.school-edit-cancel', 'click', (event) => hideEditForm(event.target));
}

export default {init};