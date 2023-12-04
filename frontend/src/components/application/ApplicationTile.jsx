import React, { useEffect, useState } from 'react';
import { petAPIService } from '../../services/petAPIService';
import ChatModal from './ApplicationChatModal'; // Import the ChatModal component
import ApplicationReviewModal from './ApplicationModal';
import '../../styles/applications.scoped.css'
import dog from '../../assets/images/dog.png'

const PetCard = ({ petId, status, submissionDate, applicationId, formId, responses }) => {
    const [petInfo, setPetInfo] = useState({});
    const petService = petAPIService();

    const statusNum = {
        1: ["badge bg-warning", "Pending"],
        2: ["badge bg-success", "Accepted"],
        3: ["badge bg-danger", "Rejected"],
        4: ["badge bg-secondary", "Withdrawn"]
    }

    useEffect(() => {
        const fetchPetInfo = async () => {
            const response = await petService.getPetDetail(petId);
            if (response.success) {
                setPetInfo(response.data);
            } else {
                console.error('Error fetching pet info:', response.message);
            }
        };

        fetchPetInfo();
    }, []);

    // TODO: Remove placeholder dog image
    return (
        <>
            <div className="card mb-4">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={dog} className="card-img" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h3 className="card-title">{petInfo.name}</h3>
                            <p></p>
                            <span className={statusNum[status][0]} style={{ fontSize: "14px" }}>{statusNum[status][1]}</span>
                            <p></p>
                            <span className="badge" style={{ backgroundColor: "lightcoral", fontSize: "14px" }}>Submitted: {submissionDate}</span>
                            <p></p>
                            <button type="button" className="btn btn-primary" style={{ marginRight: "15px" }} data-bs-toggle="modal" data-bs-target={`#applicationReviewModal${applicationId}`}>View Application</button>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#chatModal${applicationId}`}>Open Chat</button>
                        </div>
                    </div>
                </div>
            </div>
            <ChatModal applicationId={applicationId} />
            <ApplicationReviewModal applicationId={applicationId} responses={responses} formId={formId} />
        </>
    );
};

export default PetCard;
