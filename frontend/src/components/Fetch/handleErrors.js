export function handleErrors(res) {
  console.log('Status: ' + res.status);
  if (!res.ok) {
    res.status === 400 ? alert('Invalid request') : alert('Unexpected error');
  }
  return res;
}
