import React from 'react';

import './forms.css';

const Field = props => (
	<section className={props.classNames}>
		<div className='field'>
			<label>{props.label}</label>
			<input
				name={props.fieldname}
				value={props.fieldvalue}
				placeholder={props.placeholder}
				onChange={props.handleInput}
			/>
			<div className='field-error'>{props.fielderror}</div>
		</div>
	</section>
);

export default Field;
