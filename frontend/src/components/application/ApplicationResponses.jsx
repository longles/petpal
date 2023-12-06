import React, { useEffect, useState } from 'react';
import { applicationFormAPIService } from '../../services/applicationFormAPIService';

const ApplicationResponses = ({ formId, responses }) => {
    const [formQuestions, setFormQuestions] = useState([]);
    const formService = applicationFormAPIService();

    useEffect(() => {
        const fetchForm = async (form_id) => {
            const response = await formService.getApplicationFormDetail(form_id);
            if (response.success) {
                setFormQuestions(response.data.questions);
            } else {
                console.error('Error fetching form:', response.message);
            }
        }

        fetchForm(formId);
    }, []);

    const isSelectedRadio = (key, option, answer) => {
        if (option === answer) {
            return <input key={key} className="form-check-input" type="radio" value={option} checked disabled />;
        } else {
            return <input key={key} className="form-check-input" type="radio" value={option} disabled />;
        }
    };

    const isSelectedCheckbox = (key, option, answer) => {
        if (answer.includes(option)) {
            return <input key={key} className="form-check-input" type="checkbox" value={option} checked disabled />;
        } else {
            return <input key={key} className="form-check-input" type="checkbox" value={option} disabled />;
        }
    };

    const renderQuestion = (question) => {
        const question_object = question.question_object;
        const type = question_object.type;
        const question_id = question.id;
        const answer = responses.find((response) => response.question === question_id).response_object;

        switch (type) {
            case 1: // Textarea
                return <textarea className="form-control" value={answer.response} disabled />;

            case 2: // Dropdown
                return (
                    <select className="form-select" value={answer.response} disabled>
                        {question_object.prompt.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                );

            case 3: // Radio
                return (
                    <div>
                        {question_object.prompt.map((option, index) => (
                            <div key={index} className="form-check">
                                {isSelectedRadio(index, option, answer.response)}
                                <label className="form-check-label">{option}</label>
                            </div>
                        ))}
                    </div>
                );

            case 4: // Checkbox
                return (
                    <div>
                        {question_object.prompt.map((option, index) => (
                            <div key={index} className="form-check">
                                {isSelectedCheckbox(index, option, answer.response)}
                                <label className="form-check-label">{option}</label>
                            </div>
                        ))}
                    </div>
                );

            // Probably won't be used
            case 5: // File
                return <input type="file" className="form-control" value={answer} disabled />;

            default:
                return null;
        }
    };

    return (
        <div>
            {formQuestions.map((question) => (
                <div key={question.id} className="mb-3">
                    <label className="form-label">{question.title}</label>
                    {renderQuestion(question)}
                </div>
            ))}
        </div>
    );
};

export default ApplicationResponses;
