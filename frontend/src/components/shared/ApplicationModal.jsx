import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { applicationFormAPIService } from '../../services/applicationFormAPIService';
import { applicationAPIService } from '../../services/applicationAPIService';

const ApplicationModal = ({ closeModal, show, petId, formId }) => {
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState({});
    const applicationFormService = applicationFormAPIService();
    const applicationService = applicationAPIService();

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await applicationFormService.getApplicationFormDetail(formId);
            if (response.success) {
                setQuestions(response.data.questions);
            } else {
                console.error('Error fetching application form:', response.message);
            }
        };

        fetchQuestions();
    }, [formId]);

    // Doesn't really work...

    const handleChange = (questionId, type) => (e) => {
        if (type === 4) {
            // Handling checkboxes
            const updatedResponses = responses[questionId] ? [...responses[questionId].response] : [];
            if (e.target.checked) {
                updatedResponses.push(e.target.value);
            } else {
                const index = updatedResponses.indexOf(e.target.value);
                if (index > -1) {
                    updatedResponses.splice(index, 1);
                }
            }
            setResponses(prevResponses => ({
                ...prevResponses,
                [questionId]: { type, response: updatedResponses }
            }));
        } else {
            // Handling other input types
            setResponses(prevResponses => ({
                ...prevResponses,
                [questionId]: { type, response: e.target.value }
            }));
        }
    };

    // Rendering works, but looks ugly

    const renderInputForm = (question) => {
        const { id, type, prompt } = question.question_object;

        switch (type) {
            case 1: // Textarea
                return (
                    <Form.Control
                        as="textarea"
                        rows={4}
                        onChange={handleChange(id, type)}
                        required
                    />
                );

            case 2: // Dropdown
                return (
                    <Form.Select onChange={handleChange(id, type)} required>
                        {prompt.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </Form.Select>
                );

            case 3: // Radio
                return (
                    <div>
                        {prompt.map((option, index) => (
                            <Form.Check
                                key={index}
                                type="radio"
                                label={option}
                                name={id}
                                id={`${id}-${index}`}
                                onChange={handleChange(id, type)}
                            />
                        ))}
                    </div>
                );

            case 4: // Checkbox
                return (
                    <div>
                        {prompt.map((option, index) => (
                            <Form.Check
                                key={index}
                                type="checkbox"
                                label={option}
                                name={id}
                                id={`${id}-${index}`}
                                value={option}
                                onChange={handleChange(id, type)}
                            />
                        ))}
                    </div>
                );

            case 5: // File
                return (
                    <Form.Control
                        type="file"
                        onChange={handleChange(id, type)}
                    />
                );

            default:
                return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Formatting responses for submission
        const formattedResponses = Object.entries(responses).map(([questionId, responseObj]) => ({
            question: parseInt(questionId),
            response_object: responseObj
        }));

        const requestBody = {
            pet: petId,
            form: formId,
            responses: formattedResponses
        };

        const response = await applicationService.createApplication(requestBody);

        if (response.success) {
            closeModal();
        } else {
            console.error('Error submitting application:', response.message);
        }
    };

    return (
        <Modal show={show} onHide={closeModal} size="lg">
            <Modal.Header closeButton>
                <h3 className="modal-title">Your Application</h3>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {questions.map((question) => (
                        <Form.Group as={Row} controlId={question.id} key={question.id}>
                            <Form.Label column mb="3">{question.title}</Form.Label>
                            <Col sm="9">
                                {renderInputForm(question)}
                            </Col>
                        </Form.Group>
                    ))}
                    <Button type="submit" variant="primary">Submit</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>Back</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ApplicationModal;
