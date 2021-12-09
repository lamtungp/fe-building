import { Card } from '@mui/material';
import ListUsedServiceTable from './ListUsedServiceTable';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from 'src/common/redux';
import { deleteItem } from 'src/common/redux/table/Actions';
import UsedSvServices from 'src/common/redux/used_service/services';

const ListUsedService: React.FunctionComponent = (): React.ReactElement => {
  const [services, setServices] = useState()
  const dispatch = useDispatch();
  const isDelete = useSelector((state: GlobalState) => state.table.isDelete);
  const selected = useSelector((state: GlobalState) => state.table);

  const getListService = async () => {
    try {
      const data = await UsedSvServices.indexUsedService(selected.selectCompany, selected.selectTime)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDelete, selected.selectCompany,selected.selectTime, dispatch])

  return (
    <Card>
      <ListUsedServiceTable services={services} />
    </Card>
  );
}

export default ListUsedService;
