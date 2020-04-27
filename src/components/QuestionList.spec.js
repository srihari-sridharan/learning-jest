describe('The question list', () => {

    beforeEach(() => {
        console.log("Before each...")
    });

    beforeAll(() => {
        console.log("Before all...")
    });

    afterEach(() => {
        console.log("After each...")
    });

    afterAll(() => {
        console.log("After  all...")
    });

    it.only('should only be run and display a list of items', () => {

    });

    it('should be skipped as "only" in another test skips this by default', () => {

    });

    it.skip('should be skipped', () => {

    });

});