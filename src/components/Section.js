export default class Section {
  constructor({data, renderer},containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(cardsData) {
    cardsData.forEach(item => this._renderer(item))
  }

  setItem(element, place) {
    if (place === 'prepend') {
      this._container.prepend(element);
    }
    else {
      this._container.append(element);
    }
  }
}
