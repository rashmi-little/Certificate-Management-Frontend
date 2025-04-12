import { Button, Collapse, Menu, MenuItem } from "@mui/material";
import CaretUp from "../assets/UserManagement/CaretUp.svg";
import CaretDown from "../assets/UserManagement/CaretDown.svg";
import Avatar from "../assets/UserManagement/Avatar.svg";
import { useEffect, useRef, useState } from "react";
import "../pages/UserManagement.css";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddUserModal from "../components/UserManagement/AddUserModal";
import { useDispatch, useSelector } from "react-redux";
import { getPaginatedUsers, getSortedUsers, lockUser } from "../redux/user/Action";
import Loader from "../components/Loader";
import { throttle } from "lodash";
import { FETCH_TYPE } from "../constants/Constants";
import RemoveUserModal from "../components/UserManagement/RemoveUserModal";
import LockUserModal from "../components/UserManagement/LockUserModal";
import { useLocation, useNavigate } from "react-router-dom";
import { ADMINS_CLEAN, HAS_MORE_UPDATE, LOCKED_CLEAN, PAGE_NUMBER_RESET, PAGE_NUMBER_UPDATE, SORTING_ENABLED_UPDATE, SORTING_TYPE_UPDATE, USER_CREATE_RESET, USERS_CLEAN, USERS_LOCK_SUCCESS } from "../redux/user/ActionType";
import { format, formatDistanceToNow } from "date-fns";
import { TABS } from "../constants/Constants";

