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

interface ListSalaryStaffTableProps {
  className?: string;
  salary_staffs: any[];
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

const ListSalaryStaffTable: FC<ListSalaryStaffTableProps> = ({ salary_staffs: salary_staffs }) => {
  const dispatch = useDispatch();

  const [selectedSalaryStaffs, setSelectedSalaryStaffs] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedSalaryStaffs.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const filters = {
    status: null
  };
  const [selectedTime, setSelectedTime] = useState<string>(format(new Date(), 'MM/yyyy'));

  const handleSelectAllSalaryStaffs = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedSalaryStaffs(
      event.target.checked
        ? salary_staffs.map((w) => w.id)
        : []
    );
  };

  const handleSelectOneSalaryStaff = (
    event: ChangeEvent<HTMLInputElement>,
    salaryStaffsId: string
  ): void => {
    if (!selectedSalaryStaffs.includes(salaryStaffsId)) {
      setSelectedSalaryStaffs((prevSelected) => [
        ...prevSelected,
        salaryStaffsId
      ]);
    } else {
      setSelectedSalaryStaffs((prevSelected) =>
        prevSelected.filter((id) => id !== salaryStaffsId)
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

  const filteredSalaryStaffs = applyFilters(salary_staffs, filters);
  const paginatedSalaryStaffs = applyPagination(
    filteredSalaryStaffs,
    page,
    limit
  );
  const selectedSomeSalaryStaffs =
    selectedSalaryStaffs.length > 0 &&
    selectedSalaryStaffs.length < salary_staffs.length;
  const selectedAllSalaryStaffs =
    selectedSalaryStaffs.length === salary_staffs.length;

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
          title="Salary staff" 
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
                  checked={selectedAllSalaryStaffs}
                  indeterminate={selectedSomeSalaryStaffs}
                  onChange={handleSelectAllSalaryStaffs}
                />
              </TableCell>
              <TableCell>Name Staff</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Worked Days</TableCell>
              <TableCell>Location Working</TableCell>
              <TableCell>Salary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedSalaryStaffs.map((salary_staff) => {
              const isSalaryStaffSelected = selectedSalaryStaffs.includes(
                salary_staff.id
              );
              return (
                <TableRow
                  hover
                  key={salary_staff.id}
                  selected={isSalaryStaffSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isSalaryStaffSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneSalaryStaff(event, salary_staff.id)
                      }
                      value={isSalaryStaffSelected}
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
                      {salary_staff.staff.name}
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
                      {`${salary_staff.salary.position} ${salary_staff.salary.salary_grade}`}
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
                      {salary_staff.worked_days}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      days
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
                      {salary_staff.staff.location.name}
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
                      {numberToString(salary_staff.worked_salary)}
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
          count={filteredSalaryStaffs.length}
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

ListSalaryStaffTable.propTypes = {
  salary_staffs: PropTypes.array.isRequired
};

ListSalaryStaffTable.defaultProps = {
  salary_staffs: []
};

export default ListSalaryStaffTable;
