import React from 'react';

function ReviewCard({id}) {
    let name = "John Doe"
    let content = "We adopted our lovely dog from Doggycares Inc. and had a fantastic experience. The staff was friendly and helpful, and the facilities were clean and well-maintained."
    let img = "../../assets/images/user1.jpg"
    
    //let rating = [1, 2, 3, 4, 5]
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
                        {/* {rating.map(i => {return (<span key={"star-"+i} className="fa fa-star"/>)})} */}
                    </div>
                </div>
            </div>
            <p className="review-text mx-3 mt-2 mb-0">{content}</p>
        </div>
    );
};

export default ReviewCard;