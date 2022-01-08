//создание класса, который будет отображать нформацию о пользователе
export default class UserInfo {
  constructor(nameSelector, aboutSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
  }

  getUserInfo() {
    return {
      id: this._id,
      name: this._name,
      about: this._about
    }
  }

  setUserInfo(data) {
    if (data) {
      this._id = data._id;
      this._name = data.name;
      this._about = data.about;
     //console.log(this._id);
      this._render();
    }
  }

  _render() {
    this._nameElement.textContent = this._name;
    this._aboutElement.textContent = this._about;
  }
}


