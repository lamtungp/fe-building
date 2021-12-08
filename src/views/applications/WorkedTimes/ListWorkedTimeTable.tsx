import { FC, ChangeEvent, useState, useEffect } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
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
  Typography,
  useTheme,
  CardHeader,
} from '@mui/material';

import Label from 'src/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from 'src/components/BulkActions/BulkActions';
import { useDispatch } from 'react-redux';
import { deleteItem } from 'src/common/redux/table/Actions';
import UsedSvServices from 'src/common/redux/used_service/services';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';
import { ServiceEnums } from 'src/common/enums';
import WorkedTimeServices from 'src/common/redux/worked_time/services';

interface ListWorkedTimeTableProps {
  className?: string;
  worked_times: any[];
}

interface Filters {
  status?: any;
}

const applyFilters = (
  worked_times: any[],
  filters: Filters
): any[] => {
  return worked_times.filter((serviceStatus) => {
    let matches = true;

    if (filters.status && serviceStatus.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  worked_times: any[],
  page: number,
  limit: number
): any[] => {
  return worked_times.slice(page * limit, page * limit + limit);
};

const ListWorkedTimeTable: FC<ListWorkedTimeTableProps> = ({ worked_times }) => {
  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const [selectedWorkedTimes, setSelectedWorkedTimes] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedWorkedTimes.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const handleSelectAllWorkedTimes = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedWorkedTimes(
      event.target.checked
        ? worked_times.map((w) => w.id)
        : []
    );
  };

  const handleSelectOneWorkedTime = (
    event: ChangeEvent<HTMLInputElement>,
    workedTimesId: string
  ): void => {
    if (!selectedWorkedTimes.includes(workedTimesId)) {
      setSelectedWorkedTimes((prevSelected) => [
        ...prevSelected,
        workedTimesId
      ]);
    } else {
      setSelectedWorkedTimes((prevSelected) =>
        prevSelected.filter((id) => id !== workedTimesId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredWorkedTimes = applyFilters(worked_times, filters);
  const paginatedWorkedTimes = applyPagination(
    filteredWorkedTimes,
    page,
    limit
  );
  const selectedSomeWorkedTimes =
    selectedWorkedTimes.length > 0 &&
    selectedWorkedTimes.length < worked_times.length;
  const selectedAllWorkedTimes =
    selectedWorkedTimes.length === worked_times.length;
  const theme = useTheme();

  const handleDeleteWorkedTime = async (id: string) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be delete this Worked Time!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#28a745',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await WorkedTimeServices.destroy(id);
        if (res) {
          MySwal.fire(
            'Deleted!',
            'Worked Time has been deleted.',
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
        <CardHeader title="Services" />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllWorkedTimes}
                  indeterminate={selectedSomeWorkedTimes}
                  onChange={handleSelectAllWorkedTimes}
                />
              </TableCell>
              <TableCell>Name Staff</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Worked Days</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedWorkedTimes.map((worked_time) => {
              const isWorkedTimeSelected = selectedWorkedTimes.includes(
                worked_time.id
              );
              return (
                <TableRow
                  hover
                  key={worked_time.id}
                  selected={isWorkedTimeSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isWorkedTimeSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneWorkedTime(event, worked_time.id)
                      }
                      value={isWorkedTimeSelected}
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
                      {worked_time.staff.name}
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
                      {`${worked_time.salary.position} ${worked_time.salary.salary_grade}`}
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
                      {worked_time.worked_days}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      days
                    </Typography>
                  </TableCell>
                  
                  <TableCell align="right">
                    <Tooltip title="Details" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => navigate(`/statistics/edit-worked-time/${worked_time.id}`)}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" arrow>
                        <IconButton
                          sx={{
                            '&:hover': { background: theme.colors.error.lighter },
                            color: theme.palette.error.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => handleDeleteWorkedTime(worked_time.id)}
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
          count={filteredWorkedTimes.length}
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

ListWorkedTimeTable.propTypes = {
  worked_times: PropTypes.array.isRequired
};

ListWorkedTimeTable.defaultProps = {
  worked_times: []
};

export default ListWorkedTimeTable;
