import { Card } from '@mui/material';
import ListWorkedTimeTable from './ListWorkedTimeTable';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from 'src/common/redux';
import { deleteItem } from 'src/common/redux/table/Actions';
import WorkedTimeServices from 'src/common/redux/worked_time/services';

const ListWorkedTime: React.FunctionComponent = (): React.ReactElement => {
  const [worked_times, setWorkedTimes] = useState()
  const dispatch = useDispatch();
  const isDelete = useSelector((state: GlobalState) => state.table.isDelete);
  const selected = useSelector((state: GlobalState) => state.table);

  const getListWorkedTime = async () => {
    try {
      const data = await WorkedTimeServices.indexTime(selected.selectTime)
      setWorkedTimes(data);
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getListWorkedTime()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    getListWorkedTime();
    dispatch(deleteItem(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDelete, selected.selectTime, dispatch])

  return (
    <Card>
      <ListWorkedTimeTable worked_times={worked_times} />
    </Card>
  );
}

export default ListWorkedTime;
