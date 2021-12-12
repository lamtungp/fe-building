import { FC, ChangeEvent, useState } from 'react';
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
  CardHeader
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from 'src/components/BulkActions/BulkActions';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StaffServices from 'src/common/redux/staff/services';
import { deleteItem } from 'src/common/redux/table/Actions';
interface StaffsTableProps {
  className?: string;
  staffs: any[];
}

interface Filters {
  status?: any;
}

const applyFilters = (
  staffs: any[],
  filters: Filters
): any[] => {
  return staffs.filter((staff) => {
    let matches = true;

    if (filters.status && staff.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  staffs: any[],
  page: number,
  limit: number
): any[] => {
  return staffs.slice(page * limit, page * limit + limit);
};

const ListStaffTable: FC<StaffsTableProps> = ({ staffs }) => {
  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [selectedStaffs, setSelectedStaffs] = useState<string[]>(
    []
  );
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [filters, setFilters ] = useState({ status: null });
  const selectedBulkActions = selectedStaffs.length > 0;

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllStaffs = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedStaffs(
      event.target.checked
        ? staffs.map((staff) => staff.id)
        : []
    );
  };

  const handleSelectOneStaff = (
    event: ChangeEvent<HTMLInputElement>,
    staffId: string
  ): void => {
    if (!selectedStaffs.includes(staffId)) {
      setSelectedStaffs((prevSelected) => [
        ...prevSelected,
        staffId
      ]);
    } else {
      setSelectedStaffs((prevSelected) =>
        prevSelected.filter((id) => id !== staffId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredStaffs = applyFilters(staffs, filters);
  const paginatedStaffs = applyPagination(
    filteredStaffs,
    page,
    limit
  );
  const selectedSomeStaffs =
    selectedStaffs.length > 0 &&
    selectedStaffs.length < staffs.length;
  const selectedAllStaffs =
    selectedStaffs.length === staffs.length;
  const theme = useTheme();

  const handleDeleteStaff = async (id: string) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be delete this Staff!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#28a745',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await StaffServices.destroy(id);
        if (res) {
          MySwal.fire(
            'Deleted!',
            'Staff has been deleted.',
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
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="List Staff"
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
                  checked={selectedAllStaffs}
                  indeterminate={selectedSomeStaffs}
                  onChange={handleSelectAllStaffs}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Day of Birth</TableCell>
              <TableCell align="right">Position</TableCell>
              <TableCell align="right">Location Working</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedStaffs.map((staff) => {
              const isStaffSelected = selectedStaffs.includes(
                staff.id
              );
              return (
                <TableRow
                  hover
                  key={staff.id}
                  selected={isStaffSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isStaffSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneStaff(event, staff.id)
                      }
                      value={isStaffSelected}
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
                      {staff.name}
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
                      {staff.address}
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
                      {staff.phone_number}
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
                      {format(new Date(staff.dob), 'dd-MM-yyyy')}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {`${staff.position.position} ${staff.position.salary_grade}`}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {staff.location.name}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Tooltip title="Edit Staff" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => navigate(`/management/edit-staff/${staff.id}`)}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Staff" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleDeleteStaff(staff.id)}
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
          count={filteredStaffs.length}
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

ListStaffTable.propTypes = {
  staffs: PropTypes.array.isRequired
};

ListStaffTable.defaultProps = {
  staffs: []
};

export default ListStaffTable;
