export const sortByVote = (a, b) => {
  return b.voteScore - a.voteScore
}

export const sortByMoreRecent = (a, b) => {
  return b.timestamp - a.timestamp
}

export const sortByMostComments = (a, b) => {
  if (a.comments && b.comments) {
    return b.comments.length - a.comments.length
  }
  if (a.comments) {
    return -1
  } else {
    return 1
  }
}
