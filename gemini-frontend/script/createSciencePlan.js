(() => {
    let astronomerList = [], collaboratorList = [];

    const activeButton = ( scienceName, objective, fund, start, stop, starSys, fileQual, color, contrast, brightness, saturation ) => {
        const sendBtn = document.getElementById('btn-send');
        if( scienceName && objective && 
            fund && start && stop && 
            starSys && fileQual && color && contrast && brightness
            && saturation && !$('#btn-send').hasClass('active')){
            sendBtn.className += ' active';
        }
    } 

    const validateInput = () => {
        const formElem = document.getElementById('science-form');
        const sendBtn = document.getElementById('btn-send');
        let scienceName = false, objective = false, fund = false, start = false, stop = false, starSys = false;
        let fileQual = false, color = false, contrast = false, brightness = false, saturation = false;
        $('#scienceName').on('change', () => {
            if( formElem.scienceName.value.length === 0) { 
                scienceName = false; 
                sendBtn.classList.remove('active');
            } else { scienceName = true }
            activeButton( scienceName, objective, fund, start, stop, starSys, fileQual, color, contrast, brightness, saturation );
        })
        $('#objective').on('change', () => {
            if( formElem.objective.value.length === 0) { 
                objective = false; 
                sendBtn.classList.remove('active');
            }else { objective = true; }
            activeButton( scienceName, objective, fund, start, stop, starSys, fileQual, color, contrast, brightness, saturation );
        })
        $('#fund').on('change', () => {
            if( formElem.fund.value.length === 0) { 
                fund = false; 
                sendBtn.classList.remove('active');
            } else { fund = true }
            activeButton( scienceName, objective, fund, start, stop, starSys, fileQual, color, contrast, brightness, saturation );
        })
        $('#scheduleStart').on('change', () => {
            if( formElem.scheduleStart.value.length === 0) { 
                start = false; 
                sendBtn.classList.remove('active');
            } else { start = true }
            activeButton( scienceName, objective, fund, start, stop, starSys, fileQual, color, contrast, brightness, saturation );
        })
        $('#scheduleStop').on('change', () => {
            if( formElem.scheduleStop.value.length === 0) { 
                stop = false; 
                sendBtn.classList.remove('active');
            } else { stop = true }
            activeButton( scienceName, objective, fund, start, stop, starSys, fileQual, color, contrast, brightness, saturation );
        })
        $('#starSystemId').on('change', () => {
            if( formElem.starSystemId.value.length === 0) { 
                starSys = false; 
                sendBtn.classList.remove('active');
            } else { starSys = true }
            activeButton( scienceName, objective, fund, start, stop, starSys, fileQual, color, contrast, brightness, saturation );
        })
        $('#fileQuality').on('change', () => {
            if( formElem.fileQuality.value.length === 0) { 
                fileQual = false; 
                sendBtn.classList.remove('active');
            } else { fileQual = true }
            activeButton( scienceName, objective, fund, start, stop, starSys, fileQual, color, contrast, brightness, saturation );
        })
        $('#color').on('change', () => {
            if( formElem.color.value.length === 0) { 
                color = false; 
                sendBtn.classList.remove('active');
            } else { color = true }
            activeButton( scienceName, objective, fund, start, stop, starSys, fileQual, color, contrast, brightness, saturation );
        })
        $('#contrast').on('change', () => {
            if( formElem.contrast.value.length === 0) { 
                contrast = false; 
                sendBtn.classList.remove('active');
            } else { contrast = true }
            activeButton( scienceName, objective, fund, start, stop, starSys, fileQual, color, contrast, brightness, saturation );
        })
        $('#brightness').on('change', () => {
            if( formElem.brightness.value.length === 0) { 
                brightness = false; 
                sendBtn.classList.remove('active');
            } else { brightness = true }
            activeButton( scienceName, objective, fund, start, stop, starSys, fileQual, color, contrast, brightness, saturation );
        })
        $('#saturation').on('change', () => {
            if( formElem.saturation.value.length === 0) { 
                saturation = false; 
                sendBtn.classList.remove('active');
            } else { saturation = true }
            activeButton( scienceName, objective, fund, start, stop, starSys, fileQual, color, contrast, brightness, saturation );
        })
    }

    const selectCollabor = () => {
        astronomerList.forEach((ast, idx) => {
            $(`#colla${idx}`).on('click', (e) => {
                const elem = document.getElementById(`colla${idx}`);
                if(!$(`#colla${idx}`).hasClass('active')){
                    collaboratorList.push(idx);
                }else{
                    collaboratorList.splice(collaboratorList.indexOf(idx), 1);
                }
                elem.classList.toggle('active');
            })
        })
    }

    const createAstronomerElem = ( astronomer, idx ) => {
        const astElem = document.createElement('span');
        astElem.innerHTML = astronomer;
        astElem.setAttribute('class', 'collaborate-list');
        astElem.setAttribute('id', `colla${idx}`);

        return astElem;
    }

    const displayAstronomerList = () => {
        const astronomerElem = document.getElementById('modal-body');

        astronomerList.forEach((ast, idx) => {
            const temp = createAstronomerElem(ast, idx);
            astronomerElem.appendChild(temp);
        })
    }

    const onSend = () => {
        console.log("kdsdfsdf");
    }

    const onSubmitSciencePlan = ( event ) => { event.preventDefault(); }

    const setupListeners = () => {
        $('#science-form').on('submit', onSubmitSciencePlan);
        $('#btn-send').on('click', onSend);
    }

    const run = async () => {
        const username = localStorage.getItem('currentUserName');
        document.getElementById('loginName').innerHTML = username;

        astronomerList = ['Klinton', 'Ampere', 'Wipu', 'God', 'Rin', 'Klinton', 'Ampere', 'Wipu', 'God', 'Rin'];

        setupListeners();
        validateInput();
        displayAstronomerList();
        selectCollabor();
    }   
    run();
})();