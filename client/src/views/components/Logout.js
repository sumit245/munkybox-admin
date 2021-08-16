import React, { Component } from 'react'
import LoginScreen from '../screens/LoginScreen'

export default class Logout extends Component {
    componentDidMount(){
        sessionStorage.removeItem('adminName')
    }
    render() {
        return (
           <LoginScreen/>
        )
    }
}
