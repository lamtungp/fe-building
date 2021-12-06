import { Card } from '@mui/material';
import ListFloorTable from './ListFloorTable';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from 'src/common/redux';
import { deleteItem } from 'src/common/redux/table/Actions';
import FloorServices from 'src/common/redux/floor/services';

const ListFloor: React.FunctionComponent = (): React.ReactElement => {
  const [floors, setFloors] = useState()
  const dispatch = useDispatch();
  const isDelete = useSelector((state: GlobalState) => state.table.isDelete);

  const getListFloor = async () => {
    try {
      const data = await FloorServices.index()
      setFloors(data);
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getListFloor()
  }, [])

  useEffect(() => {
    getListFloor();
    dispatch(deleteItem(false));
  }, [isDelete, dispatch])

  return (
    <Card>
      <ListFloorTable floors={floors} />
    </Card>
  );
}

export default ListFloor;
