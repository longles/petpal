import React, { useEffect, useState } from 'react';
import { applicationFormAPIService } from '../../services/applicationFormAPIService';

const fetchFormDetails = async (formService, formId, setFormQuestions) => {
    const response = await formService.getApplicationFormDetail(formId);
    if (response.success) {
        setFormQuestions(response.data.questions);
    } else {
        console.error('Error fetching form:', response.message);
    }
};

const isSelectedInput = (type, key, option, answer) => {
    const isChecked = type === 'checkbox' ? answer.includes(option) : option === answer;
    return (
        <input
            key={key}
            className="form-check-input"
            type={type}
            value={option}
            checked={isChecked}
            disabled
        />
    );
};

const renderAnswer = (question, responses) => {
    const answer = responses.find(response => response.question === question.id).response_object;
    const { type, prompt } = question.question_object;

    switch (type) {
        case 1: // Textarea
            return <textarea className="form-control" value={answer.response} disabled />;
        case 2: // Dropdown
            return (
                <select className="form-select" value={answer.response} disabled>
                    {prompt.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
            );
        case 3: // Radio
        case 4: // Checkbox
            const inputType = type === 3 ? 'radio' : 'checkbox';
            return (
                <div>
                    {prompt.map((option, index) => (
                        <div key={index} className="form-check">
                            {isSelectedInput(inputType, index, option, answer.response)}
                            <label className="form-check-label">{option}</label>
                        </div>
                    ))}
                </div>
            );
        case 5: // File
            return <input type="file" className="form-control" value={answer} disabled />;
        default:
            return null;
    }
};

const ApplicationResponses = ({ formId, responses }) => {
    const [formQuestions, setFormQuestions] = useState([]);
    const formService = applicationFormAPIService();

    useEffect(() => {
        fetchFormDetails(formService, formId, setFormQuestions);
    }, [formId]);

    return (
        <div>
            {formQuestions.map((question) => (
                <div key={question.id} className="mb-3">
                    <label className="form-label">{question.title}</label>
                    {renderAnswer(question, responses)}
                </div>
            ))}
        </div>
    );
};

export default ApplicationResponses;
