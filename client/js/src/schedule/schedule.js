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

// получить данные с формы фильтрации
function getFilterValues(form) {
    let query = {};
    [].forEach.call(form.elements, (element) => {
        if (element.type !== 'submit') {
            let value = form.elements[element.name].value;
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

    let form = event.target,
        filterBtn = form.elements.filter;

    let query = getFilterValues(form);

    if ((query.from && !Date.parse(query.from)) || (query.to && !Date.parse(query.to))) {
        return alert('Некорректно введена дата, формат: YYYY-MM-DD');
    }

    if (query.to) {
        let date = new Date(query.to);
        let dateWithEndOfDay = new Date(date.getTime() + 24*60*60000 - 1);
        query.to = Date.parse(dateWithEndOfDay);
    }

    filterBtn.disabled = true;
    showList(query)
        .then(() => {
            filterBtn.disabled = false;
        });
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