export const splitNumber = (num) => {
    const numString = num?.toString();

    let newString = '';
    let count = 0;
    for (let i = numString?.length; i >= 1; i--) {
        if (count === 3) {
            if (i === numString?.length - 3) {
                newString = numString?.slice(numString?.length - 3);

                count = 0;
            }

            if (i !== numString?.length - 3) {
                if (i === 1) {
                    newString =
                        numString.slice(0, numString.length - newString.length - count) +
                        ',' +
                        numString.slice(i, i + count);

                    count = 0;
                }
                if (i !== 1) {
                    newString = numString.slice(i, i + count) + ',' + newString;

                    count = 0;
                }
            }
        } else {
            if (i === 1) {
                newString = numString.slice(0, numString.length - newString.length + count) + ',' + newString;
            }
        }

        count++;
    }

    return newString;
};
