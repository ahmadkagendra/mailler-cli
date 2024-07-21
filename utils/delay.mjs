function delay (xTimedelay) {
    return new Promise((resolve , reject) => {
        setTimeout(() => {
            resolve();
        } , xTimedelay);
    });
};

export default delay;
