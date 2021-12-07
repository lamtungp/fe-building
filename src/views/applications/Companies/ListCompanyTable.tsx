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
  CardHeader
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import CompanyServices from 'src/common/redux/company/services';
import { useDispatch } from 'react-redux';
import { deleteItem } from 'src/common/redux/table/Actions';
import BulkActions from 'src/components/BulkActions/BulkActions';
import { numberToString } from 'src/common/utils/transformPrice';

interface ListCompanyTableProps {
  className?: string;
  companies: any[];
}

interface Filters {
  status?: any;
}

const applyFilters = (
  companies: any[],
  filters: Filters
): any[] => {
  return companies.filter((company) => {
    let matches = true;

    if (filters.status && company.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  companies: any[],
  page: number,
  limit: number
): any[] => {
  return companies.slice(page * limit, page * limit + limit);
};

const ListCompanyTable: FC<ListCompanyTableProps> = ({ companies }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const MySwal = withReactContent(Swal)

  const [selectedCompanies, setSelectedCompanies] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCompanies.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const handleSelectAllCompanies = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCompanies(
      event.target.checked
        ? companies.map((company) => company.id)
        : []
    );
  };

  const handleSelectOneCompany = (
    event: ChangeEvent<HTMLInputElement>,
    companyId: string
  ): void => {
    if (!selectedCompanies.includes(companyId)) {
      setSelectedCompanies((prevSelected) => [
        ...prevSelected,
        companyId
      ]);
    } else {
      setSelectedCompanies((prevSelected) =>
        prevSelected.filter((id) => id !== companyId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handleDeleteCompany = async (id: string) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be delete this company!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#28a745',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await CompanyServices.destroy(id);
        if (res) {
          MySwal.fire(
            'Deleted!',
            'Company has been deleted.',
            'success'
          )
          dispatch(deleteItem(true))
        }
      }
    })
  }

  const filteredCompanys = applyFilters(companies, filters);
  const paginatedCompanys = applyPagination(
    filteredCompanys,
    page,
    limit
  );
  const selectedSomeCompanies =
    selectedCompanies.length > 0 &&
    selectedCompanies.length < companies.length;
  const selectedAllCompanies =
    selectedCompanies.length === companies.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader title="List company" />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllCompanies}
                  indeterminate={selectedSomeCompanies}
                  onChange={handleSelectAllCompanies}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Tax Code</TableCell>
              <TableCell>Authorized Capital</TableCell>
              <TableCell>Field Operation</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCompanys.map((company) => {
              const isCompanySelected = selectedCompanies.includes(
                company.id
              );
              return (
                <TableRow
                  hover
                  key={company.id}
                  selected={isCompanySelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCompanySelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCompany(event, company.id)
                      }
                      value={isCompanySelected}
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
                      {company.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                     
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
                      {company.tax_code}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                     
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
                      {numberToString(company.capital)} 
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
                      {company.field_operation}
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
                      {company.phone_number}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Company" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => navigate(`/management/edit-company/${company.id}`)}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Company" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => handleDeleteCompany(company.id)}
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
          count={filteredCompanys.length}
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

ListCompanyTable.propTypes = {
  companies: PropTypes.array.isRequired
};

ListCompanyTable.defaultProps = {
  companies: []
};

export default ListCompanyTable;
