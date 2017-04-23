this.ScheduleApp=this.ScheduleApp||{},this.ScheduleApp.templates=this.ScheduleApp.templates||{},this.ScheduleApp.templates.school=this.ScheduleApp.templates.school||{},this.ScheduleApp.templates.school.edit=Handlebars.template({compiler:[7,">= 4.0.0"],main:function(l,n,a,e,t){var s,o=null!=n?n:{},i=a.helperMissing,c=l.escapeExpression;return'<div class="school-edit-form">\n    <br/>\n    <div class="jumbotron">\n        <form name="schoolEdit" method="post">\n            <div class="form-group">\n                <label for="name">Название школы</label>\n                <input type="text" class="form-control" id="name" name="name" value="'+c((s=null!=(s=a.name||(null!=n?n.name:n))?s:i,"function"==typeof s?s.call(o,{name:"name",hash:{},data:t}):s))+'" />\n            </div>\n            <div class="form-group">\n                <label for="count">Количество студентов</label>\n                <input type="text" class="form-control" id="count" name="count" value="'+c((s=null!=(s=a.count||(null!=n?n.count:n))?s:i,"function"==typeof s?s.call(o,{name:"count",hash:{},data:t}):s))+'" />\n            </div>\n            <input type="hidden" name="id" value="'+c((s=null!=(s=a._id||(null!=n?n._id:n))?s:i,"function"==typeof s?s.call(o,{name:"_id",hash:{},data:t}):s))+'" />\n            <button type="submit" name="save" class="btn btn-primary school-save">Сохранить</button>\n            <button type="button" class="btn btn-secondary school-edit-cancel">Отменить</button>\n        </form>\n    </div>\n</div>'},useData:!0}),this.ScheduleApp.templates.school.list=Handlebars.template({1:function(l,n,a,e,t){var s,o=null!=n?n:{},i=a.helperMissing,c=l.escapeExpression;return'<div class="school-item" data-id="'+c((s=null!=(s=a._id||(null!=n?n._id:n))?s:i,"function"==typeof s?s.call(o,{name:"_id",hash:{},data:t}):s))+"\" data-school='"+c((s=null!=(s=a.json||(null!=n?n.json:n))?s:i,"function"==typeof s?s.call(o,{name:"json",hash:{},data:t}):s))+'\'>\n    <div class="row">\n        <div class="col-8">\n            <b>'+c((s=null!=(s=a.name||(null!=n?n.name:n))?s:i,"function"==typeof s?s.call(o,{name:"name",hash:{},data:t}):s))+"</b><br/>\n            Количество студентов: "+c((s=null!=(s=a.count||(null!=n?n.count:n))?s:i,"function"==typeof s?s.call(o,{name:"count",hash:{},data:t}):s))+'\n        </div>\n        <div class="col-4">\n            <button type="button" class="btn btn-link btn-sm school-edit">Редактировать</button>\n            <button type="button" class="btn btn-link btn-sm school-delete">Удалить</button>\n        </div>\n    </div>\n    <hr/>\n</div>\n'},compiler:[7,">= 4.0.0"],main:function(l,n,a,e,t){var s;return null!=(s=a.each.call(null!=n?n:{},null!=n?n.items:n,{name:"each",hash:{},fn:l.program(1,t,0),inverse:l.noop,data:t}))?s:""},useData:!0}),this.ScheduleApp.templates.filter=Handlebars.template({1:function(l,n,a,e,t){var s,o=null!=n?n:{},i=a.helperMissing,c=l.escapeExpression;return'                        <option value="'+c((s=null!=(s=a._id||(null!=n?n._id:n))?s:i,"function"==typeof s?s.call(o,{name:"_id",hash:{},data:t}):s))+'">'+c((s=null!=(s=a.name||(null!=n?n.name:n))?s:i,"function"==typeof s?s.call(o,{name:"name",hash:{},data:t}):s))+"</option>\n"},compiler:[7,">= 4.0.0"],main:function(l,n,a,e,t){var s,o=null!=n?n:{};return'<form name="lectureFilter" method="post">\n    <div class="row">\n        <div class="col-3">\n            <div class="form-group">\n                <label for="from">Начало</label>\n                <input type="date" class="form-control" id="from" name="from" placeholder="Например, 2017-05-12" />\n            </div>\n        </div>\n        <div class="col-3">\n            <div class="form-group">\n                <label for="to">Окончание</label>\n                <input type="date" class="form-control" id="to" name="to" placeholder="Например, 2017-05-12" />\n            </div>\n        </div>\n        <div class="col-3">\n            <div class="form-group">\n                <label for="school">Школа</label>\n                <select name="school" class="form-control" id="school">\n                    <option value="">Все школы</option>\n'+(null!=(s=a.each.call(o,null!=n?n.schoolList:n,{name:"each",hash:{},fn:l.program(1,t,0),inverse:l.noop,data:t}))?s:"")+'                </select>\n            </div>\n        </div>\n        <div class="col-3">\n            <div class="form-group">\n                <label for="classroom">Аудитория</label>\n                <select name="classroom" class="form-control" id="classroom">\n                    <option value="">Все аудитории</option>\n'+(null!=(s=a.each.call(o,null!=n?n.classroomList:n,{name:"each",hash:{},fn:l.program(1,t,0),inverse:l.noop,data:t}))?s:"")+'                </select>\n            </div>\n        </div>\n    </div>\n    <button name="filter" type="submit" class="btn btn-primary lecture-save">Показать</button>\n</form>'},useData:!0}),this.ScheduleApp.templates.schedule=Handlebars.template({1:function(l,n,a,e,t){var s,o,i=null!=n?n:{},c=a.helperMissing,r="function",u=l.escapeExpression;return"    <b>"+u((o=null!=(o=a.name||(null!=n?n.name:n))?o:c,typeof o===r?o.call(i,{name:"name",hash:{},data:t}):o))+'</b><br/>\n    <span class="text-muted small">'+u((o=null!=(o=a.date||(null!=n?n.date:n))?o:c,typeof o===r?o.call(i,{name:"date",hash:{},data:t}):o))+" ("+u((o=null!=(o=a.startTime||(null!=n?n.startTime:n))?o:c,typeof o===r?o.call(i,{name:"startTime",hash:{},data:t}):o))+" - "+u((o=null!=(o=a.finishTime||(null!=n?n.finishTime:n))?o:c,typeof o===r?o.call(i,{name:"finishTime",hash:{},data:t}):o))+")</span><br/>\n    Лектор: "+u((o=null!=(o=a.lecturer||(null!=n?n.lecturer:n))?o:c,typeof o===r?o.call(i,{name:"lecturer",hash:{},data:t}):o))+"<br/>\n    Школа: "+u((o=null!=(o=a.schoolList||(null!=n?n.schoolList:n))?o:c,typeof o===r?o.call(i,{name:"schoolList",hash:{},data:t}):o))+"<br/>\n    Аудитория: "+u(l.lambda(null!=(s=null!=n?n.classroom:n)?s.name:s,n))+"\n    <hr/>\n"},compiler:[7,">= 4.0.0"],main:function(l,n,a,e,t){var s;return null!=(s=a.each.call(null!=n?n:{},null!=n?n.items:n,{name:"each",hash:{},fn:l.program(1,t,0),inverse:l.noop,data:t}))?s:""},useData:!0}),this.ScheduleApp.templates.lecture=this.ScheduleApp.templates.lecture||{},this.ScheduleApp.templates.lecture.add=Handlebars.template({1:function(l,n,a,e,t){var s,o=null!=n?n:{},i=a.helperMissing,c=l.escapeExpression;return'                <option value="'+c((s=null!=(s=a._id||(null!=n?n._id:n))?s:i,"function"==typeof s?s.call(o,{name:"_id",hash:{},data:t}):s))+'">'+c((s=null!=(s=a.name||(null!=n?n.name:n))?s:i,"function"==typeof s?s.call(o,{name:"name",hash:{},data:t}):s))+"</option>\n"},compiler:[7,">= 4.0.0"],main:function(l,n,a,e,t){var s,o=null!=n?n:{};return'<form name="lectureAdd" method="post">\n    <div class="form-group">\n        <label for="name">Название лекции</label>\n        <input type="text" class="form-control" id="name" name="name" />\n    </div>\n    <div class="form-group">\n        <label for="lecturer">Имя лектора</label>\n        <input type="text" class="form-control" id="lecturer" name="lecturer" />\n    </div>\n    <div class="form-group">\n        <label for="date">Дата</label>\n        <input type="date" class="form-control" id="date" name="date" placeholder="Например, 2017-05-12" />\n    </div>\n    <div class="form-group">\n        <label for="start">Время начала</label>\n        <input type="time" class="form-control" id="start" name="start" placeholder="Например, 17:00" />\n    </div>\n    <div class="form-group">\n        <label for="finish">Время окончания</label>\n        <input type="time" class="form-control" id="finish" name="finish" placeholder="Например, 19:30" />\n    </div>\n    <div class="form-group">\n        <label for="school">Школа</label>\n        <select name="school" multiple size="4" class="form-control" id="school">\n'+(null!=(s=a.each.call(o,null!=n?n.school:n,{name:"each",hash:{},fn:l.program(1,t,0),inverse:l.noop,data:t}))?s:"")+'        </select>\n    </div>\n    <div class="form-group">\n        <label for="classroom">Аудитория</label>\n        <select name="classroom" class="form-control" id="classroom">\n'+(null!=(s=a.each.call(o,null!=n?n.classroom:n,{name:"each",hash:{},fn:l.program(1,t,0),inverse:l.noop,data:t}))?s:"")+'        </select>\n    </div>\n    <button name="add" type="submit" class="btn btn-primary">Сохранить</button>\n</form>'},useData:!0}),this.ScheduleApp.templates.lecture.edit=Handlebars.template({1:function(l,n,a,e,t){var s,o,i=null!=n?n:{},c=a.helperMissing,r=l.escapeExpression;return'                        <option value="'+r((o=null!=(o=a._id||(null!=n?n._id:n))?o:c,"function"==typeof o?o.call(i,{name:"_id",hash:{},data:t}):o))+'" '+(null!=(s=a.if.call(i,null!=n?n.selected:n,{name:"if",hash:{},fn:l.program(2,t,0),inverse:l.noop,data:t}))?s:"")+">"+r((o=null!=(o=a.name||(null!=n?n.name:n))?o:c,"function"==typeof o?o.call(i,{name:"name",hash:{},data:t}):o))+"</option>\n"},2:function(l,n,a,e,t){return"selected"},compiler:[7,">= 4.0.0"],main:function(l,n,a,e,t){var s,o,i=null!=n?n:{},c=a.helperMissing,r="function",u=l.escapeExpression;return'<div class="lecture-edit-form">\n    <br/>\n    <div class="jumbotron">\n        <form name="lectureEdit" method="post">\n            <div class="form-group">\n                <label for="name">Название лекции</label>\n                <input type="text" class="form-control" id="name" name="name" value="'+u((o=null!=(o=a.name||(null!=n?n.name:n))?o:c,typeof o===r?o.call(i,{name:"name",hash:{},data:t}):o))+'" />\n            </div>\n            <div class="form-group">\n                <label for="lecturer">Имя лектора</label>\n                <input type="text" class="form-control" id="lecturer" name="lecturer" value="'+u((o=null!=(o=a.lecturer||(null!=n?n.lecturer:n))?o:c,typeof o===r?o.call(i,{name:"lecturer",hash:{},data:t}):o))+'" />\n            </div>\n            <div class="form-group">\n                <label for="date">Дата</label>\n                <input type="date" class="form-control" id="date" name="date" value="'+u((o=null!=(o=a.date||(null!=n?n.date:n))?o:c,typeof o===r?o.call(i,{name:"date",hash:{},data:t}):o))+'" placeholder="Например, 2017-05-12" />\n            </div>\n            <div class="form-group">\n                <label for="start">Время начала</label>\n                <input type="time" class="form-control" id="start" name="start" value="'+u((o=null!=(o=a.startTime||(null!=n?n.startTime:n))?o:c,typeof o===r?o.call(i,{name:"startTime",hash:{},data:t}):o))+'" placeholder="Например, 17:00" />\n            </div>\n            <div class="form-group">\n                <label for="finish">Время окончания</label>\n                <input type="time" class="form-control" id="finish" name="finish" value="'+u((o=null!=(o=a.finishTime||(null!=n?n.finishTime:n))?o:c,typeof o===r?o.call(i,{name:"finishTime",hash:{},data:t}):o))+'" placeholder="Например, 19:30" />\n            </div>\n            <div class="form-group">\n                <label for="school">Школа</label>\n                <select name="school" multiple size="4" class="form-control" id="school">\n'+(null!=(s=a.each.call(i,null!=n?n.schoolList:n,{name:"each",hash:{},fn:l.program(1,t,0),inverse:l.noop,data:t}))?s:"")+'                </select>\n            </div>\n            <div class="form-group">\n                <label for="classroom">Аудитория</label>\n                <select name="classroom" class="form-control" id="classroom">\n'+(null!=(s=a.each.call(i,null!=n?n.classroomList:n,{name:"each",hash:{},fn:l.program(1,t,0),inverse:l.noop,data:t}))?s:"")+'                </select>\n            </div>\n            <input type="hidden" name="id" value="'+u((o=null!=(o=a._id||(null!=n?n._id:n))?o:c,typeof o===r?o.call(i,{name:"_id",hash:{},data:t}):o))+'" />\n            <button name="save" type="submit" class="btn btn-primary lecture-save">Сохранить</button>\n            <button type="button" class="btn btn-secondary lecture-edit-cancel">Отменить</button>\n        </form>\n    </div>\n</div>'},useData:!0}),this.ScheduleApp.templates.lecture.list=Handlebars.template({1:function(l,n,a,e,t){var s,o,i=null!=n?n:{},c=a.helperMissing,r="function",u=l.escapeExpression;return'    <div class="lecture-item" data-id="'+u((o=null!=(o=a._id||(null!=n?n._id:n))?o:c,typeof o===r?o.call(i,{name:"_id",hash:{},data:t}):o))+"\" data-lecture='"+u((o=null!=(o=a.json||(null!=n?n.json:n))?o:c,typeof o===r?o.call(i,{name:"json",hash:{},data:t}):o))+'\'>\n        <div class="row">\n            <div class="col-8">\n                <b>'+u((o=null!=(o=a.name||(null!=n?n.name:n))?o:c,typeof o===r?o.call(i,{name:"name",hash:{},data:t}):o))+'</b><br/>\n                <span class="text-muted small">'+u((o=null!=(o=a.date||(null!=n?n.date:n))?o:c,typeof o===r?o.call(i,{name:"date",hash:{},data:t}):o))+" ("+u((o=null!=(o=a.startTime||(null!=n?n.startTime:n))?o:c,typeof o===r?o.call(i,{name:"startTime",hash:{},data:t}):o))+" - "+u((o=null!=(o=a.finishTime||(null!=n?n.finishTime:n))?o:c,typeof o===r?o.call(i,{name:"finishTime",hash:{},data:t}):o))+")</span><br/>\n                Лектор: "+u((o=null!=(o=a.lecturer||(null!=n?n.lecturer:n))?o:c,typeof o===r?o.call(i,{name:"lecturer",hash:{},data:t}):o))+"<br/>\n                Школа: "+u((o=null!=(o=a.schoolList||(null!=n?n.schoolList:n))?o:c,typeof o===r?o.call(i,{name:"schoolList",hash:{},data:t}):o))+"<br/>\n                Аудитория: "+u(l.lambda(null!=(s=null!=n?n.classroom:n)?s.name:s,n))+'\n            </div>\n            <div class="col-4">\n                <button type="button" class="btn btn-link btn-sm lecture-edit">Редактировать</button>\n                <button type="button" class="btn btn-link btn-sm lecture-delete">Удалить</button>\n            </div>\n        </div>\n        <hr/>\n    </div>\n'},compiler:[7,">= 4.0.0"],main:function(l,n,a,e,t){var s;return null!=(s=a.each.call(null!=n?n:{},null!=n?n.items:n,{name:"each",hash:{},fn:l.program(1,t,0),inverse:l.noop,data:t}))?s:""},useData:!0}),this.ScheduleApp.templates.classroom=this.ScheduleApp.templates.classroom||{},this.ScheduleApp.templates.classroom.edit=Handlebars.template({compiler:[7,">= 4.0.0"],main:function(l,n,a,e,t){var s,o=null!=n?n:{},i=a.helperMissing,c=l.escapeExpression;return'<div class="classroom-edit-form">\n    <br/>\n    <div class="jumbotron">\n        <form name="schoolEdit" method="post">\n            <div class="form-group">\n                <label for="name">Название аудитории</label>\n                <input type="text" class="form-control" id="name" name="name" value="'+c((s=null!=(s=a.name||(null!=n?n.name:n))?s:i,"function"==typeof s?s.call(o,{name:"name",hash:{},data:t}):s))+'" />\n            </div>\n            <div class="form-group">\n                <label for="capacity">Вместимость</label>\n                <input type="text" class="form-control" id="capacity" name="capacity" value="'+c((s=null!=(s=a.capacity||(null!=n?n.capacity:n))?s:i,"function"==typeof s?s.call(o,{name:"capacity",hash:{},data:t}):s))+'" />\n            </div>\n            <div class="form-group">\n                <label for="description">Описание</label>\n                <textarea name="description" class="form-control" id="description" rows="3">'+c((s=null!=(s=a.description||(null!=n?n.description:n))?s:i,"function"==typeof s?s.call(o,{name:"description",hash:{},data:t}):s))+'</textarea>\n            </div>\n            <input type="hidden" name="id" value="'+c((s=null!=(s=a._id||(null!=n?n._id:n))?s:i,"function"==typeof s?s.call(o,{name:"_id",hash:{},data:t}):s))+'" />\n            <button name="save" type="submit" class="btn btn-primary classroom-save">Сохранить</button>\n            <button type="button" class="btn btn-secondary classroom-edit-cancel">Отменить</button>\n        </form>\n    </div>\n</div>'},useData:!0}),this.ScheduleApp.templates.classroom.list=Handlebars.template({1:function(l,n,a,e,t){var s,o=null!=n?n:{},i=a.helperMissing,c="function",r=l.escapeExpression;return'    <div class="classroom-item" data-id="'+r((s=null!=(s=a._id||(null!=n?n._id:n))?s:i,typeof s===c?s.call(o,{name:"_id",hash:{},data:t}):s))+"\" data-classroom='"+r((s=null!=(s=a.json||(null!=n?n.json:n))?s:i,typeof s===c?s.call(o,{name:"json",hash:{},data:t}):s))+'\'>\n        <div class="row">\n            <div class="col-8">\n                <b>'+r((s=null!=(s=a.name||(null!=n?n.name:n))?s:i,typeof s===c?s.call(o,{name:"name",hash:{},data:t}):s))+"</b><br/>\n                Вместимость: "+r((s=null!=(s=a.capacity||(null!=n?n.capacity:n))?s:i,typeof s===c?s.call(o,{name:"capacity",hash:{},data:t}):s))+"<br/>\n                Описание: "+r((s=null!=(s=a.description||(null!=n?n.description:n))?s:i,typeof s===c?s.call(o,{name:"description",hash:{},data:t}):s))+'<br/>\n            </div>\n            <div class="col-4">\n                <button type="button" class="btn btn-link btn-sm classroom-edit">Редактировать</button>\n                <button type="button" class="btn btn-link btn-sm classroom-delete">Удалить</button>\n            </div>\n        </div>\n        <hr/>\n    </div>\n'},compiler:[7,">= 4.0.0"],main:function(l,n,a,e,t){var s;return null!=(s=a.each.call(null!=n?n:{},null!=n?n.items:n,{name:"each",hash:{},fn:l.program(1,t,0),inverse:l.noop,data:t}))?s:""},useData:!0});