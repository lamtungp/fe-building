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
  OutlinedInput,
  Select,
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from 'src/components/BulkActions/BulkActions';
import { useDispatch } from 'react-redux';
import { deleteItem, selectCompany, selectTime } from 'src/common/redux/table/Actions';
import UsedSvServices from 'src/common/redux/used_service/services';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';
import { ServiceEnums } from 'src/common/enums';
import { numberToString } from 'src/common/utils/transformPrice';
import CompanyServices from 'src/common/redux/company/services';
import React from 'react';
import { times } from 'src/common/constants/Times';
import { format } from 'date-fns';

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

const ListUsedServiceTable: FC<ListServiceTableProps> = ({ services }) => {
  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const [listCompany, setListCompany] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedServices.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });
  const [selectedTime, setSelectedTime] = useState<string>(format(new Date(), 'MM/yyyy'));


  const handleSelectAllUsedServices = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedServices(
      event.target.checked
        ? services.map((employee) => employee.id)
        : []
    );
  };

  const handleSelectOneUsedService = (
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
  
  const getListCompany = async (): Promise<any> => {
    const data = await CompanyServices.index();
    setListCompany(data)
    if (data.length > 0) {
      setSelectedCompany(data[0].id)
      dispatch(selectCompany(data[0].id))
    }
  }

  React.useEffect(() => {
    getListCompany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

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

  const handleSelectedCompany = (e: ChangeEvent<HTMLInputElement>): void => {
    setSelectedCompany(e.target.value)
    dispatch(selectCompany(e.target.value))
  }

  const handleSelectedTime = (e: ChangeEvent<HTMLInputElement>): void => {
    setSelectedTime(e.target.value)
    dispatch(selectTime(e.target.value))
  }

  const handleDeleteUsedService = async (id: string) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be delete this used service!",
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
            'Used Service has been deleted.',
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
            <Box width={300} display={'flex'}>
              <FormControl fullWidth sx={{ marginTop: 1, marginRight: 1 }}>
                <InputLabel>Select Time</InputLabel>
                <Select
                  value={selectedTime}
                  onChange={handleSelectedTime}
                  input={<OutlinedInput label="Select Time" />}
                >
                  {times.map((time, index) => (
                    <MenuItem
                      key={index}
                      value={time}
                    >
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
          title="Services" 
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
                  checked={selectedAllServices}
                  indeterminate={selectedSomeServices}
                  onChange={handleSelectAllUsedServices}
                />
              </TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedServices.map((used_service) => {
              const isServiceSelected = selectedServices.includes(
                used_service.id
              );
              return (
                <TableRow
                  hover
                  key={used_service.id}
                  selected={isServiceSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isServiceSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneUsedService(event, used_service.id)
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
                      {used_service.company.name}
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
                      {used_service.service.name}
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
                      {numberToString(used_service.service.unit_price)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      VND
                    </Typography>
                  </TableCell>
                  
                  <TableCell align="right">
                    
                      <>
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
                            onClick={() => navigate(`/statistics/edit-used-service/${used_service.id}`)}
                          >
                            <EditTwoToneIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </> 
                    { (used_service.name === ServiceEnums.SECURITY || used_service.name === ServiceEnums.SECURITY) ?
                      <Tooltip title="Delete" arrow>
                          <IconButton
                            sx={{
                              '&:hover': { background: theme.colors.error.lighter },
                              color: theme.palette.error.main
                            }}
                            color="inherit"
                            size="small"
                            onClick={() => handleDeleteUsedService(used_service.id)}
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

ListUsedServiceTable.propTypes = {
  services: PropTypes.array.isRequired
};

ListUsedServiceTable.defaultProps = {
  services: []
};

export default ListUsedServiceTable;
