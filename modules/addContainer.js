export const addContainer = (parrent, className) => {

  const container = document.createElement('div');
  container.classList.add('container');

  if (className) {
    container.classList.add(className);
  }

  parrent.append(container);

  return container;

}