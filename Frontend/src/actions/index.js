import { ADD_ARTICLE} from "../consts/actionTypes";

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload }
};