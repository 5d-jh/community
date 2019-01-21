import React from 'react';
import { ArticleCard, PhotoCard, SnippetCard } from './Cards/index';

export default class CardsList extends React.Component {
    render() {
        return (
            <div>
                <ArticleCard title="LoremIpsum" body="asdf" />
            </div>
        )
    }
}