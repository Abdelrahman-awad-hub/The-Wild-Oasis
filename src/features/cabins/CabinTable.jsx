import Empty from '../../ui/Empty';
import Pagination from '../../ui/Pagination';
import Spinner from './../../ui/Spinner';
import Table from './../../ui/Table';
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";

function CabinTable() {
  const { cabins, count, isLoading, error } = useCabins()


  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded by react query");
  }

  if (isLoading) return <Spinner />

  if (!cabins) return <Empty resource={'Cabins'} />

  return (
    <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr' role="table">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body data={cabins} render={cabin => <CabinRow cabin={cabin} key={cabin.id} />} />
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  )
}

export default CabinTable