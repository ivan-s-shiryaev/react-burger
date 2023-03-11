import PropTypes from 'prop-types';
import React from 'react';
import {
    useDispatch,
} from 'react-redux';
import {
    useDrag,
    useDrop,
} from 'react-dnd';
import {
    ConstructorElement,
    DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import {
    INGREDIENT_PROPTYPES,
} from '../../constants';
import {
    REORDER_ORDER_ITEMS,
    removeOrderItem,
} from '../../services/actions/order';
import orderItemStyles from './order-item.module.css';

const OrderItem = (props) => {

    const {
        mode,
        index,
        locked,
        _id: id,
        type,
        name,
        price,
        image,
    } = props;

    const ref = React.useRef(null);
    const dispatch = useDispatch();

    const [{ handlerId }, dropRef] = useDrop({
        accept: 'order',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            
            if (!ref.current) return;
            
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) return;

            const hoverBoundingRect = ref.current.getBoundingClientRect();
            
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

            dispatch({
                type: REORDER_ORDER_ITEMS,
                payload: {
                    from: dragIndex,
                    to: hoverIndex,
                },
            });

            item.index = hoverIndex;

        },
    });
    const [{ isDragging }, dragRef] = useDrag({
        type: 'order',
        item: () => {
            return { index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const handleOrderItemTrashClick = React.useCallback(
        (item) => (event) => {

            event.preventDefault();
            event.stopPropagation();

            dispatch(removeOrderItem(item));

        }
        , [ dispatch ]
    );

    let text = name;
    if (mode === 'top') text = text.concat(' (верх)');
    if (mode === 'bottom') text = text.concat(' (низ)');

    dragRef(dropRef(ref));

    return (
        <li
            ref={ref}
            data-handler-id={handlerId}
            className={`${orderItemStyles.container} ${isDragging ? orderItemStyles.dragging : ''} mb-4`}
        >
            <ConstructorElement
                type={mode}
                isLocked={locked}
                text={text}
                price={price}
                thumbnail={image}
                handleClose={handleOrderItemTrashClick({ id, type, price, index})}
            />
            {
                mode === 'stream'
                && (
                    <span>
                        <DragIcon
                            type="primary"
                        />
                    </span>
                )
            }
        </li>
    );

};

OrderItem.propTypes = {
    ...INGREDIENT_PROPTYPES,
    mode:  PropTypes.string.isRequired,
    index:  PropTypes.number.isRequired,
    locked:  PropTypes.bool,
};

export default OrderItem;