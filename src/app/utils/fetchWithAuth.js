export async function fetchWithAuth(url, token, handleLogout) {
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        handleLogout(); // now it's passed safely!
        throw new Error("Unauthorized, logging out...");
      }
      throw new Error(`Failed to fetch: ${res.status}`);
    }

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
