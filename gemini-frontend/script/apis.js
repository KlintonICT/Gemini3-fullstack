const API_URL = 'http://localhost:8080';

const getAllUsers = async () => {
    const results =  await fetch(`${API_URL}/allusers`);
    return await results.json();
}

const createSciencePlan = async ( sciencePlan ) => {
    return await fetch(`${API_URL}/createSciencePlan`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify( sciencePlan )
    });
}

const getSciencePlanByStatus = async ( status ) => {
    const results = await fetch(`${API_URL}/getSciencePlanByStatus?status=${status}`);
    return await results.json();
}

const deleteSciencePlan = async ( planId ) => {
    return await fetch(`${API_URL}/deleteSciencePlan`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify( planId )
    });
}

const updateSciencePlan = async ( updatedSciencePlan ) => {
    return await fetch(`${API_URL}/updateSciencePlan?id=${updatedSciencePlan.planID}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify( updatedSciencePlan )
    });
}

const submitedSciencePlan = async ( plan_id, submitter ) => {
    return await fetch(`${API_URL}/submitSciencePlan?id=${plan_id}&user=${submitter}`, {
        method: 'PUT'
    })
}

const testSciencePlan = async ( plan_id ) => {
    return await fetch(`${API_URL}/testPlan?planId=${plan_id}`, {
        method: 'PUT'
    })
}

const validatedSciencePlan = async ( validatedPlan ) => {
    return await fetch(`${API_URL}/setValidateAstronomicalData`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        }, 
        body: JSON.stringify( validatedPlan )
    })
}