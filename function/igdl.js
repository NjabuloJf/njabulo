const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));


async function igdl(query) {
  try {
    const response = await fetch(`https://api.siputzx.my.id/api/d/igdl?url=${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = { igdl }
