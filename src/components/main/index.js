import React,{Component} from 'react';
import {withRouter,Route, Switch} from 'react-router-dom';
import PrivateRoute from '../../router/index';
import {routes} from '../../router/router';
import NotFound from '../../pages/result/notFound/index';
import './index.scss';
class ContentMain extends Component{
    render(){
        return(
            <Switch>
                {
                    routes.map((item, index)=>{
                        return (
                            item.path?<PrivateRoute path={item.path} exact={item.exact} component={item.component} key={index}/>:<Route  component={NotFound} />
                        )
                    })
                }
                <Route  component={NotFound} />
            </Switch>
        )
    }
}
export default withRouter(ContentMain);