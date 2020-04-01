import React, { useEffect } from 'react';

import { useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";

import voteBadgeSm from '../assets/1check.svg';
import voteBadgeMd from '../assets/10check.svg';
import voteBadgeLg from '../assets/50check.svg';
import { Image, Row, Col, Container } from 'react-bootstrap';

const GET_BADGES = gql`
query ($addr: String!){
  badges(where: {memberAddress: $addr}) {
    memberAddress
    voteCount
    summonCount
    proposalSponsorCount
    proposalSubmissionCount
    rageQuitCount
    jailedCount
  }
}
`;

export const Badges = (props) => {
    const { playerAddr } = props;
    console.log('playerAddr', playerAddr);

    const [badges, setBadges] = React.useState([]);

    const { loading, error, data } = useQuery(GET_BADGES, {
        variables: {
            addr: `${playerAddr}`,
        }
    });
    console.log(loading, error, data);

    useEffect(() => {
        if (!loading && !error && data) {
            console.log({ data: data });
            setBadges(data.badges)
        }
    }, [loading, error, data]);

    return (
        <div>
            {badges.length && badges[0].voteCount && (
                <Container>
                    <Row md={4}>
                        {badges[0].voteCount > 0 && (<Col><Image src={voteBadgeSm} />1</Col>)}
                        {badges[0].voteCount > 5 && (<Col><Image src={voteBadgeMd} />5</Col>)}
                        {badges[0].voteCount > 10 && (<Col><Image src={voteBadgeLg} />10</Col>)}
                    </Row>
                </Container>
            )}
            <p>Votes: {badges.length && badges[0].voteCount}</p>
            <p>Summons: {badges.length && badges[0].summonCount}</p>
            <p>proposalSponsorCount: {badges.length && badges[0].proposalSponsorCount}</p>
            <p>proposalSubmissionCount: {badges.length && badges[0].proposalSubmissionCount}</p>
            <p>rageQuitCount: {badges.length && badges[0].rageQuitCount}</p>
        </div>
    );
};