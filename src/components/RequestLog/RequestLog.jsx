import React, { useState, useEffect, useRef } from "react";
import CaretDown from "../../assets/RequestLog/CaretDown.svg";
import CaretUp from "../../assets/RequestLog/CaretUp.svg";
import UpwardArrowIcon from "../../assets/RequestLog/UpwardArrowIcon.svg?react";
import DataTable from "react-data-table-component";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { throttle } from "lodash";
import customStyles from "./styles/RequestLogTableStyles";

import {
  Button,
  Collapse,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
} from "@mui/material";
import { fetchCategories } from "../../redux/Category/Action";
import { fetchRequestLog } from "../../redux/requestLog/Action";
import { useNavigate } from "react-router-dom";

const RequestLog = () => {
  const tableref = useRef(null);
  const dispatch = useDispatch();
  const {
    data: categories,
    loading,
    error,
  } = useSelector((state) => state.categories);
  const [filters, setFilters] = useState({
    categoryName: "",
    status: "",
    sortBy: "",
  });
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchValue, setSearchValue] = useState();
  const requests = useSelector((store) => store?.requestLog?.data);
  const hasMoreData = useSelector((store) => store?.requestLog?.hasMoreData);
  const load = useSelector((store) => store?.requestLog?.loading);
  const hasMoreRef = useRef(true);
  const requestsRef = useRef(requests);
  const [allRequest, setAllRequest] = useState([]);
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = (id) => {
    setIsEditMenuOpen((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsEditMenuOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    requestsRef.current = requests;
  }, [requests]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    dispatch(fetchRequestLog({ hasMoreRef }));
  }, []);

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 200,
        overflowY: "auto",
      },
    },
  };

  const throttledScrollHandler = throttle(() => {
    const container = tableref.current;
    if (!container || load) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      if (hasMoreRef.current && !load) {
        const lastItem = requestsRef.current[requestsRef.current.length - 1];
        console.log("lastItem:", lastItem, "requests:", requestsRef.current);

        if (!lastItem) return;

        const updatedFilters = {
          ...filters,
          lastId: lastItem.requestId,
        };

        dispatch(fetchRequestLog(updatedFilters, hasMoreRef));
      }
    }
  }, [300]);

  useEffect(() => {
    const container = tableref.current;
    if (container) {
      container.addEventListener("scroll", throttledScrollHandler);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", throttledScrollHandler);
      }

      throttledScrollHandler.cancel();
    };
  }, []);

  const handleCategoryChange = (name) => {
    console.log(hasMoreData);
    setCategory(name);
    const updatedFilters = {
      ...filters,
      categoryName: name === "All" ? "" : name,
    };
    setAllRequest([]);
    setFilters(updatedFilters);
    dispatch(fetchRequestLog(updatedFilters, hasMoreRef));
  };

  const handleStatusChange = (value) => {
    setStatus(value);
    const updatedFilters = {
      ...filters,
      status: value === "All" ? "" : value,
    };
    setAllRequest([]);
    setFilters(updatedFilters);
    dispatch(fetchRequestLog(updatedFilters, hasMoreRef));
  };

  const open = Boolean(anchorEl);
  const toggleSection = (section) => {
    setExpandedSection((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  useEffect(() => {
    if (requests) {
      setAllRequest((prev) => {
        const updatedRequest = [...prev, ...requests];
        return updatedRequest;
      });
    }
  }, [requests]);

  const [expandedSection, setExpandedSection] = useState({
    dateCreated: true,
  });
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [sortBy, setSortBy] = useState({
    dateOldestFirst: false,
    dateLatestFirst: false,
  });

  const handleSortBy = (name) => {
    const newSort = {
      dateOldestFirst: false,
      dateLatestFirst: false,
      [name]: true,
    };
    setSortBy(newSort);

    const updatedFilters = {
      ...filters,
      sortBy: name === "dateLatestFirst" ? "Latest" : "Oldest",
      lastId: 0,
    };
    setAllRequest([]);
    dispatch(fetchRequestLog(updatedFilters, hasMoreRef));
  };

  const handleView = (row) => {
    navigate(`/logs/view-request/${row.requestId}`, {
      state: {
        requestTitle: row.requestTitle,
        status: row.status,
      },
    });
  };

  const columns = [
    {
      name: "Request ID",
      selector: (row) => row.requestId,
      width: "120px",
    },
    {
      name: "Request Title",
      selector: (row) => row.requestTitle,
      width: 180,
    },
    {
      name: "Certificates",
      style: "marigin-left:10px",
      selector: (row) => row.certificateCount,
      width: "120px",
    },
    {
      name: "Category",
      selector: (row) => row.categoryName,
      width: "150px",
    },
    {
      name: "Dated",
      selector: (row) => {
        const date = new Date(row.dated);
        const dateOptions = { year: "numeric", month: "short", day: "numeric" };
        const formattedDate = date.toLocaleDateString("en-GB", dateOptions);
        return formattedDate;
      },
      width: "180px",
    },
    {
      name: "Status",
      style: "margin-right:10px",
      selector: (row) => row.status,
      cell: (row) => (
        <span
          style={{
            color:
              row.status === "Delivered"
                ? "#16a34a"
                : row.status === "Partially Delivered"
                  ? "#f97316"
                  : row.status === "Failed"
                    ? "#dc2626"
                    : "#3b82f6",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "0.75rem",
            fontWeight: "500",
            display: "inline-block",
          }}
        >
          {row.status}
        </span>
      ),
    },

    {
      name: "Action",
      width: "150px",
      cell: (row) => (
        <div className="">
          <div
            onClick={() => toggleMenu(row.requestId)}
            className="h-6 w-6 rounded-full bg-[#FAFAFA] cursor-pointer flex items-center justify-center"
          >
            <MoreVertIcon fontSize="small" />
          </div>

          {isEditMenuOpen === row.requestId && (
            <div
              ref={menuRef}
              className="absolute right-0 top-2 w-[140px] bg-white rounded-xl py-1 border border-gray-300 z-10 shadow-lg "
              role="menu"
            >
              <ul className="flex flex-col text-sm text-start text-gray-700">
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-50 rounded-md"
                  role="menuitem"
                  onClick={() => handleView(row)}
                >
                  View Request
                </li>
              </ul>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex gap-8 flex-col">
        <div className=" w-full flex  flex-col items-start p-8 gap-4  bg-white shadow-md rounded-xl  flex-grow-0 z-0 ">
          <div className="flex items-center h-[36px] font-roboto font-medium text-[24px] leading-[150%] tracking-[-0.01em] text-[#394555]">
            Request Log
          </div>
          <div className="w-full h-[40px] flex gap-2 p-0  items-center justify-end">
            <div className="flex justify-start items-center gap-2">
              <div className="w-[512px] h-[40px] rounded-xl border-[1px] border-[#DEE0E3] pl-4 flex gap-2">
                <input
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                  className="flex-1 font-roboto font-normal text-base leading-[100%] tracking-[0%] text-[#9BA2AB]
               focus:outline-hidden "
                  type="text"
                  name="searchValue"
                  placeholder="Search users by name, email, date or user-type"
                />
                <button className="w-[6rem] h-[2.5rem] cursor-pointer py-3 px-6 bg-[#BDC1C7] rounded-xl flex justify-center items-center text-[#757D8A]">
                  Search
                </button>
              </div>

              <FormControl
                sx={{
                  mt: 0,
                  minWidth: 129,
                  height: 40,
                  background: "#FFFFFF",
                  borderRadius: "12px",
                  "& .MuiOutlinedInput-root": {
                    height: 40,
                    borderRadius: "12px",
                  },
                  "& .MuiInputBase-input": {
                    padding: "10px 14px",
                  },
                  "& .MuiSelect-icon": {
                    width: 18,
                    height: 20,
                  },
                }}
              >
                <InputLabel
                  id="category-label"
                  sx={{ minWidth: 65, height: 19, mt: -1 }}
                >
                  Category
                </InputLabel>
                <Select
                  labelId="category-label"
                  id="category-select"
                  value={category}
                  IconComponent={UpwardArrowIcon}
                  label="Category"
                  onChange={(event) => handleCategoryChange(event.target.value)}
                  sx={{
                    height: 40,
                  }}
                  MenuProps={MenuProps}
                >
                  <MenuItem value="All">All</MenuItem>

                  {loading ? (
                    <MenuItem disabled>Loading...</MenuItem>
                  ) : error ? (
                    <MenuItem disabled>Error loading</MenuItem>
                  ) : (
                    categories.map((cat) => (
                      <MenuItem
                        key={cat.certificateCategoryId}
                        value={cat.name}
                      >
                        {cat.name}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>
              <FormControl
                sx={{
                  mt: 0,
                  ml: 1,
                  minWidth: 110,
                  height: 40,
                  background: "#FFFFFF",
                  borderRadius: "12px",
                  gap: "4px",
                  "& .MuiOutlinedInput-root": {
                    height: 40,
                    borderRadius: "12px",
                  },
                  "& .MuiInputBase-input": {
                    padding: "10px 14px",
                  },
                  "& .MuiSelect-icon": {
                    width: 18,
                    height: 20,
                  },
                }}
              >
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ minWidth: 65, height: 19, mt: -1 }}
                >
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="status"
                  IconComponent={UpwardArrowIcon}
                  onChange={(event) => handleStatusChange(event.target.value)}
                  sx={{
                    height: 40,
                  }}
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Scheduled">Scheduled</MenuItem>
                  <MenuItem value="Delivered">Delivered</MenuItem>
                  <MenuItem value="Partially Delivered">
                    Partially Delivered
                  </MenuItem>
                  <MenuItem value="Failed">Failed</MenuItem>
                </Select>
              </FormControl>

              <div className="h-[40px] w-[115px] flex items-center justify-center rounded-xl border-[1px] border-[#DEE0E3] px-4 py-2">
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  disableRipple
                  sx={{
                    height: 19,
                    color: "#9BA2AB",
                    textTransform: "none",
                    fontSize: "16px",
                    backgroundColor: "transparent",
                    ":hover": {
                      backgroundColor: "transparent",
                    },
                    cursor: "pointer",
                  }}
                >
                  <span className="min-w-[60px] cursor-pointer font-roboto">
                    Sort by
                  </span>{" "}
                  <img
                    className="ml-2 cursor-pointer transition-all ease-in-out duration-200"
                    src={open ? CaretUp : CaretDown}
                    alt="Down Arrow"
                  />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                  sx={{
                    "& .MuiPaper-root": {
                      minWidth: 147,
                      borderRadius: "12px",
                      border: "1px solid #DEE0E3",
                      paddingY: "4px",
                      marginTop: "20px",
                      boxShadow: "34px 31px 46px 0px #00000017",
                    },

                    "& .MuiMenuItem-root": {
                      paddingX: "12px",
                      paddingY: "8px",
                      display: "flex",
                      alignItems: "center",
                      gap: "34px",
                      width: 171,
                      height: 40,
                      fontSize: "14px",
                      letterSpacing: "0px",
                      color: "#757D8A",
                    },
                  }}
                >
                  <MenuItem
                    disableRipple
                    className="menu-item"
                    onClick={() => toggleSection("dateCreated")}
                  >
                    <span className="min-w-[80px]">Date Created</span>{" "}
                    <img
                      src={expandedSection.dateCreated ? CaretUp : CaretDown}
                      alt="Down Arrow"
                    />
                  </MenuItem>

                  <Collapse
                    in={expandedSection.dateCreated}
                    timeout="auto"
                    unmountOnExit
                  >
                    <MenuItem
                      disableRipple
                      disabled={sortBy.dateLatestFirst}
                      className="menu-item"
                      onClick={() => handleSortBy("dateOldestFirst")}
                    >
                      <span className="flex items-center gap-2">
                        <input
                          checked={sortBy.dateOldestFirst || false}
                          onChange={(e) =>
                            setSortBy({
                              ...sortBy,
                              dateOldestFirst: e.target.checked,
                            })
                          }
                          disabled={sortBy.dateLatestFirst}
                          className="checkbox-input"
                          type="checkbox"
                          name="dateOldestFirst"
                        />
                        Oldest First
                      </span>
                    </MenuItem>
                    <MenuItem
                      disableRipple
                      disabled={sortBy.dateOldestFirst}
                      className="menu-item"
                      onClick={() => handleSortBy("dateLatestFirst")}
                    >
                      <span className="flex items-center gap-2">
                        <input
                          checked={sortBy.dateLatestFirst || false}
                          onChange={(e) =>
                            setSortBy({
                              ...sortBy,
                              dateLatestFirst: e.target.checked,
                            })
                          }
                          disabled={sortBy.dateOldestFirst}
                          className="checkbox-input"
                          type="checkbox"
                          name="dateLatestFirst"
                        />
                        Latest First
                      </span>
                    </MenuItem>
                  </Collapse>
                </Menu>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start p-2 gap-4  h-auto bg-white shadow-lg rounded-xl z-1  ">
          <div className="overflow-y-auto h-[600px] w-full" ref={tableref}>
            <DataTable
              columns={columns}
              data={allRequest}
              customStyles={customStyles}
              pagination={false}
              noDataComponent={""}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestLog;
