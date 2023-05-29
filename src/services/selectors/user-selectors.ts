import { RootState } from "../types"

//пользователь
export const userSelector                   = (state: RootState) => state.user.user
export const userRequestSelector            = (state: RootState) => state.user.dataRequest
export const userFailedSelector             = (state: RootState) => state.user.dataFailed
export const userErrorSelector              = (state: RootState) => state.user.errorMessage
export const isAuthorizedSelector           = (state: RootState) => state.user.isAuthorized
export const passwordRecoverSuccessSelector = (state: RootState) => state.user.passwordRecoverSuccess
export const passwordRecoverFailedSelector  = (state: RootState) => state.user.passwordRecoverFailed
export const passwordRecoverRequestSelector = (state: RootState) => state.user.passwordRecoverRequest
export const passwordRecoverErrorSelector   = (state: RootState) => state.user.errorMessage
export const passwordResetSuccessSelector   = (state: RootState) => state.user.passwordResetSuccess
export const passwordResetFailedSelector    = (state: RootState) => state.user.passwordResetFailed
export const passwordResetRequestSelector   = (state: RootState) => state.user.passwordResetRequest
export const passwordResetErrorSelector     = (state: RootState) => state.user.errorMessage