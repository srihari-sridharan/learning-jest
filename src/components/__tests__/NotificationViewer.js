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