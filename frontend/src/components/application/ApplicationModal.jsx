import React from 'react';
import ApplicationResponses from './ApplicationResponses'; // Import ApplicationResponses component

const ApplicationReviewModal = ({ applicationId, formId, responses }) => {
    return (
        <div className="modal fade" id={`applicationReviewModal${applicationId}`} tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-scrollable custom-modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id="applicationModalLabel">{localStorage.getItem('user_type') === 'petshelter' ? 'Application' : 'Your Application'}</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <ApplicationResponses responses={responses} formId={formId} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationReviewModal;
