import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRequestView,
  updateCertificateRequest,
} from "../../redux/requestLog/Action";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScheduledDate from "./ScheduledDate";
import { useLocation, useParams } from "react-router-dom";
import RequestUpdateModel from "./RequestUpdateModel";
import { safeJsonParse } from "../../utils/jsonUtils";
import RequestViewHeader from "./RequestViewHeader";
import RecipientsList from "./RecipientsList";
import InvalidStatusModel from "./InvalidStatusModel";
import RemoveRecipientModel from "./RemoveRecipientModel";
import {
  deleteCertificateRecipient,
  editCertificateRecipient,
} from "../../redux/certificateRecipient/action";
import EditRecipientModal from "./EditRecipientModal";
import { TemplateModal } from "./TemplateModal";

const ViewRequestLog = () => {
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [templateUrlToShow, setTemplateUrlToShow] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const { requestTitle, status } = location.state || {};
  const [title, setTitle] = useState(requestTitle || "");
  const [scheduledDate, setScheduledDate] = useState(null);
  const [titleError, setTitleError] = useState("");
  const [prevTitle, setPrevTitle] = useState(requestTitle || "");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [certificateId, setCertificateId] = useState(null);
  const [isEditRecipientModalOpen, setIsEditRecipientModalOpen] =
    useState(false);
  const [showRecipientUpdateSuccessModal, setShowRecipientUpdateSuccessModal] =
    useState(false);
  const [selectedRecipientForEdit, setSelectedRecipientForEdit] =
    useState(null);
  const { loading: deleteLoading, success: deleteSuccess } = useSelector(
    (state) => state.certificateRecipient
  );

  const { id } = useParams();
  const { loading, requestView, error } = useSelector(
    (state) => state.requestView
  );

  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);
  const handleEditRecipient = (recipient) => {
    if (status === "Scheduled") {
      setSelectedRecipientForEdit(recipient);
      setIsEditRecipientModalOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleRemoveRecipient = (recipient) => {
    if (status === "Scheduled") {
      setSelectedRecipient(recipient);
      setShowDeleteModal(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    dispatch(deleteCertificateRecipient(selectedRecipient.certificateId))
      .then((result) => {
        if (result.success) {
          dispatch(fetchRequestView(id));
        }
      })
      .catch((error) => {
        toast.error(error.message || "Failed to delete recipient");
      })
      .finally(() => {
        setShowDeleteModal(false);
        setSelectedRecipient(null);
      });
  };
  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);

    if (isEditing && value.trim() === "") {
      setTitleError("Title cannot be empty");
    } else {
      setTitleError("");
    }
  };

  useEffect(() => {
    if (requestView?.scheduledDate) {
      setScheduledDate(requestView?.scheduledDate);
    }
  }, [requestView?.scheduledDate]);

  useEffect(() => {
    if (id) {
      dispatch(fetchRequestView(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (requestView?.requestTitle) {
      setTitle(requestView.requestTitle);
      setPrevTitle(requestView.requestTitle);
    }
  }, [requestView?.requestTitle]);

  const handleSaveRecipientUpdate = (updatedRecipient) => {
    setCertificateId(updatedRecipient.certificateId);
    dispatch(
      editCertificateRecipient(
        updatedRecipient.certificateId,
        JSON.parse(updatedRecipient.certificateData)
      )
    )
      .then(() => {
        dispatch(fetchRequestView(id));
        setShowRecipientUpdateSuccessModal(true);
      })
      .catch((error) => {
        console.log("Error updating recipient:", error);
      })
      .finally(() => {
        setIsEditRecipientModalOpen(false);
      });
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSave = () => {
    if (title.trim() === "") {
      setTitleError("Title cannot be empty");
      return;
    }
    const dateToUse =
      scheduledDate !== null ? scheduledDate : requestView?.scheduledDate;

    const convertToLocalDateTime = (dateStr) => {
      if (!dateStr) return null;
      const date = new Date(dateStr);
      const localDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      return localDate.toISOString().slice(0, 19);
    };
    const updatedRequest = {
      requestId: parseInt(id),
      requestTitle: title.trim(),
      scheduledDate: convertToLocalDateTime(dateToUse),
    };

    dispatch(updateCertificateRequest(updatedRequest))
      .then(() => {
        setShowSaveModal(true);
        setIsEditing(false);
      })
      .catch(() => {
        toast.error("Failed to update request");
      });
  };

  const handleEditClick = () => {
    if (status === "Scheduled") {
      setPrevTitle(title);
      setIsEditing(true);
    } else {
      setIsModalOpen(true);
    }
  };
  const handleViewTemplateClick = () => {
    setTemplateUrlToShow(requestView?.templateURL);
    setIsTemplateModalOpen(true);
  };
  return (
    <>
      <div className="flex gap-8 flex-col ">
        <RequestViewHeader onBackClick={handleBackClick} />
        <div className="flex lg:flex-row items-start gap-6  h-full flex-grow  sm:flex-col md:flex-col max-sm:flex-col">
          <div
            className={`flex flex-col items-start p-6 gap-6 w-full bg-white shadow-[4px_4px_8px_rgba(0,0,0,0.08)] max-h-[604px] overflow-y-auto rounded-[16px] flex-grow transition-all duration-300 ${
              showSaveModal ? "blur-md pointer-events-none" : ""
            }`}
          >
            {" "}
            <div className="flex flex-row items-center gap-4 w-full h-auto">
              <div className="w-full flex flex-row items-center gap-4 flex-none order-0 self-stretch">
                <div className=" h-[20px] font-roboto font-medium text-[20px] leading-[20px] text-[#394555]  flex-grow">
                  <span className=" h-[20px] font-roboto font-medium text-[20px] leading-[20px] text-[#394555]">
                    Request Details
                  </span>
                </div>
                <button
                  className="flex flex-row justify-center items-center gap-2 px-0 py-0 rounded-[12px] w-fit h-fit"
                  onClick={handleEditClick}
                >
                  <span className="font-roboto not-italic font-medium text-[16px] leading-[16px] text-center text-[#0066FF]">
                    Edit Request
                  </span>
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start p-0 gap-4 w-full h-full flex-none order-1  flex-grow">
              <div className="flex flex-col items-start p-0 gap-2 w-full rounded-lg flex-none order-0 self-stretch   ">
                <span className="w-full text-[#9BA2AB] font-roboto font-normal text-sm leading-4 tracking-[-0.01em] flex-none order-0 self-stretch">
                  Request ID
                </span>
                <div className="w-full h-12 flex flex-row items-center px-4 gap-2 bg-[#FAFAFA] rounded-lg flex-none order-1 self-stretch">
                  <input
                    readOnly
                    type="text"
                    value={requestView?.requestId}
                    placeholder="Enter value"
                    className="w-full bg-transparent outline-none text-sm text-[#333] font-roboto"
                  />
                </div>
              </div>
              <div className="flex flex-col items-start p-0 gap-2 w-full rounded-lg flex-none order-0 self-stretch   ">
                <span className="w-full text-[#9BA2AB] font-roboto font-normal text-sm leading-4 tracking-[-0.01em] flex-none order-0 self-stretch">
                  Request Title
                </span>
                <div
                  className={`w-full h-12 flex flex-col items-start justify-around px-4 gap-2 rounded-lg flex-none order-1 self-stretch ${isEditing ? "bg-white" : "bg-[#FAFAFA]"}`}
                >
                  <input
                    type="text"
                    value={title}
                    required
                    onChange={handleTitleChange}
                    placeholder="Enter value"
                    readOnly={!isEditing}
                    className={`w-full outline-none text-sm text-[#333] font-roboto  ${
                      isEditing ? "bg-white" : "bg-transparent"
                    } ${titleError ? "" : "border-gray-300"}`}
                  />
                  {titleError && isEditing && (
                    <p className="text-red-500 text-xs mt-1">{titleError}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-start p-0 gap-2 w-full  rounded-lg ">
                <span className="w-full text-[#9BA2AB] font-roboto font-normal text-sm leading-4 tracking-[-0.01em] flex-none order-0 self-stretch">
                  Category
                </span>
                <div className="w-full h-12 flex flex-row items-center px-4 gap-2 bg-[#FAFAFA] rounded-lg flex-none order-1 self-stretch">
                  <input
                    readOnly
                    type="text"
                    value={requestView?.categoryName}
                    placeholder="Enter value"
                    className="w-full bg-transparent outline-none text-sm text-[#5A6472] font-roboto"
                  />
                </div>
              </div>

              <div className="flex flex-col items-start p-0 gap-2 w-full rounded-lg ">
                <span className="w-full text-[#9BA2AB] font-roboto font-normal text-sm leading-4 tracking-[-0.01em] flex-none order-0 self-stretch">
                  Template
                </span>
                <div className="w-full h-12 flex flex-row items-center px-4 gap-2 bg-[#FAFAFA] rounded-lg flex-none order-1 self-stretch">
                  <div className="w-[36.63px] h-[26px] rounded-[2.23px] bg-no-repeat bg-center bg-contain">
                    <img src={requestView?.templateURL} />
                  </div>

                  <span className="w-[317.37px] h-[19px] font-roboto font-normal text-[16px] leading-[19px] text-[#5A6472] flex-grow">
                    {requestView?.templateName}
                  </span>

                  <span
                    className="w-[106px] h-[16px] font-roboto font-medium text-[16px] leading-[16px] text-[#0066FF] text-center cursor-pointer"
                    onClick={handleViewTemplateClick}
                  >
                    View Template
                  </span>
                </div>
              </div>

              <ScheduledDate
                requestView={requestView}
                isEditing={isEditing}
                onDateChange={(dateString) => {
                  setScheduledDate(dateString);
                }}
              />
              <div className="flex flex-col items-start p-0 gap-2 w-full rounded-lg ">
                <span className="w-full text-[#9BA2AB] font-roboto font-normal text-sm leading-4 tracking-[-0.01em] flex-none order-0 self-stretch">
                  Status
                </span>
                <div className="w-full h-12 flex flex-row items-center px-4 gap-2 bg-[#FAFAFA] rounded-lg flex-none order-1 self-stretch">
                  <span className="w-[379px] h-[19px] font-roboto font-normal text-[16px] leading-[19px] text-[#5A6472] flex-none order-0 flex-grow">
                    {status}
                  </span>
                </div>
              </div>
            </div>
            {isEditing && (
              <>
                <button
                  className="w-full h-12 flex flex-row justify-center items-center px-6 gap-2 bg-[#0066FF] rounded-[12px] flex-none order-1 self-stretch"
                  onClick={handleSave}
                >
                  <span className="w-[98px] h-4 text-white text-center font-roboto font-medium text-[16px] leading-[16px]">
                    Save Request
                  </span>
                </button>

                <button
                  className="w-full h-12 box-border flex flex-row justify-center items-center px-6 gap-2 border border-[#0066FF] rounded-[12px] flex-none order-2 self-stretch"
                  onClick={() => {
                    setTitle(prevTitle);
                    setIsEditing(false);
                  }}
                >
                  <span className="w-[98px] h-4 text-[#0066FF] text-center font-roboto font-medium text-[16px] leading-[16px]">
                    Cancel
                  </span>
                </button>
              </>
            )}
          </div>

          {showSaveModal && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-[30%] -translate-y-1/2 z-15">
              <RequestUpdateModel
                open={showSaveModal}
                setOpenModal={setShowSaveModal}
                requestId={id}
                type={"Request"}
              />
            </div>
          )}

          {showRecipientUpdateSuccessModal && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-[30%] -translate-y-1/2 z-15">
              <RequestUpdateModel
                open={showRecipientUpdateSuccessModal}
                setOpenModal={setShowRecipientUpdateSuccessModal}
                requestId={certificateId}
                type={"Recipient"}
              />
            </div>
          )}
          <div
            className={`transition-all duration-400 ${isEditRecipientModalOpen ? "blur-md pointer-events-none" : ""}`}
          >
            <RecipientsList
              recipients={requestView?.certificateRecipientResponses || []}
              openMenuId={openMenuId}
              setOpenMenuId={setOpenMenuId}
              handleEditRecipient={handleEditRecipient}
              handleRemoveRecipient={handleRemoveRecipient}
              safeJsonParse={safeJsonParse}
              status={status}
            />
          </div>
        </div>
      </div>
      <RemoveRecipientModel
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteLoading}
      />
      {isEditRecipientModalOpen && selectedRecipientForEdit && (
        <EditRecipientModal
          open={isEditRecipientModalOpen}
          onClose={() => setIsEditRecipientModalOpen(false)}
          recipient={selectedRecipientForEdit}
          onSave={handleSaveRecipientUpdate}
        />
      )}

      <InvalidStatusModel open={isModalOpen} setOpenModal={setIsModalOpen} />

      <TemplateModal
        open={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        templateUrl={templateUrlToShow}
      />
    </>
  );
};

export default ViewRequestLog;
