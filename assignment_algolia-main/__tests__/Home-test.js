import Home from '../screens/Home';
import React from 'react';
import renderer from 'react-test-renderer';
//import fetch from 'fetch-mock';
//fetch = jest.fn(() => Promise.resolve());
test('should render the home page without crashing', () => {
    const rendered = renderer.create( < Home / > ).toJSON();
    expect(rendered).toBeTruthy();
})
test('Api call SuccessFully', async() => {
    fetch = jest.fn(() => Promise.resolve());

});

// it('works', () => {
//     expect(1).toBe(1);
//   });