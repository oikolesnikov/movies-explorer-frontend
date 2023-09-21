import React, { useContext, useState } from "react";
import "./ShortFilmFilter.css";
import { AppContext } from '../../context/app.context';

const ShortFilmFilter = () => {
	const context = useContext(AppContext);

	const [checked, setCheked] = useState(context.shorts);

	const changeHandler = (e) => {
		context.setShorts(e.target.checked);
		localStorage.setItem('shorts', JSON.stringify(e.target.checked));
		setCheked(e.target.checked)
	}

  return (
		<>
			<div className="shortfilm-filter">
				<label htmlFor="shortfilm-checkbox" className="shortfilm-filter__label">
					<input type="checkbox" id="shortfilm-checkbox" className="shortfilm-filter__real" value={checked} checked={checked} onChange={(e) => changeHandler(e)}/>
					<span className="shortfilm-filter__fake" />
				</label>
				<span className="shortfilm-filter__caption">Короткометражки</span>
			</div>
		</>
	);
};

export default ShortFilmFilter;
