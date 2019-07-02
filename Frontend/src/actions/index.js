import { VALIDATE_FIELD, CHANGE_VALUE, VALIDATE_FORM} from "../consts/actionTypes";

export function validateField(payload) {
  return { type: VALIDATE_FIELD, payload }
}
export function validateForm() {
  return { type: VALIDATE_FORM}
}
export function changeValue(payload) {
  return {type: CHANGE_VALUE, payload}
}