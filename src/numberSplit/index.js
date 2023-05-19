export const splitNumber = (num) => {
    if (num === 0 || !num) {
        return 0;
    }
    const numString = num?.toString();

    let newString = null;
    let count = 0;
    for (let i = numString?.length; i >= 1; i--) {
        if (count === 3) {
            if (i === 1) {
                if (!newString) {
                    newString = numString[0] + ',' + numString?.slice(1, 4);
                } else {
                    newString = numString[0] + ',' + numString?.slice(1, 4) + ',' + newString;
                }
            } else {
                if (!newString) {
                    newString = numString?.slice(numString?.length - 3);
                } else {
                    newString = numString?.slice(i, i + 3) + ',' + newString;
                }
            }
            count = 0;
        } else {
            if (i === 1) {
                if (count === 0) {
                    newString = numString;
                }
                if (count === 1) {
                    if (!newString) {
                        newString = numString;
                    } else {
                        newString = numString[0] + numString?.slice(1, 2) + ',' + newString;
                    }
                }
                if (count === 2) {
                    if (!newString) {
                        newString = numString;
                    } else {
                        newString = numString[0] + numString?.slice(1, 3) + ',' + newString;
                    }
                }
            }
        }

        count++;
    }

    return newString;
};
