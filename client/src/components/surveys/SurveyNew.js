// SurveyNew shows SurveyForm and SurveyReview
import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

const SurveyNew = props => {
    return <div>{renderContent(props)}</div>;
};

function renderContent({ showFormReview, handleSubmit }) {
    if (showFormReview) {
        return <SurveyFormReview />;
    }
    return <SurveyForm onSurveySubmit={handleSubmit} />;
}

const enhance = compose(
    withState('showFormReview', 'setFormReview', false),
    withHandlers({
        handleSubmit: props => event => props.setFormReview(true)
    })
);

export default enhance(SurveyNew);
