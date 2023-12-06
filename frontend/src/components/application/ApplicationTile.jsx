import React, { useEffect, useState } from 'react';
import { petAPIService } from '../../services/petAPIService';
import { applicationAPIService } from '../../services/applicationAPIService';
import ChatModal from './ApplicationChatModal';
import ApplicationReviewModal from './ApplicationModal';
import '../../styles/applications.scoped.css';
import dog from '../../assets/images/dog.png';

const PetCard = ({
    petId,
    status,
    submissionDate,
    applicationId,
    formId,
    responses,
}) => {
    const [petInfo, setPetInfo] = useState({});
    const [selectedStatus, setSelectedStatus] = useState(status);
    const [showDropdown, setShowDropdown] = useState(false);
    const user_type = localStorage.getItem('user_type');
    const petService = petAPIService();
    const applicationService = applicationAPIService();

    const statusOptions = {
        1: { className: 'badge bg-warning', text: 'Pending' },
        2: { className: 'badge bg-success', text: 'Accepted' },
        3: { className: 'badge bg-danger', text: 'Rejected' },
        4: { className: 'badge bg-secondary', text: 'Withdrawn' },
    };

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
    }, [petId]);

    useEffect(() => {
        const canShowDropdown =
            (user_type === 'petseeker' && (status === 1 || status === 2)) ||
            (user_type === 'petshelter' && status === 1);

        setShowDropdown(canShowDropdown);
    }, [user_type, status]);

    const handleStatusChange = async (newStatus) => {
        setSelectedStatus(newStatus);

        const response = await applicationService.updateApplication(applicationId, newStatus);
        if (response.success) {
            console.log('Application status updated successfully.');
        } else {
            console.error('Error updating application status:', response.message);
        }
    };

    return (
        <>
        <div className="card mb-4">
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img src={dog} className="card-img" alt="Dog" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h3 className="card-title">{petInfo.name}</h3>
                        <span className={statusOptions[selectedStatus].className} style={{ fontSize: '14px' }}>
                            {statusOptions[selectedStatus].text}
                        </span>
                        <p></p>
                        <span className="badge" style={{ backgroundColor: 'lightcoral', fontSize: '14px' }}>
                            Submitted: {submissionDate}
                        </span>
                        <p></p>
                        <button type="button" className="btn btn-primary" style={{ marginRight: '15px' }} data-bs-toggle="modal" data-bs-target={`#applicationReviewModal${applicationId}`}>
                            View Application
                        </button>
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#chatModal${applicationId}`}>
                            Open Chat
                        </button>
                        {showDropdown && (
                            <>
                                <p></p>
                                <div className="dropdown">
                                    <button className="btn btn-secondary dropdown-toggle" type="button" id="statusDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {statusOptions[selectedStatus].text}
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="statusDropdown">
                                        {user_type === 'petseeker' && (status === 1 || status === 2) && (
                                            <button className="dropdown-item" onClick={() => handleStatusChange(4)}>
                                                Withdrawn
                                            </button>
                                        )}
                                        {user_type === 'petshelter' && status === 1 && (
                                            <>
                                                <button className="dropdown-item" onClick={() => handleStatusChange(2)}>
                                                    Accept
                                                </button>
                                                <button className="dropdown-item" onClick={() => handleStatusChange(3)}>
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
        <ChatModal applicationId={applicationId} />
        <ApplicationReviewModal applicationId={applicationId} formId={formId} responses={responses} />
        </>
    );
};

export default PetCard;
