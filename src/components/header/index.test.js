import React from 'react'
import renderer from 'react-test-renderer'
import Header from '.'
import TestingEnvironment from '../../test-utils/router'


describe('Header component', () => {
    it('should render authenticated', () => {
        const tree = renderer.create(
            <TestingEnvironment value={{
                user: {
                    loggedIn: true,
                    id: '123'
                }
            }}>
                <Header />
            </TestingEnvironment>
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })
    it('should render non-authenticated', () => {
        const tree = renderer.create(
            <TestingEnvironment value={{
                user: {
                    loggedIn: false
                }
            }}>
                <Header />
            </TestingEnvironment>
        ).toJSON()
        expect(tree).toMatchSnapshot()
    })
})