import React, { useEffect, useState, useReducer, useMemo, useCallback } from 'react';
import { Modal, Button } from 'react-bootstrap';
import FormQuestionEdit from './FormQuestionEdit';
import { applicationAPIService } from '../../services/applicationAPIService';
import { applicationFormAPIService } from '../../services/applicationFormAPIService';
import * as yup from "yup"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const applicationFormSchema = yup
  .object({
    name: yup.string().required("Form name is required"),
    description: yup.string().required("Form description is required")
  })
  .required()

const ApplicationFormUpdateModal = ({updateFlag, initialValues, showModal, setShowModal}) => {
    
    console.log(initialValues)
    const initialQuestions = initialValues.questions || []
    const initialName = initialValues.name || ""
    const initialDescription = initialValues.description || ""

    const {register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(applicationFormSchema),
        defaultValues: {
            name: initialName,
            description: initialDescription
        }
    })
    const [validationError, setValidationError] = useState("")

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

    const saveApplicationForm = ({name, description}) => {
        const API = applicationFormAPIService()
        API.createUpdateApplicationForm(name, description, questions, updateFlag, initialValues.id).then(response => {
            if (response.success) {
                console.log(response.data)
                setValidationError("")
                setShowModal(false)
            } else {
                console.error(response.message)
                setValidationError(response.message)
            }
        }).catch(e => setValidationError(e.message))
    }

    return (
        <Modal show={showModal} onHide={() => {setShowModal(false)}} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>{updateFlag ? "Update" : "Create"} Application Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-column align-items-center">
                    {validationError !== "" && <div className="error-notif">{validationError}</div>}
                    {errors.name && <div className="error-notif">{errors.name.message}</div>}
                    {errors.description && <div className="error-notif">{errors.description.message}</div>}
                </div>
                <div className="d-flex align-items-center my-2">
                    <label className="me-2 font-weight-bold">Name: </label>
                    <input id="form-name" className="form-control" {...register('name')}></input>
                </div>
                <div className="d-flex align-items-top mb-2">
                    <label className="me-2 font-weight-bold mt-2">Description: </label>
                    <textarea id="form-desc" className="form-control" {...register('description')}></textarea>
                </div>
                <h2 className="text-center">Questions</h2>
                {questions.map((x, i) => <FormQuestionEdit key={i} edit={true} title={x.title} question={x.question_object} editFunc={editQuestionByIndex(i)} deleteFunc={deleteQuestionByIndex(i)}/>)}
            </Modal.Body>
            <div className="d-flex justify-content-center mb-2">
                <button className='btn btn-primary' onClick={addQuestion}>Add new question</button>
            </div>
            <Modal.Footer>
                {/* <button className='btn btn-primary'>Preview</button> */}
                <button className='btn btn-primary' onClick={handleSubmit(saveApplicationForm)}>Save</button>
            </Modal.Footer>
        </Modal>

    )
}

export default ApplicationFormUpdateModal