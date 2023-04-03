//пользователь
export const userSelector                   = (state) => state.user.user
export const userRequestSelector            = (state) => state.user.dataRequest
export const userFailedSelector             = (state) => state.user.dataFailed
export const userErrorSelector              = (state) => state.user.errorMessage
export const isAuthorizedSelector           = (state) => state.user.isAuthorized
export const passwordRecoverSuccessSelector = (state) => state.user.passwordRecoverSuccess
export const passwordRecoverFailedSelector  = (state) => state.user.passwordRecoverFailed
export const passwordRecoverRequestSelector = (state) => state.user.passwordRecoverRequest
export const passwordRecoverErrorSelector   = (state) => state.user.errorMessage
export const passwordResetSuccessSelector   = (state) => state.user.passwordResetSuccess
export const passwordResetFailedSelector    = (state) => state.user.passwordResetFailed
export const passwordResetRequestSelector   = (state) => state.user.passwordResetRequest
export const passwordResetErrorSelector     = (state) => state.user.errorMessage