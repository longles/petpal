import React from 'react';
import ReviewCard from '../shared/ReviewCard';
import { useState, useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { shelterCommentAPIService } from '../../services/commentAPIService'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"
import '../../styles/createshelterreview.scoped.css'

const shelterCommentSchema = yup
  .object({
    content: yup.string().required("Content cannot be empty"),
    rating: yup.number().required("Please leave a rating!")
  })
  .required()

const CreateShelterReview = ({id}) => {

    const API = shelterCommentAPIService()

    const [validationError, setValidationError] = useState("")

    const onCreate = (data) => {
        console.log(data)
        API.createShelterComment(id, data).then(response => {
            if (response.success) {
                console.log(response.data)
            } else {
                setValidationError(response.message)
            }
        }).catch(e => setValidationError("Something went wrong. Please try again later. "))
    }

    const {register, handleSubmit, watch, formState: {errors} } = useForm({resolver: yupResolver(shelterCommentSchema)})

    const rating = watch('rating', 0)

    return (
            <div className="rounded review-div col-12">
                <form className="mx-2" onSubmit={handleSubmit(onCreate)}>
                    <div className="d-flex flex-column align-items-center">
                        {validationError !== "" && <div className="error-notif">{validationError}</div>}
                        {errors.rating && <div className="error-notif">{errors.rating.message}</div>}
                        {errors.content && <div className="error-notif">{errors.content.message}</div>}
                    </div>
                    <div className="d-flex justify-content-between p-2 align-items-center">
                        <h5 className="mr-2 my-auto">Leave a review!</h5>
                        <div className="my-auto">
                            <label for="star-1"><FontAwesomeIcon color={rating >= 1 ? 'gold' : 'black'} icon={faStar}></FontAwesomeIcon></label>
                            <label for="star-2"><FontAwesomeIcon color={rating >= 2 ? 'gold' : 'black'} icon={faStar}></FontAwesomeIcon></label>
                            <label for="star-3"><FontAwesomeIcon color={rating >= 3 ? 'gold' : 'black'} icon={faStar}></FontAwesomeIcon></label>
                            <label for="star-4"><FontAwesomeIcon color={rating >= 4 ? 'gold' : 'black'} icon={faStar}></FontAwesomeIcon></label>
                            <label for="star-5"><FontAwesomeIcon color={rating >= 5 ? 'gold' : 'black'} icon={faStar}></FontAwesomeIcon></label>
                            <input type="radio" id="star-1" className="hidden" value="1" {...register('rating')}/>
                            <input type="radio" id="star-2" className="hidden" value="2" {...register('rating')}/>
                            <input type="radio" id="star-3" className="hidden" value="3" {...register('rating')}/>
                            <input type="radio" id="star-4" className="hidden" value="4" {...register('rating')}/>
                            <input type="radio" id="star-5" className="hidden" value="5" {...register('rating')}/>
                        </div>
                        <input type='submit' className="btn btn-primary" value="Submit"></input>
                    </div>

                    <textarea class="col-12 h-16 rounded-md p-2 text-xs" {...register('content')}></textarea>
                </form>
            </div>
    );
};

export default CreateShelterReview;