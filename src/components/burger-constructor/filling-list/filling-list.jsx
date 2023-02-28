import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from '../../../services/actionCreators';
import { fillingSelector} from '../../../services/selectors';
import FillingItemWrapper from "./filling-item-wrapper/filling-item-wrapper";

const FillingList = () => {
 
    const dispatch = useDispatch();
    const filling = useSelector(fillingSelector);
    
    // Коллбэк, в котором ингредиенты меняются местами,
    // если один накладывается на другой
    const moveCard = useCallback((dragIndex, hoverIndex) => {
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

        dispatch(actionCreators.updateFillingList(newCards))
    }, [filling, dispatch]);

    return (
        filling.map((item, index) => (
            <FillingItemWrapper key={item.dragId} index={index} item={item} moveCard={moveCard} />
        ))
    )
}

export default FillingList;