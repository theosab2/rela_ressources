import React from 'react'
import Login from '../login'
import {render} from '@testing-library/react-native';
import MockAsyncStorage from '../../../__mocks__/@react-native-async-storage/async-storage'
describe('Login screen', () => {

    it('should go to home page on login', () => {
        const page = render(<Login/>);

        const loginButton = page.getByTestId('loginButton')

    })
})