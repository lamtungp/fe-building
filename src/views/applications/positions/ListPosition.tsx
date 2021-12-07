import { Card } from '@mui/material';
import ListPositionTable from './ListPositionTable';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from 'src/common/redux';
import { deleteItem } from 'src/common/redux/table/Actions';
import UsedSvServices from 'src/common/redux/used_service/services';

const ListPosition: React.FunctionComponent = (): React.ReactElement => {
  const [services, setServices] = useState()
  const dispatch = useDispatch();
  const isDelete = useSelector((state: GlobalState) => state.table.isDelete);

  const getListService = async () => {
    try {
      const data = await UsedSvServices.index()
      setServices(data);
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getListService()
  }, [])

  useEffect(() => {
    getListService();
    dispatch(deleteItem(false));
  }, [isDelete])

  return (
    <Card>
      <ListPositionTable services={services} />
    </Card>
  );
}

export default ListPosition;
