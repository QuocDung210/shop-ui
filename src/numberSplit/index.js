export const splitNumber = (num) => {
    if (num === 0 || !num) {
        return 0;
    }
    const numString = num?.toString();

    let newString = '';
    let count = 0;
    for (let i = numString?.length; i >= 1; i--) {
        if (count === 3) {
            if (i === numString?.length - 3) {
                newString = numString?.slice(numString?.length - 3);

                count = 0;
            }
            if (i === 1) {
                newString = numString[0] + ',' + numString?.slice(numString?.length - 3);
            }

            if (i !== numString?.length - 3) {
                if (i === 1) {
                    newString =
                        numString.slice(0, numString.length - newString.length - count + 1) +
                        ',' +
                        numString.slice(i, i + count) +
                        ',' +
                        newString;
                    count = 0;
                }
                if (i !== 1) {
                    newString = numString.slice(i, i + count) + ',' + newString;
                    count = 0;
                }
            }
        } else {
            if (i === 1 && count === 2) {
                if (numString.length < 6) {
                    newString = numString.slice(0, numString.length - newString.length + count - 2) + ',' + newString;
                }
                if (numString.length > 6) {
                    newString = numString.slice(0, numString.length - newString.length + count - 1) + ',' + newString;
                }
                if (numString.length === 6) {
                    newString = numString.slice(0, numString.length - newString.length) + ',' + newString;
                }
            }
            if (i === 1 && count === 1) {
                newString = numString.slice(0, numString.length - newString.length + count) + ',' + newString;
            }
        }

        count++;
    }

    return newString;
};
