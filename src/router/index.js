import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {isLogin} from '../util/index';

const PrivateRoute = ({component:Component,...rest}) => {
    return (
        <Route
            {...rest}
            render = {props => (isLogin.loginState())?(<Component {...props}/>):(
                <Redirect to={{
                    pathname:"/login",
                    state:{from:props.location}
                }}/>
            )}
        ></Route>
    )
}
export default PrivateRoute;