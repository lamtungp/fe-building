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
import UsedAreaServices from 'src/common/redux/used_area/services';

interface ListUsedAreaTableProps {
  className?: string;
  usedAreas: any[];
}

interface Filters {
  status?: any;
}

const applyFilters = (
  usedAreas: any[],
  filters: Filters
): any[] => {
  return usedAreas.filter((usedAreaStatus) => {
    let matches = true;

    if (filters.status && usedAreaStatus.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  usedAreas: any[],
  page: number,
  limit: number
): any[] => {
  return usedAreas.slice(page * limit, page * limit + limit);
};

const ListUsedAreaTable: FC<ListUsedAreaTableProps> = ({ usedAreas }) => {
  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const [selectedUsedAreas, setSelectedUsedAreas] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedUsedAreas.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const handleSelectAllUsedAreas = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedUsedAreas(
      event.target.checked
        ? usedAreas.map((usedArea) => usedArea.id)
        : []
    );
  };

  const handleSelectOneUsedArea = (
    event: ChangeEvent<HTMLInputElement>,
    usedAreasId: string
  ): void => {
    if (!selectedUsedAreas.includes(usedAreasId)) {
      setSelectedUsedAreas((prevSelected) => [
        ...prevSelected,
        usedAreasId
      ]);
    } else {
      setSelectedUsedAreas((prevSelected) =>
        prevSelected.filter((id) => id !== usedAreasId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredUsedAreas = applyFilters(usedAreas, filters);
  const paginatedUsedAreas = applyPagination(
    filteredUsedAreas,
    page,
    limit
  );
  const selectedSomeUsedAreas =
    selectedUsedAreas.length > 0 &&
    selectedUsedAreas.length < usedAreas.length;
  const selectedAllUsedAreas =
    selectedUsedAreas.length === usedAreas.length;
  const theme = useTheme();

  const handleDeleteUsedArea = async (id: string) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be delete this used area!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#28a745',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await UsedAreaServices.destroy(id);
        if (res) {
          MySwal.fire(
            'Deleted!',
            'Used area has been deleted.',
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
                  checked={selectedAllUsedAreas}
                  indeterminate={selectedSomeUsedAreas}
                  onChange={handleSelectAllUsedAreas}
                />
              </TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Used Area</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Rental Term</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsedAreas.map((used_area) => {
              const isServiceSelected = selectedUsedAreas.includes(
                used_area.id
              );
              return (
                <TableRow
                  hover
                  key={used_area.id}
                  selected={isServiceSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isServiceSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneUsedArea(event, used_area.id)
                      }
                      value={isServiceSelected}
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
                      {used_area.company.name}
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
                      {used_area.floor.name}
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
                      {used_area.used_area}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      m<sup>2</sup>
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
                      {used_area.floor.unit_price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      VND
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
                      {used_area.rental_term}
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
                        onClick={() => navigate(`/statistics/edit-used-area/${used_area.id}`)}
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
                          onClick={() => handleDeleteUsedArea(used_area.id)}
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
          count={filteredUsedAreas.length}
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

ListUsedAreaTable.propTypes = {
  usedAreas: PropTypes.array.isRequired
};

ListUsedAreaTable.defaultProps = {
  usedAreas: []
};

export default ListUsedAreaTable;
