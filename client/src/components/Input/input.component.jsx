import React from 'react';

const Input = ({ className, label, error, ...props }) => (
    <div className={className}>
        <label className='uk-form-label'>{label}</label>
        <input
            className={`uk-input ${error ? 'uk-form-danger' : ''}`}
            {...props}
        />
        {error ? (
            <span className='uk-text-danger'>{`Invalid ${label}`}</span>
        ) : null}
    </div>
);

export default Input;
