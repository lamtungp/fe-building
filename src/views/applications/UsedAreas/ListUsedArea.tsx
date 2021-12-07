import { Card } from '@mui/material';
import ListUsedAreaTable from './ListUsedAreaTable';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from 'src/common/redux';
import { deleteItem } from 'src/common/redux/table/Actions';
import UsedAreaServices from 'src/common/redux/used_area/services';

const ListUsedArea: React.FunctionComponent = (): React.ReactElement => {
  const [usedAreas, setUsedAreas] = useState()
  const dispatch = useDispatch();
  const isDelete = useSelector((state: GlobalState) => state.table.isDelete);

  const getListUsedArea = async () => {
    try {
      const data = await UsedAreaServices.index()
      setUsedAreas(data);
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getListUsedArea()
  }, [])

  useEffect(() => {
    getListUsedArea();
    dispatch(deleteItem(false));
  }, [isDelete, dispatch])

  return (
    <Card>
      <ListUsedAreaTable usedAreas={usedAreas} />
    </Card>
  );
}

export default ListUsedArea;
