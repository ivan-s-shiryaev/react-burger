function _randomIntFromInterval(max, min = 0) {

    const result = Math.floor(Math.random() * (max - min + 1) + min);

    return result;

}

const _fillListFromListRandomCount = (value, count = 0) => {

    let result = [];

    while (count > 0) {

        result.push(value[Math.floor(Math.random() * value.length)]);

        --count;

    }

    return result;

};

const _mapObjectListByProperty = (list, property) => {

    const result = list.reduce(
        (accumulator, item) => {

            if (property in item) {
                accumulator.push(item[property]);
            }

            return accumulator;

        },
        []
    );

    return result;

};

const _filterObjectListByPropertyValue = (list, property, value, operator = 'e') => {

    let result = [];

    result = list.filter((item) => {

        if (property in item) {
            switch (operator) {
                case 'ne':
                    if (item[property] !== value) return true;
                    break;
                case 'e':
                default:
                    if (item[property] === value) return true;
                    break;
            }
        }

        return false;

    });

    return result;

};

export const makeOrderDataFake = (data) => {

    const result = {
        body: [],
        head: [],
        tail: [],
    };

    result.body = _fillListFromListRandomCount(
        _mapObjectListByProperty(
            _filterObjectListByPropertyValue(data, 'type', 'bun', 'ne')
            , '_id'
        )
        , _randomIntFromInterval(10, 1)
    );
    result.head = _fillListFromListRandomCount(
        _mapObjectListByProperty(
            _filterObjectListByPropertyValue(data, 'type', 'bun')
            , '_id'
        )
        , 1
    );
    result.tail = result.head;

    return result;

};