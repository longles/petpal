import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { applicationFormAPIService } from '../../services/applicationFormAPIService';
import { applicationAPIService } from '../../services/applicationAPIService';
import { useForm, useFieldArray, Controller } from 'react-hook-form';

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
                replace(response.data.questions.map(x => {return {type: x.question_object.type, response: ""}}))
            } else {
                console.error('Error fetching application form:', response.message);
            }
        };

        fetchQuestions();
        
    }, [formId]);

    const { register, control, handleSubmit, formState: {isSubmitted, isValid} } = useForm({

    });
    const { fields, replace } = useFieldArray({
    control,
    name: "response"
    });
    

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
                )};

            case 2: // Dropdown
                return (field) => {return (
                    <Form.Select {...field}>
                        {prompt.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </Form.Select>
                )};

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
                )};

            case 4: // Checkbox
                return (field) => {return (
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
                )};

            case 5: // File
                return (field) => {return (
                    <Form.Control
                        type="file"
                        {...field}
                    />
                )};

            default:
                return null;
        }
    };

    const onSubmit = async (data) => {
        // Formatting responses for submission
        console.log(data)

        const formattedResponses = Object.entries(fields).map(([questionId, responseObj]) => ({
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
                {isSubmitted && !isValid && <div className="error-notif mb-2 text-center">You must fill out all questions to submit an application!</div>}
                <Form onSubmit={handleSubmit(onSubmit)}>
                    {fields.map((field, index) => {
                        const question = questions[index]
                        return (
                            <Form.Group as={Row} controlId={question.id} key={field.id}>
                                <Form.Label column mb="3">{question.title}</Form.Label>
                                <Col sm="9" className="mb-2">
                                {renderInputForm(question)({...register(`response.${index}.response`, { required: true })})}
                                {/* <Controller
                                    render={({ field }) => {return renderInputForm(question)(field)}}
                                    name={`response.${index}.response`}
                                    control={control}
                                /> */}
                                {/* <button type="button" onClick={() => remove(index)}>Delete</button> */}
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
