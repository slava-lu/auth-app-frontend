const moduleName = 'ui'

const TOGGLE_LEFT_MENU_MOBILE = `${moduleName}/TOGGLE_LEFT_MENU_MOBILE`
export const RESET_ERROR_GLOBAL = `${moduleName}/RESET_ERROR_GLOBAL`
export const SHOW_INFO_MESSAGE_GLOBAL = `${moduleName}/SHOW_INFO_MESSAGE_GLOBAL`
const RESET_INFO_MESSAGE_GLOBAL = `${moduleName}/RESET_INFO_MESSAGE_GLOBAL`
export const PASSWORD_VALIDATION_MODAL_OPEN = `${moduleName}/PASSWORD_VALIDATION_MODAL_OPEN`
export const PASSWORD_VALIDATION_MODAL_CLOSE = `${moduleName}/PASSWORD_VALIDATION_MODAL_CLOSE`
export const PASSWORD_VALIDATION_FAILURE = `${moduleName}/PASSWORD_VALIDATION_FAILURE`

const PASSWORD_VALIDATION_TRIGGER = `${moduleName}/PASSWORD_VALIDATION_TRIGGER`

const initialState = {
  isLeftMenuOpen: false,
  infoMessage: false,
  isPasswordCheckModalOpen: false,
  passwordCheckMeta: {},
  passwordValidationError: false,
  isError: false,
  error: false,
  isLoading: false,
}

export const toggleLeftMenuMobile = (isOpen) => ({
  type: TOGGLE_LEFT_MENU_MOBILE,
  payload: isOpen,
})

export const dispatchResetError = () => ({
  type: RESET_ERROR_GLOBAL,
})

export const dispatchResetInfoMessage = () => ({
  type: RESET_INFO_MESSAGE_GLOBAL,
})

export const closePasswordCheckModal = () => ({
  type: PASSWORD_VALIDATION_MODAL_CLOSE,
})

export const startPasswordCheck = () => ({
  type: PASSWORD_VALIDATION_TRIGGER,
})

export const uiReducer = (state = initialState, { type, payload, result, error }) => {
  switch (type) {
    case PASSWORD_VALIDATION_TRIGGER:
      return { ...state, isLoading: true, isError: false }

    case PASSWORD_VALIDATION_FAILURE:
      return { ...state, isLoading: false, isError: true, error }

    case TOGGLE_LEFT_MENU_MOBILE:
      return { ...state, isLeftMenuOpen: payload }

    case SHOW_INFO_MESSAGE_GLOBAL:
      return { ...state, infoMessage: payload }

    case RESET_INFO_MESSAGE_GLOBAL:
      return { ...state, infoMessage: false }

    case PASSWORD_VALIDATION_MODAL_OPEN:
      return { ...state, isPasswordCheckModalOpen: true, passwordCheckMeta: result }

    case PASSWORD_VALIDATION_MODAL_CLOSE:
      return { ...state, isPasswordCheckModalOpen: false, isError: false, isLoading: false }

    default:
      return state
  }
}
