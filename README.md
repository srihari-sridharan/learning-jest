# Jest - Testing React Applications

## Importance of learning Jest

- Level up your resume and add value
- Gain skills related to Dev Ops and QA
- Gain experience with testing in general
- Build more complex applications

## Understanding testing concepts

- Prevents regression
- Provides objective success criteria
- Facilitates complex, modular applications

## Introduction to Jest

### Jest testing ecosystem

- Jasmine/Mocha (describe, it)
- Jest
  - Built on top of Jasmine and Mocha
  - Adds snapshot testing, mocking and many other features
  - Includes superior assertion library, CLI
  - Works with or without React
- Enzyme
  - Not a test runner - has tools to test React apps
  - Expresses component output as HTML (Like React Test Renderer)
  - Potentially useful but not for every project - still has quite a few open issues - [Enzyme - Git Repository](https://github.com/enzymejs/enzyme)

### Jest Vs. Mocha

|                  | Jest | Mocha |
| ---------------- | :--: | :---: |
| Run Tests        | Yes  |  Yes  |
| Asynchronous     | Yes  |  Yes  |
| Spies Included   | Yes  |  No   |
| Snapshot Testing | Yes  |  No   |
| Module Mocking   | Yes  |  No   |

### Jest and Jest CLI

- **Jest** - The actual test runner library which you use to execute your tests
- **Jest CLI** - A tool that you use from the command line to run and provide configuration options to Jest (the test runner)

### Practical Jest usage 101

- Watcher is triggered by NPM on development start script
- CI suite runs tests and rejects failing PRs on integration server
- Senior developers review coverage reports and CI hooks
- End user is never aware of Jest, only that the application works

### Common Jest pitfalls

- Tests are not written
- No integration with version control
- Jest is not integration into developer's workflow
- Developers skip tests instead of fixing them
- No integration with Deployment/CI
- Tests do not protect against critical errors

## Testing with Jest

### Useful Extensions for VS Code

- orta.vscode-jest
- firsttris.vscode-jest-runner
- andrew-codes.jest-snippets

### Installing Jest-Cli

`npm install -g jest-cli` installs Jest globally. Run `jest` from command line and test if installation was successful.

### Installing Jest

In the project folder install the `jest` npm package as it will be used by our application and CI CD pipeline. `npm install jest --save`

### Identifying test files

Files in the folder `__tests__/*.js` are considered as tests. Pronounced as `dunder tests dunder`.
Files that end with `.spec.js` or `.test.js` are considered as specs and tests.

### Tests in their own folder

- Easily distinguish between test and non-test files
- Unrelated files can share a folder (i.e., a “loginService” test and a “cryptoHash” test)
- Very easy to isolate a particular set of tests that are in the same folder
- Tests can be named anything but must be inside an appropriately named folder (i.e., **tests**), to be recognized

### Tests alongside components

- Which files are components and which files are spec is not as obvious
- Tests are always adjacent to the files they apply to
- Unrelated tests are less likely to share a folder
- Tests must have the correct naming pattern to be recognized, i.e., \*.test.js
- Possible to isolate tests based on name patterns, i.e., user-\*

### Jest globals

- `describe()` or `suite()` - helps in grouping tests.
- `it()` or `test()` - individual tests

#### Example

```JavaScript
describe('The tags list', () => {
    it('renders as expected', () => {
        // Test code here...
    });
});
```

### Jest watch mode

- Watches for changes to tests and selectively runs changed tests.
- Use `jest --watch`.

### Regex for test files

- `jest <REGEX_PATTERN>` e.g. `jest app` will look for all test files having `app` in the name.

### Setup, teardown, skipping and isolating tests

- `BeforeEach` - once before each test - `it` statement
- `BeforeAll` - once before all tests - `it` statements
- `AfterEach` - once at the end of each test - `it` statement
- `AfterAll` - once after all tests - `it` statements
- `skip` - Skipping a test results in that test not being run
- `only` - Isolating a test results in only it (and any other isolated tests) running

```JavaScript
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
```

### Asynchronous tests

- Contains assertions (like a regular test)
- Does not complete instantaneously
- Can take varying amounts of time, even an unknown amount of time
- Jest must be notified that test is complete

#### Defining asynchronous tests

- Invoke the `done()`callback that is passed to the test

  ```JavaScript
  it("async test 1", done => {
    setTimeout(done,100);
  });
  ```

- Return a promise from a test

  ```JavaScript
  it("async test 2",() => {
    return new Promise (resolve => setTimeout(resolve,100));
  });
  ```

- Pass an async function to `it`

  ```JavaScript
  it("async test 3", async () => await delay(100));
  ```

## Understanding Jest Mocks

### Necessity for Mocking

- Reduce dependencies required by tests (faster test execution)
- Prevent side-effects during testing
- Build custom mocks to facilitate desired testing procedures

### Introduction to mocks

- A convincing duplicate of an object with no internal workings
- Can be automatically or manually created
- Has same API as original, but no side effects
- Spies and other mock features simplify testing

### The mocking process

- Scan the original object for methods, give the new object spy methods with the same names
- Ensure that any methods which returned a promise still return a promise in the mock
- Create mocks for any complex values that are returned from methods which are required for tests

### Mock functions - Spies

- Also known as “spies”
- No side-effects
- Counts function calls
- Records arguments passed when called
- Can be "loaded" with return values
- Return value must approximate original

### Creating mock files

- Approximately named NPM mocks are loaded automatically
- Mocks must reside in a `__mocks__` folder next to mocked module
- NPM modules and local modules can both be mocked
- For mocking node modules the `__mocks__` folder should be present at the same level as node_modules
- For local modules the `__mocks__` folder should be present in the same folder as module being mocked.

### Mocking isomorphic-fetch library

- Create a folder `__mocks__` in the root of the repo, the same folder as `node_modules`.
- Create a file `isomorphic-fetch.js` inside `__mocks__` folder.

```JavaScript
let __value = 42;

// jest.fn() creates a spy function. () => __value is wrapped in a spy
const isomorphicFetch = jest.fn(() => __value);

// A function to set the __value
isomorphicFetch.__setValue = v => __value = v;

// Export isomorphicFetch so that this module is used instead of actual isomorphic-fetch
export default isomorphicFetch;
```

- This creates a mock for `isomorphic-fetch` npm package.
- The code in `fetch-questions-saga.js` looks as shown below. This hits the actual API and returns the data.

```JavaScript
import { put, take } from 'redux-saga/effects'
import fetch from 'isomorphic-fetch';
/**
 * Fetch questions saga gets a list of all new
 * questions in response to a particular view being loaded
 */
export default function * () {
    while (true) {
        /**
         * Wait for a request to fetch questions, then fetch data from the API and notify the application
         * that new questions have been loaded.
         */
        yield take(`REQUEST_FETCH_QUESTIONS`);
        const raw = yield fetch('/api/questions');
        const json = yield raw.json();
        const questions = json.items;
        yield put({type:`FETCHED_QUESTIONS`,questions});
    }
}
```

- Create the test code in `fetch-question-saga.spec.js`.

```JavaScript
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
```

- The `import` statement for `fetch` automatically picks the mock instance, instead of original instance.
- The `beforeAll` sets the value that we are going to test against.
- Finally, `expect(fetch).toHaveBeenCalledWith('/api/questions/24');` verifies if isomorphic fetch was called with appropriate parameters.

### Automatic / manual mocking

- In some setups, any require statements will have mocks generated automatically
- If a manual mock file exists, it will be used as the mock instead of the automatic version
- Most apps require some combination of manual and automatic mocking

#### Manual mocks

- Exists as a separate file alongside the file being mocked
- Manual mocks will be used automatically for NPM modules
- Manual mocks are more work than automatic mocks
- Needs to be updated when mocked file changes

#### Automatic mocking

- Most modules can be automatically replaced with mocks
- Mocks are usually generated correctly, but sometimes not
- Greatly reduced likelihood of side-effects during tests
- Developer must use discretion

#### Automatic mocking challenges

- Methods returning a specific and complex value often can’t be mocked automatically
- Methods that are not part of your module at compile-time won’t be mocked
- Modules that you did not expect to be mocked may be mocked

## Snapshot testing

### Introduction to snapshot

- JSON-based record of a component’s output
- Compared to component’s actual output during testing process
- Committed along with other modules and tests to the application repo

#### Internals of snapshot testing

First, HTML output is generated with React. The first time toMatchSnapshot()is called, a snapshot is createdEach subsequent time, the new snapshot is compared with the old one.

Note: `react-test-renderer` is used instead of `react-dom`, `enzyme` is not used.

#### Snapshot testing process

- Developer A authors a new component
- Snapshot of that component’s output is generated automatically
- Developer A commits changes, moves on
- Developer B makes a breaking change to a dependency of the new component
- A new snapshot is automatically generated
- Since the snapshots don’t match, the test suite will fail until updated

#### Snapshot testing in action

The code for the component looks like - `TagsList.js`

```JavaScript
import React from 'react';
export default ({ tags }) => (
    <div>
        {tags.map(tag => <code key={tag}>{tag}</code>)}
    </div>
)
```

Write a snapshot test for a component - `TagsList.spec.js`

```JavaScript
import React from 'react';
import TagsList from './TagsList';
import renderer from 'react-test-renderer';

describe('The tags list', () => {
    it('renders as expected', () => {
        const tree = renderer
            .create(<TagsList tags={['css', 'html', 'golang']} ></TagsList>)
            .toJSON();

        console.log(tree);

        expect(tree).toMatchSnapshot();
    });
});
```

Run the test using `jest` and it generates a new file `__snapshots__\TagsList.spec.js.snap` with the following content.

```JavaScript
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`The tags list renders as expected 1`] = `
<div>
  <code>
    css
  </code>
  <code>
    html
  </code>
  <code>
    golang
  </code>
</div>
`;
```

If you made a small change to the component, and run the test, it immediately fails the tests. After reviewing the test results, and if the changes are not regressions, instead intended, then run `jest -u` or `jest --update` to update the snapshot.

### Advantages and disadvantages of snapshot testing

#### Advantages

- Fast and automatic
- Catches regressions humans may miss
- Works nicely with libraries that take in state and output HTML components (React, Angular, Vue)
- Adds some protection against regression when no time is available for manually writing tests
- Requires little training or knowledge of testing to use

#### Disadvantages

- Easy to ignore and suppress
- Protects only against regression
- If a component is working incorrectly and then is fixed, a snapshot test will say it is now broken
- Adds extra files to an already crowded repo
- Sensitive to incidental changes
- A waste of resources, if component is certain to be modified in near future

#### Commit tips

- While committing new snapshots or modified snapshots, have them in a separate commit as it is easy to look up in the version history.
- Don't commit snapshot alongside other files.

## Testing components

### Meaning of testing React components

- Verify output has not regressed
- Ensure that rarely occurring corner cases produce the correct output
- If component generates side effects, verify they occur but do not execute them - executing side effects can be time consuming and costly.
- Verify user interactions are handled as expected - e.g. swiping vs. touching vs. clicking

### Constructing testable React components

#### A spectrum of React components

- Components may or may not have life-cycle handlers - stateful components have these and stateless components don't
- Components may or may not have internal state
- Components may or may not generate side effects
- Components may get state from arguments, or from external dependencies

#### Building testable React components

- No internal state - output is an idempotent product of the props that are provided
- No side-effects - any AJAX calls, UI changes or other side effects are handled by sagas, thunks, etc., but not by components
- No life-cycle hooks - fetching data is handled on the application level, not the component level.

#### React Redux and Jest - A fine pair

- Components don't generate side effects
- Components consists of logical pair of display and container components
- Components do not have internal state

#### Testing React Redux components

- Test container and display elements separately
- Use unit tests to verify methods and properties passed by container are accurate
- Use snapshot tests to verify the output of the display component, passing props in directly

#### Example: Stateless Component

- `export` the component and mapStateToProps to make them visible outside of the module.
- Shown below, is an example of tests for a stateless component.

##### Component implementation

```JavaScript
import React from 'react';
import Markdown from 'react-markdown';
import TagsList from './TagsList'
import { connect } from 'react-redux';

export const mapStateToProps = (state, ownProps) => ({
    /**
     * Find the question in the state that matches the ID provided and pass it to the display component
     */
    ...state.questions.find(({ question_id }) => question_id == ownProps.question_id)
});

/**
 * Question Detail Display outputs a view containing question information when passed a question
 * as its prop
 * If no question is found, that means the saga that is loading it has not completed, and display an interim message
 */
export const QuestionDetailDisplay = ({ title, body, answer_count, tags }) => {
    return (<div>
        <h3 className="mb-2">
            {title}
        </h3>
        {body ?
            <div>
                <div className="mb-3">
                    <TagsList tags={tags} />
                </div>
                <Markdown source={body} />
                <div>
                    {answer_count} Answers
                </div>
            </div> :
            <div>
                {/* If saga has not yet gotten question details, display loading message instead. */}
                <h4>
                    Loading Question...
                </h4>
            </div>
        }
    </div>);
};

/**
 * Create and export a connected component
 */
export default connect(mapStateToProps)(QuestionDetailDisplay);
```

##### Component tests

```JavaScript
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
    })
});
```

### React Test Renderer vs. Enzyme

| React Test Renderer                                                    | Enzyme                                                                                 |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Takes a React component and outputs the resulting HTML without a DOM   | Takes a React component and outputs the resulting HTML without a DOM                   |
| From the React team                                                    | From an unrelated, but respected team (AirBnB)                                         |
| Useful for getting the output HTML of a component for snapshot testing | Useful for testing a variety of interactions including click, keyboard input, and more |
| Recommended by the Jest Team                                           | Has a variety of open bugs which make using it a challenge                             |

### Testing Stateful React Components

- Mock dependencies, then test them
- Use spies to verify side-effects
- Move logic from life-cycle to services
- Prevent regression with snapshots
- Inject values by writing mocks for services
- Make stateless components, where possible

#### Example for testing stateful react components

- Writing a stateful react component `components/NotificationsViewer.jsx`

```JavaScript
import React from 'react';
import NotificationsService from '../services/NotificationsService';

export default class NotificationsViewer extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      count: -1
    }
  }

  async componentDidMount () {
    let { count } = await NotificationsService.GetNotifications();
    console.log('componentDidMount count:', count);

    this.setState({
      count
    });
  }

  componentDidUpdate() {
    console.log('componentDidUpdate count:', this.state.count);
  }

  render() {
    return (
      <div className="mt-3 mb-2">
        <div className="notifications">
          {this.state.count != -1 ? `${this.state.count} Notifications Awaiting` : `Loading...`}
        </div>
      </div>
    )
  }
}
```

- Externalizing the data as a service `services/NotificationsService.js`

```JavaScript
import { delay } from 'redux-saga';

export default {
  async GetNotifications() {
    console.warn("REAL NOTIFICATION SERVICE! CONTACTING APIS!");

  // Simulation, actual service implementation will have more stuff here!
    await delay(1000);
    return { count: 42 };
  }
}
```

- Creating a mock service `services/__mocks__/NotificationsService.js`

```JavaScript
let count = 0;

export default {
  __setCount(_count) {
    count = _count;
  },
  async GetNotifications() {
    console.warn("GOOD JOB! USING MOCK SERVICE");
    return { count };
  }
}
```

- Writing a test, mocking the service and getting the component tested `components/__tests__/NotificationViewer.js`

```JavaScript
import NotificationsViewer from '../NotificationsViewer';
import renderer from 'react-test-renderer';
import React from 'react';
import delay from 'redux-saga';

// NOTE: This explicit mock call was not required when we mocked isomorphic-fetch npm package.
// We need this for components and services other than npm packages.
// The line below is enough for jest to look at this service and access the mock defined in services __mocks__
jest.mock('../../services/NotificationsService');

// Import and require behave differently especially when you put import statements after certain things and in blocks, they tend to get hoisted more. We also need the notification service after we called jest.mock() Here require statement doesn't get hoisted above our mock.

const notificationsService = require('../../services/NotificationsService').default;

describe('The notification viewer', () => {
    beforeAll(() => {
        notificationsService.__setCount(5);
    });

    it('should display the correct number of notifications', async () => {
        const tree = renderer.create(
            <NotificationsViewer />
        );

        await delay();

        // The following code is to isolate the particular part of
        // the component and test its output HTML
        const instance = tree.root;
        const component = instance.findByProps({ className: 'notifications' });
        const text = component.children[0];
        expect(text).toEqual('5 Notifications Awaiting');
    });
});
```

## Jest Matchers

### Introduction to matchers

- Also knowns as an assertion or expectation
- Represents a claim that a value will be equal (or not) to something
- Throws an error (test fails) if matcher’s claim is not validated

### Reference

- Look at [jest matchers](https://jestjs.io/docs/en/using-matchers)

### Examples

- `toBe` vs. `toEqual` - in case of 2 arrays with same elements `[1, 2, 3]` and `[1, 2, 3]`, `toEqual` will pass, while `toBe` will fail.

```JavaScript
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});

test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});
```

- Few more matchers.

```JavaScript
test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});
```

- For floating point equality, use `toBeCloseTo` instead of `toEqual`, because you don't want a test to depend on a tiny rounding error.

```JavaScript
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3); // This won't work because of rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});
```

Try this in your browser console.
Type `2.999999999999999` and hit `ENTER` it returns `2.999999999999999`.
Type `2.9999999999999999` and hit `ENTER` it returns `3`. That is rounding off and that is where `toBeCloseTo` is handy.

- `toContain` - usage with arrays

```JavaScript
const shoppingList = [
    'vegetables',
    'milk',
    'cheese',
    'rice',
    'wheat',
];

test('the shopping list has wheat on it', () => {
    expect(shoppingList).toContain('wheat');
    expect(new Set(shoppingList)).toContain('wheat');
});
```

- Exceptions

```JavaScript
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(Error);

  // You can also use the exact error message or a regexp
  expect(compileAndroidCode).toThrow('you are using the wrong JDK');
  expect(compileAndroidCode).toThrow(/JDK/);
});
```

## Executive Summary

- Testing adds work, but saves time and money by preventing regression
- Jest is a great test runner, and the one recommended by the React team
- A mock has the same methods as another, given object, but no side-effects
- Snapshot tests prevent components from breaking unintentionally
- Stateless React components are easier to test than stateful ones
