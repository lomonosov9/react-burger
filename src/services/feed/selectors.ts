import { RootState } from "../types"

export const feedSelector = (state: RootState) => state.feed.feed;
export const feedStatusSelector = (state: RootState) => state.feed.status;
export const feedErrorSelector  = (state: RootState) => state.feed.connectionError;