import styled from "styled-components";
import { useRecentBookings } from "./useRecentBookings";
import Spinner from './../../ui/Spinner';
import { useRecentStays } from "./useRecentStays";
import Statistics from "./Statistics";
import { useCabins } from './../cabins/useCabins';
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { bookings, isLoading: isLoadingRecentBookings } = useRecentBookings()
  const { confirmedStays, numDays, isLoading: isLoadingRecentStays } = useRecentStays()
  const { cabins, isLoading: isLoadingCabins } = useCabins()

  if (isLoadingRecentStays || isLoadingRecentBookings || isLoadingCabins) return <Spinner />
  const numCabins = cabins?.length
  return (
    <StyledDashboardLayout>
      <Statistics bookings={bookings} confirmedStays={confirmedStays} cabinsCount={numCabins} numDays={Number(numDays)} />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  )
}

export default DashboardLayout