import { Card } from '@mui/material';
import ListCompanyTable from './ListCompanyTable';
import React from 'react'
import CompanyServices from 'src/common/redux/company/services';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from 'src/common/redux';
import { deleteItem } from 'src/common/redux/table/Actions';

const ListCompany: React.FunctionComponent = (): React.ReactElement => {
  const [companies, setCompanies] = React.useState()
  const dispatch = useDispatch();
  const isDelete = useSelector((state: GlobalState) => state.table.isDelete);

  const getListCompany = async () => {
    const data = await CompanyServices.index()
    setCompanies(data);
  }
  React.useEffect(() => {
    getListCompany();
  }, [])

  React.useEffect(() => {
    getListCompany();
    dispatch(deleteItem(false));
  }, [isDelete, dispatch])

  return (
    <Card>
      <ListCompanyTable companies={companies} />
    </Card>
  );
}

export default ListCompany;
