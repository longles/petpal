import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import '../../styles/formquestion.scoped.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { set } from 'react-hook-form';

const FormQuestion = ({edit, title, question, editFunc, deleteFunc}) => {
    const question_type_display = {
        "Long Answer": 1,
        "Dropdown": 2,
        "Radio": 3,
        "Checkbox": 4,
        //"File": 5
    }
    console.log(question)
    const hasOptions = question.type >= 2 && question.type <= 4

    const options = question.prompt
    

    const editOptionByIndex = (idx) => {
        return (v) => {
            let newQuestion = {title: title, question_object: question}
            newQuestion.question_object.prompt = newQuestion.question_object.prompt.map((x, i) => i === idx ? v.target.value : x)
            editFunc(newQuestion)
        }
    }

    const deleteOptionByIndex = (idx) => {
        return () => {
            let newQuestion = {title: title, question_object: question}
            newQuestion.question_object.prompt = newQuestion.question_object.prompt.filter((x, i) => i !== idx)
            editFunc(newQuestion)
        }
    }

    const addOption = () => {
        let newQuestion = {title: title, question_object: question}
        newQuestion.question_object.prompt = [...newQuestion.question_object.prompt]
        newQuestion.question_object.prompt.push("New Option")
        editFunc(newQuestion)
    }

    const editQuestionType = (e) => {
        let newQuestion = {title: title, question_object: question}
        newQuestion.question_object.type = parseInt(e.target.value)
        if (newQuestion.question_object.prompt === undefined) {
            newQuestion.question_object.prompt = []
        }
        editFunc(newQuestion)
    }

    const editQuestionTitle = (e) => {
        let newQuestion = {title: e.target.value, question_object: question}
        editFunc(newQuestion)
    }

    const [editTitleState, setEditTitleState] = useState(false)

    return (<div>
        {editTitleState && <h4><input className="form-control form-control-lg header-input" size="lg" value={title} onChange={editQuestionTitle} onBlur={() => setEditTitleState(false)}></input></h4>}
        {!editTitleState && <h4 className="text-center">{title} {edit && <FontAwesomeIcon style={{color:"blue"}} icon={faEdit} onClick={()=>setEditTitleState(true)} />}</h4>}
        <div>
            {edit && (<div className="d-flex p-2 align-content-center">
                <h5 className="align-middle my-auto me-2">Type: </h5>
                <div className="col-3">
                    <select className="form-select" value={question.type} onChange={editQuestionType}>
                        {Object.keys(question_type_display).map(x => <option value={question_type_display[x]} key={x}>{x}</option>)}
                    </select>
                </div>
                
            </div>)}
            {edit && hasOptions && (<div className="p-2">
                <h5>Options: <button className="btn btn-primary" onClick={addOption}>Add Option</button></h5>
                <div className="d-flex flex-wrap">
                    {options.map((x, i) => {
                        return <div className="col-3 px-2 pb-1"><Form.Control key={i} value={x} onChange={editOptionByIndex(i)}></Form.Control></div>
                    })}
                </div>
                
                
            </div>)}
        </div>
    </div>
    
    )
}

export default FormQuestion