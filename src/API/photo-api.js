const key = '23969951-9657d20fcde1193b572e11c69';
let page = 1;
const searchPhotos = (searchValue, prevValue) => {
  if (searchValue === prevValue) {
    page += 1;
  } else {
    page = 1;
  }
  return fetch(
    `https://pixabay.com/api/?q=${searchValue}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`,
  )
    .then(responce => responce.json())
    .then(responce => {
      if (responce.hits.length === 0) {
        return Promise.reject(new Error('Nothing was founded'));
      }
      return responce.hits;
    });
};
export { searchPhotos };
