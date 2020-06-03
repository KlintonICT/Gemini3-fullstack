const API_URL = 'http://localhost:8080';

const getAllUsers = async () => {
    const results =  await fetch(`${API_URL}/allusers`);
    return await results.json();
}