import { useCallback } from "react";
import { useSelector, useDispatch } from '../../../services/hooks';
import { constructorActionCreator } from '../../../services/action-creators';
import { fillingSelector } from '../../../services/selectors';
import FillingItemWrapper from "./filling-item-wrapper/filling-item-wrapper";
import { TIngredient, TComponent } from "../../../services/types/data";

const FillingList: React.FC = () => {

    const dispatch = useDispatch();
    const filling = useSelector(fillingSelector) as TComponent[];

    // Коллбэк, в котором ингредиенты меняются местами,
    // если один накладывается на другой
    const moveCard = useCallback((dragIndex: number, hoverIndex: number): void => {
        // Получаем перетаскиваемый ингредиент
        const dragCard = filling[dragIndex];
        const newCards = [...filling];
        // Удаляем перетаскиваемый элемент из массива
        newCards.splice(dragIndex, 1);
        // Вставляем элемент на место того элемента,
        // над которым мы навели мышку с "перетаскиванием"
        // Тут просто создается новый массив, в котором изменен порядок наших элементов
        newCards.splice(hoverIndex, 0, dragCard);
        // В примере react-dnd используется библиотека immutability-helper
        // Которая позволяет описывать такую имутабельную логику более декларативно
        // Но для лучше понимания обновления массива,
        // Советую использовать стандартный splice

        dispatch(constructorActionCreator.updateFillingList(newCards))
    }, [filling, dispatch]);

    return (
        <>
            {
                filling.map((item, index) => (
                    <FillingItemWrapper key={item.dragId} index={index} item={item} moveCard={moveCard} />
                ))
            }
        </>
    )
}

export default FillingList;