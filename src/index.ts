interface Response {
  name: string;
  info: string;
  isImportant: boolean;
  isCompleted: boolean;
  id: number;
}

class Query {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  async getTaskByTaskId<T>(taskId: number): Promise<T | void> {
    const response = await fetch(`${this.url}/${taskId}`);

    if (!response.ok) {
      console.log(`Записи с id: ${taskId} не существует.`);
      return;
    }

    const data: T = await response.json();
    console.log(data);
  }

  async getAllTasks<T>(): Promise<T[] | void> {
    const response = await fetch(`${this.url}`);

    if (!response.ok) {
      console.log('Запрос не выполнен.');
      return;
    }

    const data: T[] = await response.json();
    console.log(data);
  }

  async deleteTaskByTaskId(taskId: number): Promise<void> {
    const config: RequestInit = { method: 'DELETE' };

    const response = await fetch(`${this.url}/${taskId}`, config);

    if (!response.ok) {
      console.log('Записи с таким id не существует.');
      return;
    }

    console.log(`Записи с id: ${taskId} была удалена.`);
  }

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  async postTask<T>(nameValue: string = 'Caesar', infoValue: string = 'Veni, vidi, vici.'): Promise<T | void> {
    const config: RequestInit = {
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

    const response = await fetch(`${this.url}`, config);

    if (!response.ok) {
      console.log('Не получилось добавить запись.');
      return;
    }

    const data: T = await response.json();
    console.log(data);
  }

  async patchTaskById<T>(
    taskId: number,
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    nameValue: string = 'Moby',
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    infoValue: string = 'American musician'
  ): Promise<T | void> {
    const config: RequestInit = {
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
    const response = await fetch(`${this.url}/${taskId}`, config);

    if (!response.ok) {
      console.error('Не получилось изменить запись.');
      return;
    }

    const data: T = await response.json();
    console.log(data);
  }
}

const request = new Query('https://intership-liga.ru/tasks');
request.getAllTasks<Response>();
request.getTaskByTaskId<Response>(125);
request.postTask<Response>();
request.patchTaskById<Response>(125);
request.deleteTaskByTaskId(126);
