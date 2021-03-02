var organizeByTags = function (toDoObjects) {
    // создание пустого массива для тегов
    var tags = [];
    // перебираем все задачи toDos
    toDoObjects.forEach(function (toDo) {
        // перебираем все теги для каждой задачи
        toDo.tags.forEach(function (tag) {
            // убеждаемся, что этого тега
            // еще нет в массиве
            if (tags.indexOf(tag) === -1) {
                tags.push(tag);
            }
        });
    });
    console.log(tags);

    var tagObjects = tags.map(function (tag) {
        // здесь мы находим все задачи,
        // содержащие этот тег
        var toDosWithTag = [];
        toDoObjects.forEach(function (toDo) {
            // проверка, что результат
            // indexOf is *не* равен -1
            if (toDo.tags.indexOf(tag) !== -1) {
                toDosWithTag.push(toDo.description);
            }
        });
        // мы связываем каждый тег с объектом, который
        // содержит название тега и массив
        return { "name": tag, "toDos": toDosWithTag };
    });
    console.log(tagObjects);
    return tagObjects;
};


var main = function (toDoObjects) {
    "use strict";
    var toDos = toDoObjects.map(function (toDo) {
        return toDo.description;
    });
    $(".tabs a span").toArray().forEach(function (element) {
        $(element).on("click", function () {
            var $element = $(element);
            var $content;
            $(".tabs a span").removeClass("active");
            $(element).addClass("active");
            $("main .content").empty();
            if ($element.parent().is(":nth-child(1)")) {
                $content = $("<ul>");
                for (var i = toDos.length - 1; i > -1; i--) {
                    $content.append($("<li>").text(toDos[i]));
                }
                $("main .content").append($content);
            } else if ($element.parent().is(":nth-child(2)")) {
                $content = $("<ul>");
                toDos.forEach(function (todo) {
                    $content.append($("<li>").text(todo));
                });
                $("main .content").append($content);
            } else if ($element.parent().is(":nth-child(3)")) {
                console.log("Щелчок по вкладке Теги");
                organizeByTags(toDoObjects);
                var organizedByTag = organizeByTags(toDoObjects);
                organizedByTag.forEach(function (tag) {
                    var $tagName = $("<h3>").text(tag.name),
                        $content = $("<ul>");
                    tag.toDos.forEach(function (description) {
                        var $li = $("<li>").text(description);
                        $content.append($li);
                    });
                    $("main .content").append($tagName);
                    $("main .content").append($content);
                });
            } else if ($element.parent().is(":nth-child(4)")) {
                var $input = $("<input>");
                var $inputLabel = $("<p>").text("Новая задача");
                var $tagInput = $("<input>");
                /*$tagInput.addEventListener("keyup", function (event) {
                    if (event.keyCode === 13) {
                        var description = $input.val();
                        var tags = $tagInput.val().split(",");
                        toDoObjects.push({ "description": description, "tags": tags });
                        //обновление toDos
                        toDos = toDoObjects.map(function (toDo) {
                            return toDo.description;
                        });
                    }
                });*/
                $tagInput.keypress(function (e) {
                    if (e.which == 13 && $input.val() != "" && $tagInput.val() != "") {
                        var description = $input.val();
                        var tags = $tagInput.val().split(",");
                        toDoObjects.push({ "description": description, "tags": tags });
                        //обновление toDos
                        toDos = toDoObjects.map(function (toDo) {
                            return toDo.description;
                        });
                        $(".tabs a:first-child span").trigger("click");
                    }
                });
                var $tagLabel = $("<p>").text("Тэги: ");
                var $button = $("<button>+</button>");
                $("main .content").append($inputLabel);
                $("main .content").append($input);
                $("main .content").append($tagLabel);
                $("main .content").append($tagInput);
                $("main .content").append($button);
                $(".content button").on("click", function () {
                    if ($input.val() != "" && $tagInput.val() != "") {
                        var description = $input.val();
                        var tags = $tagInput.val().split(",");
                        toDoObjects.push({ "description": description, "tags": tags });
                        //обновление toDos
                        toDos = toDoObjects.map(function (toDo) {
                            return toDo.description;
                        });
                        $(".tabs a:first-child span").trigger("click");
                    }

                });
            }
            return false;
        });
    });
    $(".tabs a:first-child span").trigger("click");
}
$(document).ready(function () {
    $.getJSON("todos.json", function (toDoObjects) {
        main(toDoObjects);
    });
});
