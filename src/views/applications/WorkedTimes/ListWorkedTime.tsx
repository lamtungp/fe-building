import { Card } from '@mui/material';
import ListWorkedTimeTable from './ListWorkedTimeTable';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from 'src/common/redux';
import { deleteItem } from 'src/common/redux/table/Actions';
import UsedSvServices from 'src/common/redux/used_service/services';
import WorkedTimeServices from 'src/common/redux/worked_time/services';

const ListWorkedTime: React.FunctionComponent = (): React.ReactElement => {
  const [worked_times, setWorkedTimes] = useState()
  const dispatch = useDispatch();
  const isDelete = useSelector((state: GlobalState) => state.table.isDelete);

  const getListWorkedTime = async () => {
    try {
      const data = await WorkedTimeServices.index()
      setWorkedTimes(data);
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getListWorkedTime()
  }, [])

  useEffect(() => {
    getListWorkedTime();
    dispatch(deleteItem(false));
  }, [isDelete, dispatch])

  return (
    <Card>
      <ListWorkedTimeTable worked_times={worked_times} />
    </Card>
  );
}

export default ListWorkedTime;
