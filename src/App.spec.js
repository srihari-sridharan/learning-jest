import delay from 'redux-saga';

it('Invoke the done()callback that is passed to the test', (done) => {
    setTimeout(() => {
        done();
    }, 100);
});

// Or can be written as
it('Invoke the done()callback that is passed to the test', (done) => {
    setTimeout(done, 100);
});

// Max timeout is 5000ms - anything greater indicates it is an issue with the way tests are designed
it('Return a promise from a test', () => {
    return new Promise(resolve => setTimeout(() => {
        resolve();
    }, 200));
});

// Or can be written as
it('Return a promise from a test', () => {
    return new Promise(resolve => setTimeout(resolve, 200));
});

it('Pass an async function', async () => {
    await delay(300);
});