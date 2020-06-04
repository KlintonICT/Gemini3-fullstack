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
        
        if(formElem.scienceName.value.length != 0 && formElem.objective.value.length != 0 &&
            formElem.fund.value.length != 0 && formElem.scheduleStart.value.length != 0 &&
            formElem.scheduleStop.value.length != 0 && formElem.starSystemId.value.length !=0 &&
            formElem.fileQuality.value.length !=0 && formElem.color.value.length !=0 &&
            formElem.contrast.value.length !=0 && formElem.brightness.value.length !=0 &&
            formElem.saturation.value.length !=0){
                scienceName = true, objective = true, fund = true, start = true, stop = true, starSys = true;
                fileQual = true, color = true, contrast = true, brightness = true, saturation = true;
                activeButton( scienceName, objective, fund, start, stop, starSys, fileQual, color, contrast, brightness, saturation );
        }
        
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
            $(`#colla${idx}`).on('click', () => {
                const elem = document.getElementById(`colla${idx}`);
                if(!$(`#colla${idx}`).hasClass('active')){
                    collaboratorList.push(ast);
                }else{
                    collaboratorList.splice(collaboratorList.indexOf(ast), 1);
                }
                elem.classList.toggle('active');
                if(collaboratorList.length <= 0){
                    document.getElementsByClassName('close-modal')[0].style.display = 'block';
                    collaboratorList.splice(0, collaboratorList.length);
                    document.getElementById('collaborate-text').innerHTML = 'Collaborators';
                }else{
                    document.getElementsByClassName('close-modal')[0].style.display = 'none';
                }
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
        // send science plan to database
        if($('#btn-send').hasClass('active')){
            $('#link-to-menu').html(`<a href="./testSciencePlan.html" id="testSciencePlan"></a>`)
            location.href = $('#testSciencePlan').attr('href');
        }
    }

    const onAddCollaborator = () => {
        let collaList = '';
        if(collaboratorList.length > 0) {
            collaboratorList.forEach(collaborator => {
                collaList += collaborator + ', ';
            })
            collaList = collaList.replace(/,\s*$/, "");
            document.getElementById('collaborate-text').innerHTML = collaList;
        }else{
            document.getElementById('collaborate-text').innerHTML = 'Collaborators';
        }
    }

    const onSubmitSciencePlan = ( event ) => { event.preventDefault(); }

    const openModal = () => {
        $("#modal-collaborate").modal({
            escapeClose: false,
            clickClose: false,
        });
        if(collaboratorList.length <= 0){
            document.getElementsByClassName('close-modal')[0].style.display = 'block';
            collaboratorList.splice(0, collaboratorList.length);
            document.getElementById('collaborate-text').innerHTML = 'Collaborators';
        }else{
            document.getElementsByClassName('close-modal')[0].style.display = 'none';
        }
    }

    const displayExistingInfo = () => {
        var modifyPlan = localStorage.getItem('modifyPlan');
        modifyPlan = modifyPlan ? JSON.parse(modifyPlan) : {};
        var sStart = modifyPlan.scheduleStart.split('/');
        var sStop = modifyPlan.scheduleStop.split('/');
        document.getElementById('science-plan-id').innerHTML = `(No. ${modifyPlan.sciencePlanId})`;
        document.getElementById('scienceName').value = modifyPlan.sciencePlanName;
        document.getElementById('objective').value = modifyPlan.objective;
        document.getElementById('fund').value = modifyPlan.fund;
        document.getElementById('scheduleStart').value = sStart[2] + '-' + sStart[1] + '-' + sStart[0];
        document.getElementById('scheduleStop').value = sStop[2] + '-' + sStop[1] + '-' + sStop[0];
        document.getElementById('starSystemId').value = modifyPlan.starSystemId;
        document.getElementById('teleLocated').value = modifyPlan.telescopeLocation.toLowerCase();
        document.getElementById('fileType').value = modifyPlan.fileType.toLowerCase();
        document.getElementById('fileQuality').value = modifyPlan.fileQuality;
        document.getElementById('colorType').value = modifyPlan.colorType.toLowerCase();
        document.getElementById('color').value = modifyPlan.color;
        document.getElementById('contrast').value = modifyPlan.contrast;
        document.getElementById('brightness').value = modifyPlan.brightness;
        document.getElementById('saturation').value = modifyPlan.saturation;

        validateInput();
    }

    const setupListeners = () => {
        $('#science-form').on('submit', onSubmitSciencePlan);
        $('#btn-send').on('click', onSend);
        $('#add-colla-btn').on('click', onAddCollaborator);
        $('#add-collaborate').on('click', openModal);
    }

    const run = async () => {
        var currentUser = localStorage.getItem('currentUser');
       currentUser = currentUser ? JSON.parse(currentUser) : {};
       document.getElementById('loginName').innerHTML = currentUser.username;

        astronomerList = ['Klinton', 'Ampere', 'Wipu', 'God', 'Rin'];

        setupListeners();
        validateInput();
        displayAstronomerList();
        selectCollabor();
        displayExistingInfo();
    }   
    run();
})();