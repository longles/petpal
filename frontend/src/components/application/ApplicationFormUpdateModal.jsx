import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import FormQuestion from './FormQuestion';

const ApplicationFormUpdateModal = ({id, initialQuestions}) => {
    const [showModal, setShowModal] = useState(true)
    const [questions, setQuestions] = useState([
        {
            "id": 4,
            "title": "How much do you earn?",
            "question_object": {
                "id": 3,
                "type": 1,
                "prompt": "Write the amount you've earned in the past year."
            }
        },
        {
            "id": 5,
            "title": "How many chairs do you own?",
            "question_object": {
                "id": 1,
                "type": 2,
                "prompt": [
                    1,
                    2,
                    3,
                    4
                ]
            }
        },
        {
            "id": 6,
            "title": "Do you smoke?",
            "question_object": {
                "id": 2,
                "type": 3,
                "prompt": [
                    "Yes",
                    "No"
                ]
            }
        },
        {
            "id": 7,
            "title": "What animals do you like",
            "question_object": {
                "id": 1,
                "type": 4,
                "prompt": [
                    "Cat",
                    "Dog",
                    "Cow",
                    "Chicken"
                ]
            }
        }
    ])
    return (
        <Modal show={showModal} onHide={() => {setShowModal(false)}} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Pet Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {questions.map(x => <FormQuestion edit={true} question={x}/>)}
            </Modal.Body>
            <button className='btn btn-primary'>Add new question</button>
        </Modal>
        
    )
}

export default ApplicationFormUpdateModal