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

export const GET_MEMBERSHIP_META = gql`
  query($addr: String!) {
    members(
      where: { memberAddress: $addr }
      orderBy: createdAt
      orderDirection: asc
      first: 1
    ) {
      createdAt
    }
  }
`;

export const GET_LEADERS = gql`
  query {
    membershipsLeaders: badges(
      first: 5
      orderBy: memberships
      orderDirection: desc
    ) {
      memberAddress
      count: memberships
    }

    summonsLeaders: badges(
      first: 5
      orderBy: summonCount
      orderDirection: desc
    ) {
      memberAddress
      count: summonCount
    }

    submissionLeaders: badges(
      first: 5
      orderBy: proposalSubmissionCount
      orderDirection: desc
    ) {
      memberAddress
      count: proposalSubmissionCount
    }

    sponsorLeaders: badges(
      first: 5
      orderBy: proposalSponsorCount
      orderDirection: desc
    ) {
      memberAddress
      count: proposalSponsorCount
    }

    voteLeaders: badges(first: 5, orderBy: voteCount, orderDirection: desc) {
      memberAddress
      count: voteCount
    }

    dissentsLeaders: badges(first: 5, orderBy: dissents, orderDirection: desc) {
      memberAddress
      count: dissents
    }

    assentsLeaders: badges(first: 5, orderBy: assents, orderDirection: desc) {
      memberAddress
      count: assents
    }

    rageLeaders: badges(
      first: 5
      orderBy: rageQuitCount
      orderDirection: desc
    ) {
      memberAddress
      count: rageQuitCount
    }

    jailedLeaders: badges(
      first: 5
      orderBy: jailedCount
      orderDirection: desc
    ) {
      memberAddress
      count: jailedCount
    }
  }
`;
