import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';


const columnFields = [
    { value: 'id', label: 'Id' },
    { value: 'name', label: 'Name', enableSearch: true },
    { value: 'email', label: 'Email', enableSearch: true },
    { value: 'username', label: 'Username' },
    { value: 'phone', label: 'Phone' },
    { value: 'website', label: 'Website' },
  ];
  
  // Custom hook for managing user data
  const useUserData = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const [sortColumn, setSortColumn] = useState(columnFields[0].value);
    const [sortDirection, setSortDirection] = useState('asc');
  
    // Effect to fetch user data from the API when the component mounts
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const { data } = await axios.get('/api/v1/users');
          setUsers(data);
          setFilteredUsers(data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
  
      fetchUsers();
    }, []);
  
    // Effect to filter and sort users based on search inputs and sort settings
    useEffect(() => {
      let newFilteredUsers = users.filter(
        user =>
          user.name.toLowerCase().includes(searchName.toLowerCase()) &&
          user.email.toLowerCase().includes(searchEmail.toLowerCase())
      );
  
      if (sortColumn) {
        newFilteredUsers.sort((a, b) => {
          const x = a[sortColumn];
          const y = b[sortColumn];
          if (x < y) return sortDirection === 'asc' ? -1 : 1;
          if (x > y) return sortDirection === 'asc' ? 1 : -1;
          return 0;
        });
      }
  
      setFilteredUsers(newFilteredUsers);
    }, [searchName, searchEmail, users, sortColumn, sortDirection]);
  
    // Callback to handle search input changes
    const handleOnSearch = useCallback((event) => {
      const { name, value } = event.target;
      if (name === 'name') {
        setSearchName(value);
      } else if (name === 'email') {
        setSearchEmail(value);
      } else {
        throw new Error('Unknown search element');
      }
    }, []);
  
    // Callback to handle sorting column changes
    const handleSort = useCallback((column) => {
      if (sortColumn === column) {
        setSortDirection(prevDirection => prevDirection === 'asc' ? 'desc' : 'asc');
      } else {
        setSortColumn(column);
        setSortDirection('asc');
      }
    }, [sortColumn]);
  
    return {
      users: filteredUsers,
      handleOnSearch,
      handleSort,
      sortColumn,
      sortDirection,
      columnFields
    };
  };
  export default useUserData;