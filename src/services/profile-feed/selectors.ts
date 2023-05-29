import { RootState } from "../types"

export const profileFeedSelector = (state: RootState) => state.profileFeed.feed;
export const profileFeedStatusSelector = (state: RootState) => state.profileFeed.status;
export const profileFeedErrorSelector  = (state: RootState) => state.profileFeed.connectionError;