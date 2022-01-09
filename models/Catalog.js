var arr = [];
for (var i = 0; i < 1; i++) {
    arr.push({
        name: "item item itemitem item item" + i,
        cost: (i + 1) * 10,
        weight: (i + 100)
    });
}
exports.getItems = () => {
    return arr;
}
exports.addItem = (item) => {
    arr.push(item);
}