const UserManagement = () => {
  const [sortBy, setSortBy] = useState({
    sortByLastActiveAtOldest: false,
    sortByLastActiveAtLatest: false,
    sortByCreatedAtOldest: false,
    sortByCreatedAtLatest: false,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [expandedSection, setExpandedSection] = useState({
    lastActive: true,
    dateCreated: true,
  });
  const [searchValue, setSearchValue] = useState("");
  const tabs = ["Admins", "Recipients", "Locked"];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [actionMenuOpen, setActionMenuOpen] = useState();
  const menuRef = useRef(null);
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const dispatch = useDispatch();
  const admins = useSelector(store => store?.user?.admins);
  const users = useSelector(store => store?.user?.users);
  const locked = useSelector(store => store?.user?.locked);
  const tableRef = useRef(null);
  const isSortingEnabledRef = useRef(false);
  const [noDataTimeoutReached, SetNoDataTimeoutReached] = useState(false);
  const [openRemoveUserModal, setOpenRemoveUserModal] = useState(false);
  const [openLockUserModal, setOpenLockUserModal] = useState(false);
  const navigate = useNavigate();
  const lock = useSelector(store => store?.user?.lock);
  const tabRef = useRef(tabs[0]);
  const [rows, setRows] = useState([]);
  const rowsRef = useRef();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const create = useSelector(store => store?.user?.create);
  const pageNumbers = useSelector(store => store?.user?.pageNumbers);
  const pageNumbersRef = useRef(pageNumbers);
  const hasMore = useSelector(store => store?.user?.hasMore);
  const hasMoreRef = useRef(hasMore);
  const sorting = useSelector(store => store?.user?.sorting);
  const sortingRef = useRef(sorting);
  const isTabChanging = useRef(false);
  const sortByRef = useRef({
    sortByLastActiveAtOldest: false,
    sortByLastActiveAtLatest: false,
    sortByCreatedAtOldest: false,
    sortByCreatedAtLatest: false,
  });
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    pageNumbersRef.current = pageNumbers;
  }, [pageNumbers])

  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore])

  useEffect(() => {
    sortingRef.current = sorting;
  }, [sorting])

  /**
   *  Initially fetches the admins
   */
  useEffect(() => {
  
    if (admins.all.length !== admins?.total && admins.all.length === 0) {
      console.log("Fetching ADMIN details again,,,!");
      dispatch(getPaginatedUsers(pageNumbers.Admins, FETCH_TYPE.ADMIN));
    }

  }, [])

  /**
   *  Appends the newly fetched admins data to the rows
   */
  useEffect(() => {

    if (admins?.data) {
      setRows((prev) => {
        return [...prev, ...admins.data];
      })
    }

  }, [admins.data])

  /**
   *  Set the Admins data to Rows if already available in the store
   */
  useEffect(() => {
    if (admins.all.length > 0 && (tabRef.current === TABS.ADMINS)) {
      setRows(admins.all);
    }
  }, [])

  /**
   *   Appends the newly fetched Users data to the rows
   */
  useEffect(() => {
    if (users?.data) {
      setRows((prev) => [...prev, ...users.data]);
    }
  }, [users.data])

  /**
   *   Appends the newly fetched Users data to the rows
   */
  useEffect(() => {
    if (locked?.data) {
      setRows((prev) => [...prev, ...locked.data]);
    }
  }, [locked.data])

  /**
   *   Add the newly created user to Rows if the current tab is Recipients
   */
  useEffect(() => {
    if(create?.data) {
        dispatch({ type: USERS_CLEAN });
        dispatch({type: HAS_MORE_UPDATE, payload: {
            type: TABS.USERS,
            value: true,
          }});
          if(tabRef.current === TABS.USERS) {
            setRows([]);
          }
          dispatch(getPaginatedUsers(1, FETCH_TYPE.USER));
        }
      }, [create])

      /**
       *  Attaches the scroll event listener to the table when the component mounts
       */
  useEffect(() => {
    const container = tableRef.current;
    if (container) {
      console.log("Scroll Event lisitiner added..!");
      container.addEventListener("scroll", throttledScrollHandler);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", throttledScrollHandler);
      }
      // Won't execute the remaining calls in queue when component unmounts
      throttledScrollHandler.cancel();
    }
  }, [])

  /**
   *  Handles closing the action menu when clicked anywhere on the screen
   */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActionMenuOpen(null);
        // setSelectedRows([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [])

  /**
   * Sets the data to rows when tab changes
   * @param tab The current tab being displayed 
   */
  const handleActiveTabChange = (tab) => {
    // isTabChanging.current = true;
    setActiveTab(tab);
    tabRef.current = tab;

    if (tableRef.current) {
      tableRef.current.scrollTop = 0;
    }
    if (tabRef.current === tabs[0]) {
      setRows(admins?.all);
    }
    else if (tabRef.current === tabs[1]) {
      if (users.all.length === 0) {
        setRows([]);
        console.log("Get Users from onTabChange function..");
        dispatch(getPaginatedUsers(pageNumbers.Recipients, FETCH_TYPE.USER))
      }
      else {
        setRows(users?.all);
      }
    }
    else if (tabRef.current === tabs[2]) {
      if (locked.all.length === 0) {
        setRows([]);
        dispatch(getPaginatedUsers(pageNumbers.Locked, FETCH_TYPE.INACTIVE))
      }
      else {
        setRows(locked?.all);
      }
    }
    
  }

  /**
   *  Calls the API when the scroll event is triggered by table
   */
  const throttledScrollHandler = throttle(() => {
    
    const container = tableRef.current;
    if (!container || admins?.loading || users?.loading || locked?.loading) {
      return;
    }
    
    const { scrollTop, scrollHeight, clientHeight } = container;

    if ((scrollTop + clientHeight) >= scrollHeight - 10) {
      
      const currentTab = tabRef.current;
      const currentPageNumber = pageNumbersRef.current[currentTab];
      const currentHasMore = hasMoreRef.current[currentTab];

      if (currentHasMore) {
        
        // Checks If sorting is enabled for the current tab
        if ((tabRef.current === TABS.ADMINS && sortingRef.current.isEnabled.Admins) ||
          (tabRef.current === TABS.USERS && sortingRef.current.isEnabled.Recipients) ||
          (tabRef.current === TABS.LOCKED && sortingRef.current.isEnabled.Locked)) {
          let loading;
          if (tabRef.current === TABS.ADMINS) {
            loading = admins?.loading;
          }
          else if (tabRef.current === TABS.USERS) {
            loading = users?.loading;
          }
          else if (tabRef.current === TABS.LOCKED) {
            loading = locked?.loading;
          }
        
          const { isEnabled, ...sortByOrder } = sortingRef.current;
            dispatch(getSortedUsers(sortByOrder, currentPageNumber, getActiveTabType(currentTab)));
  
        }
        
        else {
          if ((tabRef.current === TABS.ADMINS && admins?.all?.length !== admins?.total && currentPageNumber !== 1) ||
            (tabRef.current === TABS.USERS && users?.all?.length !== users?.total && !users?.loading && currentPageNumber !== 1) ||
            (tabRef.current === TABS.LOCKED && locked?.all?.length !== locked?.total && !locked?.loading && currentPageNumber !== 1)) {
              
            dispatch(getPaginatedUsers(currentPageNumber, getActiveTabType(currentTab)));

          }
        }
      }
    }
  }, [300]);

  /**
   * Gives the corresponding type for the tab
   * @param type The current active tab
   * @returns The active tab type to fetch data
   */
  const getActiveTabType = (type) => {
    if (type === "Admins") {
      return FETCH_TYPE.ADMIN;
    }
    else if (type === "Recipients") {
      return FETCH_TYPE.USER;
    }
    else {
      return FETCH_TYPE.INACTIVE;
    }
  }

  const handleAddUserModalOpen = () => {
    setOpenAddUserModal(true);
  }

  const toggleMenu = (event, userId) => {
    const button = event.currentTarget.getBoundingClientRect();
    const dropdownHeight = 90;
    const spaceBelow = window.innerHeight - button.bottom;

    if(spaceBelow > dropdownHeight) {
      setShowTop(false);
    }
    else {
      setShowTop(true);
    }

    setActionMenuOpen(userId);
  }

  const handleRowSelection = (id) => {
    setSelectedRows((prev) => {
      return prev.includes(id) ? prev.filter((rId) => rId != id) : [...prev, id];
    })
  }

  const toggleSection = (section) => {
    setExpandedSection((prevState) => ({
      ...prevState,
      [section]: !prevState[section]
    }));
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Handles the sorting logic and calls the api to fetch the sorted data
   */
  const handleClose = () => {
    setAnchorEl(null);
    console.log(sortBy);
    let count = 0;
    if (sortBy.sortByCreatedAtLatest) {
      ++count;
    }
    if (sortBy.sortByCreatedAtOldest) {
      ++count;
    }
    if (sortBy.sortByLastActiveAtLatest) {
      ++count;
    }
    if (sortBy.sortByLastActiveAtOldest) {
      ++count;
    }
    console.log("Count value: ", count);
    if (count > 0) {
      setRows([]);
      dispatch({ type: SORTING_TYPE_UPDATE, payload: sortBy });
      isSortingEnabledRef.current = true;
      dispatch({ type: PAGE_NUMBER_RESET, payload: {
        type: tabRef.current,
      } });
      dispatch({
        type: HAS_MORE_UPDATE, payload: {
          type: tabRef.current,
          value: true,
        }
      })
      
      if (tabRef.current === tabs[0]) {
        dispatch({ type: ADMINS_CLEAN });
      }
      else if (tabRef.current === tabs[1]) {
        dispatch({ type: USERS_CLEAN });
      }
      else if (tabRef.current === tabs[2]) {
        dispatch({ type: LOCKED_CLEAN });
      }
      pageNumbersRef.current[tabRef.current] = 1;
      hasMoreRef.current[tabRef.current] = true;
      dispatch({
        type: SORTING_ENABLED_UPDATE, payload: {
          type: tabRef.current,
          value: true
        }
      });
      dispatch(getSortedUsers(sortBy, pageNumbersRef.current[tabRef.current], getActiveTabType(tabRef.current)));
      setSortBy({
        sortByLastActiveAtOldest: false,
        sortByLastActiveAtLatest: false,
        sortByCreatedAtOldest: false,
        sortByCreatedAtLatest: false,
      })
    }
  };

  const handleSortBy = (name) => {
    setSortBy((prev) => {
      const updatedSortBy = {
        ...prev,
        [name]: !prev[name],
      };
      sortByRef.current = updatedSortBy;
      return updatedSortBy;
    });
  }

  const handleSearch = () => {
    console.log(searchValue);
    setSearchValue("");
  }

  const handleEditProfile = (userId) => {
    setActionMenuOpen(false);
    navigate(`/profile/${userId}`);
  }

  const handleLockUser = (userId) => {
    setActionMenuOpen(false);
    let reqData = [];
    if (selectedRows.length > 0) {
      console.log("Have to lock these users: ", selectedRows);
      reqData = [...selectedRows];
    }
    else {
      console.log("Have to lock this user: ", userId);
      reqData.push(userId);
    }
    setSelectedRows([]);
    // console.log("User with Id locked: ", userId);
    dispatch(lockUser(reqData));
  }

  const handleRemoveUser = (userId) => {
    setActionMenuOpen(false);
    setOpenRemoveUserModal(true);
    console.log("User with Id removed: ", userId);
  }

  const handleUnlockUser = (userId) => {
    setActionMenuOpen(false);
    console.log("User with Id unlocked: ", userId);
  }

  /**
   * Formats the date
   * @param date The data in LocalDateTime format | 2025-04-07 10:49:04.000000
   * @returns The formated date | 	07 Apr 2025
   */
  const formatLastActiveAt = (date) => {
    if(!date) {
      return "";
    }
    const lastActiveDate = new Date(date);
    const daysAgo = Math.floor((Date.now() - lastActiveDate.getTime()) / (1000 * 60 * 60 * 24));
    return daysAgo === 0 ? "Today" : formatDistanceToNow(lastActiveDate, { addSuffix: true });
  }

  return (
    <div className="flex flex-col gap-8">


      <div className="user-management-head w-full min-h-[128px] bg-[#FFFFFF] rounded-2xl p-4 flex flex-col gap-4">

        <div className="w-full h-[40px] flex justify-between gap-2 font-roboto font-medium">
          <h1 className=" text-2xl text-[#394555] leading-[150%] tracking-[-0.01em] align-middle font-medium">Users</h1>
          <button onClick={handleAddUserModalOpen}
            className="h-[40px] cursor-pointer w-[117px] font-medium font-roboto text-base rounded-xl py-3 px-6 bg-[#0066FF] text-white flex items-center justify-center leading-[100%] text-center">New User</button>

        </div>

        <div className="w-full h-[40px] flex gap-2 p-0  items-center justify-between">

          <div className="flex items-center w-[257px] h-[32px] gap-2">
            {tabs.map((tab, index) =>
              <button key={index} onClick={() => handleActiveTabChange(tab)}
                className={`h-full cursor-pointer rounded-lg py-2 px-4 ${activeTab === tab ? "bg-[#394555] text-white " : "text-[#757D8A]"} flex items-center justify-center`}>{tab}</button>
            )}
          </div>

          <div className="flex justify-start items-center gap-2">

            <div className="w-[512px] h-[40px] rounded-xl border-[1px] border-[#DEE0E3] pl-4 flex gap-2">
              <input onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                className="flex-1 font-roboto font-normal text-base leading-[100%] tracking-[0%] text-[#9BA2AB]
               focus:outline-hidden              "
                type="text" name="searchValue" placeholder="Search users by name, email, date or user-type" />
              <button onClick={handleSearch}
                className="w-[6rem] h-[2.5rem] cursor-pointer py-3 px-6 bg-[#BDC1C7] rounded-xl flex justify-center items-center">Search</button>
            </div>


            <div className="h-[40px] w-[115px] flex items-center justify-center rounded-xl border-[1px] border-[#DEE0E3] px-4 py-2">

              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                disableRipple
                sx={{
                  height: 19,
                  color: "#9BA2AB",
                  textTransform: "none",
                  fontSize: "16px",
                  backgroundColor: "transparent",
                  ":hover": {
                    backgroundColor: "transparent"
                  },
                  cursor: "pointer",
                }}
              >
                <span className="min-w-[60px] cursor-pointer">Sort by</span> <img className="ml-2 cursor-pointer transition-all ease-in-out duration-200" src={open ? CaretUp : CaretDown} alt="Down Arrow" />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                sx={{
                  '& .MuiPaper-root': {
                    minWidth: 147,
                    borderRadius: '12px',
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
                <MenuItem disableRipple className="menu-item" onClick={() => toggleSection("lastActive")}>
                  <span className="min-w-[80px]">Last Active</span> <img src={expandedSection.lastActive ? CaretUp : CaretDown} alt="Down Arrow" />
                </MenuItem>

                <Collapse in={expandedSection.lastActive} timeout="auto" unmountOnExit >
                  <MenuItem
                    disableRipple
                    disabled={sortBy.sortByLastActiveAtLatest}
                    className="menu-item" onClick={() => handleSortBy("sortByLastActiveAtOldest")}>
                    <span className="flex items-center gap-2">
                      <input
                        checked={sortBy.sortByLastActiveAtOldest || false}
                        onChange={(e) => setSortBy({ ...sortBy, sortByLastActiveAtOldest: e.target.checked })}
                        disabled={sortBy.sortByLastActiveAtLatest}
                        className="checkbox-input" type="checkbox" name="sortByLastActiveAtOldest" /> Oldest First</span>
                  </MenuItem>
                  <MenuItem
                    disableRipple
                    disabled={sortBy.sortByLastActiveAtOldest}
                    className="menu-item" onClick={() => handleSortBy("sortByLastActiveAtLatest")}>
                    <span className="flex items-center gap-2">
                      <input
                        checked={sortBy.sortByLastActiveAtLatest || false}
                        onChange={(e) => setSortBy({ ...sortBy, sortByLastActiveAtLatest: e.target.checked })}
                        disabled={sortBy.sortByLastActiveAtOldest}
                        className="checkbox-input" type="checkbox" name="sortByLastActiveAtLatest" /> Latest First</span>
                  </MenuItem>
                </Collapse>
                <MenuItem disableRipple className="menu-item" onClick={() => toggleSection("dateCreated")}>
                  <span className="min-w-[80px]">Date Created</span> <img src={expandedSection.dateCreated ? CaretUp : CaretDown} alt="Down Arrow" />
                </MenuItem>

                <Collapse in={expandedSection.dateCreated} timeout="auto" unmountOnExit
                >
                  <MenuItem
                    disableRipple
                    disabled={sortBy.sortByCreatedAtLatest}
                    className="menu-item" onClick={() => handleSortBy("sortByCreatedAtOldest")}>
                    <span className="flex items-center gap-2">
                      <input
                        checked={sortBy.sortByCreatedAtOldest || false}
                        onChange={(e) => setSortBy({ ...sortBy, sortByCreatedAtOldest: e.target.checked })}
                        disabled={sortBy.sortByCreatedAtLatest}
                        className="checkbox-input" type="checkbox" name="sortByCreatedAtOldest" /> Oldest First</span>
                  </MenuItem>
                  <MenuItem
                    disableRipple
                    disabled={sortBy.sortByCreatedAtOldest}
                    className="menu-item" onClick={() => handleSortBy("sortByCreatedAtLatest")}>
                    <span className="flex items-center gap-2">
                      <input
                        checked={sortBy.sortByCreatedAtLatest || false}
                        onChange={(e) => setSortBy({ ...sortBy, sortByCreatedAtLatest: e.target.checked })}
                        disabled={sortBy.sortByCreatedAtOldest}
                        className="checkbox-input" type="checkbox" name="sortByCreatedAtLatest" /> Latest First</span>
                  </MenuItem>
                </Collapse>
              </Menu>
            </div>

          </div>

        </div>
      </div>

      <div className=" w-full flex flex-col gap-6 p-4 rounded-2xl bg-[#FFFFFF] user-table-wrapper">
        {selectedRows.length > 0 && (
          <div className="flex justify-between items-center  px-4 py-2 bg-blue-50 rounded-md border border-blue-300">
            <span className="text-sm text-blue-700">
              {selectedRows.length} user{selectedRows.length > 1 ? "s" : ""} selected
            </span>
            <button
              className="text-sm px-3 py-1 bg-white border border-blue-600 text-blue-600 rounded hover:bg-blue-100 cursor-pointer"
              onClick={() => setSelectedRows([])}
            >
              Deselect All
            </button>
          </div>
        )}

        {/* className="custom-scrollbar" */}
        <TableContainer
          ref={tableRef}
          sx={{
            boxShadow: "none",
            maxHeight: "630px",
            overflowY: "auto",
          }}
          component={Paper}>

          <Table
            sx={{
              minHeight: "auto",
              "& .MuiTableCell-root": {
                borderBottom: "none",
              }
            }}
            aria-label="simple table"
          >
            <TableHead sx={{
              backgroundColor: "#FAFAFA",
              paddingY: "12px",
              paddingX: "24px",
              zIndex: 51,
              position: "sticky",
              top: 0,
            }}>
              <TableRow sx={{ borderBottom: "none" }}>
                <TableCell sx={{
                  color: "#394555",
                  borderTopLeftRadius: "8px",
                  borderBottomLeftRadius: "8px",
                }} align="center">Name</TableCell>
                <TableCell sx={{
                  color: "#394555"
                }} align="left">Email</TableCell>
                <TableCell sx={{
                  color: "#394555"
                }}
                  align="left">Created On</TableCell>
             {tabRef.current === TABS.ADMINS &&  <TableCell sx={{
                  color: "#394555"
                }}
                  align="left">Last Active On</TableCell>}
             {tabRef.current === TABS.USERS &&  <TableCell sx={{
                  color: "#394555"
                }}
                  align="left">Certificates Received</TableCell>}
             {tabRef.current === TABS.LOCKED &&  <TableCell sx={{
                  color: "#394555"
                }}
                  align="left">Locked On</TableCell>}
             {tabRef.current === TABS.LOCKED &&  <TableCell sx={{
                  color: "#394555"
                }}
                  align="left">Role</TableCell>}
                <TableCell sx={{
                  color: "#394555",
                  borderTopRightRadius: "8px",
                  borderBottomRightRadius: "8px",
                }}
                  align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            {
              rows?.length >= 1
                ?
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        paddingY: "12px",
                        paddingX: "24px",
                        borderBottom: selectedRows.includes(row.id) ? "0.6px solid transparent" :
                          (index === row.length - 1 ? "none" : "0.6px solid #DEE0E3"),
                        color: "#394555",
                        fontSize: "14px",
                        backgroundColor: selectedRows.includes(row.id) ? "#0066FF1A" : "",
                        '&:last-child td, &:last-child th': { borderBottom: 0 },
                      }}
                    >
                      <TableCell
                        sx={{
                          borderTopLeftRadius: "8px",
                          borderBottomLeftRadius: "8px"
                        }}
                        component="th" scope="row">
                        <div className="flex items-center gap-4">
                          <input onChange={() => handleRowSelection(row.id)}
                            checked={selectedRows.includes(row.id)}
                            className="!w-[24px] !h-[24px] checkbox-input2  !rounded-md !border-[1.5px] !border-[#5A6472] checked:border-none"
                            type="checkbox" name="" id="" />
                          <div className="flex gap-1 items-center">
                            <img src={Avatar} className="h-5 w-5 bg-gray-300 rounded-full" alt="" />
                            <span>{row.firstName} {row.lastName}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{format(new Date(row.createdAt), "dd MMM yyyy")}</TableCell>
                     {tabRef.current === TABS.ADMINS && <TableCell align="left">{formatLastActiveAt(row.lastActiveAt)}</TableCell>}
                     {tabRef.current === TABS.USERS && <TableCell align="center">{row.totalCertificates}</TableCell>}
                     {tabRef.current === TABS.LOCKED && <TableCell align="left">{formatLastActiveAt(row.updatedAt)}</TableCell>}
                     {tabRef.current === TABS.LOCKED && <TableCell align="left">{row.role}</TableCell>}
                      <TableCell align="center"
                        sx={{
                          borderTopRightRadius: "8px",
                          borderBottomRightRadius: "8px"
                        }}
                      >
                        <div onClick={(event) => toggleMenu(event, row.id)}
                          className="h-6 w-6 rounded-full bg-[#FAFAFA] cursor-pointer relative">
                          <MoreVertIcon />

                          {/* Menu Content */}
                          {actionMenuOpen === row.id && (
                            <div ref={menuRef}
                              className={`custom-menu absolute ${showTop ? "right-8 -top-10" : "right-0 top-10"} w-[140px] bg-white rounded-xl py-1 border border-gray-300 z-50`}
                              role="menu"
                            >
                              <ul className="flex flex-col text-sm text-start text-gray-700">
                                {selectedRows.length === 0 && tabRef.current !== TABS.LOCKED && <li
                                  className="px-4 py-2 cursor-pointer hover:bg-gray-50 rounded-md"
                                  role="menuitem"
                                  onClick={() => handleEditProfile(row.id)}
                                >
                                  Edit User Details
                                </li>}
                                {tabRef.current !== TABS.LOCKED && <li
                                  className="px-4 py-2 cursor-pointer hover:bg-gray-50 rounded-md"
                                  role="menuitem"
                                  onClick={() => handleLockUser(row.id)}
                                >
                                  Lock {selectedRows.length <= 1 ? "User" : "Users"}
                                </li>}
                                {tabRef.current === TABS.USERS && <li
                                  className="px-4 py-2 cursor-pointer hover:bg-gray-50 rounded-md"
                                  role="menuitem"
                                  onClick={() => handleRemoveUser(row.id)}
                                >
                                  Remove {selectedRows.length <= 1 ? "User" : "Users"}
                                </li>}
                                {tabRef.current === TABS.LOCKED && <li
                                  className="px-4 py-2 cursor-pointer hover:bg-gray-50 rounded-md"
                                  role="menuitem"
                                  onClick={() => handleUnlockUser(row.id)}
                                >
                                  Unlock {selectedRows.length <= 1 ? "User" : "Users"}
                                </li>}
                              </ul>
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                :

                <TableRow>
                  <TableCell colSpan={5} align="center">
                     <Loader />
                  </TableCell>
                </TableRow>

            }
          </Table>

        </TableContainer>

      </div>

      <AddUserModal setActiveTab={setActiveTab}
        open={openAddUserModal} setOpenModal={setOpenAddUserModal} />

      <RemoveUserModal open={openRemoveUserModal} setOpenModal={setOpenRemoveUserModal} />

      <LockUserModal open={openLockUserModal} setOpenModal={setOpenLockUserModal} />
      
    </div>
  )
}

export default UserManagement