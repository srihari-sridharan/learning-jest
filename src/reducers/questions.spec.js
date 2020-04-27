import { questions } from './questions'


describe('The questions reducer', () => {
    it('should  not modify the state for an unrecognized action', () => {
        console.log('Testing questions test.');
        const state = ["Which website do you use frequently?", "Which is your favorite programming language"];
        const newState = questions(state, "UNRECOGNIZED_ACTION");
        expect(newState).toBe(state);
        expect(newState).toEqual(state);
    });

    it('should add new questions when adding questions', () => {
        const state = [{ question_id: "1" }, { question_id: "2" }];
        const newQuestion = { question_id: "3" };
        const newState = questions(state, { type: 'FETCHED_QUESTION', question: newQuestion });
        expect(newState).toContain(newQuestion);
        // to contain works like toBe, it will fail if you send a clone of the newQuestion - uncomment and check
        // const newQuestionClone = { question_id: "3" };
        // expect(newState).toContain(newQuestionClone);
        expect(state).not.toContain(newQuestion); // This ensures that reducer does not modify existing state.
        expect(newState).toHaveLength(3);
    });
});