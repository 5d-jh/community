import React from 'react';
import { hot } from 'react-hot-loader/root'
import CardsList from './List/CardsList';
import NavigationBar from './NavigationBar';
import PostDetail from './Post/PostDetail';
import Store from './store';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.updateDetailViewPost = (title, body) => {
            return () => {
                this.setState({
                    detailViewTitle: title,
                    detailViewBody: body
                });
            }
        }

        this.state = {
            detailViewTitle: '',
            detailViewBody: '',
            updateDetailViewPost: this.updateDetailViewPost
        };
    }

    render() {
        console.log(this.state.detailViewTitle)

        return (
            <div className="main-grid">
                <Store.Provider value={this.state}>
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
                </Store.Provider>
            </div>
        )
    }
}

export default hot(App);