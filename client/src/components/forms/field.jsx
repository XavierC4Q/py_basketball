import React from 'react';

import './forms.css';

const showErrors = errors => {
	return errors.map((err, i) => <p key={i}>{err}</p>);
};

const Field = props => {

	return (<section className={props.classNames}>
		<div className='field'>
			<label>{props.label}</label>
			<input
				name={props.fieldname}
				value={props.fieldvalue}
				placeholder={props.placeholder}
				onChange={props.handleInput}
			/>
			<div className='field-error'>{props.fielderror[0] && showErrors(props.fielderror)}</div>
		</div>
	</section>)
};

export default Field;
