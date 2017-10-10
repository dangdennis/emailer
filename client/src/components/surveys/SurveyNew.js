// SurveyNew shows SurveyForm and SurveyReview
import React from 'react';
import { reduxForm } from 'redux-form';
import { compose, withState, withHandlers } from 'recompose';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

const SurveyNew = ({ showFormReview, handleSubmit }) => {
    if (showFormReview) {
        return <SurveyFormReview onCancel={handleSubmit} />;
    }
    return <SurveyForm onSurveySubmit={handleSubmit} />;
};

const enhance = compose(
    reduxForm({ form: 'surveyForm' }),
    withState('showFormReview', 'setFormReview', false),
    withHandlers({
        handleSubmit: props => event =>
            props.setFormReview(!props.showFormReview)
    })
);

export default enhance(SurveyNew);
