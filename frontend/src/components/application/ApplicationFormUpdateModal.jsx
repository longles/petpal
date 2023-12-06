import React, { useEffect, useState, useReducer, useMemo, useCallback } from 'react';
import { Modal, Button } from 'react-bootstrap';
import FormQuestion from './FormQuestion';

const ApplicationFormUpdateModal = ({id, initialQuestions}) => {
    initialQuestions = [
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
    ]

    const questionReducer = (questions, action) => {
        console.log(action)
        const {type, idx, question} = action
        console.log("idk why this was called")
        if (type === 'add') {
            return [...questions, question]
        }
        if (type === 'update') {
            return questions.map((x, i) => i === idx ? question : x)
        }
        if (type === 'delete') {
            return questions.filter((x, i) => i !== idx)
        }
        throw Error('Unknown action: ' + type);
    }

    const [questions, dispatch] = useReducer(questionReducer, initialQuestions)

    const addQuestion = () => {
        dispatch({type: "add", question: {title: "New Question", question_object: {type: 1, prompt: []}}})
    }

    const editQuestionByIndex = useCallback((idx) => {
        return (question) => {
            console.log(question)
            dispatch({type: "update", idx: idx, question: question})
        }
    }, [questions])

    const deleteQuestionByIndex = useCallback((idx) => {
        return () => {dispatch({type: "delete", idx: idx})}
    }, [questions])

    const [showModal, setShowModal] = useState(true)
    
    console.log(questions)
    return (
        <Modal show={showModal} onHide={() => {setShowModal(false)}} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Pet Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {questions.map((x, i) => <FormQuestion key={i} edit={true} title={x.title} question={x.question_object} editFunc={editQuestionByIndex(i)} deleteFunc={deleteQuestionByIndex(i)}/>)}
            </Modal.Body>
            <div className="d-flex justify-content-center mb-2">
                <button className='btn btn-primary' onClick={addQuestion}>Add new question</button>
            </div>
            <Modal.Footer>
                <button className='btn btn-primary' onClick={addQuestion}>Save</button>
            </Modal.Footer>
            

            
        </Modal>
        
    )
}

export default ApplicationFormUpdateModal