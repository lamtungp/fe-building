import { Card } from '@mui/material';
import ListSalaryStaffTable from './ListSalaryStaffTable';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from 'src/common/redux';
import { deleteItem } from 'src/common/redux/table/Actions';
import WorkedTimeServices from 'src/common/redux/worked_time/services';

const ListSalaryStaff: React.FunctionComponent = (): React.ReactElement => {
  const [salaryStaffs, setSalaryStaffs] = useState()
  const dispatch = useDispatch();
  const isDelete = useSelector((state: GlobalState) => state.table.isDelete);
  const selectTime = useSelector((state: GlobalState) => state.table.selectTime);


  const getListWorkedTime = async () => {
    try {
      const data = await WorkedTimeServices.indexTime(selectTime)
      data.map((e) => {
        e.worked_salary = Math.round(e.salary.salary / 22 * e.worked_days)
        return e
      })
      setSalaryStaffs(data);
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getListWorkedTime()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectTime])

  useEffect(() => {
    getListWorkedTime();
    dispatch(deleteItem(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDelete, dispatch])

  return (
    <Card>
      <ListSalaryStaffTable salary_staffs={salaryStaffs} />
    </Card>
  );
}

export default ListSalaryStaff;
