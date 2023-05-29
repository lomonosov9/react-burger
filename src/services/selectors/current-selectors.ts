import { RootState } from "../types"

//текущий просматриваемый ингридиент
export const currentIngridientSelector = (state: RootState) => state.current.ingridient;