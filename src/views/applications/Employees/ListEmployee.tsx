import { Card } from '@mui/material';
import ListEmployeeTable from './ListEmployeeTable';
import { useState, useEffect } from 'react';
import EmployeeServices from 'src/common/redux/employee/services';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from 'src/common/redux';
import { deleteItem } from 'src/common/redux/table/Actions';

const ListEmployee: React.FunctionComponent = (): React.ReactElement => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getListEmployee();
    dispatch(deleteItem(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDelete, dispatch])

  useEffect(() => {
    getListEmployee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectCompany])

  return (
    <Card>
      <ListEmployeeTable employees={employees} />
    </Card>
  );
}

export default ListEmployee;
