import React from 'react';
import { hot } from 'react-hot-loader/root'
import CardsList from './CardsList';
import NavigationBar from './NavigationBar';
import PostDetail from './PostDetail';
import './App.css';

class App extends React.Component {
    render() {
        return (
            <div className="main-grid">
                <div className="main-grid__navbar">
                    <NavigationBar />
                </div>
                <div className="main-grid__flex">
                    <div className="main-grid__card-list">
                        <CardsList />
                    </div>
                    <div className="main-grid__post-detail">
                        <PostDetail />
                    </div>
                </div>
            </div>
        )
    }
}

export default hot(App);