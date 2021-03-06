//SurveyField contains logic to render a single label and input
import React from 'react';

export default ({ label, input, meta: { touched, error } }) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{ marginBottom: '5px' }} />
            <div className="red-text" style={{ marginBottom: '20px' }}>
                {touched && error}
            </div>
        </div>
    );
};
