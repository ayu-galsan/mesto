//создание класса, который будет отображать нформацию о пользователе
export default class UserInfo {
  constructor( nameSelector, aboutSelector) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    const user = {
      name: this._name.textContent,
      job: this._job.textContent
    };
    return user;
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.job;
  }
}

