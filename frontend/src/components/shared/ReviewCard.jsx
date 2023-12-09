import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

function ReviewCard({data}) {
    let name = data.sender?.username
    let content = data.content
    let ratingnum = data.rating
    
    let rating = [1, 2, 3, 4, 5].filter(i => i <= ratingnum)
    return (
        <div className="rounded review-div col-12">
            <div className="d-flex mt-2 flex-wrap justify-content-between">
                <div className="px-2 mx-3">
                    <div className="d-flex">
                        <h6 className="reviewer-name">{name}</h6>
                    </div>
                </div>
                <div className="px-2 ms-sm-auto mt-1">
                    <div className="d-flex mx-2 justify-content-sm-end">
                        {rating.map(i => {return (<FontAwesomeIcon key={i} icon={faStar}/>)})}
                    </div>
                </div>
            </div>
            <p className="review-text mx-3 mt-2 mb-0">{content}</p>
        </div>
    );
};

export default ReviewCard;