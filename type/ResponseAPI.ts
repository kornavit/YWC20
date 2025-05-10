export type DetailCandidate = {
    "firstName": string,
    "lastName": string,
    "interviewRefNo": string,
    "major": string
}

export type Candidate = {
    "design":[DetailCandidate],
    "content":[DetailCandidate],
    "programming":[DetailCandidate],
    "marketing":[DetailCandidate],
}
