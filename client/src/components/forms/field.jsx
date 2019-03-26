import React from 'react';

import './forms.css';

const Field = props => (
	<section className='form-section'>
		<div className='field'>
			<label>
				{props.fieldname[0].toUpperCase() + props.fieldname.slice(1)}
				:
			</label>
			<input
				name={props.fieldname}
				value={props.fieldvalue}
				placeholder={props.placeholder}
				onChange={e => props.handleInput(e)}
			/>
		</div>
		<div className='field-error'>{props.fielderror}</div>
	</section>
);

export default Field;
