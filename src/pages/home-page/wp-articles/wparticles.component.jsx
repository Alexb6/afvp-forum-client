import React from 'react';
import axios from 'axios';
import CardPost from '../../../components/card/card-post-WP/card-post.component';

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
			axios.get(`${wordPressSiteUrl}/wp-json/wp/v2/posts?per_page=3&lang=fr`)
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
					<p>Un aperçu de la vie de l’Association Franco-Vietnamienne de Pneumologie ! Retrouvez ici les derniers articles de notre blog, en français et en vietnamien. Sur le blog, vous pourrez parcourir les onglets pour découvrir nos différents domaines d’activité, notre histoire...</p>
				</div>
				<div className="articles__posts container">
					{posts.length && (
						<div className="articles__cards row">
							{posts.map(post => (
								<CardPost key={post.id}
									image={post.featured_image_large}
									author={post.author_meta.display_name}
									date={post.date}
									title={post.title.rendered}
									excerpt={post.excerpt.rendered}
									link={post.link} />
							))}
						</div>
					)}
				</div>
			</div>
		)
	}
}

export default WpArticles;