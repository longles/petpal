import React, { useEffect, useState } from 'react';
import ChatModal from './ApplicationChatModal'; // Import the ChatModal component

const PetCard = ({ petId, status, submissionDate, applicationId }) => {
    const statusNum = {
        1: ["badge bg-warning", "Pending"],
        2: ["badge bg-success", "Accepted"],
        3: ["badge bg-danger", "Rejected"],
        4: ["badge bg-warning", "Withdrawn"]
    }

    return (
        <>
            <div className="card mb-4">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src="temp" className="card-img"/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h3 className="card-title">{}</h3>
                            <p></p>
                            <span className={statusNum[status][0]} style={{ fontSize: "14px" }}>{statusNum[status][1]}</span>
                            <p></p>
                            <span className="badge" style={{ backgroundColor: "lightcoral", fontSize: "14px" }}>Submitted: {submissionDate}</span>
                            <p></p>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#chatModal${applicationId}`}>Open Chat</button>
                        </div>
                    </div>
                </div>
            </div>
            <ChatModal applicationId={applicationId} />
        </>
    );
};

export default PetCard;
