import { Card } from '@mui/material';
import ListStaffTable from './ListStaffTable';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from 'src/common/redux';
import { deleteItem } from 'src/common/redux/table/Actions';
import StaffServices from 'src/common/redux/staff/services';

const RecentOrders: React.FunctionComponent = (): React.ReactElement => {

  const [staffs, setStaffs] = useState()
  const dispatch = useDispatch();
  const isDelete = useSelector((state: GlobalState) => state.table.isDelete);


  const getListStaff = async () => {
    try {
      const data = await StaffServices.index()
      setStaffs(data);
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getListStaff()
  }, [])

  useEffect(() => {
    getListStaff();
    dispatch(deleteItem(false));
  }, [isDelete, dispatch])

  return (
    <Card>
      <ListStaffTable staffs={staffs} />
    </Card>
  );
}

export default RecentOrders;
