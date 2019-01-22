import React from 'react';
import { hot } from 'react-hot-loader/root'
import CardsList from './List/CardsList';
import NavigationBar from './Navbar/NavigationBar';
import PostDetail from './Post/PostDetail';
import Store from './store';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.updateDetailViewPost = (title, postId) => {
            return () => {
                fetch('http://localhost:8080/api/post/'+postId)
                .then(data => data.json())
                .then(post => {
                    this.setState({
                        detailViewTitle: title,
                        detailViewBody: post.body.detail
                    });
                });
            }
        }

        this.state = {
            detailViewTitle: '',
            detailViewBody: '',
            loggedIn: false,
            username: null,
            updateDetailViewPost: this.updateDetailViewPost
        };
    }

    getSessionUserInfo = () => {
        console.log('sessioninfo');

        const url = 'http://localhost:3000/api/user/sessioninfo';
        fetch(url)
        .then(data => data.json())
        .then(userInfo => {
            if (userInfo._id && userInfo.username) {
                
                
                this.setState({
                    loggedIn: true,
                    username: userInfo.username
                })   
            }
        })
    }

    componentDidMount() {
        this.getSessionUserInfo();
    }

    render() {
        return (
            <div className="main-grid">
                <Store.Provider value={this.state}>
                    <div className="main-grid__navbar">
                        <NavigationBar getSessionUserInfo={this.getSessionUserInfo} />
                    </div>
                    <div className="main-grid__flex">
                        <div className="main-grid__card-list">
                            <CardsList />
                        </div>
                        <div className="main-grid__post-detail">
                            <PostDetail />
                        </div>
                    </div>
                </Store.Provider>
            </div>
        )
    }
}

export default hot(App);