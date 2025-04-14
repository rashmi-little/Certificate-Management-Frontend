import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import profile from "../../../assets/vector/profile.png";
import {
  ACTIVE_FOOTER_SUBMIT,
  INACTIVE_FOOTER_SUBMIT,
  SET_CURRENT_SELECTED_RECIPIENT,
  SET_SELECTED_OPEN_MENU_ID,
} from "../../../redux/certificate/ActionType";
// import RemoveRecipientModel from "./RemoveRecipientModel";
// import EditRecipientModal from "./EditRecipientModal";

const RecipientsList = ({ setShowDeleteModal }) => {
  const recipients = useSelector(
    (store) => store?.certificate?.selectedRecipients
  );

  const menuRef = useRef(null);
  const dispatch = useDispatch();

  const selectedOpenMenuId = useSelector(
    (store) => store?.certificate.selectedOpenMenuId
  );

  useEffect(() => {
    if (recipients.length > 0) {
      dispatch({ type: ACTIVE_FOOTER_SUBMIT });
    } else {
      dispatch({ type: INACTIVE_FOOTER_SUBMIT });
    }
  }, [recipients]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest(".MuiSvgIcon-root") &&
        !event.target.closest(
          ".relative.flex.flex-row.justify-center.items-center"
        )
      ) {
        dispatch({
          type: SET_SELECTED_OPEN_MENU_ID,
          payload: null,
        });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedOpenMenuId]);

  console.log(recipients);

  const handleRemoveClick = (recipient) => {
    dispatch({ type: SET_CURRENT_SELECTED_RECIPIENT, payload: recipient });
    setShowDeleteModal(true);
  };

  //   const handleEditClick = (recipient) => {
  //     dispatch(setEditingRecipient(recipient));
  //   };

  const toggleMenu = (id) => {
    const payload = selectedOpenMenuId === id ? null : id;
    dispatch({ type: SET_SELECTED_OPEN_MENU_ID, payload: payload });
  };

  const emptyStyling = "flex justify-center items-center h-full";
  const recipientsLength = recipients.length;

  return (
    // <div className="flex flex-col items-start p-6 gap-6 h-full bg-white bg-opacity-65 shadow-[4px_4px_8px_rgba(0,0,0,0.08)] rounded-[16px] flex-grow">
    //   {/* Header */}

    //   {/* Recipients List */}

    //   {/* Delete Confirmation Modal */}

    //   {/* Edit Recipient Modal */}
    //   {/* {editingRecipient && (
    //     <EditRecipientModal
    //       recipient={editingRecipient}
    //       onClose={() => dispatch(setEditingRecipient(null))}
    //     />
    //   )} */}
    // </div>

    // "flex flex-col items-start gap-4 w-full h-full  overflow-y-auto pb"

    <div
      className={
        recipientsLength == 0
          ? emptyStyling
          : "flex flex-col items-start gap-4 w-full h-full  overflow-y-auto pb"
      }
    >
      {recipientsLength > 0 ? (
        recipients.map((recipient, index) => (
          <div className="w-full" key={index}>
            <div className="flex flex-row items-center gap-[10px] w-full mb-4">
              {/* Profile image */}
              <div className="w-12 h-12 bg-[#DEE0E3] rounded-full flex-none">
                <img
                  src={profile}
                  alt="profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Name and email */}
              <div className="flex flex-col justify-center items-start p-0 gap-2 w-full grow">
                <div className="font-medium text-[16px] text-[#394555]">
                  {recipient.firstName} {recipient.lastName}
                </div>
                <div className="text-[14px] text-[#757D8A]">
                  {recipient.email}
                </div>
              </div>

              {/* Menu button and dropdown */}
              <div className="relative flex flex-row justify-center items-center p-1 gap-2 w-6 h-6 bg-[#FAFAFA] rounded-[16px]">
                <MoreVertIcon
                  sx={{ color: "#757D8A", cursor: "pointer" }}
                  onClick={() => toggleMenu(index)}
                />
                {selectedOpenMenuId === index && (
                  <div
                    ref={menuRef}
                    className="absolute right-0 top-8 w-[160px] bg-white rounded-xl py-1 border border-gray-300 z-10 shadow-lg"
                  >
                    <ul className="flex flex-col text-sm text-start text-gray-700">
                      {/* <li
                        className="px-4 py-2 cursor-pointer hover:bg-gray-50 rounded-md"
                        onClick={() => {
                          //   handleEditClick(recipient);
                          //   dispatch(setOpenMenuId(null));
                          console.log("Edit clicked");
                        }}
                      >
                        Edit Recipient
                      </li> */}
                      <li
                        className="px-4 py-2 cursor-pointer hover:bg-gray-50 rounded-md"
                        onClick={() => handleRemoveClick(recipient)}
                      >
                        Remove Recipient
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <hr className="border-t border-[#DEE0E3] w-full my-2" />
          </div>
        ))
      ) : (
        <p className="text-[#394555] text-[16px] font-roboto font-[400]">
          No recipient added!
        </p>
      )}
    </div>
  );
};

export default RecipientsList;
