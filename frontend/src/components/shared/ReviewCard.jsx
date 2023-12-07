import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function ReviewCard({data}) {
    let name = data.name
    let content = data.content
    let img = data.img
    let ratingnum = data.rating


    
    let rating = [1, 2, 3, 4, 5].filter(i => i <= ratingnum)
    return (
        <div className="rounded review-div col-12">
            <div className="d-flex mt-2 flex-wrap justify-content-between">
                <div className="px-2">
                    <div className="d-flex">
                        <div className="review-profile-image-container me-2">
                            <img className="review-profile-image" src={img} alt="Reviewer 1" />
                        </div>
                        <p className="reviewer-name">{name}</p>
                    </div>
                </div>
                <div className="px-2 ms-sm-auto mt-1">
                    <div className="d-flex justify-content-sm-end">
                        {rating.map(i => {return (<FontAwesomeIcon key={i} icon={faStar}/>)})}
                    </div>
                </div>
            </div>
            <p className="review-text mx-3 mt-2 mb-0">{content}</p>
        </div>
    );
};

export default ReviewCard;