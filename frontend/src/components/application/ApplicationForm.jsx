import React, { useState, useEffect } from 'react';
import { applicationFormAPIService } from '../../services/applicationFormAPIService';

const PAGE_SIZE = 10; // Number of items per page

const ApplicationForms = () => {
    const [applicationTemplates, setApplicationTemplates] = useState([]);
    const [deletedTemplateId, setDeletedTemplateId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const applicationFormService = applicationFormAPIService();

    const fetchApplicationTemplates = async (page) => {
        const response = await applicationFormService.getApplicationFormList(page);

        if (!response.success) {
            console.error('Error fetching application templates:', response.message);
            return;
        }

        setApplicationTemplates(response.data.results);
        setTotalPages(Math.ceil(response.data.count / PAGE_SIZE));
    };

    const handleDeleteTemplate = async (templateId) => {
        const response = await applicationFormService.deleteApplicationForm(templateId);

        if (response.success) {
            setDeletedTemplateId(templateId);
        } else {
            console.error('Error deleting application template:', response.message);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    useEffect(() => {
        fetchApplicationTemplates(currentPage);
    }, [deletedTemplateId, currentPage]);

    return (
        <div className="container main-content">
            <h2 className="mb-4">Application Form Templates</h2>
            <div className="row">
                <div className="col-md-12">
                    <button type="button" className="btn btn-primary mb-3">
                        Create Form
                    </button>
                    <div className="row">
                        {applicationTemplates.map((template) => (
                            <div className="col-md-4 mb-4" key={template.id}>
                                <div className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">{template.name}</h4>
                                        <p className="card-text">{template.description}</p>
                                        <button
                                            type="button"
                                            className="btn btn-success mr-2"
                                            style={{ marginRight: "12px" }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteTemplate(template.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <div className="pagination text-center" style={{ marginTop: "1rem" }}>
                            <button
                                className="btn btn-primary"
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <span className="page-info" style={{ margin: "0 10px" }}>
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                className="btn btn-primary"
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplicationForms;
