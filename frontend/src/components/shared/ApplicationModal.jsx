import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { applicationFormAPIService } from '../../services/applicationFormAPIService';
import { applicationAPIService } from '../../services/applicationAPIService';
import { notificationAPIService } from '../../services/notificationAPIService';
import { shelterAPIService } from '../../services/userAPIService';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'

const ApplicationModal = ({ closeModal, show, petId, formId, shelterId }) => {
    const [questions, setQuestions] = useState([]);
    const applicationFormService = applicationFormAPIService();
    const applicationService = applicationAPIService();
    const notificationService = notificationAPIService();
    const shelterService = shelterAPIService();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await applicationFormService.getApplicationFormDetail(formId);
            if (response.success) {
                setQuestions(response.data.questions);
                replace(response.data.questions.map(x => { return { type: x.question_object.type, response: "" } }))
            } else {
                console.error('Error fetching application form:', response.message);
            }
        };

        fetchQuestions();

    }, [formId]);

    const { register, control, handleSubmit, formState: { isSubmitted, isValid } } = useForm({

    });
    const { fields, replace } = useFieldArray({
        control,
        name: "response"
    });

    const getShelterId = async (id) => {
        const response = await shelterService.getShelterDetail(id);

        if (response.success) {
            return response.data.account.id;
        } else {
            console.error('Error fetching shelter detail:', response.message);
        }
    };

    // Rendering works, but looks ugly

    const renderInputForm = (question) => {
        const { id, type, prompt } = question.question_object;

        switch (type) {
            case 1: // Textarea
                return (field) => {
                    return (
                        <Form.Control
                            as="textarea"
                            rows={4}
                            {...field}
                        />
                    )
                };

            case 2: // Dropdown
                return (field) => {
                    return (
                        <Form.Select {...field}>
                            {prompt.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </Form.Select>
                    )
                };

            case 3: // Radio
                return (field) => {
                    return (
                        <div>
                            {prompt.map((option, index) => (
                                <Form.Check
                                    key={index}
                                    type="radio"
                                    value={option}
                                    label={option}
                                    {...field}
                                />
                            ))}
                        </div>
                    )
                };

            case 4: // Checkbox
                return (field) => {
                    return (
                        <div>
                            {prompt.map((option, index) => (
                                <Form.Check
                                    key={index}
                                    type="checkbox"
                                    value={option}
                                    label={option}
                                    {...field}
                                />
                            ))}
                        </div>
                    )
                };

            case 5: // File
                return (field) => {
                    return (
                        <Form.Control
                            type="file"
                            {...field}
                        />
                    )
                };

            default:
                return null;
        }
    };

    const onSubmit = async (data) => {
        // Formatting responses for submission
        const formattedResponses = data.response.map((responseObj, idx) => ({
            question: parseInt(questions[idx].id),
            response_object: responseObj
        }));

        const response = await applicationService.createApplication(petId, formId, formattedResponses);

        if (response.success) {
            const id = await getShelterId(shelterId);
            console.log(response)
            notificationService.createNotification(id, response.data.id, "application_creation", "You have a new application for a pet!");
            closeModal();
            navigate('/applications', {state: {defaultFilters: {id: response.data.id}}})
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
                {isSubmitted && !isValid && <div className="error-notif mb-2 text-center">You must fill out all questions to submit an application!</div>}
                <Form onSubmit={handleSubmit(onSubmit)}>
                    {fields.map((field, index) => {
                        const question = questions[index]
                        return (
                            <Form.Group as={Row} controlId={question.id} key={field.id}>
                                <Form.Label column mb="3">{question.title}</Form.Label>
                                <Col sm="9" className="mb-2">
                                    {renderInputForm(question)({ ...register(`response.${index}.response`, { required: true }) })}
                                </Col>
                            </Form.Group>
                        )
                    })}
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
