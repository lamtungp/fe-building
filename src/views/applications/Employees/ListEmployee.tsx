import { Card } from '@mui/material';
import { CryptoOrder } from 'src/models/crypto_order';
import ListEmployeeTable from './ListEmployeeTable';
import { subDays } from 'date-fns';
import { useState, useEffect } from 'react';
import EmployeeServices from 'src/common/redux/employee/services';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from 'src/common/redux';
import { deleteItem } from 'src/common/redux/table/Actions';

const RecentOrders: React.FunctionComponent = (): React.ReactElement => {
  const [employees, setEmployees] = useState()
  const dispatch = useDispatch();
  const isDelete = useSelector((state: GlobalState) => state.table.isDelete);
  const selectCompany = useSelector((state: GlobalState) => state.table.selectCompany);


  const getListEmployee = async () => {
    try {
      const data = await EmployeeServices.list(selectCompany)
      setEmployees(data);
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getListEmployee()
  }, [])

  useEffect(() => {
    getListEmployee();
    dispatch(deleteItem(false));
  }, [isDelete])

  useEffect(() => {
    getListEmployee();
  }, [selectCompany])

  return (
    <Card>
      <ListEmployeeTable employees={employees} />
    </Card>
  );
}

export default RecentOrders;
