import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat"
import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from 'react-icons/hi2';

function Statistics({ bookings, confirmedStays, numDays, cabinsCount }) {

    // 1- Bookings
    const numBookings = bookings.length;
    // 1- Sales ---> num of confirmed bookings
    const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0)
    // 1- check in ---> num of checked in bookings
    const checkin = confirmedStays.length
    // 1- occupancy ---> the percentedg of checked in nights / all available nights (num of days * num of cabins)
    const occupancy = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinsCount)

    return (
        <>
            <Stat title='Bookings' value={numBookings} color='blue' icon={<HiOutlineBriefcase />} />
            <Stat title='Sales' value={formatCurrency(sales)} color='green' icon={<HiOutlineBanknotes />} />
            <Stat title='Check in' value={checkin} color='indigo' icon={<HiOutlineCalendarDays />} />
            <Stat title='occupancy' value={Math.round(Number(occupancy) * 100) + '%'} color='yellow' icon={<HiOutlineChartBar />} />
        </>
    )
}

export default Statistics