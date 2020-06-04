const API_URL = 'http://localhost:8080';

const getAllUsers = async () => {
    const results =  await fetch(`${API_URL}/allusers`);
    return await results.json();
}

// api for creating science plan

// api for calling conflict schedule
const conflictedSchedule = async () => {
    return [
        {
            sciencePlanId: '12',
            sciencePlanName: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. 3',
            collaborator: 'Gemini',
            creator: 'Klinton',
            objective: 'Hello world',
            fund: '123',
            scheduleStart: '11/11/1111',
            scheduleStop: '11/12/2010',
            starSystemId: '1234',
            starName: 'Abcde',
            telescopeLocation: 'Hawaii',
            description: '[Desc] Lorem ipsum dolor sit amet, consectetur adipiscing elit.LorLorLorL Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            fileType: 'jpg',
            fileQuality: '1028',
            colorType: 'color',
            color: '6458',
            contrast: '215',
            brightness: '2665',
            saturation: '2652'
        },
        {
            sciencePlanId: '13',
            sciencePlanName: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. 4',
            collaborator: 'Gemini',
            creator: 'Klinton',
            objective: 'Hello world',
            fund: '123',
            scheduleStart: '11/11/1111',
            scheduleStop: '11/12/2010',
            starSystemId: '1234',
            starName: 'Abcde',
            telescopeLocation: 'Hawaii',
            description: '[Desc] Lorem ipsum dolor sit amet, consectetur adipiscing elit.LorLorLorL Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            fileType: 'jpg',
            fileQuality: '1028',
            colorType: 'color',
            color: '6458',
            contrast: '215',
            brightness: '2665',
            saturation: '2652'
        }
    ]
}

// api for calling pending plan
const pendingPlan = () => {
    return [
        {
            sciencePlanId: '14',
            sciencePlanName: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. 5',
            collaborator: 'Gemini',
            creator: 'Klinton',
            objective: 'Hello world',
            fund: '123',
            scheduleStart: '11/11/1111',
            scheduleStop: '11/12/2010',
            starSystemId: '1234',
            starName: 'Abcde',
            telescopeLocation: 'Hawaii',
            description: '[Desc] Lorem ipsum dolor sit amet, consectetur adipiscing elit.LorLorLorL Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            fileType: 'jpg',
            fileQuality: '1028',
            colorType: 'color',
            color: '6458',
            contrast: '215',
            brightness: '2665',
            saturation: '2652'
        },
        {
            sciencePlanId: '15',
            sciencePlanName: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. 6',
            collaborator: 'Gemini',
            creator: 'Klinton',
            objective: 'Hello world',
            fund: '123',
            scheduleStart: '11/11/1111',
            scheduleStop: '11/12/2010',
            starSystemId: '1234',
            starName: 'Abcde',
            telescopeLocation: 'Hawaii',
            description: '[Desc] Lorem ipsum dolor sit amet, consectetur adipiscing elit.LorLorLorL Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            fileType: 'jpg',
            fileQuality: '1028',
            colorType: 'color',
            color: '6458',
            contrast: '215',
            brightness: '2665',
            saturation: '2652'
        }
    ]
}

// api for calling tested plan
const testedPlan = () => {
    return [
        {
            sciencePlanId: '16',
            sciencePlanName: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. 6',
            collaborator: 'Gemini',
            creator: 'Klinton',
            objective: 'Hello world',
            fund: '123',
            scheduleStart: '11/11/1111',
            scheduleStop: '11/12/2010',
            starSystemId: '1234',
            starName: 'Abcde',
            telescopeLocation: 'Hawaii',
            description: '[Desc] Lorem ipsum dolor sit amet, consectetur adipiscing elit.LorLorLorL Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            fileType: 'jpg',
            fileQuality: '1028',
            colorType: 'color',
            color: '6458',
            contrast: '215',
            brightness: '2665',
            saturation: '2652'
        },
    ]
}

/* apis for modify plan (update):
*  conflict, pending, tested
*/

// api for reject plan (delete)

// api for test (update pending table by removing tested plan)

// api for submit (update tested table by removing plan from tested)