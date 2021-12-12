import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import {
  Divider,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';

import BulkActions from 'src/components/BulkActions/BulkActions';
import { numberToString } from 'src/common/utils/transformPrice';
import { times } from 'src/common/constants/Times';
import { useDispatch } from 'react-redux';
import { selectTime } from 'src/common/redux/table/Actions';

interface ListCompanyStatisticsTableProps {
  className?: string;
  companyStatistics: any[];
}

interface Filters {
  status?: any;
}

const applyFilters = (
  companyStatistics: any[],
  filters: Filters
): any[] => {
  return companyStatistics.filter((companyStatisticsStatus) => {
    let matches = true;

    if (filters.status && companyStatisticsStatus.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  companyStatistics: any[],
  page: number,
  limit: number
): any[] => {
  return companyStatistics.slice(page * limit, page * limit + limit);
};

const ListCompanyStatisticsTable: FC<ListCompanyStatisticsTableProps> = ({ companyStatistics: companyStatistics }) => {
  const dispatch = useDispatch();
  
  const [selectedCompanyStatistics, setSelectedCompanyStatistics] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCompanyStatistics.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const filters = {
    status: null
  };
  const [selectedTime, setSelectedTime] = useState<string>(format(new Date(), 'MM/yyyy'));

  const handleSelectAllCompanyStatistics = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCompanyStatistics(
      event.target.checked
        ? companyStatistics.map((w) => w.id)
        : []
    );
  };

  const handleSelectOneCompanyStatistics = (
    event: ChangeEvent<HTMLInputElement>,
    companyStatisticsId: string
  ): void => {
    if (!selectedCompanyStatistics.includes(companyStatisticsId)) {
      setSelectedCompanyStatistics((prevSelected) => [
        ...prevSelected,
        companyStatisticsId
      ]);
    } else {
      setSelectedCompanyStatistics((prevSelected) =>
        prevSelected.filter((id) => id !== companyStatisticsId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handleSelectedTime = (e: ChangeEvent<HTMLInputElement>): void => {
    setSelectedTime(e.target.value)
    dispatch(selectTime(e.target.value))
  }

  const filteredCompanyStatistics = applyFilters(companyStatistics, filters);
  const paginatedCompanyStatistics = applyPagination(
    filteredCompanyStatistics,
    page,
    limit
  );
  const selectedSomeCompanyStatistics =
    selectedCompanyStatistics.length > 0 &&
    selectedCompanyStatistics.length < companyStatistics.length;
  const selectedAllCompanyStatistics =
    selectedCompanyStatistics.length === companyStatistics.length;

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
            </Box>
          }
          title="Company Statistics" 
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
                  checked={selectedAllCompanyStatistics}
                  indeterminate={selectedSomeCompanyStatistics}
                  onChange={handleSelectAllCompanyStatistics}
                />
              </TableCell>
              <TableCell>Name Company</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Field Operation</TableCell>
              <TableCell>Used Area Charge</TableCell>
              <TableCell>Used Service Charge</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCompanyStatistics.map((companyStatistics) => {
              const isCompanyStatisticsSelected = selectedCompanyStatistics.includes(
                companyStatistics.id
              );
              return (
                <TableRow
                  hover
                  key={companyStatistics.id}
                  selected={isCompanyStatisticsSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCompanyStatisticsSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCompanyStatistics(event, companyStatistics.id)
                      }
                      value={isCompanyStatisticsSelected}
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
                      {companyStatistics.name}
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
                      {companyStatistics.phone_number}
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
                      {companyStatistics.field_operation}
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
                      {numberToString(companyStatistics.used_area_price)}
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
                      {numberToString(companyStatistics.used_service)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      VND
                    </Typography>
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
          count={filteredCompanyStatistics.length}
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

ListCompanyStatisticsTable.propTypes = {
  companyStatistics: PropTypes.array.isRequired
};

ListCompanyStatisticsTable.defaultProps = {
  companyStatistics: []
};

export default ListCompanyStatisticsTable;
