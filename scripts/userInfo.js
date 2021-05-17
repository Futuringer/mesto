export default class UserInfo {
  constructor({name,description}) {
    this._name = document.querySelector(name);
    this._description = document.querySelector(description);
  }

  getUserInfo() {
    const userData = {
      a: this._name.textContent,
      b: this._description.textContent
    }
    return userData;
  }

  setUserInfo({name,description}){
    this._name.textContent = name;
    this._description.textContent = description;
  }

}
