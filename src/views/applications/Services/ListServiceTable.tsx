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
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from 'src/components/BulkActions/BulkActions';
import { useDispatch } from 'react-redux';
import { deleteItem } from 'src/common/redux/table/Actions';
import SvServices from 'src/common/redux/service/services';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';
import { ServiceEnums } from 'src/common/enums';
import { numberToString } from 'src/common/utils/transformPrice';

interface ListServiceTableProps {
  className?: string;
  services: any[];
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
  services: any[],
  page: number,
  limit: number
): any[] => {
  return services.slice(page * limit, page * limit + limit);
};

const ListServiceTable: FC<ListServiceTableProps> = ({ services }) => {
  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const [selectedServices, setSelectedServices] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedServices.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const handleSelectAllServices = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedServices(
      event.target.checked
        ? services.map((employee) => employee.id)
        : []
    );
  };

  const handleSelectOneService = (
    event: ChangeEvent<HTMLInputElement>,
    servicesId: string
  ): void => {
    if (!selectedServices.includes(servicesId)) {
      setSelectedServices((prevSelected) => [
        ...prevSelected,
        servicesId
      ]);
    } else {
      setSelectedServices((prevSelected) =>
        prevSelected.filter((id) => id !== servicesId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredServices = applyFilters(services, filters);
  const paginatedServices = applyPagination(
    filteredServices,
    page,
    limit
  );
  const selectedSomeServices =
    selectedServices.length > 0 &&
    selectedServices.length < services.length;
  const selectedAllServices =
    selectedServices.length === services.length;
  const theme = useTheme();

  const handleDeleteService = async (id: string) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be delete this service!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#28a745',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await SvServices.destroy(id);
        if (res) {
          MySwal.fire(
            'Deleted!',
            'Service has been deleted.',
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
                  checked={selectedAllServices}
                  indeterminate={selectedSomeServices}
                  onChange={handleSelectAllServices}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedServices.map((service) => {
              const isServiceSelected = selectedServices.includes(
                service.id
              );
              return (
                <TableRow
                  hover
                  key={service.id}
                  selected={isServiceSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isServiceSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneService(event, service.id)
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
                      {service.name}
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
                      {service.type}
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
                      {numberToString(service.unit_price)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      VND
                    </Typography>
                  </TableCell>
                  
                  <TableCell align="right">
                    <Tooltip title="Edit Service" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => navigate(`/management/edit-service/${service.id}`)}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    { service.name === ServiceEnums.SECURITY || service.name === ServiceEnums.CLEANING ? <></> 
                      : <Tooltip title="Delete Service" arrow>
                        <IconButton
                          sx={{
                            '&:hover': { background: theme.colors.error.lighter },
                            color: theme.palette.error.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => handleDeleteService(service.id)}
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>  
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
          count={filteredServices.length}
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

ListServiceTable.propTypes = {
  services: PropTypes.array.isRequired
};

ListServiceTable.defaultProps = {
  services: []
};

export default ListServiceTable;
