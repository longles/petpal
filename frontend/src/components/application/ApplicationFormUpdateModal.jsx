import React, { useEffect, useState, useReducer, useMemo, useCallback } from 'react';
import { Modal, Button } from 'react-bootstrap';
import FormQuestion from './FormQuestion';
import { applicationAPIService } from '../../services/applicationAPIService';
import { applicationFormAPIService } from '../../services/applicationFormAPIService';

const ApplicationFormUpdateModal = ({updateFlag, initialQuestions = []}) => {
    const questionReducer = (questions, action) => {
        console.log(action)
        const {type, idx, question} = action
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
            dispatch({type: "update", idx: idx, question: question})
        }
    }, [])

    const deleteQuestionByIndex = useCallback((idx) => {
        return () => {dispatch({type: "delete", idx: idx})}
    }, [])

    const [showModal, setShowModal] = useState(true)

    const saveApplicationForm = () => {
        const API = applicationFormAPIService()
        API.createApplication(questions).then(response => {
            if (response.success) {
                console.log(response.data)
            } else {
                console.error(response.message)
            }
        })
    }
    
    console.log(questions)
    return (
        <Modal show={showModal} onHide={() => {setShowModal(false)}} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{updateFlag ? "Update" : "Create"} Application Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {questions.map((x, i) => <FormQuestion key={i} edit={true} title={x.title} question={x.question_object} editFunc={editQuestionByIndex(i)} deleteFunc={deleteQuestionByIndex(i)}/>)}
            </Modal.Body>
            <div className="d-flex justify-content-center mb-2">
                <button className='btn btn-primary' onClick={addQuestion}>Add new question</button>
            </div>
            <Modal.Footer>
                {/* <button className='btn btn-primary'>Preview</button> */}
                <button className='btn btn-primary' onClick={saveApplicationForm}>Save</button>
            </Modal.Footer>
        </Modal>
        
    )
}

export default ApplicationFormUpdateModal