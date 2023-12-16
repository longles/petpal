import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { petAPIService } from "../../services/petAPIService";
import { shelterAPIService } from "../../services/userAPIService";
import ColourOptions from "./ColorOptions";
import { applicationFormAPIService } from "../../services/applicationFormAPIService";
import { Button } from "react-bootstrap";
import SelectApplicationFormModal from "./SelectApplicationFormModal";
import ApplicationModal from "./ApplicationModal";
import BreedsOptions from "./BreedsOptions";

export function getUpdateModalId(petId) {
    return `petUpdateModal${petId}`;
}

function PetUpdateModal({ petId }) {
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [currentFormName, setCurrentFormName] = useState("None");
    const [selectedFormId, setSelectedFormId] = useState(null);
    const [selectedFormName, setSelectedFormName] = useState("");
    const [applicationForms, setApplicationForms] = useState([]);
    const [showSelectAppFormModal, setShowSelectAppFormModal] = useState(false);
    const appFormAPI = applicationFormAPIService(); // New API call

    const petAPI = petAPIService();
    const shelterAPI = shelterAPIService();
    const [petDetails, setPetDetails] = useState(null);
    const [shelterDetails, setShelterDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const modalId = getUpdateModalId(petId);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [formInitialized, setFormInitialized] = useState(false);
    
    const fetchPetDetail = async () => {
        try {
            const response = await petAPI.getPetDetail(petId);
            if (response.success) {
                setPetDetails(response.data);

                if (response.data.form) {
                    setCurrentFormName(response.data.form.name); 
                    setSelectedFormId(response.data.form.id);
                }

                return response.data.shelter;
            }
        } catch (error) {
            console.error(`Error fetching pet detail for ID ${petId}:`, error);
        }
    };

    const fetchShelterDetail = async (shelterId) => {
        try {
            const response = await shelterAPI.getShelterDetail(shelterId);
            if (response.success) {
                setShelterDetails(response.data);
            }
        } catch (error) {
            console.error(
                `Error fetching shelter detail for ID ${shelterId}:`,
                error
            );
        }
    };

    useEffect(() => {
        const fetchApplicationForms = async () => {
            const response = await appFormAPI.getApplicationFormList(1); // assuming page 1 for demo
            if (response.success) {
                setApplicationForms(response.data.results);
            } else {
                console.error("Failed to fetch application forms:", response.message);
            }
        };

        fetchApplicationForms();
    }, []);

    const handleSelectForm = (formId, formName) => {
        setSelectedFormId(formId);
        setSelectedFormName(formName);
        setShowSelectAppFormModal(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            const shelterId = await fetchPetDetail();
            if (shelterId) {
                await fetchShelterDetail(shelterId);
            }
            setLoading(false);
        };
        fetchData();
    }, [petId]);

    useEffect(() => {
        if (petDetails) {
            reset({...petDetails, photo: null});
            setFormInitialized(true);
        }
    }, [petDetails, reset]);

    const onSubmit = async (data) => {

        const formattedData = {
            ...data,
            photo: data.photo ? data.photo : null,
            breed: parseInt(data.breed, 10),
            size: parseInt(data.size, 10),
            colour: parseInt(data.colour, 10),
            birth_date: formatDate(data.birth_date)
        };
        console.log("formattedData")
        console.log(formattedData);

        let formData = new FormData()

        for (const [key, value] of Object.entries(formattedData)) {
            // console.log("inside");
            if (key === "photo" && !value) {
                continue;
            }
            formData.append(key, value);
        }
        console.log("Form Data")

        console.log(formData);

        const response = await petAPI.updatePet(petId, formData);
        if (response.success) {
            console.log("Update successful");
            console.log(response)
            setUpdateSuccess(true);
            window.location.reload();
        } else {
            console.log("Update failed");
            setUpdateSuccess(false)
        }
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = `${date.getMonth() + 1}`.padStart(2, '0');
        const day = `${date.getDate()}`.padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    if (loading || !petDetails || !shelterDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div
            className="modal fade"
            id={modalId}
            tabIndex="-1"
            aria-labelledby={`${modalId}Label`}
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg modal-dialog-scrollable custom-modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="modal-title" id={`${modalId}Label`}>
                            Update {petDetails.name}
                        </h3>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    
                    <div className="modal-body">
                        {updateSuccess && (
                            <div className="alert alert-success" role="alert">
                                Update successful!
                            </div>
                        )}
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            id="petUpdateForm"
                            className="mx-2 px-md-5"
                        >
                            <div className="my-1">
                                <label htmlFor="photo" className="form-label">Photo</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="photo"
                                    {...register("photo")}
                                />
                            </div>
                            <div className="my-1">
                                <label className="form-label" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    className="form-control"
                                    id="name"
                                    {...register("name")}
                                />
                            </div>
                            <div className="my-1">
                                <label className="form-label" htmlFor="breed">
                                    Breed
                                </label>
                                <select
                                    className="form-select"
                                    id="breed"
                                    {...register("breed")}
                                >
                                    <BreedsOptions />
                                </select>
                            </div>
                            <div className="my-1">
                                <label className="form-label" htmlFor="sex">
                                    Gender
                                </label>
                                <select className="form-select" id="sex" {...register("sex")}>
                                    <option value="0">Unknown</option>
                                    <option value="1">Male</option>
                                    <option value="2">Female</option>
                                </select>
                            </div>
                            <div className="my-1">
                                <label className="form-label" htmlFor="dob">
                                    Date of Birth
                                </label>
                                <input
                                    className="form-control"
                                    id="dob"
                                    type="date"
                                    {...register("birth_date")}
                                />
                            </div>
                            <div className="my-1">
                                <label className="form-label" htmlFor="size">
                                    Size
                                </label>
                                <select className="form-select" id="size" {...register("size")}>
                                    <option value="1">Large</option>
                                    <option value="2">Medium</option>
                                    <option value="3">Small</option>
                                </select>
                            </div>
                            <div className="my-1">
                                <label className="form-label" htmlFor="color">
                                    Color
                                </label>
                                <select
                                    className="form-select"
                                    id="color"
                                    {...register("colour")}
                                >
                                    <ColourOptions />
                                </select>
                            </div>
                            <div className="my-2">
                                <label htmlFor="weight">Weight</label>
                                <textarea
                                    className="form-control"
                                    id="weight"
                                    {...register("weight")}
                                />
                            </div>
                            {/* <div className="my-2">
                                <label htmlFor="location">Location</label>
                                <input
                                    className="form-control"
                                    id="location"
                                    {...register("location")}
                                />
                            </div> */}
                            <div className="my-2">
                                <label htmlFor="medical_history">Medical History</label>
                                <textarea
                                    className="form-control"
                                    id="medical_history"
                                    {...register("medical_history")}
                                />
                            </div>
                            <div className="my-2">
                                <label htmlFor="behaviour">Behaviour</label>
                                <textarea
                                    className="form-control"
                                    id="behaviour"
                                    {...register("behaviour")}
                                />
                            </div>
                            <div className="my-2">
                                <label htmlFor="special_needs">Special Needs</label>
                                <textarea
                                    className="form-control"
                                    id="special_needs"
                                    {...register("special_needs")}
                                />
                            </div>
                            <div className="my-2">
                                <label htmlFor="comments">Comments</label>
                                <textarea
                                    className="form-control"
                                    id="comments"
                                    {...register("comments")}
                                />
                            </div>
                            <div className="my-1">
                                <span>Current Form: {currentFormName}</span>
                                <Button
                                    variant="primary"
                                    onClick={() => setShowSelectAppFormModal(true)}
                                >
                                    Select Application Form
                                </Button>
                                {selectedFormName && (
                                    <span> Selected Form: {selectedFormName}</span>
                                )}
                            </div>
                            <div className="my-2 d-flex justify-content-between">
                                <div className="col-3" />
                                <div className="col-3 d-flex justify-content-center">
                                    <button type="submit" className="btn btn-primary me-3">
                                        Update
                                    </button>
                                </div>
                                <div className="col-3 d-flex justify-content-end">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>

                        </form>
                    </div>
                    <SelectApplicationFormModal
                        show={showSelectAppFormModal}
                        onHide={() => setShowSelectAppFormModal(false)}
                        forms={applicationForms}
                        onSelectForm={handleSelectForm}
                    />
                    
                </div>
            </div>
        </div>
    );
}

export default PetUpdateModal;
