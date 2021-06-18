const API_URL = process.env.REACT_APP_API_URL;

export const LOGIN = {
  url: `${API_URL}/login`,
  method: 'POST',
}

export const SIGNUP = {
  url: `${API_URL}/signup`,
  method: 'POST',
}

export const GALLERY = {
  url: `${API_URL}/gallery`,
  method: 'GET',
  headers: {}
}

export const GALLERY_CREATE = {
  url: `${API_URL}/gallery/create`,
  method: 'POST',
}

export const GALLERY_UPDATE = {
  url: `${API_URL}/gallery/edit`,
  method: 'POST',
}

export const GALLERY_DELETE = {
  url: `${API_URL}/gallery/delete`,
  method: 'POST',
}