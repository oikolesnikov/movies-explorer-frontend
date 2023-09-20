import React from 'react';

import photo from '../../images/photo-min.jpeg';
import Portfolio from '../Portfolio/Portfolio';
import { portfolioLinks } from '../../config/links';

import './AboutMe.css';

const AboutMe = () => {
	return (
		<section id="about-me" className="about-me container">
			<div className="about-me__header">Студент</div>
			<div className="about-me__container">
				<div className="bio">
					<div className="bio__description">
						<h3 className="bio__name">Олег</h3>
						<p className="bio__job">Веб-разработчик, 22 года</p>
						<p className="bio__text">Родился в Санкт-Петербурге. Учусь в универститете СПБГУТ.</p>

						<ul className="bio__links">
							<li className="bio__list-item">
								<a
									href="https://ru-ru.facebook.com/"
									rel="noopener noreferrer"
									target="_blank"
									className="bio__external-link">
									Facebook
								</a>
							</li>
							<li className="bio__list-item">
								<a
									href="https://github.com/oikolesnikov"
									rel="noopener noreferrer"
									target="_blank"
									className="bio__external-link">
									Github
								</a>
							</li>
						</ul>
					</div>

					<img src={photo} alt="Фото студента" className="bio__photo" />
				</div>

				<Portfolio links={portfolioLinks} className={'about-me__portfolio'} />
			</div>
		</section>
	);
};

export default AboutMe;
