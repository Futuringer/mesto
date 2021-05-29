export default class UserInfo {
  constructor({name,description,avatar}) {
    this._name = document.querySelector(name);
    this._description = document.querySelector(description);
    this._avatar = avatar;
  }

  getUserInfo() {
    const userData = {
      userName: this._name.textContent,
      userOccupation: this._description.textContent
    }
    return userData;
  }

  setUserAvatar(data){
    this._avatar.src = data.avatar;
  }

  setUserInfo({name,about}){
    this._name.textContent = name;
    this._description.textContent = about;
  }

}
