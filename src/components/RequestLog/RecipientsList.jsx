import React, { useEffect, useRef } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import profile from "../../assets/RequestLog/profile.png";

const RecipientsList = ({
  recipients,
  openMenuId,
  setOpenMenuId,
  handleEditRecipient,
  handleRemoveRecipient,
  safeJsonParse,
}) => {
  const menuRef = useRef(null);
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
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenMenuId]);

  return (
    <div className="flex flex-col items-start p-6 gap-6 w-full max-h-[604px] bg-white bg-opacity-65 shadow-[4px_4px_8px_rgba(0,0,0,0.08)] rounded-[16px] flex-grow">
      <div className="flex flex-row items-center p-0 gap-4 w-full h-5">
        <span className="w-[508px]  h-5 font-roboto font-medium text-[20px] leading-[20px] text-[#394555] ">
          Recipients
        </span>
      </div>

      <div className="flex flex-col items-start gap-4 w-full max-h-[500px] min-h-[500px] overflow-y-auto ">
        {recipients?.length > 0 ? (
          recipients.map((recipient) => {
            const parsedData = safeJsonParse(recipient.certificateData);

            return (
              <div key={recipient.certificateId} className="w-full">
                <div className="flex flex-row items-center gap-[10px]  flex-none order-0 self-stretch flex-grow-0 mb-4">
                  <div className=" h-12 bg-[#DEE0E3] rounded-full flex-none order-1 ">
                    <img
                      src={profile}
                      alt="profile"
                      className=" h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="flex flex-col justify-center items-start p-0 gap-2 w-full  order-2 grow">
                    <div
                      className="flex flex-row items-center p-0 gap-[10px] h-[19px] font-medium text-[16px] leading-[19px] tracking-[-0.01em] text-[#394555]"
                      style={{ fontFamily: "Roboto" }}
                    >
                      {parsedData.firstName} {parsedData.lastName}
                    </div>
                    <div
                      className=" h-[16px] text-center font-normal text-[14px] leading-[16px] text-[#757D8A] flex-none order-1 flex-grow-0"
                      style={{ fontFamily: "Roboto" }}
                    >
                      {parsedData.email}
                    </div>
                  </div>
                  <div className="relative flex flex-row justify-center items-center p-1 gap-2 w-6 h-6 bg-[#FAFAFA] rounded-[16px] flex-none order-4 grow-0">
                    <MoreVertIcon
                      sx={{ color: "#757D8A", cursor: "pointer" }}
                      onClick={() =>
                        setOpenMenuId(
                          openMenuId === recipient.certificateId
                            ? null
                            : recipient.certificateId
                        )
                      }
                    />
                    {openMenuId === recipient.certificateId && (
                      <div
                        ref={menuRef}
                        className="absolute right-0 top-8 w-[160px] bg-white rounded-xl py-1 border border-gray-300 z-10 shadow-lg"
                        role="menu"
                      >
                        <ul className="flex flex-col text-sm text-start text-gray-700">
                          <li
                            className="px-4 py-2 cursor-pointer hover:bg-gray-50 rounded-md"
                            role="menuitem"
                            onClick={() => handleEditRecipient(recipient)}
                          >
                            Edit Recipient
                          </li>
                          <li
                            className="px-4 py-2 cursor-pointer hover:bg-gray-50 rounded-md"
                            role="menuitem"
                            onClick={() => handleRemoveRecipient(recipient)}
                          >
                            Remove Recipient
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <hr className="border-t border-gray-200  my-2" />
              </div>
            );
          })
        ) : (
          <p className="text-[#757D8A] text-sm italic mt-4">
            No recipients available.
          </p>
        )}
      </div>
    </div>
  );
};

export default RecipientsList;
