import { mapStateToProps, QuestionDetailDisplay } from "../QuestionDetail";
import renderer from 'react-test-renderer';
import React from 'react';

describe('The Question Detail Component', () => {
    describe('The container element', () => {
        describe('mapStateToProps', () => {
            it('should map to the state to props correctly', () => {
                const sampleQuestion = {
                    question_id: 42,
                    body: 'This is a sample questions'
                };
                const appState = {
                    questions: [sampleQuestion]
                };
                const ownProps = { question_id: 42 };
                const componentState = mapStateToProps(appState, ownProps);
                expect(componentState).toEqual(sampleQuestion);
            });
        });
    });

    describe('The display element', () => {
        it('should not regress', () => {
            const tree = renderer.create(
                <QuestionDetailDisplay
                    title="How do you learn Jest?"
                    body="1"
                    answer_count={0}
                    tags={['React', 'Jest', 'JavaScript']}
                />);

            expect(tree.toJSON()).toMatchSnapshot();
        });
    });
});