import React from 'react';
import axios from 'axios';
import Card from './../../../components/card/card.component';

import './wparticles.styles.scss';

class WpArticles extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: false,
            posts: [],
            error: ''
        };
    }

    componentDidMount() {
        const wordPressSiteUrl = 'http://www.blog.afvp.net';
        this.setState({ loading: true }, () => {
            axios.get(`${wordPressSiteUrl}/wp-json/wp/v2/posts?per_page=3`)
                .then(res => {
                    this.setState({ loading: false, posts: res.data }, /* () => console.log(this.state.posts) */);
                }).catch(error => {
                    this.setState({ loading: false, error: error.response.data });
                });
        });
    }

    render() {
        const { posts } = this.state;
        return (
            <div className="articles container-fluid">
                <div className="articles__intro container">
                    <h1 className="">Nos derniers articles</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur perspiciatis laborum quia quae eveniet animi laudantium, dolores ullam consequuntur iure numquam repudiandae ad! Quo autem iusto sapiente reiciendis nostrum! Sit, exercitationem ipsa fuga, praesentium ea sed adipisci voluptatum neque unde reprehenderit minima eaque similique iste distinctio minus, voluptatem sint ipsam.</p>
                </div>
                <div className="container">
                    {posts.length ? (
                        <div className="articles__cards row">
                            {posts.map(post => (
                                <Card key={post.id}
                                    image={post.featured_image_large}
                                    author={post.author_meta.display_name}
                                    date={post.date}
                                    title={post.title.rendered}
                                    excerpt={post.excerpt.rendered}
                                    link={post.link} />
                            ))}
                        </div>
                    ) : ''}
                </div>
            </div>
        )
    }
}

export default WpArticles;