import { Card } from '@mui/material';
import ListCompanyStatisticsTable from './ListCompanyStatisticsTable';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GlobalState } from 'src/common/redux';
import { deleteItem } from 'src/common/redux/table/Actions';
import CompanyServices from 'src/common/redux/company/services';
import UsedAreaServices from 'src/common/redux/used_area/services';
import { format } from 'date-fns';
import UsedSvServices from 'src/common/redux/used_service/services';
import EmployeeServices from 'src/common/redux/employee/services';

const ListCompanyStatistics: React.FunctionComponent = (): React.ReactElement => {
  const [companyStatistics, setCompanyStatistics] = useState()
  const dispatch = useDispatch();
  const isDelete = useSelector((state: GlobalState) => state.table.isDelete);
  const selectTime = useSelector((state: GlobalState) => state.table.selectTime);


  const getListCompanyStatistics = async () => {
    try {
      const dataCompany = await CompanyServices.index();
      const dataUsedArea: Array<any> = await UsedAreaServices.indexUsedArea()
      const dataUsedService = await UsedSvServices.index();
      const arrEmployees = await EmployeeServices.index();
      
      dataUsedArea.filter((e) => {
        const arrStr = e.rental_term.split(" ~ ");
        if (format(new Date(), 'dd-MM-yyyy') >= arrStr[0] && format(new Date(), 'dd-MM-yyyy') <= arrStr[1]) {
          return e;
        }
      })

      dataCompany.forEach(async (e) => {
        let countEmployees = 0;
        arrEmployees.map((em) => {
          if (em.company_id === e.id) {
            countEmployees += 1
          }
        })
        let used_area_price = 0;
        let used_area = 0;
        dataUsedArea.map((ele) => {
          if (ele.company_id === e.id) {
            used_area_price += ele.floor.unit_price * ele.used_area; 
            used_area += ele.used_area
          }
        })
        e.used_area_price = used_area_price;
        let used_service = 0;
        dataUsedService.map((element) => {
          if (element.company_id === e.id) {
            if (countEmployees < 10 && used_area < 100) {
              used_service += element.service.unit_price
            } else {
              if ((countEmployees - 10) / 5 >= 1 || (used_area - 100) / 10 >= 1) {
                let n = 0;
                let m = 0; 
                if ((countEmployees - 10) / 5 >= 1) {
                  n += (countEmployees - 10 - countEmployees % 5) / 5
                }
                if ((used_area - 100) / 10 >= 1) {
                  m += (used_area - 100 - used_area % 10) / 10
                }
                used_service += element.service.unit_price + element.service.unit_price * 0.05 * (n+m)
              }
            }
          }
        })
        e.used_service = used_service;
      })

      setCompanyStatistics(dataCompany);
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getListCompanyStatistics()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectTime])

  useEffect(() => {
    getListCompanyStatistics();
    dispatch(deleteItem(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDelete, dispatch])

  return (
    <Card>
      <ListCompanyStatisticsTable companyStatistics={companyStatistics} />
    </Card>
  );
}

export default ListCompanyStatistics;
