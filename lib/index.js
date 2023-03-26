"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Query {
    constructor(url) {
        this.url = url;
    }
    getTaskByTaskId(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.url}/${taskId}`);
            if (!response.ok) {
                console.log(`Записи с id: ${taskId} не существует.`);
                return;
            }
            const data = yield response.json();
            console.log(data);
        });
    }
    getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${this.url}`);
            if (!response.ok) {
                console.log('Запрос не выполнен.');
                return;
            }
            const data = yield response.json();
            console.log(data);
        });
    }
    deleteTaskByTaskId(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = { method: 'DELETE' };
            const response = yield fetch(`${this.url}/${taskId}`, config);
            if (!response.ok) {
                console.log('Записи с таким id не существует.');
                return;
            }
            console.log(`Записи с id: ${taskId} была удалена.`);
        });
    }
    postTask(nameValue = 'Caesar', infoValue = 'Veni, vidi, vici.') {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: nameValue,
                    info: infoValue,
                    isImportant: false,
                }),
            };
            const response = yield fetch(`${this.url}`, config);
            if (!response.ok) {
                console.log('Не получилось добавить запись.');
                return;
            }
            const data = yield response.json();
            console.log(data);
        });
    }
    patchTaskById(taskId, nameValue = 'Moby', infoValue = 'American musician') {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: nameValue,
                    info: infoValue,
                    isImportant: false,
                    isCompleted: true,
                }),
            };
            const response = yield fetch(`${this.url}/${taskId}`, config);
            if (!response.ok) {
                console.error('Не получилось изменить запись.');
                return;
            }
            const data = yield response.json();
            console.log(data);
        });
    }
}
const request = new Query('https://intership-liga.ru/tasks');
request.getAllTasks();
request.getTaskByTaskId(125);
request.postTask();
request.patchTaskById(125);
request.deleteTaskByTaskId(126);
//# sourceMappingURL=index.js.map