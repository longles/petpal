import React, { useState, useEffect } from 'react';
import { applicationFormAPIService } from '../../services/applicationFormAPIService';


const ApplicationForms = () => {
    const [applicationTemplates, setApplicationTemplates] = useState([]);
    const [deletedTemplateId, setDeletedTemplateId] = useState(null);
    const applicationFormService = applicationFormAPIService();

    const fetchApplicationTemplates = async () => {
        const page = 1;
        const response = await applicationFormService.getApplicationFormList(page);

        if (!response.success) {
            console.error('Error fetching application templates:', response.message);
            return;
        }

        setApplicationTemplates(response.data.results);
    };

    const handleDeleteTemplate = async (templateId) => {
        const response = await applicationFormService.deleteApplicationForm(templateId);

        if (response.success) {
            setDeletedTemplateId(templateId);
        } else {
            console.error('Error deleting application template:', response.message);
        }
    };

    useEffect(() => {
        fetchApplicationTemplates();
    }, [deletedTemplateId]);

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
                </div>
            </div>
        </div>
    );
};

export default ApplicationForms;
