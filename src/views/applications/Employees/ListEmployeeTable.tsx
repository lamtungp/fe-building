import { FC, ChangeEvent, useState, useEffect } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  OutlinedInput
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from 'src/components/BulkActions/BulkActions';
import { useDispatch } from 'react-redux';
import { deleteItem, selectCompany } from 'src/common/redux/table/Actions';
import EmployeeServices from 'src/common/redux/employee/services';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import CompanyServices from 'src/common/redux/company/services';
import { useNavigate } from 'react-router-dom';
interface ListEmployeeTableProps {
  className?: string;
  employees: any[];
}

interface Filters {
  status?: any;
}

const applyFilters = (
  employees: any[],
  filters: Filters
): any[] => {
  return employees.filter((employeeStatus) => {
    let matches = true;

    if (filters.status && employeeStatus.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  employees: any[],
  page: number,
  limit: number
): any[] => {
  return employees.slice(page * limit, page * limit + limit);
};

const ListEmployeeTable: FC<ListEmployeeTableProps> = ({ employees }) => {
  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const [listCompany, setListCompany] = useState([])
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedEmployees.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const filters = { status: null };

  const handleSelectAllEmployees = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedEmployees(
      event.target.checked
        ? employees.map((employee) => employee.id)
        : []
    );
  };

  const handleSelectOneEmployee = (
    event: ChangeEvent<HTMLInputElement>,
    employeesId: string
  ): void => {
    if (!selectedEmployees.includes(employeesId)) {
      setSelectedEmployees((prevSelected) => [
        ...prevSelected,
        employeesId
      ]);
    } else {
      setSelectedEmployees((prevSelected) =>
        prevSelected.filter((id) => id !== employeesId)
      );
    }
  };


  const getListCompany = async (): Promise<any> => {
    const data = await CompanyServices.index();
    setListCompany(data);
    if (data.length > 0) {
      setSelectedCompany(data[0].id)
      dispatch(selectCompany(data[0].id))
    }
  }

  useEffect(() => {
    getListCompany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handleSelectedCompany = (e: ChangeEvent<HTMLInputElement>): void => {
    setSelectedCompany(e.target.value)
    dispatch(selectCompany(e.target.value))
  }

  const filteredEmployees = applyFilters(employees, filters);
  const paginatedEmployees = applyPagination(
    filteredEmployees,
    page,
    limit
  );
  const selectedSomeEmployees =
    selectedEmployees.length > 0 &&
    selectedEmployees.length < employees.length;
  const selectedAllEmployees =
    selectedEmployees.length === employees.length;
  const theme = useTheme();

  const handleDeleteEmployee = async (id: string) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be delete this employee!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#28a745',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await EmployeeServices.destroy(id);
        if (res) {
          MySwal.fire(
            'Deleted!',
            'Employee has been deleted.',
            'success'
          )
          dispatch(deleteItem(true))
        }
      }
    })
  }

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth sx={{ marginTop: 1 }}>
                <InputLabel>Select Company</InputLabel>
                <Select
                  value={selectedCompany}
                  onChange={handleSelectedCompany}
                  input={<OutlinedInput label="Select Company" />}
                >
                  {listCompany.map((company) => (
                    <MenuItem
                      key={company.id}
                      value={company.id}
                    >
                      {company.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="List Employee"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllEmployees}
                  indeterminate={selectedSomeEmployees}
                  onChange={handleSelectAllEmployees}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Day of Birth</TableCell>
              <TableCell>Card ID</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedEmployees.map((employee) => {
              const isEmployeeSelected = selectedEmployees.includes(
                employee.id
              );
              return (
                <TableRow
                  hover
                  key={employee.id}
                  selected={isEmployeeSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isEmployeeSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneEmployee(event, employee.id)
                      }
                      value={isEmployeeSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {employee.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {format(new Date(employee.dob), 'dd-MM-yyyy')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {employee.card_id}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {employee.phone_number}
                    </Typography>
                  </TableCell>
                  
                  <TableCell align="right">
                    <Tooltip title="Edit Employee" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => navigate(`/management/edit-employee/${employee.id}`)}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Employee" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleDeleteEmployee(employee.id)}
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredEmployees.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[10, 15, 20]}
        />
      </Box>
    </Card>
  );
};

ListEmployeeTable.propTypes = {
  employees: PropTypes.array.isRequired
};

ListEmployeeTable.defaultProps = {
  employees: []
};

export default ListEmployeeTable;
