const DecodeError = ({ graphQLErrors }, ...error) => {
  return !!graphQLErrors ? graphQLErrors?.[0]?.message : error
}

export { DecodeError }
