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

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from 'src/components/BulkActions/BulkActions';
import { useDispatch } from 'react-redux';
import { deleteItem } from 'src/common/redux/table/Actions';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';
import { ServiceEnums } from 'src/common/enums';
import SalaryServices from 'src/common/redux/salary/services';
import { numberToString } from 'src/common/utils/transformPrice';

interface ListPositionTableProps {
  className?: string;
  positions: any[];
}

interface Filters {
  status?: any;
}

const applyFilters = (
  positions: any[],
  filters: Filters
): any[] => {
  return positions.filter((positionStatus) => {
    let matches = true;

    if (filters.status && positionStatus.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  positions: any[],
  page: number,
  limit: number
): any[] => {
  return positions.slice(page * limit, page * limit + limit);
};

const ListPositionTable: FC<ListPositionTableProps> = ({ positions }) => {
  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const [selectedPositions, setSelectedPositions] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedPositions.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const handleSelectAllPositions = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedPositions(
      event.target.checked
        ? positions.map((position) => position.id)
        : []
    );
  };

  const handleSelectOnePosition = (
    event: ChangeEvent<HTMLInputElement>,
    positionsId: string
  ): void => {
    if (!selectedPositions.includes(positionsId)) {
      setSelectedPositions((prevSelected) => [
        ...prevSelected,
        positionsId
      ]);
    } else {
      setSelectedPositions((prevSelected) =>
        prevSelected.filter((id) => id !== positionsId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredPositions = applyFilters(positions, filters);
  const paginatedPositions = applyPagination(
    filteredPositions,
    page,
    limit
  );
  const selectedSomePositions =
    selectedPositions.length > 0 &&
    selectedPositions.length < positions.length;
  const selectedAllPositions =
    selectedPositions.length === positions.length;
  const theme = useTheme();

  const handleDeletePosition = async (id: string) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be delete this Position!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#28a745',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await SalaryServices.destroy(id);
        if (res) {
          MySwal.fire(
            'Deleted!',
            'Position has been deleted.',
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
                  checked={selectedAllPositions}
                  indeterminate={selectedSomePositions}
                  onChange={handleSelectAllPositions}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Salary grade</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPositions.map((position) => {
              const isPositionSelected = selectedPositions.includes(
                position.id
              );
              return (
                <TableRow
                  hover
                  key={position.id}
                  selected={isPositionSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isPositionSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOnePosition(event, position.id)
                      }
                      value={isPositionSelected}
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
                      {position.position}
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
                      {position.salary_grade}
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
                      {numberToString(position.salary)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      VND
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
                        onClick={() => navigate(`/management/edit-position/${position.id}`)}
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
                          onClick={() => handleDeletePosition(position.id)}
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
          count={filteredPositions.length}
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

ListPositionTable.propTypes = {
  positions: PropTypes.array.isRequired
};

ListPositionTable.defaultProps = {
  positions: []
};

export default ListPositionTable;
