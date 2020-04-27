import { handleFetchQuestion } from './fetch-question-saga';
import fetch from 'isomorphic-fetch';

describe("Fetch question saga", () => {
    beforeAll(() => {
        // Set the value as it needs to be returned
        fetch.__setValue([{ question_id: 24 }]);
    });


    it("should fetch the test question", async () => {
        const generator = handleFetchQuestion({ question_id: 24 });
        const { value } = generator.next();
        expect(value).toEqual([{ question_id: 24 }]);

        // Since fetch is a spy returned from the mock, we can check to see if it was called with certain parameters.
        expect(fetch).toHaveBeenCalledWith('/api/questions/24');
    });
});