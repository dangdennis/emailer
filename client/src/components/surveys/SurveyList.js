import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
    componentDidMount() {
        console.log('surveylist mounted');
        this.props.fetchSurveys();
    }

    renderSurveys() {
        return this.props.surveys.reverse().map(survey => {
            return (
                <div key={survey._id} className="card blue-grey white-text">
                    <div className="card-content">
                        <span className="card-title">{survey.title}</span>
                        <p>{survey.body}</p>
                        <p className="right">
                            Sent On:{' '}
                            {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-action">
                        <a>Yes: {survey.yes}</a>
                        <a>No: {survey.no}</a>
                    </div>
                </div>
            );
        });
    }

    render() {
        if (!this.props.surveys) {
            return <div>Loading...</div>;
        }
        return <div>{this.renderSurveys()}</div>;
    }
}

function mapStateToProps(state) {
    return {
        surveys: state.surveys.list
    };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
