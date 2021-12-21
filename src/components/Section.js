//класс Section - отвечает за отрисовку элементов на странице
export default class Section {
  constructor(data, sectionSelector) {
    this._renderedItems = data.items; //это массив данных, которые нужно добавить на страницу при инициализации класса
    this._renderer = data.renderer;//это функция, которая отвечает за создание и отрисовку данных на странице.
    this._sectionSelector = sectionSelector;// селектор контейнера, в который нужно добавлять созданные элементы.
  }
 
  // перебираем все элементы renderer
  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  } 

  // метод addItem принимает DOM-элемент и добавляет его в контейнер.
  addItem(item) {
    this._sectionSelector.prepend(item);
  }
}