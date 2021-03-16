var express = require("express"),
    http = require("http"),
    // импортируем библиотеку mongoose
    mongoose = require("mongoose"),
    app = express();
// toDos = [
//     {
//         "description": "Купить продукты",
//         "tags": ["шопинг", "рутина"]
//     },
//     {
//         "description": "Сделать несколько новых задач",
//         "tags": ["писательство", "работа"]
//     },
//     {
//         "description": "Подготовиться к лекции в понедельник",
//         "tags": ["работа", "преподавание"]
//     },
//     {
//         "description": "Ответить на электронные письма",
//         "tags": ["работа"]
//     },
//     {
//         "description": "Вывести Грейси на прогулку в парк",
//         "tags": ["рутина", "питомцы"]
//     },
//     {
//         "description": "Закончить писать книгу",
//         "tags": ["писательство", "работа"]
//     }
// ];
// подключаемся к хранилищу данных Amazeriffic в Mongo
mongoose.connect('mongodb://localhost/amazeriffic');
// Это модель Mongoose для задач
var ToDoSchema = mongoose.Schema({
    description: String,
    tags: [String]
});
var ToDo = mongoose.model("ToDo", ToDoSchema);
// //добавим пару задач
// var task1 = new ToDo({ "description": "Закончить писать книгу", "tags": ["писательство", "работа"] });
// var task2 = new ToDo({ "description": "Вывести Грейси на прогулку в парк", "tags": ["питомцы"] });
// task1.save(function (err) {
//     if (err !== null) {
//         // объект не был сохранен
//         console.log(err);
//     } else {
//         console.log("Объект был сохранен!");
//     }
// });
// task2.save(function (err) {
//     if (err !== null) {
//         // объект не был сохранен
//         console.log(err);
//     } else {
//         console.log("Объект был сохранен!");
//     }
// });
// начинаем слушать запросы
http.createServer(app).listen(3000);


app.use(express.static((__dirname + "/Client")));
// этот маршрут замещает наш файл
// todos.json в примере из части 5
app.get("/todos.json", function (req, res) {
    ToDo.find({}, function (err, toDos) {
        if (err !== null) {
            // объект не был передан
            console.log(err);
            res.json({ "message": "объект не был передан!" });
        } else { res.json(toDos); }
    });
});
// командуем Express принять поступающие
// объекты JSON
app.use(express.urlencoded());
app.post("/todos", function (req, res) {
    console.log(req.body);
    var newToDo = new ToDo({
        "description": req.body.description,
        "tags": req.body.tags
    });
    newToDo.save(function (err, result) {
        if (err !== null) {
            console.log(err);
            res.send("ERROR");
        } else {
            // клиент ожидает, что будут возвращены все задачи,
            // поэтому для сохранения совместимости сделаем дополнительный запрос
            ToDo.find({}, function (err, result) {
                if (err !== null) {
                    // элемент не был сохранен
                    res.send("ERROR");
                }
                res.json(result);
            });
        }
    });
});





