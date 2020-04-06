import { gql } from "apollo-boost";

export const GET_BADGES = gql`
  query($addr: String!) {
    badges(where: { memberAddress: $addr }) {
      memberAddress
      voteCount
      summonCount
      proposalSponsorCount
      proposalSubmissionCount
      rageQuitCount
      jailedCount
      dissents
      assents
      memberships
    }
  }
`;

export const GET_LEADERS = gql`
  query {
    voteLeaders: badges(first: 5, orderBy: voteCount, orderDirection: desc) {
      memberAddress
      voteCount
    }

    summonsLeaders: badges(
      first: 5
      orderBy: summonCount
      orderDirection: desc
    ) {
      memberAddress
      summonCount
    }

    sponsorLeaders: badges(
      first: 5
      orderBy: proposalSponsorCount
      orderDirection: desc
    ) {
      memberAddress
      proposalSponsorCount
    }

    submissionLeaders: badges(
      first: 5
      orderBy: proposalSubmissionCount
      orderDirection: desc
    ) {
      memberAddress
      proposalSubmissionCount
    }

    rageLeaders: badges(
      first: 5
      orderBy: rageQuitCount
      orderDirection: desc
    ) {
      memberAddress
      rageQuitCount
    }

    jailedLeaders: badges(
      first: 5
      orderBy: jailedCount
      orderDirection: desc
    ) {
      memberAddress
      jailedCount
    }

    membershipsLeaders: badges(
      first: 5
      orderBy: memberships
      orderDirection: desc
    ) {
      memberAddress
      memberships
    }

    dissentsLeaders: badges(first: 5, orderBy: dissents, orderDirection: desc) {
      memberAddress
      dissents
    }

    assentsLeaders: badges(first: 5, orderBy: assents, orderDirection: desc) {
      memberAddress
      assents
    }
  }
`;
