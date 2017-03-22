import resource from '../resource';
import {getTime, formatDate, leadZero} from '../helper';

let $list = document.querySelector(".lectureList"),
    $filterContainer = document.querySelector(".filter");

// показать список лекций
function showList(query) {
    return resource.list("lecture", query)
        .then((lectures) => {
            lectures.map((item) => {
                item.date = formatDate(item.start);
                item.startTime = getTime(item.start);
                item.finishTime = getTime(item.finish);
                item.schoolList = item.school.map((item) => item.name).join(", ");
                return item;
            });
            $list.innerHTML = ScheduleApp.templates.schedule({items: lectures});
        });
}

// показать фильтр
function showFilter() {
    return Promise.all([
        resource.list("school"),
        resource.list("classroom"),
    ]).then((results) => {
        $filterContainer.innerHTML = ScheduleApp.templates.filter({
            schoolList: results[0],
            classroomList: results[1]
        });
    });
}

// обработать сабмит формы фильтрации
function filterSubmitHandler(event) {
    let form = event.target,
        filterBtn = form.elements.filter,
        query = {};

    filterBtn.disabled = true;

    [].forEach.call(form.elements, (element) => {
        if (element !== filterBtn) {
            let value = form.elements[element.name].value;
            if (value) {
                query[element.name] = value;
            }
        }
    });

    if (query.to) {
        let date = new Date(query.to);
        query.to = Date.parse(`${date.getFullYear()}-${leadZero(date.getMonth() + 1)}-${leadZero(date.getDate())} 23:59:59`);
    }

    showList(query)
        .then(() => {
            filterBtn.disabled = false;
        });

    event.preventDefault();
}

function init() {
    showList();

    showFilter()
        .then(() => {
            let $filterForm = $filterContainer.querySelector("form");
            $filterForm.addEventListener("submit", filterSubmitHandler)
        });
}

export default {init};