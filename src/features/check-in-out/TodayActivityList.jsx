import styled from "styled-components";
import { useTodayActivitys } from "./useTodayActivitys";
import Spinner from "../../ui/Spinner";
import TodayItem from './TodayItem';
const TodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function TodayActivityList() {
    const { isLoading, activitys } = useTodayActivitys()

    return (
        <>
            {!isLoading ? activitys.length ?
                <TodayList >
                    {
                        activitys.map(activity => <TodayItem key={activity.id} activity={activity} />)
                    }
                </TodayList>
                : <NoActivity>
                    No Activity Today...
                </NoActivity>
                : <Spinner />
            }
        </>
    )
}

export default TodayActivityList