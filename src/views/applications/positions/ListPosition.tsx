import { Card } from '@mui/material';
import ListPositionTable from './ListPositionTable';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from 'src/common/redux';
import { deleteItem } from 'src/common/redux/table/Actions';
import SalaryServices from 'src/common/redux/salary/services';

const ListPosition: React.FunctionComponent = (): React.ReactElement => {
  const [positions, setPositions] = useState()
  const dispatch = useDispatch();
  const isDelete = useSelector((state: GlobalState) => state.table.isDelete);

  const getListPosition = async () => {
    try {
      const data = await SalaryServices.index()
      setPositions(data);
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getListPosition()
  }, [])

  useEffect(() => {
    getListPosition();
    dispatch(deleteItem(false));
  }, [isDelete, dispatch])

  return (
    <Card>
      <ListPositionTable positions={positions} />
    </Card>
  );
}

export default ListPosition;
