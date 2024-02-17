import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from './../../ui/Checkbox';
import { formatCurrency } from "../../utils/helpers";
import { useCheckin } from "./useCheckin";
import { useSetting } from "../settings/useSetting";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {

  const [confirmed, setConfirmed] = useState(false);
  const [addBreackfast, setAddBreackfast] = useState(false);

  const { booking, isLoading } = useBooking()
  const { setting, isLoading: settingIsLoading } = useSetting()
  const { checkin, isCheckingIn } = useCheckin()

  const moveBack = useMoveBack();

  useEffect(function () {
    setConfirmed(booking?.isPaid)
  }, [booking])


  if (isLoading || settingIsLoading) return <Spinner />

  const {
    id,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreackfastPrice = setting.breakfastPrice * numGuests * numNights

  function handleCheckin() {
    if (!confirmed) return

    if (addBreackfast) {
      checkin({
        id,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreackfastPrice,
          totalPrice: totalPrice + optionalBreackfastPrice
        }
      })
    } else
      checkin({ id, breakfast: {} })
  }


  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{id}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && <Box>
        <Checkbox id='breackfast'
          checked={addBreackfast}
          onChange={() => {
            setAddBreackfast(addBreackfast => !addBreackfast)
            setConfirmed(false)
          }}
          disabled={addBreackfast || isCheckingIn}
        >
          add breackfast for {formatCurrency(totalPrice + optionalBreackfastPrice)}
        </Checkbox>
      </Box>}
      <Box>
        <Checkbox id='Paid-confirmed'
          checked={confirmed}
          onChange={() => setConfirmed(confirmed => !confirmed)}
          disabled={confirmed || isCheckingIn}
        >
          I confirm that {guests.fullName} has paid the amount of {formatCurrency(totalPrice + optionalBreackfastPrice)}
          ({formatCurrency(totalPrice)} + {formatCurrency(optionalBreackfastPrice)})
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmed || isCheckingIn}>Check in booking #{id}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
