import { FC, ChangeEvent, useState } from 'react';
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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
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
import { numberToString } from 'src/common/utils/transformPrice';

interface ListFloorTableProps {
  className?: string;
  floors: any[];
}

interface Filters {
  status?: any;
}

const applyFilters = (
  services: any[],
  filters: Filters
): any[] => {
  return services.filter((serviceStatus) => {
    let matches = true;

    if (filters.status && serviceStatus.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  floors: any[],
  page: number,
  limit: number
): any[] => {
  return floors.slice(page * limit, page * limit + limit);
};

const getStatusLabel = (floorStatus: any): JSX.Element => {
  const map = {
    available: {
      text: 'Available',
      color: 'success'
    },
    unavailable: {
      text: 'Unavailable',
      color: 'error'
    }
  };

  const { text, color }: any = map[floorStatus];

  return <Label color={color}>{text}</Label>;
};

const ListFloorTable: FC<ListFloorTableProps> = ({ floors }) => {
  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const [selectedFloors, setSelectedFloors] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedFloors.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'available',
      name: 'Available'
    },
    {
      id: 'unavailable',
      name: 'Unavailable'
    },
  ];

  const handleSelectAllFloors = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedFloors(
      event.target.checked
        ? floors.map((employee) => employee.id)
        : []
    );
  };

  const handleSelectOneFloor = (
    event: ChangeEvent<HTMLInputElement>,
    floorId: string
  ): void => {
    if (!selectedFloors.includes(floorId)) {
      setSelectedFloors((prevSelected) => [
        ...prevSelected,
        floorId
      ]);
    } else {
      setSelectedFloors((prevSelected) =>
        prevSelected.filter((id) => id !== floorId)
      );
    }
  };

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

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredFloors = applyFilters(floors, filters);
  const paginatedFloors = applyPagination(
    filteredFloors,
    page,
    limit
  );
  const selectedSomeFloors =
    selectedFloors.length > 0 &&
    selectedFloors.length < floors.length;
  const selectedAllFloors =
    selectedFloors.length === floors.length;
  const theme = useTheme();

  const handleDeleteFloor = async (id: string) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be delete this Floor!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#28a745',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await UsedSvServices.destroy(id);
        if (res) {
          MySwal.fire(
            'Deleted!',
            'Floor has been deleted.',
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
          title="List Floor" 
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
                  checked={selectedAllFloors}
                  indeterminate={selectedSomeFloors}
                  onChange={handleSelectAllFloors}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Floor Area</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedFloors.map((floor) => {
              const isFloorSelected = selectedFloors.includes(
                floor.id
              );
              return (
                <TableRow
                  hover
                  key={floor.id}
                  selected={isFloorSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isFloorSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneFloor(event, floor.id)
                      }
                      value={isFloorSelected}
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
                      {floor.name}
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
                      {numberToString(floor.floor_area)}
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
                      {numberToString(floor.unit_price)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      VND
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    {getStatusLabel(floor.status)}
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
                        onClick={() => navigate(`/management/edit-floor/${floor.id}`)}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    {( floor.name === ServiceEnums.SECURITY || floor.name === ServiceEnums.SECURITY ) ?
                      <Tooltip title="Delete" arrow>
                          <IconButton
                            sx={{
                              '&:hover': { background: theme.colors.error.lighter },
                              color: theme.palette.error.main
                            }}
                            color="inherit"
                            size="small"
                            onClick={() => handleDeleteFloor(floor.id)}
                          >
                            <DeleteTwoToneIcon fontSize="small" />
                          </IconButton>
                      </Tooltip>: <></> 
                    }
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
          count={filteredFloors.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

ListFloorTable.propTypes = {
  floors: PropTypes.array.isRequired
};

ListFloorTable.defaultProps = {
  floors: []
};

export default ListFloorTable;
