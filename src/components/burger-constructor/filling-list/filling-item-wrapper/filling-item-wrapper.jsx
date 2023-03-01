import React from 'react';
import { useDrag, useDrop } from "react-dnd";
import FillingItem from "../filling-item/filling-item";
import PropTypes from 'prop-types';
import ingredientType from '../../../../utils/prop-types';


const FillingItemWrapper = ({ item, index, moveCard }) => {
    const ref = React.useRef(null);
    const [{ handlerId }, drop] = useDrop({
        // Указываем тип получаемых элементов, чтобы dnd понимал,
        // в какой контейнер можно класть перетаскиваемый элемент, а в какой нельзя.
        // Элементы и контейнеры с разными типами не будут взаимодействовать
        accept: 'component',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            }
        },
        // Вызывается, когда перетаскиваемый элемент оказывается над ингредиентом,
        // индекс которого у нас задан в пропсах props.index
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            // Переопределяем индексы ингредиентов для удобства
            const dragIndex = item.index;
            const hoverIndex = index;
            // Ничего не делаем, если ингредиент находится 
            if (dragIndex === hoverIndex) {
                return;
            }
            // Определяем границы карточки ингредиента
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Определяем середину карточки по оси Y нашего ингредиента
            // В момент пересечения этой границы, перетаскиваемым ингредиентом
            // Мы будем менять их местами
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Получаем текущую позицию курсора,
            // относительно текущего контейнера
            const clientOffset = monitor.getClientOffset();
            // Вычисляем координаты курсора и координаты середины карточки
            // на которую мы навели наш перетаскиваемый ингредиент
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Условие для перетаскивании элементов сверху вниз
            // Если перетаскиваемый ингредиент пересекает середину
            // текущего ингредиента, то мы идем дальше и выполняем moveCard
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Условие для перетаскивании элементов снизу вверх
            // Происходит тоже самое что и выше, только в обратном порядке
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Выполняем наш коллбэк с перемещением карточек внутри массива
            moveCard(dragIndex, hoverIndex);
            // Это сделано для внутренней оптимизации библиотеки
            // для поиска и замены элементом
            item.index = hoverIndex;
        }
    })
    // Задаем функционал перетаскивания для элементов внутри списка
    // ингредиентов заказа
    const [{ isDragging }, drag] = useDrag({
        type: 'component',
        item: () => ({ id: item.id, index }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    // Добавляем перетаскиваемому элементу прозрачность 0,
    // чтобы на его месте визуально появилось пустое пространство
    const opacity = isDragging ? 0 : 1;
    // Тут мы говорим что наш элемент и перетаскиваемый и бросаемый :)
    if (item.type !== 'bun') drag(drop(ref));
    // Прерываем базовую функция для onDrop
    // потому что браузер по умолчанию не сбрасывает наш элемент в контейнер
    const handleDrop = (e) => e.preventDefault();
    return (
        <div
            ref={ref}
            style={{ opacity }}
            onDrop={handleDrop}
            /*className={styles.wrapper}*/
            data-handler-id={handlerId}
        >
            <FillingItem item={item}/>
        </div>
    )
}

FillingItemWrapper.propTypes = {
    item: ingredientType.isRequired, 
    index: PropTypes.number.isRequired,
    moveCard: PropTypes.func.isRequired
}

export default FillingItemWrapper;