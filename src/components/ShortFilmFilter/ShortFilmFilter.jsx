import React, { useContext, useState } from "react";
import "./ShortFilmFilter.css";
import { AppContext } from '../../context/app.context';
import { useLocation } from 'react-router-dom'

const ShortFilmFilter = () => {
	const context = useContext(AppContext);

	const location = useLocation();

	const path = location.pathname !== '/saved-movies'

	const [checked, setChecked] = useState(path ? context.shorts : false);

	const changeHandler = (e) => {
		if (path) {
			localStorage.setItem('shorts', JSON.stringify(e.target.checked));
			context.setShorts(e.target.checked);
		} else {
			context.setSavedShortsFlag(e.target.checked)
		}
		setChecked(e.target.checked)
	}

	return (
		<>
			<div className="shortfilm-filter">
				<label htmlFor="shortfilm-checkbox" className="shortfilm-filter__label">
					<input type="checkbox" id="shortfilm-checkbox" className="shortfilm-filter__real" value={checked} checked={checked} onChange={(e) => changeHandler(e)} />
					<span className="shortfilm-filter__fake" />
				</label>
				<span className="shortfilm-filter__caption">Короткометражки</span>
			</div>
		</>
	);
};

export default ShortFilmFilter;
