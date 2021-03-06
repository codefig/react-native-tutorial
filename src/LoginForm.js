import React, { Component } from 'react'
import {Text, View} from 'react-native'
import {Card, CardSection, Input, Button, Spinner} from './common'
import {connect} from 'react-redux';
import {emailChanged, passwordChanged, loginUser} from './actions'
import firebase from 'firebase'

class LoginForm extends React.Component{

    onEmailChange(text){
       console.log(text);
       this.props.emailChanged(text);
    }

    onPasswordChanged(text){
        console.log("password : ", text);
        this.props.passwordChanged(text);
    }
    onButtonPress(){
        const {email, password} = this.props; 
        this.props.loginUser({email, password})
    }

    componentWillMount(){
        var config = {
            apiKey: "AIzaSyAG4dKyOXdmtGs0kjjjNlxh9bFTLDB3Tq0",
            authDomain: "manager-669b5.firebaseapp.com",
            databaseURL: "https://manager-669b5.firebaseio.com",
            projectId: "manager-669b5",
            storageBucket: "manager-669b5.appspot.com",
            messagingSenderId: "465252304874"
          };
          firebase.initializeApp(config);
    }

    renderButton(){
        if(this.props.loading){
            return <Spinner size="large"/>;
        }
        else{
            return <Button onPress={this.onButtonPress.bind(this)}>Login</Button>
        }
    }

    render(){
        console.log("props: " , this.props);
        return(
            <Card style={style.bodyStyle}>
                <CardSection>
                    <Input label="email"
                    placeholder="mallam@gmail.com"
                    onChangeText={this.onEmailChange.bind(this)}
                    value={this.props.email}/>
                </CardSection>

                <CardSection>
                    <Input label="password"
                    placeholder="ifconfg"
                    onChangeText={this.onPasswordChanged.bind(this)}/>
                </CardSection>

                <Text style={style.errorStyle }>
                    {this.props.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        )
    }
}

const style = {
    bodyStyle : {
        flex : 1, 
        backgroundColor:'#ffccff',
        paddingTop: 20
    }, 
    errorStyle : {
        fontSize:  20,
        alignSelf: 'center',
        color:'red'
    }
}

const  mapStateToProps = (state) => {
    return {
        email : state.auth.email,
        password : state.auth.password, 
        error : state.auth.error, 
        loading: state.auth.loading
    }
}

export default connect(mapStateToProps, {
    emailChanged, passwordChanged, loginUser})(LoginForm);