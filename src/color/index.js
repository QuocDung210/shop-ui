export const randomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    let a = '#' + randomColor;
    return a;
};
