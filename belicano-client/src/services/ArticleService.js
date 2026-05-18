import axios from 'axios';
import constants from '../constants';

const API = axios.create({
  baseURL: `${constants.HOST}/articles`,
});

export const mapArticleFromApi = (a) => ({
  ...a,
  content: Array.isArray(a.content) ? [...a.content] : [],
  description: String(a.content?.[0] ?? '').trim(),
});

export const fetchArticles = () => API.get('/');
export const fetchArticleBySlug = (slug) => API.get(`/slug/${slug}`);
export const createArticle = (article) => API.post('/', article);
export const updateArticle = (id, article) => API.put(`/${id}`, article);
export const deleteArticle = (id) => API.delete(`/${id}`);

