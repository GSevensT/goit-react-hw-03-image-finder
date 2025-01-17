import axios from 'axios';
import Notiflix from 'notiflix';

export const notifySettings = {
  width: '380px',
  position: 'right-top',
  distance: '10px',
  opacity: 1,
  fontSize: '20px',
  borderRadius: '12px',
};

export async function fetchData(searchQuery, page) {
  const API_KEY = '43795317-adbf90c7cfb1d2599d76b717d';

  const searchParams = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 12,
  });

  const url = `https://pixabay.com/api/?${searchParams}`;

  const response = await axios.get(url);
  if (response.status === 404) {
    Notiflix.Notify.failure(
      'Oops, no pics found. Please try again',
      notifySettings
    );
    return Promise.reject();
  }
  return response;
}
