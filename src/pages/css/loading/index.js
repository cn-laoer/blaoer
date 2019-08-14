import React,{Component} from 'react';
import './index.scss';

export default class CssLoading extends Component {
    render() {
        return (
            <div className="bmain cssmain">
                <main className="main">
                    <div className="inner">
                        <div className="load-container load1">
                            <div className="loader">Loading...</div>
                        </div>
                        <div className="load-container load2">
                            <div className="loader">Loading...</div>
                        </div>
                        <div className="load-container load3">
                            <div className="loader">Loading...</div>
                        </div>
                        <div className="load-container load4">
                            <div className="loader">Loading...</div>
                        </div>
                        <div className="load-container load5">
                            <div className="loader">Loading...</div>
                        </div>
                        <div className="load-container load6">
                            <div className="loader">Loading...</div>
                        </div>
                        <div className="load-container load7">
                            <div className="loader">Loading...</div>
                        </div>
                        <div className="load-container load8">
                            <div className="loader">Loading...</div>
                        </div>
                    </div>
                    <div className="overlay hidden"></div>
                </main>
            </div>
        )
    }
}